import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createPermissionApi, createRoleApi, createUserApi, deletePermissionByIDApi, deleteRoleByIDApi, deleteUserDetailByIDApi, forgotPasswordApi, getAllRolesApi, getAllRolesWithoutPaginationApi, getAllUsersListApi, getAuthUserApi, getMasterPermissionsApi, getPermissionByIDApi, getPermissionsApi, getRoleByIDApi, getUserDetailByIDApi, loginApi, resetPasswordApi, updatePermissionByIDApi, updateRoleByIDApi, updateUserDetailByIDApi, uploadImageApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createRole, createUser, deletePermissionByID, deleteRoleByID, deleteUserDetailByID, updatePermissionByID, updateRoleByID, updateUserDetailByID, uploadAdminImage } from "../actions/auth.action";
import { createPermission, createPermissionSuccess, createRoleSuccess, createUserSuccess, deletePermissionByIDSuccess, deleteRoleByIDSuccess, deleteUserDetailByIDSuccess, forgotpassword, getAllRoles, getAllRolesSuccess, getAllRolesWithoutPagination, getAllRolesWithoutPaginationSuccess, getAuthUser, getAuthUserSuccess, getMasterPermissions, getMasterPermissionsSuccess, getPermissionByID, getPermissionByIDSuccess, getPermissions, getPermissionsSuccess, getRoleByID, getRoleByIDSuccess, getUserDetailByID, getUserDetailByIDSuccess, getUsers, getUsersSuccess, login, loginSuccess, resetPassword, updatePermissionByIDSuccess, updateRoleByIDSuccess, updateUserDetailByIDSuccess } from "../reducer/auth.reducer";

export function* loginSaga(action: ReturnType<typeof login>) {
    try {
        const response: AxiosResponse = yield call(loginApi, action.payload.obj);
        if (response.data.status) {
            if (action.payload.callBack) {
                action.payload.callBack(response.data);
            }
            localStorage.setItem("token", response?.data?.data?.access_token);
            window.location.reload();
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action.payload.callBack) {
                action.payload.callBack(error?.response?.data);
            }
            yield put(loginSuccess(undefined));
            console.error("Error loginSaga:", error);
        }
    }
}
export function* getAuthUserSaga(action: ReturnType<typeof getAuthUser>) {
    try {
        const response: AxiosResponse = yield call(getAuthUserApi);
        if (response.data.status) {
            yield put(getAuthUserSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAuthUserSuccess(undefined));
            console.error("Error getAuthUserSaga:", error);
        }
    }
}
export function* getAllRolesSaga(action: ReturnType<typeof getAllRoles>) {
    try {
        const response: AxiosResponse = yield call(getAllRolesApi, action.payload);
        if (response.data.status) {
            yield put(getAllRolesSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllRolesSuccess(undefined));
            console.error("Error getAllRolesSaga:", error);
        }
    }
}
export function* getAllRolesWithouPaginationSaga(action: ReturnType<typeof getAllRolesWithoutPagination>) {
    try {
        const response: AxiosResponse = yield call(getAllRolesWithoutPaginationApi);
        if (response.data.status) {
            yield put(getAllRolesWithoutPaginationSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllRolesWithoutPaginationSuccess(undefined));
            console.error("Error getAllRolesSaga:", error);
        }
    }
}
export function* getRoleByIDSaga(action: ReturnType<typeof getRoleByID>) {
    try {
        const response: AxiosResponse = yield call(getRoleByIDApi, action.payload);
        if (response.data.status) {
            yield put(getRoleByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getRoleByIDSuccess(undefined));
            console.error("Error getRoleByIDSaga:", error);
        }
    }
}
export function* updateRoleByIDSaga(action: ReturnType<typeof updateRoleByID>) {
    try {
        const response: AxiosResponse = yield call(updateRoleByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(response.data);
            }
            yield put(updateRoleByIDSuccess());
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(error?.response?.data);
            }
            yield put(updateRoleByIDSuccess());
            console.error("Error updateRoleByIDSaga:", error);
        }
    }
}
export function* deleteRoleByIDSaga(action: ReturnType<typeof deleteRoleByID>) {
    try {
        const response: AxiosResponse = yield call(deleteRoleByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(response.data);
            }
            yield put(deleteRoleByIDSuccess());
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(error?.response?.data);
            }
            yield put(deleteRoleByIDSuccess());
            console.error("Error deleteRoleByIDSaga:", error);
        }
    }
}
export function* getPermissionsSaga(action: ReturnType<typeof getPermissions>) {
    try {
        const response: AxiosResponse = yield call(getPermissionsApi, action.payload);
        if (response.data.status) {
            yield put(getPermissionsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getPermissionsSuccess(undefined));
            console.error("Error getPermissionsSaga:", error);
        }
    }
}
export function* getMasterPermissionsSaga(action: ReturnType<typeof getMasterPermissions>) {
    try {
        const response: AxiosResponse = yield call(getMasterPermissionsApi);
        if (response.data.status) {
            yield put(getMasterPermissionsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getMasterPermissionsSuccess(undefined));
            console.error("Error getMasterPermissionsSaga:", error);
        }
    }
}

