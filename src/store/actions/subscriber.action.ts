import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

export const createSubscriber = createAction("reports/createSubscriber",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const sendOtp = createAction("reports/sendOtp",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
