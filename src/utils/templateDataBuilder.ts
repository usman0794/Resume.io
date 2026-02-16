import type {
  WorkExperience, Education, Project, Skill,
  Certification, Language, SocialLink, FormModal,
} from '@/types/resume.types';

export interface TemplateExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface TemplateEducation {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
}

export interface TemplateProject {
  title: string;
  description: string;
}

export type TemplateSkills = Record<string, string[]> | null;

export interface TemplateLanguage {
  name: string;
  level: string;
}

export interface TemplateContext {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: TemplateSkills;
  experience: TemplateExperience[];
  education: TemplateEducation[];
  projects: TemplateProject[];
  certifications: string[];
  languages: TemplateLanguage[];
  interests: string;
}

export const buildExperienceData = (workExperience: WorkExperience[] = []): TemplateExperience[] =>
  workExperience
    .filter((w) => w?.jobTitle)
    .map((w) => ({
      role: w.jobTitle,
      company: w.employer,
      period: [w.startDate, w.endDate].filter(Boolean).join(' – '),
      location: '',
      bullets: (w.description || '').split('\n').map((l) => l.trim()).filter(Boolean),
    }));

export const buildEducationData = (educations: Education[] = []): TemplateEducation[] =>
  educations
    .filter((e) => e?.school || e?.degree)
    .map((e) => ({
      degree: [e.degree, e.field_of_study].filter(Boolean).join(', '),
      institution: e.school,
      period: [e.start_date, e.end_date].filter(Boolean).join(' – '),
      gpa: e.grade ?? '',
    }));

export const buildProjectsData = (projects: Project[] = []): TemplateProject[] =>
  projects
    .filter((p) => p?.title)
    .map((p) => ({ title: p.title, description: p.description }));

export const buildSkillsData = (skills: Skill[] = []): TemplateSkills => {
  if (!skills.length) return null;
  const grouped: Record<string, string[]> = {};
  skills.forEach((s) => {
    const cat = 'Technical';
    if (!grouped[cat]) grouped[cat] = [];
    if (s.label) grouped[cat].push(s.label);
  });
  return Object.keys(grouped).length > 0 ? grouped : null;
};

export const buildCertificationsData = (certifications: Certification[] = []): string[] =>
  certifications
    .filter((c) => c?.name)
    .map((c) => [c.name, c.issuer].filter(Boolean).join(' — '));

export const buildLanguagesData = (languages: Language[] = []): TemplateLanguage[] =>
  languages
    .filter((l) => l?.language)
    .map((l) => ({ name: l.language, level: String(l.level) }));

export const buildTemplateContext = (
  formData: Partial<FormModal> = {},
  professionalSummary = '',
): TemplateContext => {
  const fm = formData;
  const links = (fm.socialLinks ?? []) as SocialLink[];
  return {
    name: [fm.firstName, fm.lastName].filter(Boolean).join(' '),
    email: fm.email ?? '',
    phone: fm.phone ?? '',
    location: [fm.city, fm.country].filter(Boolean).join(', '),
    linkedin: links.find((s) => s.label?.toLowerCase().includes('linkedin'))?.url ?? '',
    github: links.find((s) => s.label?.toLowerCase().includes('github'))?.url ?? '',
    summary: professionalSummary,
    skills: buildSkillsData(fm.skills),
    experience: buildExperienceData(fm.workExperience),
    education: buildEducationData(fm.educations),
    projects: buildProjectsData(fm.projects),
    certifications: buildCertificationsData(fm.certifications),
    languages: buildLanguagesData(fm.languages),
    interests: fm.interests ?? '',
  };
};

const TemplateDataBuilder = {
  buildExperienceData,
  buildEducationData,
  buildProjectsData,
  buildSkillsData,
  buildCertificationsData,
  buildLanguagesData,
  buildTemplateContext,
};

export default TemplateDataBuilder;
