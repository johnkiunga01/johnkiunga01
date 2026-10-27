# GrowthFlow — Creative Agency Prospector

GrowthFlow is a public reference implementation for AI-assisted B2B prospecting and outreach. It combines lead scoring, prospect discovery, LinkedIn-oriented workflows, Hunter.io enrichment and Firebase-backed workspace data.

## Features

- Prospect discovery and lead scoring
- AI-generated outreach messages and engagement strategies
- LinkedIn connection workflow
- Hunter.io domain/email enrichment through the server
- Firebase Authentication and Firestore
- Responsive React/Vite dashboard

## Security changes in this salvaged version

The original prototype exposed too much OAuth state to the browser. This migration hardens the flow by:

- generating a cryptographically random LinkedIn OAuth `state` value per login
- validating the OAuth state on callback
- never posting LinkedIn access tokens to the browser
- never storing LinkedIn access tokens in Firestore from client code
- restricting popup messages to the configured application origin
- keeping Hunter and Gemini keys server-side

For production, persist LinkedIn access tokens in an encrypted server-side database or secret store associated with the authenticated user. The temporary in-memory token store used by this reference project is intentionally non-persistent.

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

Configure the environment variables described in `.env.example`.

## Important

This is a salvaged legacy/reference project. Review current LinkedIn API products/scopes, Firebase rules, Gemini model names, dependency versions and deployment configuration before production use.

Originally developed under `John-Kiunga/Growth-flow`; migrated and hardened in October 2026.
