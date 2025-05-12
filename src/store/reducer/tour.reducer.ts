import { createSlice } from "@reduxjs/toolkit";
import { tourReducerProps } from "tour";

const initalState: tourReducerProps = {
    tourDetails: undefined,
    tourById : undefined,
    loader: false,
};

const tourReducer = createSlice({
    name: "tour",
    initialState: initalState,
    reducers: {
        fetchTourStart(state, { payload }) {
            state.loader = true;
        },
        fetchTourSuccess(state, { payload }) {
            state.loader = false;
            state.tourDetails = payload;
        },
        cleanAllTour(state) {
            state.tourDetails = undefined;
        },
        getTourById(state , { payload }) {
            state.loader = true;
        },
        getTourByIdSuccess(state, { payload }) {
            state.loader = false;
            state.tourById = payload;
        },
        cleanTourById(state) {
            state.tourById = undefined;
        },
        deleteTourByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        updateTourByIdSuccess(state, { payload }) {
            state.loader = false;
        }
    }
});

export const { fetchTourStart, fetchTourSuccess,getTourById,cleanAllTour,getTourByIdSuccess,cleanTourById,deleteTourByIdSuccess ,updateTourByIdSuccess} = tourReducer.actions;

export default tourReducer.reducer;
