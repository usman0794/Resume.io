import * as T from '@/constants/actionTypes';
import type { ResumeState, FormModal } from '@/types/resume.types';

const EMPTY_FORM: FormModal = {
  jobTitle: '', avatar: '', firstName: '', lastName: '',
  email: '', phone: '', country: '', city: '', address: '',
  postalCode: '', drivingLicense: '', nationality: '',
  placeOfBirth: '', dateOfBirth: '',
  educations: [], socialLinks: [], workExperience: [],
  skills: [], languages: [], projects: [], certifications: [],
  references: [], interests: '', extraCarricularActivities: [], footer: '',
};

const initialState: ResumeState = {
  home: null,
  selectedTemplate: {},
  activeTab: 1,
  selectedTabTemplates: [],
  isCropperModalOpen: false,
  professionalSummary: '',
  formModal: EMPTY_FORM,
  initHeadings: [
    { id: 'item-2', title: 'Education History', subTitle: 'Show your academic achievements', contentId: 'EductionForm' },
    { id: 'item-11', title: 'Websites & Social Links', subTitle: 'Add your online presence', contentId: 'SocialLinkForm' },
    { id: 'item-3', title: 'Work Experience', subTitle: 'Show your career history', contentId: 'WorkExperience' },
    { id: 'item-4', title: 'Skills', subTitle: 'Highlight your key skills', contentId: 'Skills' },
    { id: 'item-5', title: 'Projects', subTitle: 'Showcase your work', contentId: 'Projects' },
    { id: 'item-6', title: 'Certifications', subTitle: 'List your certifications', contentId: 'Certifications' },
    { id: 'item-7', title: 'Languages', subTitle: 'Languages you speak', contentId: 'Languages' },
    { id: 'item-8', title: 'Interests', subTitle: 'Share your interests', contentId: 'Interests' },
    { id: 'item-9', title: 'References', subTitle: 'Professional references', contentId: 'References' },
    { id: 'item-10', title: 'Extracurricular Activities', subTitle: 'Activities outside work', contentId: 'ExtracurricularActivities' },
  ],
};

const nextId = (arr: { id: number }[]) => arr.length > 0 ? Math.max(...arr.map(i => i.id)) + 1 : 1;

