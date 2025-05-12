import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createTourApi, deleteTourByIDApi, getAllTourApi, getTourByIDApi, updateTourByIDApi, uploadImageApi } from "../../utils/api";
import { createTour, deleteTourByID, updateTourByID, uploadTourImage } from "../actions/tours.action";
import { deleteTourByIdSuccess, fetchTourStart, fetchTourSuccess, getTourById, getTourByIdSuccess, updateTourByIdSuccess } from "../reducer/tour.reducer";
export function* fetchTourSaga(action: ReturnType<typeof fetchTourStart>) {
    try {
        const response: AxiosResponse = yield call(getAllTourApi, action?.payload);
        if (response.data.status) {
            yield put(fetchTourSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(fetchTourSuccess(undefined));
            console.error("Error getAllSurvey:", error);
        }
    }
}
export function* getTourByIdSaga(action: ReturnType<typeof getTourById>) {
    try {
        const response: AxiosResponse = yield call(getTourByIDApi, action?.payload);
        if (response.data.status) {
            yield put(getTourByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getTourByIdSuccess(undefined));
            console.error("Error getTourById:", error);
        }
    }
}
export function* deleteTourByIDSaga(action: ReturnType<typeof deleteTourByID>) {
    try {
        const response: AxiosResponse = yield call(deleteTourByIDApi, action?.payload?.id);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(deleteTourByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(deleteTourByIdSuccess(undefined));
            console.error("Error getTourById:", error);
        }
    }
}

export function* createTourSaga(action: ReturnType<typeof createTour>) {
    try {
        const response: AxiosResponse = yield call(createTourApi, action?.payload?.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(deleteTourByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(deleteTourByIdSuccess(undefined));
            console.error("Error getTourById:", error);
        }
    }
}

function* uploadTourImageSaga(action: ReturnType<typeof uploadTourImage>) {
    const { payload: { file, isTour }, meta: { callBack } } = action;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isTour", JSON.stringify(isTour));
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_IMAGE_FAILURE", payload: error });
        callBack(error);
    }
}

export function* updateTourByIDSaga(action: ReturnType<typeof updateTourByID>) {
    try {
        const response: AxiosResponse = yield call(updateTourByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateTourByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateTourByIdSuccess(undefined));
            console.error("Error updateTourByIDSaga:", error);
        }
    }
}

export function* watchTourSaga() {
    yield takeLatest(fetchTourStart.type, fetchTourSaga);
    yield takeLatest(getTourById.type, getTourByIdSaga);
    yield takeLatest(deleteTourByID.type, deleteTourByIDSaga);
    yield takeLatest(createTour.type, createTourSaga);
    yield takeLatest(uploadTourImage.type, uploadTourImageSaga);
    yield takeLatest(updateTourByID.type, updateTourByIDSaga);
};
