import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createSubscriberApi, getAllSubscriberApi, sendForgotOtpApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createSubscriber, sendOtp } from "../actions/subscriber.action";
import { createSubscriberSuccess, getAllSubscriber, getAllSubscriberSuccess } from "../reducer/subscriber.reducer";

export function* getAllSubscriberSaga(action: ReturnType<typeof getAllSubscriber>) {
    try {
        const response: AxiosResponse = yield call(getAllSubscriberApi, action.payload);
        if (response.data.status) {
            yield put(getAllSubscriberSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllSubscriberSuccess(undefined));
            console.error("Error getAllSubscriberSaga:", error);
        }
    }
}
export function* createSubscriberSaga(action: ReturnType<typeof createSubscriber>) {
    try {
        const response: AxiosResponse = yield call(createSubscriberApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createSubscriberSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(createSubscriberSuccess(undefined));
            console.error("Error getAllSubscriberSaga:", error);
        }
    }
}

export function* sendOtpSaga(action: ReturnType<typeof sendOtp>) {
    try {
        const response: AxiosResponse = yield call(sendForgotOtpApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllSubscriberSaga:", error);
        }
    }
}

export function* watchSubscriberSaga() {
    yield takeLatest(getAllSubscriber.type, getAllSubscriberSaga);
    yield takeLatest(createSubscriber.type, createSubscriberSaga);
    yield takeLatest(sendOtp.type, sendOtpSaga);
}
