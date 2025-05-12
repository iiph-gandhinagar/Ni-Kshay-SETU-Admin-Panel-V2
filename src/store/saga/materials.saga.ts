import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createMaterialApi, deleteMaterialByIDApi, editMaterialByIDApi, getAllRootMaterialApi, getDescendantsMaterialByIDApi, getMaterialByIDApi, sendResourceMaterialNotificationApi, uploadImageApi } from "../../utils/api";
import { createMaterial, deleteMaterialByID, editMaterialByID, sendResourceMaterialNotification, uploadResourceFile } from "../actions/materials.action";
import { createMaterialSuccess, deleteMaterialByIDSuccess, editMaterialByIDSuccess, getAllRootMaterial, getAllRootMaterialSuccess, getDescendantsMaterialByID, getDescendantsMaterialByIDSuccess, getMaterialByID, getMaterialByIDSuccess } from "../reducer/materials.reducer";
export function* getAllRootMaterialSaga(action: ReturnType<typeof getAllRootMaterial>) {
    try {
        const response: AxiosResponse = yield call(getAllRootMaterialApi);
        if (response.data.status) {
            yield put(getAllRootMaterialSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllRootMaterialSuccess(undefined));
            console.error("Error getAllRootMaterialSaga:", error);
        }
    }
}
export function* getDescendantsMaterialByIDSaga(action: ReturnType<typeof getDescendantsMaterialByID>) {
    try {
        const response: AxiosResponse = yield call(getDescendantsMaterialByIDApi, action.payload);
        if (response.data.status) {
            yield put(getDescendantsMaterialByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDescendantsMaterialByIDSuccess(undefined));
            console.error("Error getDescendantsMaterialByIDSaga:", error);
        }
    }
}
export function* getMaterialByIDSaga(action: ReturnType<typeof getMaterialByID>) {
    try {
        const response: AxiosResponse = yield call(getMaterialByIDApi, action.payload);
        if (response.data.status) {
            yield put(getMaterialByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getMaterialByIDSuccess(undefined));
            console.error("Error getMaterialByIDSaga:", error);
        }
    }
}
export function* editMaterialByIDSaga(action: ReturnType<typeof editMaterialByID>) {
    try {
        const response: AxiosResponse = yield call(editMaterialByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(editMaterialByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            yield put(editMaterialByIDSuccess(undefined));
            console.error("Error editMaterialByIDSaga:", error);
        }
    }
}
export function* deleteMaterialByIDSaga(action: ReturnType<typeof deleteMaterialByID>) {
    try {
        const response: AxiosResponse = yield call(deleteMaterialByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteMaterialByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            yield put(deleteMaterialByIDSuccess(undefined));
            console.error("Error deleteMaterialByIDSaga:", error);
        }
    }
}
export function* createMaterialSaga(action: ReturnType<typeof createMaterial>) {
    try {
        const response: AxiosResponse = yield call(createMaterialApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createMaterialSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            yield put(createMaterialSuccess(undefined));
            console.error("Error createMaterialSaga:", error);
        }
    }
}


function* uploadResourceFileSaga(action: ReturnType<typeof uploadResourceFile>) {
    const { payload: { file, isMaterial, typeOfMaterial }, meta: { callBack } } = action;
    const formData = new FormData();
    file.forEach((file: File) => {
        formData.append("files", file);
    }); formData.append("isMaterial", JSON.stringify(isMaterial));
    formData.append("typeOfMaterial", typeOfMaterial);
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_FILE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_FILE_FAILURE", payload: error });
        callBack(error);
    }
}

function* sendResourceMaterialNotificationSaga(action: ReturnType<typeof sendResourceMaterialNotification>) {
    const {
        payload: { id, callBack },
    } = action;
    try {
        const response: AxiosResponse = yield call(sendResourceMaterialNotificationApi, id);
        callBack(response.data);
    } catch (error) {
        callBack(error as any);
    }
}
export function* watchMaterialsSaga() {
    yield takeLatest(getAllRootMaterial.type, getAllRootMaterialSaga);
    yield takeLatest(getDescendantsMaterialByID.type, getDescendantsMaterialByIDSaga);
    yield takeLatest(getMaterialByID.type, getMaterialByIDSaga);
    yield takeLatest(editMaterialByID.type, editMaterialByIDSaga);
    yield takeLatest(deleteMaterialByID.type, deleteMaterialByIDSaga);
    yield takeLatest(createMaterial.type, createMaterialSaga);
    yield takeLatest(uploadResourceFile.type, uploadResourceFileSaga);
    yield takeLatest(sendResourceMaterialNotification.type, sendResourceMaterialNotificationSaga);
}
