import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

export const updateSurveyByID = createAction("SurveyReducer/updateSurveyByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteSurveyByID = createAction("SurveyReducer/deleteSurveyByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createSurvey = createAction("SurveyReducer/createSurvey",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const sendSurveyNotification = createAction("SurveyReducer/sendSurveyNotification",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const getAllSurveyHistoryWithoutPagination = createAction("SurveyReducer/getAllSurveyHistoryWithoutPagination",
        (params:string,callBack: ActionMeta<undefined>["callBack"]) => {
            return {
                payload: {
                    params: params,
                    callBack: callBack
                }
            };
        });
