import { createSlice } from "@reduxjs/toolkit";
import { materialsReducerProps } from "materials-Props";
const initialState: materialsReducerProps = {
    loader: false,
    allRootMaterial: [],
    descendantsMaterial: undefined,
    materialByID: undefined
};
const materials = createSlice({
    name: "materialsReducer",
    initialState: initialState,
    reducers: {
        getAllRootMaterial(state) {
            state.loader = true;
        },
        getAllRootMaterialSuccess(state, { payload }) {
            state.loader = false;
            state.allRootMaterial = payload;
        },
        clearAllRootMaterial(state) {
            state.allRootMaterial = [];
        },
        getDescendantsMaterialByID(state, { payload }) {
            state.loader = true;
        },
        getDescendantsMaterialByIDSuccess(state, { payload }) {
            state.loader = false;
            state.descendantsMaterial = payload;
        },
        clearDescendantsMaterialByID(state) {
            state.descendantsMaterial = undefined;
        },
        getMaterialByID(state, { payload }) {
            state.loader = true;
        },
        getMaterialByIDSuccess(state, { payload }) {
            state.loader = false;
            state.materialByID = payload;
        },
        clearMaterialByID(state) {
            state.materialByID = undefined;
        },
        editMaterialByID(state, { payload }) {
            state.loader = true;
        },
        editMaterialByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteMaterialByID(state, { payload }) {
            state.loader = true;
        },
        deleteMaterialByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        createMaterial(state, { payload }) {
            state.loader = true;
        },
        createMaterialSuccess(state, { payload }) {
            state.loader = false;
        },
    }
});
export const {
    getAllRootMaterial, getAllRootMaterialSuccess, clearAllRootMaterial, clearDescendantsMaterialByID, getDescendantsMaterialByID, getDescendantsMaterialByIDSuccess,
    clearMaterialByID, getMaterialByID, getMaterialByIDSuccess, createMaterialSuccess, deleteMaterialByIDSuccess, editMaterialByIDSuccess

} = materials.actions;

export default materials.reducer;
