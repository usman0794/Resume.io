// ─── about.data.ts ───────────────────────────────────────────
// Single source of truth for About page content.
// ─────────────────────────────────────────────────────────────

export interface MissionPillar {
  icon: string;
  title: string;
  desc: string;
}

export interface StatItem {
  stat: string;
  label: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
  bgColor: string;
  textColor: string;
}

export const MISSION_PILLARS: MissionPillar[] = [
  {
    icon: "⚡",
    title: "Speed",
    desc: "From zero to polished resume in under 10 minutes — no bloat, no friction.",
  },
  {
    icon: "🎯",
    title: "Precision",
    desc: "AI that tailors your resume to specific job descriptions, not generic templates.",
  },
  {
    icon: "🔒",
    title: "Privacy",
    desc: "Your data belongs to you. We never sell or share your personal information.",
  },
  {
    icon: "♿",
    title: "Accessibility",
    desc: "Professional resume tools should be available to everyone, not just those who can afford career coaches.",
  },
];

export const PLATFORM_STATS: StatItem[] = [
  { stat: "65,144,120", label: "resumes created" },
  { stat: "5,709,951", label: "cover letters created" },
  { stat: "25 000+", label: "sign-ups each day" },
  { stat: "20", label: "languages supported" },
];

export const IMPACT_STATS: StatItem[] = [
  { stat: "50K+", label: "Resumes created" },
  { stat: "120+", label: "Countries served" },
  { stat: "4.8★", label: "Average rating" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Adam Brown",
    role: "Head of SEO",
    quote:
      "The head of SEO at resume.io. We blend strategy and creativity to make job hunting easier. Our goal is to ensure every job seeker has access to the best tools and guidance to land their dream role.",
    initials: "AB",
    bgColor: "#EFF6FF",
    textColor: "#1D4ED8",
  },
  {
    id: "2",
    name: "Anna Bychkova",
    role: "Head of Product",
    quote:
      "Hi all, I am the Head of Product at resume.io. Right now, the most important step in the hiring process is the resume. We build products that give every candidate a fair shot at standing out.",
    initials: "AB",
    bgColor: "#F0FDF4",
    textColor: "#15803D",
  },
  {
    id: "3",
    name: "Marcus Chen",
    role: "Lead Engineer",
    quote:
      "Engineering the backbone of resume.io means solving real problems for real people every day. We obsess over performance, reliability, and making sure the platform never gets in the way of someone's career breakthrough.",
    initials: "MC",
    bgColor: "#FDF4FF",
    textColor: "#7E22CE",
  },
];
