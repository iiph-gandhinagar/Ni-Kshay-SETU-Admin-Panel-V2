import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

// Action to create an ntep intervention
export const createNtepIntervention = createAction("ntep/createNtepIntervention",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

// Action to edit an ntep intervention by ID
export const editNtepInterventionByID = createAction("ntep/editNtepInterventionByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

// Action to delete an ntep intervention by ID
export const deleteNtepInterventionByID = createAction("ntep/deleteNtepInterventionByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

// Action to upload a resource file for ntep interventions
export const uploadNtepResourceFile = createAction(
    "ntep/uploadNtepResourceFile",
    (file: File[], typeOfIntervention: string, isIntervention: boolean, callBack: (response: any) => void) => ({
        payload: { file, isIntervention, typeOfIntervention },
        meta: { callBack }
    })
);
