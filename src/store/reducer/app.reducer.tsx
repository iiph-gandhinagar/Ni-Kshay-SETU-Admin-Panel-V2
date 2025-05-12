import { createSlice } from "@reduxjs/toolkit";
import { appReducerProps } from "app-reducer";

const initialState: appReducerProps = {
    loader: false,
    translationLang: undefined
};

const AppReducer = createSlice({
    name: "AppReducer",
    initialState: initialState,
    reducers: {
        setTranslationsLang(state, { payload }) {
            state.translationLang = payload;
        },

    }
});
export const { setTranslationsLang } = AppReducer.actions;

export default AppReducer.reducer;
