import {
  PERSONAL_QUESTIONS,
  WORK_EXPERIENCE_QUESTIONS,
  EDUCATION_QUESTIONS,
  SKILL_QUESTIONS,
  PROJECT_QUESTIONS,
  CERTIFICATION_QUESTIONS,
  LANGUAGE_QUESTIONS,
  PROFESSIONAL_SUMMARY_QUESTION,
  HOBBIES_QUESTION,
} from './questions.config';
import type { Question } from './questions.config';

export type SectionType = 'single' | 'collection';

interface ReduxActions {
  createFirst: string;
  createNew: string;
  delete: string;
  setSpecific: string;
}

export interface SectionConfig {
  id: string;
  label: string;
  icon: string;
  type: SectionType;
  reduxKey: string;
  dataKey?: string;
  description?: string;
  question?: Question;
  questions?: Question[];
  collectionDisplayField?: (item: Record<string, string>) => string;
  reduxActions?: ReduxActions;
}

export const SECTIONS: SectionConfig[] = [
  {
    id: 'personal',
    label: 'Personal Information',
    icon: '👤',
    type: 'single',
    reduxKey: 'formModal',
    questions: PERSONAL_QUESTIONS,
    description: 'Your basic contact and location information',
  },
  {
    id: 'summary',
    label: 'Professional Summary',
    icon: '✦',
    type: 'single',
    reduxKey: 'professionalSummary',
    question: PROFESSIONAL_SUMMARY_QUESTION,
    description: 'A concise overview of your professional background',
  },
  {
    id: 'workExperience',
    label: 'Work Experience',
    icon: '💼',
    type: 'collection',
    reduxKey: 'workExperience',
    dataKey: 'workExperience',
    questions: WORK_EXPERIENCE_QUESTIONS,
    collectionDisplayField: (item) => `${item.jobTitle || 'New Role'} @ ${item.employer || ''}`,
    reduxActions: {
      createFirst: 'createFirstWorkExperience',
      createNew: 'createNewWorkExperience',
      delete: 'deleteWorkExperience',
      setSpecific: 'setSpecificWorkExperience',
    },
  },
  {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    type: 'collection',
    reduxKey: 'educations',
    dataKey: 'educations',
    questions: EDUCATION_QUESTIONS,
    collectionDisplayField: (item) => `${item.school || 'New Education'} — ${item.degree || ''}`,
    reduxActions: {
      createFirst: 'createFirstEducation',
      createNew: 'createNewEducation',
      delete: 'deleteEducation',
      setSpecific: 'setSpecificEducation',
    },
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: '⚡',
    type: 'collection',
    reduxKey: 'skills',
    dataKey: 'skills',
    questions: SKILL_QUESTIONS,
    collectionDisplayField: (item) => `${item.label || 'New Skill'}`,
    reduxActions: {
      createFirst: 'createFirstSkill',
      createNew: 'createNewSkill',
      delete: 'deleteSkill',
      setSpecific: 'setSpecificSkill',
    },
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '◈',
    type: 'collection',
    reduxKey: 'projects',
    dataKey: 'projects',
    questions: PROJECT_QUESTIONS,
    collectionDisplayField: (item) => `${item.title || 'New Project'}`,
    reduxActions: {
      createFirst: 'createFirstProject',
      createNew: 'createNewProject',
      delete: 'deleteProject',
      setSpecific: 'setSpecificProject',
    },
  },
  {
    id: 'certifications',
    label: 'Licenses & Certifications',
    icon: '🏅',
    type: 'collection',
    reduxKey: 'certifications',
    dataKey: 'certifications',
    questions: CERTIFICATION_QUESTIONS,
    collectionDisplayField: (item) => `${item.name || 'New Certification'}`,
    reduxActions: {
      createFirst: 'createFirstCertification',
      createNew: 'createNewCertification',
      delete: 'deleteCertification',
      setSpecific: 'setSpecificCertification',
    },
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: '🌐',
    type: 'collection',
    reduxKey: 'languages',
    dataKey: 'languages',
    questions: LANGUAGE_QUESTIONS,
    collectionDisplayField: (item) => `${item.language || 'New Language'} — ${item.level || ''}`,
    reduxActions: {
      createFirst: 'createFirstLanguage',
      createNew: 'createNewLanguage',
      delete: 'deleteLanguage',
      setSpecific: 'setSpecificLanguage',
    },
  },
  {
    id: 'hobbies',
    label: 'Hobbies & Interests',
    icon: '✿',
    type: 'single',
    reduxKey: 'interests',
    question: HOBBIES_QUESTION,
    description: 'Your personal interests and hobbies',
  },
];

export const getSectionById = (id: string): SectionConfig | null =>
  SECTIONS.find((s) => s.id === id) ?? null;

export const getSectionIds = (): string[] => SECTIONS.map((s) => s.id);

export const getCollectionSections = (): SectionConfig[] =>
  SECTIONS.filter((s) => s.type === 'collection');

export const getSingleSections = (): SectionConfig[] =>
  SECTIONS.filter((s) => s.type === 'single');

export const isSectionComplete = (
  formData: Record<string, unknown>,
  sectionId: string,
): boolean => {
  const section = getSectionById(sectionId);
  if (!section) return false;
  const data = formData[section.reduxKey] ?? formData[section.dataKey ?? ''];
  if (section.type === 'collection') return Array.isArray(data) && data.length > 0;
  return !!data;
};

export const getSectionBadge = (
  formData: Record<string, unknown>,
  sectionId: string,
): string | null => {
  const section = getSectionById(sectionId);
  if (!section) return null;
  if (section.type === 'collection') {
    const data = formData[section.dataKey ?? ''];
    if (!Array.isArray(data) || data.length === 0) return null;
    return data.length === 1 ? '1 added' : `${data.length} added`;
  }
  return formData[section.reduxKey] ? 'Added' : null;
};
