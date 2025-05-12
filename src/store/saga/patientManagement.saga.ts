import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addNodeApi, deleteNodeByIdApi, editNodeByIdApi, getDescendantsNodeByIDApi, getDisplayMasterNodesApi, getNodeByIdApi, sendAlgoNotificationApi, uploadImageApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { addNode, deleteNodeById, editNodeById, sendAlgoNotification, uploadAlgoIcon } from "../actions/patientManagement.action";
import { addNodeSuccess, editNodeByIdSuccess, getDescendantsNodeByID, getDescendantsNodeByIDSuccess, getDisplayMasterNodes, getDisplayMasterNodesSuccess, getNodeById, getNodeByIdSuccess } from "../reducer/patientManagement.reducer";


export function* getDisplayMasterNodesSaga(action: ReturnType<typeof getDisplayMasterNodes>) {
    try {
        const response: AxiosResponse = yield call(getDisplayMasterNodesApi, action.payload);
        if (response.data.status) {
            yield put(getDisplayMasterNodesSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            yield put(getDisplayMasterNodesSuccess(undefined));
            console.error("Error loginSaga:", error);
        }
    }
}
export function* getDescendantsNodeByIDSaga(action: ReturnType<typeof getDescendantsNodeByID>) {
    try {
        const response: AxiosResponse = yield call(getDescendantsNodeByIDApi, action.payload);
        if (response.data.status) {
            yield put(getDescendantsNodeByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            yield put(getDescendantsNodeByIDSuccess(undefined));
            console.error("Error getDescendantsNodeByIDSaga:", error);
        }
    }
}
export function* addNodeSaga(action: ReturnType<typeof addNode>) {
    try {
        const response: AxiosResponse = yield call(addNodeApi, action.payload.slug, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(addNodeSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            yield put(addNodeSuccess(undefined));
            console.error("Error loginSaga:", error);
        }
    }
}

export function* getNodeByIdSaga(action: ReturnType<typeof getNodeById>) {
    try {
        const response: AxiosResponse = yield call(getNodeByIdApi, action.payload);
        if (response.data.status) {
            yield put(getNodeByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getNodeByIdSuccess(undefined));
            console.error("Error loginSaga:", error);
        }
    }
}

export function* editNodeByIdSaga(action: ReturnType<typeof editNodeById>) {
    try {
        const response: AxiosResponse = yield call(editNodeByIdApi, action.payload.slug || "", action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(editNodeByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            yield put(editNodeByIdSuccess(undefined));
            console.error("Error loginSaga:", error);
        }
    }
}
export function* deleteNodeByIdSaga(action: ReturnType<typeof deleteNodeById>) {
    try {
        const response: AxiosResponse = yield call(deleteNodeByIdApi, action.payload.slug || "", action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            console.error("Error loginSaga:", error);
        }
    }
}

function* uploadAlgoIconSaga(action: ReturnType<typeof uploadAlgoIcon>) {
    const {
        payload: { file, slug },
        meta: { callBack },
    } = action;

    const formData = new FormData();
    formData.append("file", file);

    switch (slug) {
        case "diagnosis":
            formData.append("isDiagnosis", JSON.stringify(true));
            break;
        case "treatment":
            formData.append("isTreatment", JSON.stringify(true));
            break;
        case "adr":
            formData.append("isGuidanceOnADR", JSON.stringify(true));
            break;
        case "differential":
            formData.append("isDifferentialCare", JSON.stringify(true));
            break;
        default:
            console.error("Invalid slug provided");
            callBack({ error: "Invalid slug" });
            return;
    }

    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_ALGO_ICON_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_ALGO_ICON_FAILURE", payload: error });
        callBack(error);
    }
}

function* sendAlgoNotificationSaga(action: ReturnType<typeof sendAlgoNotification>) {
    const {
        payload: { slug, id, callBack },
    } = action;
    try {
        const response: AxiosResponse = yield call(sendAlgoNotificationApi, slug || "", id);
        yield put({ type: "SEND_ALGO_NOTIFICATION_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "SEND_ALGO_NOTIFICATION_FAILURE", payload: error });
        callBack(error as any);
    }
}


export function* watchPatientManagementSaga() {
    yield takeLatest(getDisplayMasterNodes.type, getDisplayMasterNodesSaga);
    yield takeLatest(getDescendantsNodeByID.type, getDescendantsNodeByIDSaga);
    yield takeLatest(addNode.type, addNodeSaga);
    yield takeLatest(getNodeById.type, getNodeByIdSaga);
    yield takeLatest(editNodeById.type, editNodeByIdSaga);
    yield takeLatest(deleteNodeById.type, deleteNodeByIdSaga);
    yield takeLatest(uploadAlgoIcon.type, uploadAlgoIconSaga);
    yield takeLatest(sendAlgoNotification.type, sendAlgoNotificationSaga);
}
