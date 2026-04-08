import type { Dispatch } from 'redux';
import resumeService from '@/services/resumeService';
import * as T from '@/constants/actionTypes';

export const getHomePage = () => async (dispatch: Dispatch) => {
  try {
    const data = await resumeService.getHomePage();
    dispatch({ type: T.GET_HOME_SUCCESS, data });
  } catch {
    dispatch({ type: T.GET_HOME_FAILURE });
  }
};

export const getTemplateById = (id: string | number) => async (dispatch: Dispatch) => {
  try {
    const data = await resumeService.getTemplateById(id);
    dispatch({ type: T.SET_SELECTED_TEMPLATE, data });
  } catch { /* silently fail — keeps existing selection */ }
};

export const getTemplatesByCategory = (categoryId: string | number) => async (dispatch: Dispatch) => {
  try {
    const data = await resumeService.getTemplatesByCategory(categoryId);
    dispatch({ type: T.GET_TEMPLATES_BY_CATEGORY_SUCCESS, data });
  } catch { }
};

export const setSelectedTabId    = (tabId: number)    => (dispatch: Dispatch) => dispatch({ type: T.SET_SELECTED_TAB_ID, data: tabId });
export const setSelectedTemplate = (template: object) => (dispatch: Dispatch) => dispatch({ type: T.SET_SELECTED_TEMPLATE, data: template });
export const setFormModal        = (data: object)     => (dispatch: Dispatch) => dispatch({ type: T.UPDATE_FORM_MODAL, data });
export const setProfessionalSummary = (data: string)  => (dispatch: Dispatch) => dispatch({ type: T.SET_PROFESSIONAL_SUMMARY, data });
export const setIsCropperModalOpen  = (data: boolean) => (dispatch: Dispatch) => dispatch({ type: T.SET_IS_CROPPER_MODAL_OPEN, data });
export const setInterests        = (data: string)     => (dispatch: Dispatch) => dispatch({ type: T.SET_INTERESTS, data });
export const setInitHeadings     = (data: object[])   => (dispatch: Dispatch) => dispatch({ type: T.SET_INIT_HEADING, data });
export const setInitHeadingTitle = (id: string, title: string) => (dispatch: Dispatch) => dispatch({ type: T.SET_INIT_HEADING_TITLE, id, title });
export const clearResumeForm     = ()                 => (dispatch: Dispatch) => dispatch({ type: T.CLEAR_RESUME_FORM });

export const createFirstEducation    = () => (d: Dispatch) => d({ type: T.CREATE_FIRST_EDUCATION });
export const createNewEducation      = () => (d: Dispatch) => d({ type: T.CREATE_NEW_EDUCATION });
export const deleteEducation         = (id: number) => (d: Dispatch) => d({ type: T.DELETE_EDUCATION, data: id });
export const setSpecificEducation    = (id: number, data: object) => (d: Dispatch) => d({ type: T.UPDATE_SPECIFIC_OBJECT_EDUCATION, id, data });

export const createFirstWorkExperience    = () => (d: Dispatch) => d({ type: T.CREATE_FIRST_WORK_EXPERIENCE });
export const createNewWorkExperience      = () => (d: Dispatch) => d({ type: T.CREATE_NEW_WORK_EXPERIENCE });
export const deleteWorkExperience         = (id: number) => (d: Dispatch) => d({ type: T.DELETE_WORK_EXPERIENCE, data: id });
export const setSpecificWorkExperience    = (id: number, data: object) => (d: Dispatch) => d({ type: T.UPDATE_SPECIFIC_OBJECT_WORK_EXPERIENCE, id, data });

export const createFirstSkill    = () => (d: Dispatch) => d({ type: T.CREATE_FIRST_SKILL });
export const createNewSkill      = () => (d: Dispatch) => d({ type: T.CREATE_NEW_SKILL });
export const deleteSkill         = (id: number) => (d: Dispatch) => d({ type: T.DELETE_SKILL, data: id });
export const setSpecificSkill    = (id: number, data: object) => (d: Dispatch) => d({ type: T.UPDATE_SPECIFIC_OBJECT_SKILL, id, data });

export const createFirstLanguage    = () => (d: Dispatch) => d({ type: T.CREATE_FIRST_LANGUAGE });
export const createNewLanguage      = () => (d: Dispatch) => d({ type: T.CREATE_NEW_LANGUAGE });
export const deleteLanguage         = (id: number) => (d: Dispatch) => d({ type: T.DELETE_LANGUAGE, data: id });
export const setSpecificLanguage    = (id: number, data: object) => (d: Dispatch) => d({ type: T.UPDATE_SPECIFIC_OBJECT_LANGUAGE, id, data });

export const createFirstProject    = () => (d: Dispatch) => d({ type: T.CREATE_FIRST_PROJECT });
export const createNewProject      = () => (d: Dispatch) => d({ type: T.CREATE_NEW_PROJECT });
export const deleteProject         = (id: number) => (d: Dispatch) => d({ type: T.DELETE_PROJECT, data: id });
export const setSpecificProject    = (id: number, data: object) => (d: Dispatch) => d({ type: T.UPDATE_SPECIFIC_OBJECT_PROJECT, id, data });

export const createFirstCertification    = () => (d: Dispatch) => d({ type: T.CREATE_FIRST_CERTIFICATION });
export const createNewCertification      = () => (d: Dispatch) => d({ type: T.CREATE_NEW_CERTIFICATION });
export const deleteCertification         = (id: number) => (d: Dispatch) => d({ type: T.DELETE_CERTIFICATION, data: id });
export const setSpecificCertification    = (id: number, data: object) => (d: Dispatch) => d({ type: T.UPDATE_SPECIFIC_OBJECT_CERTIFICATION, id, data });

export const createFirstSocialLink    = () => (d: Dispatch) => d({ type: T.CREATE_FIRST_SOCIAL_LINK });
export const createNewSocialLink      = () => (d: Dispatch) => d({ type: T.CREATE_NEW_SOCIAL_LINK });
export const deleteSocialLink         = (id: number) => (d: Dispatch) => d({ type: T.DELETE_SOCIAL_LINK, data: id });
export const setSpecificSocialLink    = (id: number, data: object) => (d: Dispatch) => d({ type: T.UPDATE_SPECIFIC_OBJECT_SOCIAL_LINK, id, data });

export const createFirstReference    = () => (d: Dispatch) => d({ type: T.CREATE_FIRST_REFERENCE });
export const createNewReference      = () => (d: Dispatch) => d({ type: T.CREATE_NEW_REFERENCE });
export const deleteReference         = (id: number) => (d: Dispatch) => d({ type: T.DELETE_REFERENCE, data: id });
export const setSpecificReference    = (id: number, data: object) => (d: Dispatch) => d({ type: T.UPDATE_SPECIFIC_OBJECT_REFERENCE, id, data });

export const createFirstExtraCurricular    = () => (d: Dispatch) => d({ type: T.CREATE_FIRST_EXTRA_CURRICULAR_ACTIVITY });
export const createNewExtraCurricular      = () => (d: Dispatch) => d({ type: T.CREATE_NEW_EXTRA_CURRICULAR_ACTIVITY });
export const deleteExtraCurricular         = (id: number) => (d: Dispatch) => d({ type: T.DELETE_EXTRA_CURRICULAR_ACTIVITY, data: id });
export const setSpecificExtraCurricular    = (id: number, data: object) => (d: Dispatch) => d({ type: T.UPDATE_SPECIFIC_OBJECT_EXTRA_CURRICULAR_ACTIVITY, id, data });
