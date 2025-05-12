import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    loader: false,
    feedbackList: undefined,
    feedbackById: undefined,
    feedbackHistoryList: undefined,
};

const feedbackReducer = createSlice({
    name: "feedbackReducer",
    initialState: initialState,
    reducers: {
        getAllFeedbackList(state, { payload }) {
            state.loader = true;
        },
        getAllFeedbackListSuccess(state, { payload }) {
            state.loader = false;
            state.feedbackList = payload;
        },
        cleanFeedbackList(state) {
            state.feedbackList = undefined;
        },
        getFeedbackById(state, { payload }) {
            state.loader = true;
        },
        getFeedbackByIdSuccess(state, { payload }) {
            state.loader = false;
            state.feedbackById = payload;
        },
        cleanFeedbackById(state) {
            state.feedbackById = undefined;
        },
        getAllFeedbackHistoryList(state, { payload }) {
            state.loader = true;
        },
        getAllFeedbackHistoryListSuccess(state, { payload }) {
            state.loader = false;
            state.feedbackHistoryList = payload;
        },
        cleanFeedbackHistoryList(state) {
            state.feedbackHistoryList = undefined;
        },
        createFeedbackSuccess(state, { payload }) {
            state.loader = false;
        },
        updateFeedbackByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteFeedbackByIDSuccess(state, { payload }) {
            state.loader = false;
        }
    }
}
);

export const { getAllFeedbackHistoryList, getAllFeedbackList, cleanFeedbackList, getFeedbackById, cleanFeedbackById, getAllFeedbackHistoryListSuccess, getAllFeedbackListSuccess, getFeedbackByIdSuccess, cleanFeedbackHistoryList, createFeedbackSuccess, updateFeedbackByIDSuccess, deleteFeedbackByIDSuccess } = feedbackReducer.actions;

export default feedbackReducer?.reducer;
