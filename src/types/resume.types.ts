export interface Education {
  id: number;
  school: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  description: string;
  grade?: string;
  isOpen?: boolean;
}

export interface WorkExperience {
  id: number;
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  description: string;
  isOpen?: boolean;
}

export interface Skill {
  id: number;
  label: string;
  level: number;
  isOpen?: boolean;
}

export interface Language {
  id: number;
  language: string;
  level: number;
  isOpen?: boolean;
}

export interface Project {
  id: number;
  title: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  isOpen?: boolean;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  isOpen?: boolean;
}

export interface SocialLink {
  id: number;
  label: string;
  url: string;
  isOpen?: boolean;
}

export interface Reference {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  isOpen?: boolean;
}

export interface ExtraCurricular {
  id: number;
  title: string;
  description: string;
  isOpen?: boolean;
}

export interface InitHeading {
  id: string;
  title: string;
  subTitle: string;
  contentId: string;
}

export interface FormModal {
  jobTitle: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  drivingLicense: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
  educations: Education[];
  socialLinks: SocialLink[];
  workExperience: WorkExperience[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  certifications: Certification[];
  references: Reference[];
  interests: string;
  extraCarricularActivities: ExtraCurricular[];
  footer: string;
}

export interface ResumeState {
  home: any | null;
  selectedTemplate: any;
  activeTab: number;
  selectedTabTemplates: any[];
  isCropperModalOpen: boolean;
  professionalSummary: string;
  formModal: FormModal;
  initHeadings: InitHeading[];
}
