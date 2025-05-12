import { createSlice } from "@reduxjs/toolkit";
import { leaderboardReducerProps } from "../../../@types/store/reducer/leaderboard.reducer";

const initialState: leaderboardReducerProps = {
    loader: false,
    leaderboardLevelList: undefined,
    leaderboardLevelById: undefined,
    leaderboardBadgeList: undefined,
    leaderboardBadgeById: undefined,
    leaderboardTaskList: undefined,
    leaderboardTaskById: undefined,
    leaderboardSubscriberRank: undefined
};
const leaderboard = createSlice({
    name: "leaderboard",
    initialState: initialState,
    reducers: {
        getAllLeaderboardLevelList(state, { payload }) {
            state.loader = true;
        },
        getAllLeaderboardLevelListSuccess(state, { payload }) {
            state.loader = false;
            state.leaderboardLevelList = payload;
        },
        cleanLeaderboardLevelList(state) {
            state.leaderboardLevelList = undefined;
        },
        getLeaderboardLevelById(state, { payload }) {
            state.loader = true;
        },
        getLeaderboardLevelByIdSuccess(state, { payload }) {
            state.loader = false;
            state.leaderboardLevelById = payload;
        },
        cleanLeaderboardLevelById(state) {
            state.leaderboardLevelById = undefined;
        },
        updateLeaderboardLevelByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        createLeaderboardLevelByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteLeaderboardLevelByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllLeaderboardBadgeList(state, { payload }) {
            state.loader = true;
        },
        getAllLeaderboardBadgeListSuccess(state, { payload }) {
            state.loader = false;
            state.leaderboardBadgeList = payload;
        },
        cleanLeaderboardBadgeList(state) {
            state.leaderboardBadgeList = undefined;
        },
        getLeaderboardBadgeById(state, { payload }) {
            state.loader = true;
        },
        getLeaderboardBadgeByIdSuccess(state, { payload }) {
            state.loader = false;
            state.leaderboardBadgeById = payload;
        },
        cleanLeaderboardBadgeById(state) {
            state.leaderboardBadgeById = undefined;
        },
        updateLeaderboardBadgeByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        createLeaderboardBadgeByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteLeaderboardBadgeByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllLeaderboardTaskList(state, { payload }) {
            state.loader = true;
        },
        getAllLeaderboardTaskListSuccess(state, { payload }) {
            state.loader = false;
            state.leaderboardTaskList = payload;
        },
        cleanLeaderboardTaskList(state) {
            state.leaderboardTaskList = undefined;
        },
        getLeaderboardTaskById(state, { payload }) {
            state.loader = true;
        },
        getLeaderboardTaskByIdSuccess(state, { payload }) {
            state.loader = false;
            state.leaderboardTaskById = payload;
        },
        cleanLeaderboardTaskById(state) {
            state.leaderboardTaskById = undefined;
        },
        updateLeaderboardTaskByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        createLeaderboardTaskByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteLeaderboardTaskByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllLeaderboardSubscriberRank(state, { payload }) {
            state.loader = true;
        },
        getAllLeaderboardSubscriberRankSuccess(state, { payload }) {
            state.loader = false;
            state.leaderboardSubscriberRank = payload;
        },
        cleanLeaderboardSubscriberRank(state) {
            state.leaderboardSubscriberRank = undefined;
        }
    }
});
export const { getAllLeaderboardLevelList, getAllLeaderboardLevelListSuccess, cleanLeaderboardLevelById, cleanLeaderboardLevelList, createLeaderboardLevelByIDSuccess, updateLeaderboardLevelByIDSuccess, getLeaderboardLevelById, deleteLeaderboardLevelByIDSuccess, getLeaderboardLevelByIdSuccess, getAllLeaderboardBadgeList, getAllLeaderboardBadgeListSuccess, getLeaderboardBadgeById, getLeaderboardBadgeByIdSuccess, cleanLeaderboardBadgeById, cleanLeaderboardBadgeList, createLeaderboardBadgeByIDSuccess, updateLeaderboardBadgeByIDSuccess, deleteLeaderboardBadgeByIDSuccess,
    getAllLeaderboardTaskList, getAllLeaderboardTaskListSuccess, getLeaderboardTaskById, getLeaderboardTaskByIdSuccess, cleanLeaderboardTaskList, cleanLeaderboardTaskById, createLeaderboardTaskByIDSuccess, updateLeaderboardTaskByIDSuccess, deleteLeaderboardTaskByIDSuccess, getAllLeaderboardSubscriberRank, getAllLeaderboardSubscriberRankSuccess, cleanLeaderboardSubscriberRank } = leaderboard.actions;

export default leaderboard.reducer;
