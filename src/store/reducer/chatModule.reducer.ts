import { createSlice } from "@reduxjs/toolkit";
import { chatModuleReducerProps } from "chatModule-reducer";
const initialState: chatModuleReducerProps = {
    loader: false,
    abbreviationDetails: undefined,
    abbreviationById: undefined,
    systemQuestionDetails: undefined,
    systemQuestionById: undefined,
};
const chatModule = createSlice({
    name: "chatModule",
    initialState: initialState,
    reducers: {
        getAllAbbreviations(state, { payload }) {
            state.loader = true;
        },
        getAllAbbreviationsSuccess(state, { payload }) {
            state.loader = false;
            state.abbreviationDetails = payload;
        },
        cleanAllAbbreviations(state) {
            state.abbreviationDetails = undefined;
        },
        getAbbreviationByID(state, { payload }) {
            state.loader = true;
        },
        getAbbreviationByIDSuccess(state, { payload }) {
            state.loader = false;
            state.abbreviationById = payload;
        },
        cleanAbbreviationByID(state) {
            state.abbreviationById = undefined;
        },
        createAbbreviationSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteAbbreviationByID(state, { payload }) {
            state.loader = true;
        },
        deleteAbbreviationByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        updateAbbreviationByID(state, { payload }) {
            state.loader = true;
        },
        updateAbbreviationByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllSystemQuestions(state, { payload }) {
            state.loader = true;
        },
        getAllSystemQuestionsSuccess(state, { payload }) {
            state.loader = false;
            state.systemQuestionDetails = payload;
        },
        cleanAllSystemQuestions(state) {
            state.systemQuestionDetails = undefined;
        },
        getSystemQuestionByID(state, { payload }) {
            state.loader = true;
        },
        getSystemQuestionByIDSuccess(state, { payload }) {
            state.loader = false;
            state.systemQuestionById = payload;
        },
        cleanSystemQuestionByID(state) {
            state.systemQuestionById = undefined;
        },
        createSystemQuestion(state, { payload }) {
            state.loader = true;
        },
        createSystemQuestionSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteSystemQuestionByID(state, { payload }) {
            state.loader = true;
        },
        deleteSystemQuestionByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        updateSystemQuestionByID(state, { payload }) {
            state.loader = true;
        },
        updateSystemQuestionByIDSuccess(state, { payload }) {
            state.loader = false;
        }

    }
});
export const { getAllAbbreviations, getAllAbbreviationsSuccess, cleanAllAbbreviations, getAbbreviationByID, getAbbreviationByIDSuccess, createAbbreviationSuccess, updateAbbreviationByID, updateAbbreviationByIDSuccess, deleteAbbreviationByIDSuccess,
    getAllSystemQuestions, getAllSystemQuestionsSuccess, cleanAllSystemQuestions, getSystemQuestionByID, getSystemQuestionByIDSuccess, createSystemQuestion, createSystemQuestionSuccess,
    updateSystemQuestionByIDSuccess, deleteSystemQuestionByIDSuccess, cleanAbbreviationByID, cleanSystemQuestionByID
} = chatModule.actions;

export default chatModule.reducer;
