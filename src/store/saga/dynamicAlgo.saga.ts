import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createDynamicAlgoApi, createRootDynamicAlgoApi, deleteDynamicAlgoByIDApi, deleteRootDynamicAlgoByIDApi, editDynamicAlgoByIDApi, getAllRootDynamicAlgoApi, getAllRootDynamicAlgoListApi, getDescendantsDynamicAlgoByIDApi, getDynamicAlgoByIDApi, getRootDynamicAlgoByIdApi, sendDynamicAlgoNotificationApi, updateRootDynamicAlgoByIDApi, uploadImageApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createDynamicAlgo, createRootDynamicAlgo, deleteDynamicAlgoByID, deleteRootDynamicAlgoByID, editDynamicAlgoByID, sendDynamicAlgoNotification, updateRootDynamicAlgo, uploadDynamicAlgoImage } from "../actions/dynamicAlgo.action";
import { createDynamicAlgoSuccess, createRootDynamicAlgoSuccess, deleteDynamicAlgoByIDSuccess, deleteRootDynamicAlgoByIdSuccess, editDynamicAlgoByIDSuccess, getAllRootDynamicAlgo, getAllRootDynamicAlgoList, getAllRootDynamicAlgoListSuccess, getAllRootDynamicAlgoSuccess, getDescendantsDynamicAlgoByID, getDescendantsDynamicAlgoByIDSuccess, getDynamicAlgoByID, getDynamicAlgoByIDSuccess, getRootDynamicAlgoById, getRootDynamicAlgoByIdSuccess, updateRootDynamicAlgoSuccess } from "../reducer/dynamicAlgo.reducer";

export function* getAllRootDynamicAlgoListSaga(action: ReturnType<typeof getAllRootDynamicAlgoList>) {
    try {
        const response: AxiosResponse = yield call(getAllRootDynamicAlgoListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllRootDynamicAlgoListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllRootDynamicAlgoListSuccess(undefined));
            console.error("Error getDynmicAlgoByIdSaga:", error);
        }
    }
}
export function* getDynamicAlgoByIdSaga(action: ReturnType<typeof getRootDynamicAlgoById>) {
    try {
        const response: AxiosResponse = yield call(getRootDynamicAlgoByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getRootDynamicAlgoByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getRootDynamicAlgoByIdSuccess(undefined));
            console.error("Error getDynmicAlgoByIdSaga:", error);
        }
    }
}

export function* createRootDynamicAlgoSaga(action: ReturnType<typeof createRootDynamicAlgo>) {
    try {
        const response: AxiosResponse = yield call(createRootDynamicAlgoApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createRootDynamicAlgoSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(createRootDynamicAlgoSuccess(undefined));
            console.error("Error createDynmicAlgo:", error);
        }
    }
}

export function* updateDynamicAlgoByIDSaga(action: ReturnType<typeof updateRootDynamicAlgo>) {
    try {
        const response: AxiosResponse = yield call(updateRootDynamicAlgoByIDApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateRootDynamicAlgoSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(updateRootDynamicAlgoSuccess(undefined));
            console.error("Error updateDynmicAlgoByID:", error);
        }
    }
}

export function* deleteRootDynamicAlgoByIDSaga(action: ReturnType<typeof deleteRootDynamicAlgoByID>) {
    try {
        const response: AxiosResponse = yield call(deleteRootDynamicAlgoByIDApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteRootDynamicAlgoByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(deleteRootDynamicAlgoByIdSuccess(undefined));
            console.error("Error deleteDynmicAlgoByID:", error);
        }
    }
}

function* uploadDynamicAlgoImageSaga(action: ReturnType<typeof uploadDynamicAlgoImage>) {
    const { payload: { file, isDynamicAlgo }, meta: { callBack } } = action;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isDynamicAlgo", JSON.stringify(isDynamicAlgo));
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_IMAGE_FAILURE", payload: error });
        callBack(error);
    }
}


