import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

export const updateConfigByID = createAction("configReducer/updateConfigByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteConfigByID = createAction("configReducer/DdeleteConfigByI",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const updateAppManagmentByID = createAction("configReducer/updateAppManagmentByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteAppManagmentByID = createAction("configReducer/deleteAppManagmentByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createAppManagmentFlag = createAction("configReducer/createAppManagmentFlag",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });
export const updateMasterCmsByID = createAction("configReducer/updateMasterCmsByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteMasterCmsByID = createAction("configReducer/deleteMasterCmsByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createMasterCms = createAction("configReducer/createMasterCmsFlag",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });


export const createUserNotification = createAction("configReducer/createUserNotification",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });
export const createMessageNotification = createAction("configReducer/createMessageNotification",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const getUserNotificationInfo = createAction("configReducer/getUserNotificationInfo",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
