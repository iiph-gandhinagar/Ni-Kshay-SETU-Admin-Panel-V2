import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createAppFlagApi, createConfigApi, createMasterCmsApi, createMessageNotificationApi, createUserNotificationApi, deleteAppFlagByIDApi, deleteConfigByIDApi, deleteMasterCmsByIDApi, getAllAppManagmentFlagsApi, getAllConfigApi, getAllMasterCmsApi, getAllMessageNotificationListApi, getAllUserNotificationListApi, getAppFlagByIDApi, getConfigByIDApi, getMasterCmsByIDApi, getMasterDropdownApi, getUserNotificationInfoApi, updateAppFlagByIDApi, updateConfigByIDApi, updateMasterCmsByIDApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createAppManagmentFlag, createMasterCms, createMessageNotification, createUserNotification, deleteAppManagmentByID, deleteConfigByID, deleteMasterCmsByID, getUserNotificationInfo, updateAppManagmentByID, updateMasterCmsByID } from "../actions/config.action";
import { createAppManagmentFlagSuccess, createConfig, createConfigSuccess, createMasterCmsSuccess, createMessageNotificationSuccess, createUserNotificationSuccess, deleteAppManagmentByIDSuccess, deleteConfigByIDSuccess, deleteMasterCmsByIDSuccess, getAllAppManagmentFlags, getAllAppManagmentFlagsSuccess, getAllConfig, getAllConfigSuccess, getAllMasterCms, getAllMasterCmsSuccess, getAllMessageNotification, getAllMessageNotificationSuccess, getAllUserNotification, getAllUserNotificationSuccess, getAppFlagByID, getAppFlagByIDSuccess, getConfigByID, getConfigByIDSuccess, getMasterCmsByID, getMasterCmsByIDSuccess, getMasterDropdown, getMasterDropdownSuccess, updateAppManagmentByIDSuccess, updateConfigByID, updateConfigByIDSuccess, updateMasterCmsByIDSuccess } from "../reducer/config.reducer";

export function* getAllConfigSaga(action: ReturnType<typeof getAllConfig>) {
    try {
        const response: AxiosResponse = yield call(getAllConfigApi, action.payload);
        if (response.data.status) {
            yield put(getAllConfigSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllConfigSuccess(undefined));
            console.error("Error getAllConfigSaga:", error);
        }
    }
}


export function* getConfigByIDSaga(action: ReturnType<typeof getConfigByID>) {
    try {
        const response: AxiosResponse = yield call(getConfigByIDApi, action.payload);
        if (response.data.status) {
            yield put(getConfigByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getConfigByIDSuccess(undefined));
            console.error("Error getConfigByIDSaga:", error);
        }
    }
}
export function* createConfigSaga(action: ReturnType<typeof createConfig>) {
    try {
        const response: AxiosResponse = yield call(createConfigApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createConfigSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            ErrorToast(error?.response?.data?.message);
            yield put(createConfigSuccess(undefined));
            console.error("Error createConfigSaga:", error);
        }
    }
}
export function* updateConfigByIDSaga(action: ReturnType<typeof updateConfigByID>) {
    try {
        const response: AxiosResponse = yield call(updateConfigByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateConfigByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateConfigByIDSuccess(undefined));
            console.error("Error updateConfigSaga:", error);
        }
    }
}

export function* deleteConfigByIDSaga(action: ReturnType<typeof deleteConfigByID>) {
    try {
        const response: AxiosResponse = yield call(deleteConfigByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteConfigByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(deleteConfigByIDSuccess(undefined));
            console.error("Error deleteConfigByIdSaga:", error);
        }
    }
}
export function* getAllAppManagmentFlagsSaga(action: ReturnType<typeof getAllAppManagmentFlags>) {
    try {
        const response: AxiosResponse = yield call(getAllAppManagmentFlagsApi, action.payload);
        if (response.data.status) {
            yield put(getAllAppManagmentFlagsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllAppManagmentFlagsSuccess(undefined));
            console.error("Error getAllConfigSaga:", error);
        }
    }
}
export function* getAppFlagByIDSaga(action: ReturnType<typeof getAppFlagByID>) {
    try {
        const response: AxiosResponse = yield call(getAppFlagByIDApi, action.payload);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack();
            yield put(getAppFlagByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAppFlagByIDSuccess(undefined));
            console.error("Error deleteConfigByIdSaga:", error);
        }
    }
}

export function* updateAppManagmentByIDSaga(action: ReturnType<typeof updateAppManagmentByID>) {
    try {
        const response: AxiosResponse = yield call(updateAppFlagByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateAppManagmentByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateAppManagmentByIDSuccess(undefined));
            console.error("Error updateAppManagment", error);
        }
    }
}
export function* createAppManagmentFlagSaga(action: ReturnType<typeof createAppManagmentFlag>) {
    try {
        const response: AxiosResponse = yield call(createAppFlagApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createAppManagmentFlagSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createAppManagmentFlagSuccess(undefined));
            console.error("Error createAppManagmentFlag", error);
        }
    }
}
export function* deleteAppManagmentByIDSaga(action: ReturnType<typeof deleteAppManagmentByID>) {
    try {
        const response: AxiosResponse = yield call(deleteAppFlagByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteAppManagmentByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteAppManagmentByIDSuccess(undefined));
            console.error("Error deleteAppManagmentByIDSaga:", error);
        }
    }
}


export function* getAllMasterCmsSaga(action: ReturnType<typeof getAllMasterCms>) {
    try {
        const response: AxiosResponse = yield call(getAllMasterCmsApi, action.payload);
        if (response.data.status) {
            yield put(getAllMasterCmsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllMasterCmsSuccess(undefined));
            console.error("Error getAllMasterCmsSaga:", error);
        }
    }
}


