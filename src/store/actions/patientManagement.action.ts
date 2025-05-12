import { createAction } from "@reduxjs/toolkit";
import { AlgorithmsFormProps } from "formTypes";
import { ActionMeta } from "../../../@types/store";

export const addNode = createAction("patientManagement/addNode",
    (slug: string | undefined, obj: AlgorithmsFormProps, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                slug: slug,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const editNodeById = createAction("patientManagement/editNodeById",
    (slug: string | undefined, id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                slug: slug,
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteNodeById = createAction("patientManagement/deleteNodeById",
    (slug: string | undefined, id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                slug: slug,
                id: id,
                callBack: callBack
            }
        };
    });

export const uploadAlgoIcon = createAction(
    "patientManagement/uploadAlgoIcon",
    (file: File, slug: string, callBack: (response: any) => void) => ({
        payload: { file, slug },
        meta: { callBack },
    })
);

export const sendAlgoNotification = createAction("patientManagement/sendAlgoNotification",
    (slug: string | undefined, id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                slug: slug,
                id: id,
                callBack: callBack
            }
        };
    });
