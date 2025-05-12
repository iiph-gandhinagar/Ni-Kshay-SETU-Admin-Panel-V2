import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";
import { ResultReportAssessment, ResultReportQuestion } from "../../../@types/store/reducer/plugin.reducer";

export const updateState = createAction("masterTable/updateState",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const updateCader = createAction("masterTable/updateCader",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const updateDistrict = createAction("masterTable/updateDistrict",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateCountry = createAction("masterTable/updateCountry",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateBlock = createAction("masterTable/updateBlock",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const updateHealthFacility = createAction("masterTable/updateHealthFacility",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const updatePrimaryCader = createAction("masterTable/updatePrimaryCader",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateSymptom = createAction("masterTable/updateSymptom",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const createSymptom = createAction("masterTable/createSymptom",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });


export const deleteSymptomById = createAction("masterTable/deleteSymptom",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const deleteCadere = createAction("masterTable/deleteCadere",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const deletePrimaryCadere = createAction("masterTable/deletePrimaryCadere",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const deleteCountry = createAction("masterTable/deleteCountry",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });


export const deleteState = createAction("masterTable/deleteState",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });


export const deleteDistrict = createAction("masterTable/deleteDistrict",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const deleteBlock = createAction("masterTable/deleteBlock",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });


export const deleteHealthFacility = createAction("masterTable/deleteHealthFacility",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const updateAssessmentCertificate = createAction("masterTable/updateAssessmentCertificate",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const createAssessmentCertificate = createAction("masterTable/createAssessmentCertificate",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });


export const deleteAssessmentCertificateById = createAction("masterTable/deleteAssessmentCertificate",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const uploadImage = createAction(
    "masterTable/uploadImage",
    (file: File, isCertificate: boolean, callBack: (response: any) => void) => ({
        payload: { file, isCertificate },
        meta: { callBack }
    })
);

export const getAssessmentQuestionReport = createAction("masterTable/getAssessmentQuestionReport",
    (id: string, callBack?: ActionMeta<{
        message: string,
        code: number,
        status: boolean,
        data?: ResultReportQuestion,
    }>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const getAssessmentResultReport = createAction("masterTable/getAssessmentResultReport",
    (id: string, callBack: ActionMeta<{
        message: string,
        code: number,
        status: boolean,
        data?: ResultReportAssessment[],
    }>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
export const createPluginManagement = createAction("masterTable/createPluginManagement",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });


export const updatePluginManagement = createAction("masterTable/updatePluginManagement",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deletePluginManagement = createAction("masterTable/deletePluginManagement",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
