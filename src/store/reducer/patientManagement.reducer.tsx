import { createSlice } from "@reduxjs/toolkit";
import { patientManagementProp } from "patient-management-reducer";
const initialState: patientManagementProp = {
    loader: false,
    displayMasterNodes: undefined,
    descendantsNodesBtId: undefined,
    NodeById: undefined,
};
const patientManagement = createSlice({
    name: "patientManagement",
    initialState: initialState,
    reducers: {
        getDisplayMasterNodes(state, { payload }) {
            state.loader = true;
        },
        getDisplayMasterNodesSuccess(state, { payload }) {
            state.loader = false;
            state.displayMasterNodes = payload;
        },
        clearDisplayMasterNodes(state) {
            state.loader = false;
            state.displayMasterNodes = undefined;
        },
        getDescendantsNodeByID(state, { payload }) {
            state.loader = true;
        },
        getDescendantsNodeByIDSuccess(state, { payload }) {
            state.loader = false;
            state.descendantsNodesBtId = payload;
        },
        clearDescendantsNodeByID(state) {
            state.loader = false;
            state.descendantsNodesBtId = undefined;
        },
        addNode(state) {
            state.loader = true;
        },
        addNodeSuccess(state) {
            state.loader = false;
        },
        getNodeById(state, { payload }) {
            state.NodeById = undefined;
        },
        getNodeByIdSuccess(state, { payload }) {
            state.loader = false;
            state.NodeById = payload;
        },
        clearNodeById(state) {
            state.loader = false;
            state.NodeById = undefined;
        },
        editNodeById(state) {
            state.loader = true;
        },
        editNodeByIdSuccess(state) {
            state.loader = false;
        },
    }
});
export const { getDisplayMasterNodes, getDisplayMasterNodesSuccess, clearDisplayMasterNodes,
    clearDescendantsNodeByID, getDescendantsNodeByID, getDescendantsNodeByIDSuccess,
    addNodeSuccess, getNodeById, getNodeByIdSuccess, clearNodeById,
    editNodeByIdSuccess
} = patientManagement.actions;

export default patientManagement.reducer;