export function* getPermissionByIDSaga(action: ReturnType<typeof getPermissionByID>) {
    try {
        const response: AxiosResponse = yield call(getPermissionByIDApi, action.payload);
        if (response.data.status) {
            yield put(getPermissionByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getPermissionByIDSuccess(undefined));
            console.error("Error getPermissionByIDSaga:", error);
        }
    }
}
export function* updatePermissionByIDSaga(action: ReturnType<typeof updatePermissionByID>) {
    try {
        const response: AxiosResponse = yield call(updatePermissionByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(response.data);
            }
            yield put(updatePermissionByIDSuccess());
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(error?.response?.data);
            }
            yield put(updatePermissionByIDSuccess());
            console.error("Error updatePermissionByIDSaga:", error);
        }
    }
}
export function* deletePermissionByIDSaga(action: ReturnType<typeof deletePermissionByID>) {
    try {
        const response: AxiosResponse = yield call(deletePermissionByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(response.data);
            }
            yield put(deletePermissionByIDSuccess());
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(error?.response?.data);
            }
            yield put(deletePermissionByIDSuccess());
            console.error("Error deletePermissionByIDSaga:", error);
        }
    }
}
export function* createRoleSaga(action: ReturnType<typeof createRole>) {
    try {
        const response: AxiosResponse = yield call(createRoleApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createRoleSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(error?.response?.data);
            }
            ErrorToast(error?.response?.data?.message);
            yield put(createRoleSuccess(undefined));
            console.error("Error createRoleSaga:", error);
        }
    }
}

export function* createPermissionSaga(action: ReturnType<typeof createPermission>) {
    try {
        const response: AxiosResponse = yield call(createPermissionApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack();
            yield put(createPermissionSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            yield put(createPermissionSuccess(undefined));
            console.error("Error createPermissionSaga:", error);
        }
    }
}
export function* getUserDetailListSaga(action: ReturnType<typeof getUsers>) {
    try {
        const response: AxiosResponse = yield call(getAllUsersListApi, action.payload);
        if (response.data.status) {
            yield put(getUsersSuccess(response.data.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getUsersSuccess(undefined));
            console.error("Error getUserDetailListSaga:", error);
        }
    }
}
export function* getUserDetailByIDSaga(action: ReturnType<typeof getUserDetailByID>) {
    try {
        const response: AxiosResponse = yield call(getUserDetailByIDApi, action.payload);
        if (response.data.status) {
            yield put(getUserDetailByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getUserDetailByIDSuccess(undefined));
            console.error("Error getUserDetailByIDSaga:", error);
        }
    }
}
export function* updateUserDetailByIDSaga(action: ReturnType<typeof updateUserDetailByID>) {
    try {
        const response: AxiosResponse = yield call(updateUserDetailByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(response.data);
            }
            yield put(updateUserDetailByIDSuccess());
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(error?.response?.data);
            }
            yield put(updateUserDetailByIDSuccess());
            console.error("Error updateUserDetailByIDSaga:", error);
        }
    }
}
export function* deleteUserDetailByIDSaga(action: ReturnType<typeof deleteUserDetailByID>) {
    try {
        const response: AxiosResponse = yield call(deleteUserDetailByIDApi, action.payload.id);
        if (response?.data?.status) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(response.data);
            }
            yield put(deleteUserDetailByIDSuccess());
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(error?.response?.data);
            }
            yield put(deleteUserDetailByIDSuccess());
            console.error("Error deleteUserDetailByIDSaga:", error);
        }
    }
}
export function* createUserSaga(action: ReturnType<typeof createUser>) {
    try {
        const response: AxiosResponse = yield call(createUserApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createUserSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack) {
                action?.payload?.callBack(error?.response?.data);
            }
            ErrorToast(error?.response?.data?.message);
            yield put(createUserSuccess(undefined));
            console.error("Error createUserSaga:", error);
        }
    }
}