export function* getAllRootDynamicAlgoSaga(action: ReturnType<typeof getAllRootDynamicAlgo>) {
    try {
        const response: AxiosResponse = yield call(getAllRootDynamicAlgoApi, action?.payload);
        if (response.data.status) {
            yield put(getAllRootDynamicAlgoSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllRootDynamicAlgoSuccess(undefined));
            console.error("Error getAllRootDynamicAlgoSaga:", error);
        }
    }
}

export function* getDescendantsDynamicAlgoByIDSaga(action: ReturnType<typeof getDescendantsDynamicAlgoByID>) {
    try {
        const response: AxiosResponse = yield call(getDescendantsDynamicAlgoByIDApi, action.payload);
        if (response.data.status) {
            yield put(getDescendantsDynamicAlgoByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDescendantsDynamicAlgoByIDSuccess(undefined));
            console.error("Error getDescendantsDynamicAlgoByIDSaga:", error);
        }
    }
}

export function* getDynamicAlgoByIDSaga(action: ReturnType<typeof getDynamicAlgoByID>) {
    try {
        const response: AxiosResponse = yield call(getDynamicAlgoByIDApi, action.payload);
        if (response.data.status) {
            yield put(getDynamicAlgoByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDynamicAlgoByIDSuccess(undefined));
            console.error("Error getDynamicAlgoByIDSaga:", error);
        }
    }
}

export function* editDynamicAlgoByIDSaga(action: ReturnType<typeof editDynamicAlgoByID>) {
    try {
        const response: AxiosResponse = yield call(editDynamicAlgoByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(editDynamicAlgoByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            yield put(editDynamicAlgoByIDSuccess(undefined));
            console.error("Error editDynamicAlgoByIDSaga:", error);
        }
    }
}

export function* deleteDynamicAlgoByIDSaga(action: ReturnType<typeof deleteDynamicAlgoByID>) {
    try {
        const response: AxiosResponse = yield call(deleteDynamicAlgoByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteDynamicAlgoByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            yield put(deleteDynamicAlgoByIDSuccess(undefined));
            console.error("Error deleteDynamicAlgoByIDSaga:", error);
        }
    }
}

export function* createDynamicAlgoSaga(action: ReturnType<typeof createDynamicAlgo>) {
    try {
        const response: AxiosResponse = yield call(createDynamicAlgoApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createDynamicAlgoSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            yield put(createDynamicAlgoSuccess(undefined));
            console.error("Error createDynamicAlgoSaga:", error);
        }
    }
}

function* sendDynamicAlgoNotificationSaga(action: ReturnType<typeof sendDynamicAlgoNotification>) {
    const {
        payload: { id, callBack },
    } = action;
    try {
        const response: AxiosResponse = yield call(sendDynamicAlgoNotificationApi, id);
        callBack(response.data);
    } catch (error) {
        callBack(error as any);
    }
}

export function* watchDynmicAlgoSaga() {
    yield takeLatest(getAllRootDynamicAlgoList.type, getAllRootDynamicAlgoListSaga);
    yield takeLatest(getRootDynamicAlgoById.type, getDynamicAlgoByIdSaga);
    yield takeLatest(createRootDynamicAlgo.type, createRootDynamicAlgoSaga);
    yield takeLatest(updateRootDynamicAlgo.type, updateDynamicAlgoByIDSaga);
    yield takeLatest(deleteRootDynamicAlgoByID.type, deleteRootDynamicAlgoByIDSaga);
    yield takeLatest(uploadDynamicAlgoImage.type, uploadDynamicAlgoImageSaga);
    yield takeLatest(getAllRootDynamicAlgo.type, getAllRootDynamicAlgoSaga);
    yield takeLatest(getDescendantsDynamicAlgoByID.type, getDescendantsDynamicAlgoByIDSaga);
    yield takeLatest(getDynamicAlgoByID.type, getDynamicAlgoByIDSaga);
    yield takeLatest(editDynamicAlgoByID.type, editDynamicAlgoByIDSaga);
    yield takeLatest(deleteDynamicAlgoByID.type, deleteDynamicAlgoByIDSaga);
    yield takeLatest(createDynamicAlgo.type, createDynamicAlgoSaga);
    yield takeLatest(sendDynamicAlgoNotification.type, sendDynamicAlgoNotificationSaga);
}
