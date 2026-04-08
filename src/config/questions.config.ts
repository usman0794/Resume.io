export type QuestionType = 'text' | 'textarea' | 'select';

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  placeholder?: string;
  options?: string[];
}

export const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Skilful', 'Advanced', 'Expert'] as const;
export const LANGUAGE_LEVELS = ['Native', 'Fluent', 'Professional', 'Conversational', 'Basic'] as const;

export const PERSONAL_QUESTIONS: Question[] = [
  { id: 'firstName', label: 'What is your first name?', type: 'text', placeholder: 'e.g. Jane' },
  { id: 'lastName', label: 'What is your last name?', type: 'text', placeholder: 'e.g. Smith' },
  { id: 'jobTitle', label: 'What is your current job title?', type: 'text', placeholder: 'e.g. Software Engineer' },
  { id: 'email', label: 'What is your email address?', type: 'text', placeholder: 'e.g. jane@example.com' },
  { id: 'phone', label: 'What is your phone number?', type: 'text', placeholder: 'e.g. +92 300 1234567' },
  { id: 'city', label: 'Which city are you based in?', type: 'text', placeholder: 'e.g. Lahore' },
  { id: 'country', label: 'Which country?', type: 'text', placeholder: 'e.g. Pakistan' },
  { id: 'nationality', label: 'What is your nationality?', type: 'text', placeholder: 'e.g. Pakistani (optional)' },
  { id: 'address', label: 'Full address?', type: 'text', placeholder: 'e.g. 123 Main St (optional)' },
];

export const WORK_EXPERIENCE_QUESTIONS: Question[] = [
  { id: 'jobTitle', label: 'What was your job title?', type: 'text', placeholder: 'e.g. Software Engineer' },
  { id: 'employer', label: 'Which company did you work at?', type: 'text', placeholder: 'e.g. Google' },
  { id: 'startDate', label: 'When did you start this role?', type: 'text', placeholder: 'e.g. Jan 2021' },
  { id: 'endDate', label: 'When did you leave? (or "Present")', type: 'text', placeholder: 'e.g. Mar 2023 or Present' },
  { id: 'description', label: 'Describe your key responsibilities and achievements.', type: 'textarea', placeholder: 'Led a team of 5 engineers…' },
];

export const EDUCATION_QUESTIONS: Question[] = [
  { id: 'school', label: 'Which institution did you attend?', type: 'text', placeholder: 'e.g. University of Lahore' },
  { id: 'degree', label: 'What degree did you earn?', type: 'text', placeholder: "e.g. Bachelor's, Master's, PhD" },
  { id: 'field_of_study', label: 'What was your field of study?', type: 'text', placeholder: 'e.g. Computer Science' },
  { id: 'start_date', label: 'When did you start?', type: 'text', placeholder: 'e.g. Sep 2019' },
  { id: 'end_date', label: 'When did you finish? (or "Present")', type: 'text', placeholder: 'e.g. Jun 2023' },
  { id: 'grade', label: 'Grade or GPA? (optional)', type: 'text', placeholder: 'e.g. 3.8 / 4.0' },
  { id: 'description', label: 'Any additional details? (optional)', type: 'textarea', placeholder: 'e.g. Thesis on ML…' },
];

export const SKILL_QUESTIONS: Question[] = [
  { id: 'label', label: 'What is the skill name?', type: 'text', placeholder: 'e.g. React, Python, Leadership' },
  { id: 'level', label: 'What is your proficiency level?', type: 'select', options: [...PROFICIENCY_LEVELS] },
];

export const PROJECT_QUESTIONS: Question[] = [
  { id: 'title', label: 'What is the project name?', type: 'text', placeholder: 'e.g. AI Resume Builder' },
  { id: 'role', label: 'What was your role?', type: 'text', placeholder: 'e.g. Lead Developer' },
  { id: 'startDate', label: 'When did it start? (optional)', type: 'text', placeholder: 'e.g. Jan 2023' },
  { id: 'endDate', label: 'When did it end? (optional)', type: 'text', placeholder: 'e.g. Mar 2023 or Ongoing' },
  { id: 'description', label: 'Describe the project and your contribution.', type: 'textarea', placeholder: 'Built a full-stack app that…' },
];

export const CERTIFICATION_QUESTIONS: Question[] = [
  { id: 'name', label: 'Name of the certification?', type: 'text', placeholder: 'e.g. AWS Solutions Architect' },
  { id: 'issuer', label: 'Who issued it?', type: 'text', placeholder: 'e.g. Amazon Web Services' },
  { id: 'date', label: 'Year received? (optional)', type: 'text', placeholder: 'e.g. 2022' },
];

export const LANGUAGE_QUESTIONS: Question[] = [
  { id: 'language', label: 'Which language?', type: 'text', placeholder: 'e.g. Urdu, French, Arabic' },
  { id: 'level', label: 'What is your proficiency level?', type: 'select', options: [...LANGUAGE_LEVELS] },
];

export const PROFESSIONAL_SUMMARY_QUESTION: Question = {
  id: 'summary',
  type: 'textarea',
  label: 'Write a short professional summary — your 3-sentence pitch to a hiring manager.',
  placeholder: 'Results-driven engineer with 5+ years of experience building scalable web apps…',
};

export const HOBBIES_QUESTION: Question = {
  id: 'interests',
  type: 'textarea',
  label: 'What are your hobbies or interests?',
  placeholder: 'e.g. Open source contribution, hiking, photography, chess…',
};

const questionsMap: Record<string, Question[]> = {
  personal: PERSONAL_QUESTIONS,
  workExperience: WORK_EXPERIENCE_QUESTIONS,
  education: EDUCATION_QUESTIONS,
  skills: SKILL_QUESTIONS,
  projects: PROJECT_QUESTIONS,
  certifications: CERTIFICATION_QUESTIONS,
  languages: LANGUAGE_QUESTIONS,
};

export const getQuestionsBySection = (sectionId: string): Question[] =>
  questionsMap[sectionId] ?? [];

export const getProficiencyLevels = (type: 'skill' | 'language' = 'skill'): readonly string[] =>
  type === 'language' ? LANGUAGE_LEVELS : PROFICIENCY_LEVELS;
