import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

export const updateLeaderboardLevelByID = createAction("leaderboard/updateLeaderboardLevelByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteLeaderboardLevelByID = createAction("leaderboard/deleteLeaderboardLevelByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createLeaderboardLevelByID = createAction("leaderboard/createLeaderboardLevelFlag",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateLeaderboardBadgeByID = createAction("leaderboard/updateLeaderboardBadgeByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteLeaderboardBadgeByID = createAction("leaderboard/deleteLeaderboardBadgeByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createLeaderboardBadgeByID = createAction("leaderboard/createLeaderboardBadgeFlag",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });
export const updateLeaderboardTaskByID = createAction("leaderboard/updateLeaderboardTaskByID",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });
export const deleteLeaderboardTaskByID = createAction("leaderboard/deleteLeaderboardTaskByID",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const createLeaderboardTaskByID = createAction("leaderboard/createLeaderboardTaskFlag",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });
export const getAllLeaderboardSubscriberRankWithoutPagination = createAction("leaderboard/getAllLeaderboardSubscriberRankWithoutPagination",
    (params: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                params: params,
                callBack: callBack
            }
        };
    });
