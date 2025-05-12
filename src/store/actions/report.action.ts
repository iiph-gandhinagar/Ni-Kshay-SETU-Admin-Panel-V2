import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";


export const logActivity = createAction("reports/logActivity",
    (obj: any) => {
        return {
            payload: {
                obj: obj,
            }
        };
    });

export const getAllAdminActivityWithoutPagination = createAction("reports/getAllAdminActivityWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });

export const getAllSubscriberActivityWithoutPagination = createAction("reports/getAllSubscriberActivityWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });

export const getAllInquiriesWithoutPagination = createAction("reports/getAllInquiriesWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });

export const getAllUserAppVersionWithoutPagination = createAction("reports/getAllUserAppVersionWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });


export const getAllUserAssessmentsWithoutPagination = createAction("reports/getAllUserAssessmentsWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });

export const getAllOldAssessmentsWithoutPagination = createAction("reports/getAllOldAssessmentsWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });

export const getAllProAssessmentsWithoutPagination = createAction("reports/getAllProAssessmentsWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });

export const getAllSubscribersWithoutPagination = createAction("reports/getAllSubscribersWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });

export const getAllChatbotActivityWithoutPagination = createAction("reports/getAllChatbotActivityWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });

export const updateSubscriberById = createAction("reports/updateSubscriberById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack,
            }
        };
    });

export const getAllprescriptionWithoutPagination = createAction("reports/getAllprescriptionWithoutPagination",
    (params: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack,
            }
        };
    });

export const getSubscriberLeaderboardInfo = createAction("reports/getSubscriberLeaderboardInfo",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack,
            }
        };
    });
