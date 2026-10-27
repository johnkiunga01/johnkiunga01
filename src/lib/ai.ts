export interface Prospect {
  name: string;
  company: string;
  website: string;
  industry: string;
  location: string;
  potential_need: string;
  linkedin_url: string;
  marketing_audit: string;
  confidence_score: number;
  strategic_rationale: string;
}

async function callAI<T>(operation: string, payload: unknown): Promise<T> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ operation, payload })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'AI request failed');
  }

  return response.json() as Promise<T>;
}

export const generateOutreachMessage = (lead: any, type: string) =>
  callAI<string>('generateOutreachMessage', { lead, type });

export const generateLinkedInComment = (postContent: string, tone = 'Human') =>
  callAI<string>('generateLinkedInComment', { postContent, tone });

export const analyzePostForLeads = (postContent: string) =>
  callAI<any>('analyzePostForLeads', { postContent });

export const generateResponseStrategy = (audit: any, content: string) =>
  callAI<any>('generateResponseStrategy', { audit, content });

export const findProspects = (niche: string, location: string) =>
  callAI<Prospect[]>('findProspects', { niche, location });
