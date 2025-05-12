import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createFeedbackApi, deleteFeedbackByIDApi, getAllFeedbackHistoryListApi, getAllFeedbackHistoryWithoutPaginationApi, getAllFeedbackListApi, getFeedbackByIdApi, updateFeedbackByIDApi, uploadImageApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createFeedback, deleteFeedbackByID, getAllFeedbackHistoryWithoutPagination, updateFeedbackByID, uploadFeedbackImage } from "../actions/feedback.action";
import { createFeedbackSuccess, deleteFeedbackByIDSuccess, getAllFeedbackHistoryList, getAllFeedbackHistoryListSuccess, getAllFeedbackList, getAllFeedbackListSuccess, getFeedbackById, getFeedbackByIdSuccess, updateFeedbackByIDSuccess, } from "../reducer/feedback.reducer";
import { getReportEnd, getReportStart } from "../reducer/report.reducer";

export function* getAllFeedbackHistoryListSaga(action: ReturnType<typeof getAllFeedbackHistoryList>) {
    try {
        const response: AxiosResponse = yield call(getAllFeedbackHistoryListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllFeedbackHistoryListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllFeedbackHistoryListSuccess(undefined));
            console.error("Error getAllFeedbackHistoryListSaga:", error);
        }
    }
}

export function* getAllFeedbackListSaga(action: ReturnType<typeof getAllFeedbackList>) {
    try {
        const response: AxiosResponse = yield call(getAllFeedbackListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllFeedbackListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllFeedbackListSuccess(undefined));
            console.error("Error getAllFeedbackListSaga:", error);
        }
    }
}

export function* getFeedbackByIdSaga(action: ReturnType<typeof getFeedbackById>) {
    try {
        const response: AxiosResponse = yield call(getFeedbackByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getFeedbackByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getFeedbackByIdSuccess(undefined));
            console.error("Error getFeedbackByIdSaga:", error);
        }
    }
}

export function* createFeedbackSaga(action: ReturnType<typeof createFeedback>) {
    try {
        const response: AxiosResponse = yield call(createFeedbackApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createFeedbackSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(createFeedbackSuccess(undefined));
            console.error("Error createFeedback:", error);
        }
    }
}

export function* updateFeedbackByIDSaga(action: ReturnType<typeof updateFeedbackByID>) {
    try {
        const response: AxiosResponse = yield call(updateFeedbackByIDApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateFeedbackByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(updateFeedbackByIDSuccess(undefined));
            console.error("Error updateFeedbackByID:", error);
        }
    }
}

export function* deleteFeedbackByIDSaga(action: ReturnType<typeof deleteFeedbackByID>) {
    try {
        const response: AxiosResponse = yield call(deleteFeedbackByIDApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteFeedbackByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(deleteFeedbackByIDSuccess(undefined));
            console.error("Error deleteFeedbackByID:", error);
        }
    }
}

function* uploadFeedbackImageSaga(action: ReturnType<typeof uploadFeedbackImage>) {
    const { payload: { file, isFeedback }, meta: { callBack } } = action;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isFeedback", JSON.stringify(isFeedback));
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_IMAGE_FAILURE", payload: error });
        callBack(error);
    }
}

export function* getAllFeedbackHistoryWithoutPaginationSaga(action: ReturnType<typeof getAllFeedbackHistoryWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getAllFeedbackHistoryWithoutPaginationApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllFeedbackHistoryWithoutPaginationSaga:", error);
        }
    }
}


export function* watchFeedbackSaga() {
    yield takeLatest(getAllFeedbackHistoryList.type, getAllFeedbackHistoryListSaga);
    yield takeLatest(getAllFeedbackList.type, getAllFeedbackListSaga);
    yield takeLatest(getFeedbackById.type, getFeedbackByIdSaga);
    yield takeLatest(createFeedback.type, createFeedbackSaga);
    yield takeLatest(updateFeedbackByID.type, updateFeedbackByIDSaga);
    yield takeLatest(deleteFeedbackByID.type, deleteFeedbackByIDSaga);
    yield takeLatest(uploadFeedbackImage.type, uploadFeedbackImageSaga);
    yield takeLatest(getAllFeedbackHistoryWithoutPagination.type, getAllFeedbackHistoryWithoutPaginationSaga);
}
