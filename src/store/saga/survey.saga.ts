import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createSurveyApi, deleteSurveyByIDApi, getAllSurveyApi, getAllSurveyHistoryApi, getAllSurveyHistoryWithoutPaginationApi, getSurveyByIDApi, sendSurveyNotificationApi, updateSurveyByIDApi } from "../../utils/api";
import { createSurvey, deleteSurveyByID, getAllSurveyHistoryWithoutPagination, sendSurveyNotification, updateSurveyByID } from "../actions/survey.actions";
import { getReportEnd, getReportStart } from "../reducer/report.reducer";
import { createSurveySuccess, deleteSurveyByIdSuccess, fetchSurveyStart, fetchSurveySuccess, getAllSurveyHistory, getAllSurveyHistorySuccess, getSurveyById, getSurveyByIdSuccess, updateSurveyByIdSuccess } from "../reducer/survey.reducer";
export function* fetchSurveySaga(action: ReturnType<typeof fetchSurveyStart>) {

    try {
        const response: AxiosResponse = yield call(getAllSurveyApi, action.payload);
        if (response.data.status) {
            yield put(fetchSurveySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(fetchSurveySuccess(undefined));
            console.error("Error getAllSurvey:", error);
        }
    }
}
export function* deleteSurveyByIDSaga(action: ReturnType<typeof deleteSurveyByID>) {
    try {
        const response: AxiosResponse = yield call(deleteSurveyByIDApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteSurveyByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(deleteSurveyByIdSuccess(undefined));
            console.error("Error deleteSurveyByIDSaga:", error);
        }
    }
}
export function* getSurveyByIdSaga(action: ReturnType<typeof getSurveyById>) {
    try {
        const response: AxiosResponse = yield call(getSurveyByIDApi, action?.payload);
        if (response.data.status) {
            yield put(getSurveyByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getSurveyByIdSuccess(undefined));
            console.error("Error getSurveyById:", error);
        }
    }
}
export function* updateSurveyByIDSaga(action: ReturnType<typeof updateSurveyByID>) {
    try {
        const response: AxiosResponse = yield call(updateSurveyByIDApi, action?.payload?.id, action?.payload?.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(updateSurveyByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateSurveyByIdSuccess(undefined));
            console.error("Error updateSurveyByIDSaga:", error);
        }
    }
}
export function* createSurveySaga(action: ReturnType<typeof createSurvey>) {
    try {
        const response: AxiosResponse = yield call(createSurveyApi, action?.payload?.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(createSurveySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createSurveySuccess(undefined));
            console.error("Error createSurveySaga:", error);
        }
    }
}

export function* getAllSurveyHistorySaga(action: ReturnType<typeof getAllSurveyHistory>) {

    try {
        const response: AxiosResponse = yield call(getAllSurveyHistoryApi, action.payload);
        if (response.data.status) {
            yield put(getAllSurveyHistorySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllSurveyHistorySuccess(undefined));
            console.error("Error getAllSurveyHistory:", error);
        }
    }
}

function* sendSurveyNotificationSaga(action: ReturnType<typeof sendSurveyNotification>) {
    const {
        payload: { id, callBack },
    } = action;
    try {
        const response: AxiosResponse = yield call(sendSurveyNotificationApi, id);
        callBack(response.data);
    } catch (error) {
        callBack(error as any);
    }
}
export function* getAllSurveyHistoryWithoutPaginationSaga(action: ReturnType<typeof getAllSurveyHistoryWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getAllSurveyHistoryWithoutPaginationApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllSurveyHistoryWithoutPaginationSaga:", error);
        }
    }
}

export function* watchSurveySaga() {
    yield takeLatest(fetchSurveyStart.type, fetchSurveySaga);
    yield takeLatest(deleteSurveyByID.type, deleteSurveyByIDSaga);
    yield takeLatest(getSurveyById.type, getSurveyByIdSaga);
    yield takeLatest(updateSurveyByID.type, updateSurveyByIDSaga);
    yield takeLatest(createSurvey.type, createSurveySaga);
    yield takeLatest(getAllSurveyHistory.type, getAllSurveyHistorySaga);
    yield takeLatest(sendSurveyNotification.type, sendSurveyNotificationSaga);
    yield takeLatest(getAllSurveyHistoryWithoutPagination.type, getAllSurveyHistoryWithoutPaginationSaga);
}
