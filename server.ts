import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import { randomBytes } from 'crypto';
import * as aiService from './server-ai';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const tokenStore = new Map<string, string>();

  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());

  const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  app.get('/api/status', (_req, res) => {
    res.json({
      hunter: !!process.env.HUNTER_API_KEY,
      linkedin: !!(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET),
      gemini: !!process.env.GEMINI_API_KEY
    });
  });

  app.post('/api/ai', async (req, res) => {
    if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'GEMINI_API_KEY not configured' });

    try {
      const { operation, payload = {} } = req.body || {};
      let result;

      switch (operation) {
        case 'generateOutreachMessage':
          result = await aiService.generateOutreachMessage(payload.lead, payload.type);
          break;
        case 'generateLinkedInComment':
          result = await aiService.generateLinkedInComment(payload.postContent, payload.tone);
          break;
        case 'analyzePostForLeads':
          result = await aiService.analyzePostForLeads(payload.postContent);
          break;
        case 'generateResponseStrategy':
          result = await aiService.generateResponseStrategy(payload.audit, payload.content);
          break;
        case 'findProspects':
          result = await aiService.findProspects(payload.niche, payload.location);
          break;
        default:
          return res.status(400).json({ error: 'Unsupported AI operation' });
      }

      res.json(result);
    } catch (error: any) {
      console.error('AI request failed:', error?.message || error);
      res.status(500).json({ error: 'AI request failed' });
    }
  });

  app.get('/api/auth/linkedin/url', (_req, res) => {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    if (!clientId) return res.status(500).json({ error: 'LINKEDIN_CLIENT_ID not configured' });

    const state = randomBytes(32).toString('hex');
    res.cookie('linkedin_oauth_state', state, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 10 * 60 * 1000
    });

    const redirectUri = `${appUrl}/api/auth/linkedin/callback`;
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'openid profile email w_member_social',
      state
    });

    res.json({ url: `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}` });
  });

  app.get('/api/hunter/search', async (req, res) => {
    const domain = String(req.query.domain || '').trim();
    const apiKey = process.env.HUNTER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Hunter.io API key not configured' });
    if (!domain) return res.status(400).json({ error: 'domain is required' });

    try {
      const response = await axios.get('https://api.hunter.io/v2/domain-search', {
        params: { domain, api_key: apiKey }
      });
      res.json(response.data);
    } catch (err: any) {
      res.status(err.response?.status || 500).json(err.response?.data || { error: 'Hunter.io request failed' });
    }
  });

  app.get(['/api/auth/linkedin/callback', '/api/auth/linkedin/callback/'], async (req, res) => {
    const expectedState = req.cookies.linkedin_oauth_state;
    const returnedState = String(req.query.state || '');
    const targetOrigin = new URL(appUrl).origin;

    const respond = (payload: object) => res.type('html').send(`<!doctype html><script>
      if (window.opener) window.opener.postMessage(${JSON.stringify(payload)}, ${JSON.stringify(targetOrigin)});
      window.close();
    </script>`);

    if (!expectedState || returnedState !== expectedState) {
      return respond({ type: 'LINKEDIN_AUTH_ERROR', error: 'Invalid OAuth state' });
    }

    if (req.query.error) {
      return respond({ type: 'LINKEDIN_AUTH_ERROR', error: String(req.query.error_description || req.query.error) });
    }

    try {
      const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
        params: {
          grant_type: 'authorization_code',
          code: String(req.query.code || ''),
          redirect_uri: `${appUrl}/api/auth/linkedin/callback`,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const sessionId = randomBytes(32).toString('hex');
      tokenStore.set(sessionId, response.data.access_token);
      res.cookie('linkedin_session', sessionId, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000
      });
      res.clearCookie('linkedin_oauth_state');
      return respond({ type: 'LINKEDIN_AUTH_SUCCESS' });
    } catch {
      return respond({ type: 'LINKEDIN_AUTH_ERROR', error: 'Failed to exchange authorization code' });
    }
  });

  app.get('/api/auth/linkedin/status', (req, res) => {
    const sessionId = req.cookies.linkedin_session;
    res.json({ connected: !!(sessionId && tokenStore.has(sessionId)) });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
}

startServer();
