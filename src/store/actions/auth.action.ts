import { createAction } from "@reduxjs/toolkit";
import { updateRolsbyID } from "auth-action";
import { ActionMeta } from "../../../@types/store";

export const updateRoleByID = createAction("AuthReducer/updateRoleByID",
    (id: string, obj: updateRolsbyID, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteRoleByID = createAction("AuthReducer/deleteRoleByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
export const updatePermissionByID = createAction("AuthReducer/updatePermissionByID",
    (id: string, obj: updateRolsbyID, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deletePermissionByID = createAction("AuthReducer/deletePermissionByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createRole = createAction("AuthReducer/createRole",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const createUser = createAction("AuthReducer/createUser",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });
export const updateUserDetailByID = createAction("AuthReducer/updateUserDetailByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteUserDetailByID = createAction("AuthReducer/deleteUserDetailByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });


export const uploadAdminImage = createAction(
    "AuthReducer/uploadAdminImage",
    (file: File, isAdminUser: boolean, callBack: (response: any) => void) => ({
        payload: { file, isAdminUser },
        meta: { callBack }
    })
);
