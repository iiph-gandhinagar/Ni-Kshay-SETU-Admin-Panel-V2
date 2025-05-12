import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

// Action to create feedback
export const createFeedback = createAction(
    "feedback/createFeedback",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    }
);

// Action to update feedback by ID
export const updateFeedbackByID = createAction(
    "feedback/updateFeedbackByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    }
);

// Action to delete feedback by ID
export const deleteFeedbackByID = createAction(
    "feedback/deleteFeedbackByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    }
);

// Action to upload feedback images
export const uploadFeedbackImage = createAction(
    "feedback/uploadFeedbackImage",
    (file: File, isFeedback: boolean, callBack: (response: any) => void) => ({
        payload: { file, isFeedback },
        meta: { callBack }
    })
);

export const getAllFeedbackHistoryWithoutPagination = createAction("feedback/getAllFeedbackHistoryWithoutPagination",
    (params: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack
            }
        };
    });
