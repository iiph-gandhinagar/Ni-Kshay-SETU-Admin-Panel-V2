import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

export const updateTourByID = createAction("tourReducer/updateTourByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteTourByID = createAction("tourReducer/deleteTourByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createTour = createAction("tourReducer/createTour",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const uploadTourImage = createAction(
    "masterTable/uploadTourImage",
    (file: File, isTour: boolean, callBack: (response: any) => void) => ({
        payload: { file, isTour },
        meta: { callBack }
    })
);
