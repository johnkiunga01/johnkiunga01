export interface CV {
  id: string;
  title: string;
  jobUrl?: string;
  lastOptimized: string;
  atsScore: number;
  status: "draft" | "optimized";
  version: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: "starter" | "pro" | "elite";
  cvCount: number;
}

export const MOCK_USER: User = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  plan: "pro",
  cvCount: 3,
};

export const MOCK_CVS: CV[] = [
  {
    id: "cv_1",
    title: "Senior Frontend Engineer - Google",
    jobUrl: "https://careers.google.com/jobs/results/12345",
    lastOptimized: "2024-03-15",
    atsScore: 92,
    status: "optimized",
    version: 3,
  },
  {
    id: "cv_2",
    title: "Product Manager - Stripe",
    jobUrl: "https://stripe.com/jobs/pm-role",
    lastOptimized: "2024-03-10",
    atsScore: 78,
    status: "optimized",
    version: 1,
  },
  {
    id: "cv_3",
    title: "Software Architect - Generic",
    lastOptimized: "2024-02-28",
    atsScore: 65,
    status: "draft",
    version: 1,
  },
];

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "360",
    limit: 2,
    features: ["2 AI-optimized CVs", "Basic ATS Check", "PDF Export"],
    cta: "Start Free",
  },
  {
    id: "pro",
    name: "Pro",
    price: "800",
    limit: 4,
    popular: true,
    features: [
      "4 AI-optimized CVs",
      "Advanced ATS Scoring",
      "LinkedIn Optimization",
      "Priority Support",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "elite",
    name: "Elite",
    price: "1500",
    limit: 8,
    features: [
      "8 AI-optimized CVs",
      "Full Portfolio Rewrite",
      "M-Pesa / Stripe Payments",
      "Dedicated Career Coach AI",
    ],
    cta: "Go Elite",
  },
];