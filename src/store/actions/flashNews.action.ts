import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

export const updateFlashSimilarAppByID = createAction("flashNews/updateFlashSimilarAppByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteFlashSimilarAppByID = createAction("flashNews/deleteFlashSimilarAppByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createFlashSimilarAppByID = createAction("flashNews/createFlashSimilarAppFlag",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateFlashNews = createAction("flashNews/updateFlashNews",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteFlashNewsByID = createAction("flashNews/deleteFlashNews",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createFlashNews = createAction("flashNews/createFlashNews",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const uploadFlashSimilarImage = createAction(
    "flashNews/uploadFlashNewsImage",
    (file: File, isFlashSimilarApp: boolean, callBack: (response: any) => void) => ({
        payload: { file, isFlashSimilarApp },
        meta: { callBack }
    })
);
