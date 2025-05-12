import { createSlice } from "@reduxjs/toolkit";
import { subscriberReducerProps } from "../../../@types/store/reducer/subscriber.reducer";
const initialState: subscriberReducerProps = {
    loader: false,
    SubscriberDetails: undefined
};
const subscriber = createSlice({
    name: "subscriber",
    initialState: initialState,
    reducers: {
        getAllSubscriber(state, { payload }) {
            state.loader = true;
        },
        getAllSubscriberSuccess(state, { payload }) {
            state.loader = false;
            state.SubscriberDetails = payload;
        },
        cleanAllSubscriber(state) {
            state.SubscriberDetails = undefined;
        },
        createSubscriber(state, { payload }) {
            state.loader = true;
        },
        createSubscriberSuccess(state) {
            state.loader = false;
        }

    }
});
export const { getAllSubscriber, getAllSubscriberSuccess, createSubscriberSuccess, cleanAllSubscriber } = subscriber.actions;

export default subscriber.reducer;
