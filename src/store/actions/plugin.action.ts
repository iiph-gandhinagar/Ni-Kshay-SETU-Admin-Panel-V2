import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

export const updateMasterinstituteById = createAction("plugin/updateMasterinstituteById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteMasterinstituteById = createAction("plugin/deleteMasterinstituteById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createMasterInstitute = createAction("plugin/createMasterInstitute",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateChildInstituteById = createAction("plugin/updateChildInstituteById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const createChildInstitute = createAction("plugin/createChildInstitute",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteChildInstitute = createAction("plugin/deleteChildInstitute",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createManageTb = createAction("plugin/createManageTb",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const createInstituteMember = createAction("plugin/createInstituteMember",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });


export const deleteInstituteMemberById = createAction("plugin/deleteInstituteMemberById",
    (obj: object, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const transferOwnership = createAction("plugin/TransferOwnership",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const transferQuery = createAction("plugin/transferQuery",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });
export const updateQuestion = createAction("plugin/updateQuestion",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const createQuestion = createAction("plugin/createQuestion",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteQuestion = createAction("plugin/deleteQuestion",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
export const updateAssessment = createAction("plugin/updateAssessment",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const createAssessment = createAction("plugin/createAssessment",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteAssessment = createAction("plugin/deleteAssessment",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const copyAssessment = createAction("plugin/copyAssessment",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const setActiveAssessment = createAction("plugin/setActiveAssessment",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });


export const getQuestionsWithoutPagination = createAction("plugin/getQuestionsWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack
            }
        };
    });

export const getQuestionsWithoutPaginationReport = createAction("plugin/getQuestionsWithoutPaginationReport",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack
            }
        };
    });

export const getInstituteReport = createAction("plugin/getInstituteReport",
    (id: any, typeOfQuery: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                typeOfQuery: typeOfQuery,
                callBack: callBack
            }
        };
    });

export const sendAssessmentNotification = createAction("plugin/sendAssessmentNotification",
    (id: string, callBack: any) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
export const getKbasereportcsv = createAction("plugin/getKbasereportcsv",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack
            }
        };
    });
export const getKbaseCoursereportCsv = createAction("plugin/getKbaseCoursereportCsv",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack
            }
        };
    });