const resumeReducer = (state = initialState, action: any): ResumeState => {
  const fm = state.formModal;

  switch (action.type) {
    case T.GET_HOME_SUCCESS: return { ...state, home: action.data };
    case T.GET_HOME_FAILURE: return { ...state, home: null };
    case T.GET_TEMPLATES_BY_CATEGORY_SUCCESS: return { ...state, selectedTabTemplates: action.data };
    case T.SET_SELECTED_TAB_ID: return { ...state, activeTab: action.data };
    case T.SET_SELECTED_TEMPLATE: return { ...state, selectedTemplate: action.data };
    case T.UPDATE_FORM_MODAL: return { ...state, formModal: { ...fm, ...action.data } };
    case T.SET_PROFESSIONAL_SUMMARY: return { ...state, professionalSummary: action.data };
    case T.SET_IS_CROPPER_MODAL_OPEN: return { ...state, isCropperModalOpen: action.data };
    case T.SET_INTERESTS: return { ...state, formModal: { ...fm, interests: action.data } };
    case T.SET_INIT_HEADING: return { ...state, initHeadings: action.data };
    case T.SET_INIT_HEADING_TITLE: return { ...state, initHeadings: state.initHeadings.map(h => h.id === action.id ? { ...h, title: action.title } : h) };
    case T.CLEAR_RESUME_FORM: return { ...state, formModal: EMPTY_FORM, professionalSummary: '' };

    case T.CREATE_FIRST_EDUCATION: return { ...state, formModal: { ...fm, educations: [{ id: 1, school: '', degree: '', field_of_study: '', start_date: '', end_date: '', description: '', isOpen: true }] } };
    case T.CREATE_NEW_EDUCATION: return { ...state, formModal: { ...fm, educations: [...fm.educations, { id: nextId(fm.educations), school: '', degree: '', field_of_study: '', start_date: '', end_date: '', description: '', isOpen: true }] } };
    case T.DELETE_EDUCATION: return { ...state, formModal: { ...fm, educations: fm.educations.filter((e) => e.id !== action.data) } };
    case T.UPDATE_SPECIFIC_OBJECT_EDUCATION: return { ...state, formModal: { ...fm, educations: fm.educations.map((e) => (e.id === action.id ? { ...e, ...action.data } : e)) } };

    case T.CREATE_FIRST_WORK_EXPERIENCE: return { ...state, formModal: { ...fm, workExperience: [{ id: 1, jobTitle: '', employer: '', startDate: '', endDate: '', description: '', isOpen: true }] } };
    case T.CREATE_NEW_WORK_EXPERIENCE: return { ...state, formModal: { ...fm, workExperience: [...fm.workExperience, { id: nextId(fm.workExperience), jobTitle: '', employer: '', startDate: '', endDate: '', description: '', isOpen: true }] } };
    case T.DELETE_WORK_EXPERIENCE: return { ...state, formModal: { ...fm, workExperience: fm.workExperience.filter((e) => e.id !== action.data) } };
    case T.UPDATE_SPECIFIC_OBJECT_WORK_EXPERIENCE: return { ...state, formModal: { ...fm, workExperience: fm.workExperience.map((e) => (e.id === action.id ? { ...e, ...action.data } : e)) } };

    case T.CREATE_FIRST_SKILL: return { ...state, formModal: { ...fm, skills: [{ id: 1, label: '', level: 3, isOpen: true }] } };
    case T.CREATE_NEW_SKILL: return { ...state, formModal: { ...fm, skills: [...fm.skills, { id: nextId(fm.skills), label: '', level: 3, isOpen: true }] } };
    case T.DELETE_SKILL: return { ...state, formModal: { ...fm, skills: fm.skills.filter((e) => e.id !== action.data) } };
    case T.UPDATE_SPECIFIC_OBJECT_SKILL: return { ...state, formModal: { ...fm, skills: fm.skills.map((e) => (e.id === action.id ? { ...e, ...action.data } : e)) } };

    case T.CREATE_FIRST_LANGUAGE: return { ...state, formModal: { ...fm, languages: [{ id: 1, language: '', level: 3, isOpen: true }] } };
    case T.CREATE_NEW_LANGUAGE: return { ...state, formModal: { ...fm, languages: [...fm.languages, { id: nextId(fm.languages), language: '', level: 3, isOpen: true }] } };
    case T.DELETE_LANGUAGE: return { ...state, formModal: { ...fm, languages: fm.languages.filter((e) => e.id !== action.data) } };
    case T.UPDATE_SPECIFIC_OBJECT_LANGUAGE: return { ...state, formModal: { ...fm, languages: fm.languages.map((e) => (e.id === action.id ? { ...e, ...action.data } : e)) } };

    case T.CREATE_FIRST_PROJECT: return { ...state, formModal: { ...fm, projects: [{ id: 1, title: '', role: '', startDate: '', endDate: '', description: '', isOpen: true }] } };
    case T.CREATE_NEW_PROJECT: return { ...state, formModal: { ...fm, projects: [...fm.projects, { id: nextId(fm.projects), title: '', role: '', startDate: '', endDate: '', description: '', isOpen: true }] } };
    case T.DELETE_PROJECT: return { ...state, formModal: { ...fm, projects: fm.projects.filter((e) => e.id !== action.data) } };
    case T.UPDATE_SPECIFIC_OBJECT_PROJECT: return { ...state, formModal: { ...fm, projects: fm.projects.map((e) => (e.id === action.id ? { ...e, ...action.data } : e)) } };

    case T.CREATE_FIRST_CERTIFICATION: return { ...state, formModal: { ...fm, certifications: [{ id: 1, name: '', issuer: '', date: '', isOpen: true }] } };
    case T.CREATE_NEW_CERTIFICATION: return { ...state, formModal: { ...fm, certifications: [...fm.certifications, { id: nextId(fm.certifications), name: '', issuer: '', date: '', isOpen: true }] } };
    case T.DELETE_CERTIFICATION: return { ...state, formModal: { ...fm, certifications: fm.certifications.filter((e) => e.id !== action.data) } };
    case T.UPDATE_SPECIFIC_OBJECT_CERTIFICATION: return { ...state, formModal: { ...fm, certifications: fm.certifications.map((e) => (e.id === action.id ? { ...e, ...action.data } : e)) } };

    case T.CREATE_FIRST_SOCIAL_LINK: return { ...state, formModal: { ...fm, socialLinks: [{ id: 1, label: '', url: '', isOpen: true }] } };
    case T.CREATE_NEW_SOCIAL_LINK: return { ...state, formModal: { ...fm, socialLinks: [...fm.socialLinks, { id: nextId(fm.socialLinks), label: '', url: '', isOpen: true }] } };
    case T.DELETE_SOCIAL_LINK: return { ...state, formModal: { ...fm, socialLinks: fm.socialLinks.filter((e) => e.id !== action.data) } };
    case T.UPDATE_SPECIFIC_OBJECT_SOCIAL_LINK: return { ...state, formModal: { ...fm, socialLinks: fm.socialLinks.map((e) => (e.id === action.id ? { ...e, ...action.data } : e)) } };

    case T.CREATE_FIRST_REFERENCE: return { ...state, formModal: { ...fm, references: [{ id: 1, name: '', company: '', phone: '', email: '', isOpen: true }] } };
    case T.CREATE_NEW_REFERENCE: return { ...state, formModal: { ...fm, references: [...fm.references, { id: nextId(fm.references), name: '', company: '', phone: '', email: '', isOpen: true }] } };
    case T.DELETE_REFERENCE: return { ...state, formModal: { ...fm, references: fm.references.filter((e) => e.id !== action.data) } };
    case T.UPDATE_SPECIFIC_OBJECT_REFERENCE: return { ...state, formModal: { ...fm, references: fm.references.map((e) => (e.id === action.id ? { ...e, ...action.data } : e)) } };

    case T.CREATE_FIRST_EXTRA_CURRICULAR_ACTIVITY: return { ...state, formModal: { ...fm, extraCarricularActivities: [{ id: 1, title: '', description: '', isOpen: true }] } };
    case T.CREATE_NEW_EXTRA_CURRICULAR_ACTIVITY: return { ...state, formModal: { ...fm, extraCarricularActivities: [...fm.extraCarricularActivities, { id: nextId(fm.extraCarricularActivities), title: '', description: '', isOpen: true }] } };
    case T.DELETE_EXTRA_CURRICULAR_ACTIVITY: return { ...state, formModal: { ...fm, extraCarricularActivities: fm.extraCarricularActivities.filter((e) => e.id !== action.data) } };
    case T.UPDATE_SPECIFIC_OBJECT_EXTRA_CURRICULAR_ACTIVITY: return { ...state, formModal: { ...fm, extraCarricularActivities: fm.extraCarricularActivities.map((e) => (e.id === action.id ? { ...e, ...action.data } : e)) } };

    default:
      return state;
  }
};

export default resumeReducer;

// Action creators (for components importing directly from reducer)
export const setSelectedTemplate = (data: unknown) => ({ type: 'SET_SELECTED_TEMPLATE', data });
export const updateFormModal = (data: Partial<FormModal>) => ({ type: 'UPDATE_FORM_MODAL', data });
export const setProfessionalSummary = (data: string) => ({ type: 'SET_PROFESSIONAL_SUMMARY', data });
