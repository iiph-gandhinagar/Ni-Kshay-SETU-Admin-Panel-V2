import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

export const updateRootDynamicAlgo = createAction("dynmicAlgo/updateRootDynmicAlgo",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteRootDynamicAlgoByID = createAction("dynmicAlgo/deleteRootDynmicAlgo",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createRootDynamicAlgo = createAction("dynmicAlgo/createRootDynmicAlgo",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const uploadDynamicAlgoImage = createAction(
    "dynmicAlgo/uploadRootDynmicAlgoImage",
    (file: File, isDynamicAlgo: boolean, callBack: (response: any) => void) => ({
        payload: { file, isDynamicAlgo },
        meta: { callBack }
    })
);

export const createDynamicAlgo = createAction("dynmicAlgo/createDynamicAlgo",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const editDynamicAlgoByID = createAction("dynmicAlgo/editDynamicAlgoByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteDynamicAlgoByID = createAction("dynmicAlgo/deleteDynamicAlgoByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const sendDynamicAlgoNotification = createAction("dynmicAlgo/sendDynamicAlgoNotification",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
