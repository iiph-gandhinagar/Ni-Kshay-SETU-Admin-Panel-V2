import { createAction, createSlice } from "@reduxjs/toolkit";
import { authReducerProps, loginObj } from "auth-reducer";
import { ActionMeta } from "../../../@types/store/index";

const initialState: authReducerProps = {
    loader: false,
    isToken: localStorage.getItem("token") ? true : false,
    authUser: undefined,
    rolesDetails: undefined,
    permissionsDetails: undefined,
    roleByID: undefined,
    permissionByID: undefined,
    allPermissions: undefined,
    userDetails: undefined,
    userDetailById: undefined,
    rolesWithoutPagination: undefined,
};
export const login = createAction("AuthReducer/login", (obj: loginObj, callBack: ActionMeta<undefined>["callBack"]) => {
    return {
        payload: {
            obj: obj,
            callBack: callBack
        }
    };
});
export const forgotpassword = createAction("AuthReducer/forgotpassword", (obj: {
    email:string,
}, callBack: ActionMeta<undefined>["callBack"]) => {
    return {
        payload: {
            obj: obj,
            callBack: callBack
        }
    };
});
export const resetPassword = createAction("AuthReducer/resetPassword", (obj: {
    email:string,
    token:string,
    password:string,
}, callBack: ActionMeta<undefined>["callBack"]) => {
    return {
        payload: {
            obj: obj,
            callBack: callBack
        }
    };
});
const AuthReducer = createSlice({
    name: "AuthReducer",
    initialState: initialState,
    reducers: {
        login(state) {
            state.loader = true;
        },
        loginSuccess(state, { payload }) {
            state.loader = false;
            state.isToken = payload;
        },
        getAuthUser(state) {
            state.loader = true;
        },
        getAuthUserSuccess(state, { payload }) {
            state.loader = false;
            state.authUser = payload;
            state.isToken = payload ? true : false;
        },
        getAllRoles(state, { payload }) {
            state.loader = true;
        },
        getAllRolesSuccess(state, { payload }) {
            state.loader = false;
            state.rolesDetails = payload;
        },
        cleanAllRoles(state) {
            state.rolesDetails = undefined;
        },
        getAllRolesWithoutPagination(state) {
            state.loader = true;
        },
        getAllRolesWithoutPaginationSuccess(state, { payload }) {
            state.loader = false;
            state.rolesWithoutPagination = payload;
        },
        cleanAllRolesWithoutPagination(state) {
            state.rolesWithoutPagination = undefined;
        },
        getRoleByID(state, { payload }) {
            state.loader = true;
        },
        getRoleByIDSuccess(state, { payload }) {
            state.loader = false;
            state.roleByID = payload;
        },
        createRoleSuccess(state, { payload }) {
            state.loader = false;
        },
        cleanRoleByID(state) {
            state.roleByID = undefined;
        },
        updateRoleByID(state, { payload }) {
            state.loader = true;
        },
        updateRoleByIDSuccess(state) {
            state.loader = false;
        },
        deleteRoleByID(state, { payload }) {
            state.loader = true;
        },
        deleteRoleByIDSuccess(state) {
            state.loader = false;
        },
        createPermission(state, { payload }) {
            state.loader = true;
        },
        createPermissionSuccess(state, { payload }) {
            state.loader = false;
        },
        getPermissions(state, { payload }) {
            state.loader = true;
        },
        getPermissionsSuccess(state, { payload }) {
            state.loader = false;
            state.permissionsDetails = payload;
        },
        getMasterPermissions(state) {
            state.loader = true;
        },
        getMasterPermissionsSuccess(state, { payload }) {
            state.loader = false;
            state.allPermissions = payload;
        },
        cleanMasterPermissions(state) {
            state.allPermissions = undefined;
        },
        cleanPermissions(state) {
            state.permissionsDetails = undefined;
        },
        getPermissionByID(state, { payload }) {
            state.loader = true;
        },
        getPermissionByIDSuccess(state, { payload }) {
            state.loader = false;
            state.permissionByID = payload;
        },
        cleanPermissionByID(state) {
            state.permissionByID = undefined;
        },
        updatePermissionByID(state) {
            state.loader = true;
        },
        updatePermissionByIDSuccess(state) {
            state.loader = false;
        },
        deletePermissionByID(state) {
            state.loader = true;
        },
        deletePermissionByIDSuccess(state) {
            state.loader = false;
        },
        createUserSuccess(state, { payload }) {
            state.loader = false;
        },
        getUsers(state, { payload }) {
            state.loader = true;
        },
        getUsersSuccess(state, { payload }) {
            state.loader = false;
            state.userDetails = payload;
        },
        cleanUserList(state) {
            state.userDetails = undefined;
        },
        getUserDetailByID(state, { payload }) {
            state.loader = true;
        },
        getUserDetailByIDSuccess(state, { payload }) {
            state.loader = false;
            state.userDetailById = payload;
        },
        cleanUserDetailByID(state) {
            state.userDetailById = undefined;
        },
        updateUserDetailByID(state) {
            state.loader = true;
        },
        updateUserDetailByIDSuccess(state) {
            state.loader = false;
        },
        deleteUserDetailByID(state) {
            state.loader = true;
        },
        deleteUserDetailByIDSuccess(state) {
            state.loader = false;
        },
    }
});
export const { loginSuccess, getAuthUser, getAuthUserSuccess,
    cleanAllRoles, getAllRoles, getAllRolesSuccess, cleanRoleByID, getRoleByID, getRoleByIDSuccess, cleanMasterPermissions, createPermission, createPermissionSuccess,
    deleteRoleByIDSuccess, updateRoleByIDSuccess, getPermissions, getPermissionsSuccess, cleanPermissions, getPermissionByID, getPermissionByIDSuccess,
    cleanPermissionByID, updatePermissionByIDSuccess, deletePermissionByIDSuccess, createRoleSuccess, deleteRoleByID, getMasterPermissions, getMasterPermissionsSuccess,
    getUserDetailByID, getUserDetailByIDSuccess, cleanUserDetailByID, updatePermissionByID, updateRoleByID, updateUserDetailByID, updateUserDetailByIDSuccess, deleteUserDetailByIDSuccess,
    getUsers, getUsersSuccess, createUserSuccess, cleanUserList,getAllRolesWithoutPagination,getAllRolesWithoutPaginationSuccess,cleanAllRolesWithoutPagination
} = AuthReducer.actions;

export default AuthReducer.reducer;
