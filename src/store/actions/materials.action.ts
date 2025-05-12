import { createAction } from "@reduxjs/toolkit";
import { AlgorithmsFormProps } from "formTypes";
import { ActionMeta } from "../../../@types/store";

export const createMaterial = createAction("materialsReducer/createMaterial",
    (obj: AlgorithmsFormProps, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });
export const editMaterialByID = createAction("materialsReducer/editMaterialByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteMaterialByID = createAction("materialsReducer/deleteMaterialByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
export const uploadResourceFile = createAction(
    "materialsReducer/uploadResourceFile",
    (file: File[], typeOfMaterial: string, isMaterial: boolean, callBack: (response: any) => void) => ({
        payload: { file, isMaterial, typeOfMaterial },
        meta: { callBack }
    })
);

export const sendResourceMaterialNotification = createAction("materialsReducer/sendResourceMaterialNotification",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