export function* getMasterCmsByIDSaga(action: ReturnType<typeof getMasterCmsByID>) {
    try {
        const response: AxiosResponse = yield call(getMasterCmsByIDApi, action.payload);
        if (response.data.status) {
            yield put(getMasterCmsByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getMasterCmsByIDSuccess(undefined));
            console.error("Error getMasterCmsByIDSaga:", error);
        }
    }
}
export function* createMasterCmsSaga(action: ReturnType<typeof createMasterCms>) {
    try {
        const response: AxiosResponse = yield call(createMasterCmsApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createMasterCmsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            ErrorToast(error?.response?.data?.message);
            yield put(createMasterCmsSuccess(undefined));
            console.error("Error createMasterCmsSaga:", error);
        }
    }
}
export function* updateMasterCmsByIDSaga(action: ReturnType<typeof updateMasterCmsByID>) {
    try {
        const response: AxiosResponse = yield call(updateMasterCmsByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateMasterCmsByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateMasterCmsByIDSuccess(undefined));
            console.error("Error updateMasterCmsSaga:", error);
        }
    }
}

export function* deleteMasterCmsByIDSaga(action: ReturnType<typeof deleteMasterCmsByID>) {
    try {
        const response: AxiosResponse = yield call(deleteMasterCmsByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteMasterCmsByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(deleteMasterCmsByIDSuccess(undefined));
            console.error("Error deleteMasterCmsByIdSaga:", error);
        }
    }
}
export function* getAllUserNotificationSaga(action: ReturnType<typeof getAllUserNotification>) {
    try {
        const response: AxiosResponse = yield call(getAllUserNotificationListApi, action.payload);
        if (response.data.status) {
            yield put(getAllUserNotificationSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllUserNotificationSuccess(undefined));
            console.error("Error getAllUserNotificationListSaga:", error);
        }
    }
}
export function* getMasterDropDownSaga(action: ReturnType<typeof getMasterDropdown>) {
    try {
        const response: AxiosResponse = yield call(getMasterDropdownApi);
        if (response.data.status) {
            yield put(getMasterDropdownSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getMasterDropdownSuccess(undefined));
            console.error("Error getAllUserNotificationListSaga:", error);
        }
    }
}

export function* createUserNotificationSaga(action: ReturnType<typeof createUserNotification>) {
    try {
        const response: AxiosResponse = yield call(createUserNotificationApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createUserNotificationSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            ErrorToast(error?.response?.data?.message);
            yield put(createUserNotificationSuccess(undefined));
            console.error("Error createUserNotificationSaga:", error);
        }
    }
}
export function* getAllMessageNotificationSaga(action: ReturnType<typeof getAllMessageNotification>) {
    try {
        const response: AxiosResponse = yield call(getAllMessageNotificationListApi, action.payload);
        if (response.data.status) {
            yield put(getAllMessageNotificationSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllMessageNotificationSuccess(undefined));
            console.error("Error getAllMessageNotificationListSaga:", error);
        }
    }
}
export function* createMessageNotificationSaga(action: ReturnType<typeof createMessageNotification>) {
    try {
        const response: AxiosResponse = yield call(createMessageNotificationApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createMessageNotificationSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            ErrorToast(error?.response?.data?.message);
            yield put(createMessageNotificationSuccess(undefined));
            console.error("Error createMessageNotificationSaga:", error);
        }
    }
}
export function* getUserNotificationInfoSaga(action: ReturnType<typeof getUserNotificationInfo>) {
    try {
        const response: AxiosResponse = yield call(getUserNotificationInfoApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            ErrorToast(error?.response?.data?.message);
            console.error("Error getUserNotificationInfo:", error);
        }
    }
}




export function* watchConfigSaga() {
    yield takeLatest(getAllConfig.type, getAllConfigSaga);
    yield takeLatest(getConfigByID.type, getConfigByIDSaga);
    yield takeLatest(createConfig.type, createConfigSaga);
    yield takeLatest(updateConfigByID.type, updateConfigByIDSaga);
    yield takeLatest(deleteConfigByID.type, deleteConfigByIDSaga);
    yield takeLatest(getAllAppManagmentFlags.type, getAllAppManagmentFlagsSaga);
    yield takeLatest(getAppFlagByID.type, getAppFlagByIDSaga);
    yield takeLatest(updateAppManagmentByID.type, updateAppManagmentByIDSaga);
    yield takeLatest(createAppManagmentFlag.type, createAppManagmentFlagSaga);
    yield takeLatest(deleteAppManagmentByID.type, deleteAppManagmentByIDSaga);
    yield takeLatest(getAllMasterCms.type, getAllMasterCmsSaga);
    yield takeLatest(getMasterCmsByID.type, getMasterCmsByIDSaga);
    yield takeLatest(createMasterCms.type, createMasterCmsSaga);
    yield takeLatest(updateMasterCmsByID.type, updateMasterCmsByIDSaga);
    yield takeLatest(deleteMasterCmsByID.type, deleteMasterCmsByIDSaga);
    yield takeLatest(getAllUserNotification.type, getAllUserNotificationSaga);
    yield takeLatest(createUserNotification.type, createUserNotificationSaga);
    yield takeLatest(getMasterDropdown.type, getMasterDropDownSaga);
    yield takeLatest(getAllMessageNotification.type, getAllMessageNotificationSaga);
    yield takeLatest(createMessageNotification.type, createMessageNotificationSaga);
    yield takeLatest(getUserNotificationInfo.type, getUserNotificationInfoSaga);
}
