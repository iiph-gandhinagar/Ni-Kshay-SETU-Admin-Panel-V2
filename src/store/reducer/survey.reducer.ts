import { createSlice } from "@reduxjs/toolkit";
import { surveyReducerProps } from "survey";

const initalState: surveyReducerProps = {
    surveyDetails: undefined,
    surveyById: undefined,
    surveyHistoryList:undefined,
    loader: false,
};
const surveyReducer = createSlice({
    name: "survey",
    initialState: initalState,
    reducers: {
        fetchSurveyStart(state, { payload }) {
            state.loader = true;
        },
        fetchSurveySuccess(state, { payload }) {
            state.loader = false;
            state.surveyDetails = payload;
        },
        deleteSurveyByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        getSurveyById(state, { payload }) {
            state.loader = true;
        },
        getSurveyByIdSuccess(state, { payload }) {
            state.loader = false;
            state.surveyById = payload;
        },
        cleanSurveyDetails(state) {
            state.surveyDetails = undefined;
        },
        cleanSurveyById(state) {
            state.surveyById = undefined;
        },
        updateSurveyByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        createSurveySuccess(state, { payload }) {
            state.loader = false;
        },
        getAllSurveyHistory(state,{payload}){
            state.loader = true;
        },
        getAllSurveyHistorySuccess(state,{payload}){
            state.loader = false;
             state.surveyHistoryList = payload;
        },
        cleanSurveyHistoryList(state){
            state.surveyHistoryList = undefined;
        }
    }
});
export const { fetchSurveyStart, fetchSurveySuccess, deleteSurveyByIdSuccess, getSurveyById, getSurveyByIdSuccess, cleanSurveyById, cleanSurveyDetails,updateSurveyByIdSuccess,createSurveySuccess,getAllSurveyHistory,getAllSurveyHistorySuccess,cleanSurveyHistoryList } = surveyReducer.actions;
export default surveyReducer.reducer;
