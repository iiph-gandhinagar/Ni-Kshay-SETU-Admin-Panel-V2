import { createSlice } from "@reduxjs/toolkit";
import { descendantsNodesBtIdProps, diagnosisNodesDetails } from "patient-management-reducer";


interface RootDynamicAlgoByIdProps {
    _id: string;
    title: {
        en: string;
        [key: string]: string;
    };
    icon?: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface RootDynamicAlgoListProps {
    list: RootDynamicAlgoByIdProps[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface dynamicAlgoReducerProps {
    loader: boolean;
    RootDynamicAlgoList?: RootDynamicAlgoListProps;
    RootDynamicAlgoById?: RootDynamicAlgoByIdProps;
    allRootDynamicAlgo?: Array<diagnosisNodesDetails>;
    descendantsDynamicAlgo?: descendantsNodesBtIdProps;
    dynamicAlgoByID?: diagnosisNodesDetails;
}

const initialState: dynamicAlgoReducerProps = {
    loader: false,
    RootDynamicAlgoList: undefined,
    RootDynamicAlgoById: undefined,
    allRootDynamicAlgo: undefined,
    descendantsDynamicAlgo: undefined,
    dynamicAlgoByID: undefined,
};

const dynamicAlgoReducer = createSlice({
    name: "dynamicAlgoReducer",
    initialState: initialState,
    reducers: {
        getAllRootDynamicAlgoList(state, { payload }) {
            state.loader = true;
        },
        getAllRootDynamicAlgoListSuccess(state, { payload }) {
            state.loader = false;
            state.RootDynamicAlgoList = payload;
        },
        cleanRootDynamicAlgoList(state) {
            state.RootDynamicAlgoList = undefined;
        },
        getRootDynamicAlgoById(state, { payload }) {
            state.loader = true;
        },
        getRootDynamicAlgoByIdSuccess(state, { payload }) {
            state.loader = false;
            state.RootDynamicAlgoById = payload;
        },
        cleanRootDynamicAlgoById(state) {
            state.RootDynamicAlgoById = undefined;
        },
        createRootDynamicAlgoSuccess(state, { payload }) {
            state.loader = false;
        },
        updateRootDynamicAlgoSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteRootDynamicAlgoByIdSuccess(state, { payload }) {
            state.loader = false;
        },

        getAllRootDynamicAlgo(state, { payload }) {
            state.loader = true;
        },
        getAllRootDynamicAlgoSuccess(state, { payload }) {
            state.loader = false;
            state.allRootDynamicAlgo = payload;
        },
        clearAllRootDynamicAlgo(state) {
            state.allRootDynamicAlgo = undefined;
        },
        getDescendantsDynamicAlgoByID(state, { payload }) {
            state.loader = true;
        },
        getDescendantsDynamicAlgoByIDSuccess(state, { payload }) {
            state.loader = false;
            state.descendantsDynamicAlgo = payload;
        },
        clearDescendantsDynamicAlgoByID(state) {
            state.descendantsDynamicAlgo = undefined;
        },
        getDynamicAlgoByID(state, { payload }) {
            state.loader = true;
        },
        getDynamicAlgoByIDSuccess(state, { payload }) {
            state.loader = false;
            state.dynamicAlgoByID = payload;
        },
        clearDynamicAlgoByID(state) {
            state.dynamicAlgoByID = undefined;
        },
        editDynamicAlgoByID(state, { payload }) {
            state.loader = true;
        },
        editDynamicAlgoByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteDynamicAlgoByID(state, { payload }) {
            state.loader = true;
        },
        deleteDynamicAlgoByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        createDynamicAlgo(state, { payload }) {
            state.loader = true;
        },
        createDynamicAlgoSuccess(state, { payload }) {
            state.loader = false;
        },

    }
});
export const { getAllRootDynamicAlgoList, getAllRootDynamicAlgoListSuccess, cleanRootDynamicAlgoById, cleanRootDynamicAlgoList, createRootDynamicAlgoSuccess, deleteRootDynamicAlgoByIdSuccess, getRootDynamicAlgoById, getRootDynamicAlgoByIdSuccess, updateRootDynamicAlgoSuccess, clearAllRootDynamicAlgo, clearDescendantsDynamicAlgoByID, clearDynamicAlgoByID, createDynamicAlgo, createDynamicAlgoSuccess, deleteDynamicAlgoByID, deleteDynamicAlgoByIDSuccess, editDynamicAlgoByID, editDynamicAlgoByIDSuccess, getAllRootDynamicAlgo, getAllRootDynamicAlgoSuccess, getDescendantsDynamicAlgoByID, getDescendantsDynamicAlgoByIDSuccess, getDynamicAlgoByID, getDynamicAlgoByIDSuccess } = dynamicAlgoReducer.actions;

export default dynamicAlgoReducer.reducer;
