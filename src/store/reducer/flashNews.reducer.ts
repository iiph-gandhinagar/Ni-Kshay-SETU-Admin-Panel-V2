import { createSlice } from "@reduxjs/toolkit";
import { flashNewsProps } from "flash-news";

const initialState: flashNewsProps = {
    loader: false,
    flashNewsList: undefined,
    flashNewsById: undefined,
    flashSimilarAppList: undefined,
    flashSimilarAppById: undefined,
};

const flashNewsReducer = createSlice({
    name: "flashNewsReducer",
    initialState: initialState,
    reducers: {
        getAllFlashNewsList(state, { payload }) {
            state.loader = true;
        },
        getAllFlashNewsListSuccess(state, { payload }) {
            state.loader = false;
            state.flashNewsList = payload;
        },
        cleanFlashNewsList(state) {
            state.flashNewsList = undefined;
        },
        getFlashNewsById(state, { payload }) {
            state.loader = true;
        },
        getFlashNewsByIdSuccess(state, { payload }) {
            state.loader = false;
            state.flashNewsById = payload;
        },
        cleanFlashNewsById(state) {
            state.flashNewsById = undefined;
        },
        getAllFlashSimilarAppList(state, { payload }) {
            state.loader = true;
        },
        getAllFlashSimilarAppListSuccess(state, { payload }) {
            state.loader = false;
            state.flashSimilarAppList = payload;
        },
        cleanFlashSimilarAppList(state) {
            state.flashSimilarAppList = undefined;
        },
        getFlashSimilarAppById(state, { payload }) {
            state.loader = true;
        },
        getFlashSimilarAppByIdSuccess(state, { payload }) {
            state.loader = false;
            state.flashSimilarAppById = payload;
        },
        cleanFlashSimilarAppById(state) {
            state.flashSimilarAppById = undefined;
        },
        updateFlashSimilarAppByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        createFlashSimilarAppByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteFlashSimilarAppByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        createFlashNewsSuccess(state, { payload }) {
            state.loader = false;
        },
        updateFlashNewsSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteFlashNewsByIdSuccess(state, { payload }) {
            state.loader = false;
        }

    }
});
export const { getAllFlashNewsList, getAllFlashNewsListSuccess, getFlashNewsById, getFlashNewsByIdSuccess, cleanFlashNewsById, cleanFlashNewsList, getAllFlashSimilarAppList, getAllFlashSimilarAppListSuccess, getFlashSimilarAppById, getFlashSimilarAppByIdSuccess, cleanFlashSimilarAppById, cleanFlashSimilarAppList, createFlashSimilarAppByIDSuccess, updateFlashSimilarAppByIDSuccess, deleteFlashSimilarAppByIDSuccess, updateFlashNewsSuccess, deleteFlashNewsByIdSuccess, createFlashNewsSuccess } = flashNewsReducer.actions;

export default flashNewsReducer.reducer;
