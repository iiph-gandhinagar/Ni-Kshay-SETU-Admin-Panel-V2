import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createFlashnewsApi, createFlashSimilarAppApi, deleteFlashnewsApi, deleteFlashSimilarAppApi, getAllFlashNewsListApi, getAllFlashSimilarAppListApi, getFlashNewsByIdApi, getFlashSimilarAppByIdApi, updateFlashnewsApi, updateFlashSimilarAppApi, uploadImageApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createFlashNews, createFlashSimilarAppByID, deleteFlashNewsByID, deleteFlashSimilarAppByID, updateFlashNews, updateFlashSimilarAppByID, uploadFlashSimilarImage } from "../actions/flashNews.action";
import { createFlashNewsSuccess, createFlashSimilarAppByIDSuccess, deleteFlashNewsByIdSuccess, deleteFlashSimilarAppByIDSuccess, getAllFlashNewsList, getAllFlashNewsListSuccess, getAllFlashSimilarAppList, getAllFlashSimilarAppListSuccess, getFlashNewsById, getFlashNewsByIdSuccess, getFlashSimilarAppById, getFlashSimilarAppByIdSuccess, updateFlashNewsSuccess, updateFlashSimilarAppByIDSuccess } from "../reducer/flashNews.reducer";
export function* getAllFlashNewsListSaga(action: ReturnType<typeof getAllFlashNewsList>) {
    try {
        const response: AxiosResponse = yield call(getAllFlashNewsListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllFlashNewsListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllFlashNewsListSuccess(undefined));
            console.error("Error getAllFlashNewsListSaga:", error);
        }
    }
}
export function* getFlashNewsByIdSaga(action: ReturnType<typeof getFlashNewsById>) {
    try {
        const response: AxiosResponse = yield call(getFlashNewsByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getFlashNewsByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getFlashNewsByIdSuccess(undefined));
            console.error("Error getFlashNewsByIdSaga:", error);
        }
    }
}
export function* getAllFlashSimilarAppListSaga(action: ReturnType<typeof getAllFlashSimilarAppList>) {
    try {
        const response: AxiosResponse = yield call(getAllFlashSimilarAppListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllFlashSimilarAppListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllFlashSimilarAppListSuccess(undefined));
            console.error("Error getAllFlashSimilarAppListSaga:", error);
        }
    }
}
export function* getFlashSimilarAppByIdSaga(action: ReturnType<typeof getFlashSimilarAppById>) {
    try {
        const response: AxiosResponse = yield call(getFlashSimilarAppByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getFlashSimilarAppByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getFlashSimilarAppByIdSuccess(undefined));
            console.error("Error getFlashSimilarAppByIdSaga:", error);
        }
    }
}
export function* updateFlashSimilarAppByIDSaga(action: ReturnType<typeof updateFlashSimilarAppByID>) {
    try {
        const response: AxiosResponse = yield call(updateFlashSimilarAppApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateFlashSimilarAppByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(updateFlashSimilarAppByIDSuccess(undefined));
            console.error("Error updateFlashSimilarAppByID:", error);
        }
    }
}
export function* createFlashSimilarAppByIDSaga(action: ReturnType<typeof createFlashSimilarAppByID>) {
    try {
        const response: AxiosResponse = yield call(createFlashSimilarAppApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createFlashSimilarAppByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(createFlashSimilarAppByIDSuccess(undefined));
            console.error("Error createFlashSimilarAppByID:", error);
        }
    }
} export function* deleteFlashSimilarAppByIDSaga(action: ReturnType<typeof deleteFlashSimilarAppByID>) {
    try {
        const response: AxiosResponse = yield call(deleteFlashSimilarAppApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteFlashSimilarAppByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(deleteFlashSimilarAppByIDSuccess(undefined));
            console.error("Error deleteFlashSimilarAppByID:", error);
        }
    }
}


export function* updateFlashNewsSaga(action: ReturnType<typeof updateFlashNews>) {
    try {
        const response: AxiosResponse = yield call(updateFlashnewsApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateFlashNewsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(updateFlashNewsSuccess(undefined));
            console.error("Error updateFlashNews:", error);
        }
    }
}
export function* createFlashNewsSaga(action: ReturnType<typeof createFlashNews>) {
    try {
        const response: AxiosResponse = yield call(createFlashnewsApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createFlashNewsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(createFlashNewsSuccess(undefined));
            console.error("Error createFlashNews:", error);
        }
    }
} export function* deleteFlashNewsSaga(action: ReturnType<typeof deleteFlashNewsByID>) {
    try {
        const response: AxiosResponse = yield call(deleteFlashnewsApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteFlashNewsByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(deleteFlashNewsByIdSuccess(undefined));
            console.error("Error deleteFlashNews:", error);
        }
    }
}

function* uploadFlashSimilarImageSaga(action: ReturnType<typeof uploadFlashSimilarImage>) {
    const { payload: { file, isFlashSimilarApp }, meta: { callBack } } = action;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isFlashSimilarApp", JSON.stringify(isFlashSimilarApp));
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_IMAGE_FAILURE", payload: error });
        callBack(error);
    }
}


export function* watchFlashNewsSaga() {
    yield takeLatest(getAllFlashNewsList.type, getAllFlashNewsListSaga);
    yield takeLatest(getFlashNewsById.type, getFlashNewsByIdSaga);
    yield takeLatest(updateFlashNews.type, updateFlashNewsSaga);
    yield takeLatest(createFlashNews.type, createFlashNewsSaga);
    yield takeLatest(deleteFlashNewsByID.type, deleteFlashNewsSaga);
    yield takeLatest(getAllFlashSimilarAppList.type, getAllFlashSimilarAppListSaga);
    yield takeLatest(getFlashSimilarAppById.type, getFlashSimilarAppByIdSaga);
    yield takeLatest(updateFlashSimilarAppByID.type, updateFlashSimilarAppByIDSaga);
    yield takeLatest(createFlashSimilarAppByID.type, createFlashSimilarAppByIDSaga);
    yield takeLatest(deleteFlashSimilarAppByID.type, deleteFlashSimilarAppByIDSaga);
    yield takeLatest(uploadFlashSimilarImage.type, uploadFlashSimilarImageSaga);
}