function* uploadAdminImageSaga(action: ReturnType<typeof uploadAdminImage>) {
    const { payload: { file, isAdminUser }, meta: { callBack } } = action;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isAdminUser", JSON.stringify(isAdminUser));
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_IMAGE_FAILURE", payload: error });
        callBack(error);
    }
}

export function* forgotPasswordSaga(action: ReturnType<typeof forgotpassword>) {
    try {
        const response: AxiosResponse = yield call(forgotPasswordApi, action.payload.obj);
        if (response.data.status) {
            if (action.payload.callBack) {
                action.payload.callBack(response.data);
            }
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action.payload.callBack) {
                action.payload.callBack(error?.response?.data);
            }
            console.error("Error forgotPasswordSaga:", error);
        }
    }
}

// Saga for handling reset password
export function* resetPasswordSaga(action: ReturnType<typeof resetPassword>) {
    try {
        const response: AxiosResponse = yield call(resetPasswordApi, action.payload?.obj);
        if (response.data.status) {
            if (action.payload.callBack) {
                action.payload.callBack(response.data);
            }
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action.payload.callBack) {
                action.payload.callBack(error?.response?.data);
            }
            console.error("Error resetPasswordSaga:", error);
        }
    }
}


export function* watchAuthSaga() {
    yield takeLatest(login.type, loginSaga);
    yield takeLatest(getAuthUser.type, getAuthUserSaga);
    yield takeLatest(getAllRoles.type, getAllRolesSaga);
    yield takeLatest(getAllRolesWithoutPagination.type, getAllRolesWithouPaginationSaga);
    yield takeLatest(getRoleByID.type, getRoleByIDSaga);
    yield takeLatest(updateRoleByID.type, updateRoleByIDSaga);
    yield takeLatest(deleteRoleByID.type, deleteRoleByIDSaga);
    yield takeLatest(getPermissions.type, getPermissionsSaga);
    yield takeLatest(getPermissionByID.type, getPermissionByIDSaga);
    yield takeLatest(updatePermissionByID.type, updatePermissionByIDSaga);
    yield takeLatest(getMasterPermissions, getMasterPermissionsSaga);
    yield takeLatest(createPermission.type, createPermissionSaga);
    yield takeLatest(createRole.type, createRoleSaga);
    yield takeLatest(deletePermissionByID.type, deletePermissionByIDSaga);
    yield takeLatest(getUsers.type, getUserDetailListSaga);
    yield takeLatest(getUserDetailByID.type, getUserDetailByIDSaga);
    yield takeLatest(updateUserDetailByID.type, updateUserDetailByIDSaga);
    yield takeLatest(deleteUserDetailByID.type, deleteUserDetailByIDSaga);
    yield takeLatest(createUser.type, createUserSaga);
    yield takeLatest(uploadAdminImage.type, uploadAdminImageSaga);
    yield takeLatest(forgotpassword.type, forgotPasswordSaga);
    yield takeLatest(resetPassword.type, resetPasswordSaga);
}
