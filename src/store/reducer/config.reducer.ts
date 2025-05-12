import { createSlice } from "@reduxjs/toolkit";
import { configReducerProps } from "../../../@types/store/reducer/config.reducer";
const initialState: configReducerProps = {
    loader: false,
    configDetails: undefined,
    configById: undefined,
    appFlagsDetails: undefined,
    getAppFlagById: undefined,
    masterCmsList: undefined,
    masterCmsById: undefined,
    userNotificationList: undefined,
    userNotificationById: undefined,
    masterDropdown: undefined,
    messageNotificationList: undefined,
};
const config = createSlice({
    name: "configReducer",
    initialState: initialState,
    reducers: {
        getAllConfig(state, { payload }) {
            state.loader = true;
        },
        getAllConfigSuccess(state, { payload }) {
            state.loader = false;
            state.configDetails = payload;
        },
        cleanAllConfig(state) {
            state.configDetails = undefined;
        },
        getConfigByID(state, { payload }) {
            state.loader = true;
        },
        getConfigByIDSuccess(state, { payload }) {
            state.loader = false;
            state.configById = payload;
        },
        cleanConfigByID(state) {
            state.configById = undefined;
        },
        createConfig(state, { payload }) {
            state.loader = true;
        },
        createConfigSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteConfigByID(state, { payload }) {
            state.loader = true;
        },
        deleteConfigByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        updateConfigByID(state, { payload }) {
            state.loader = true;
        },
        updateConfigByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllAppManagmentFlags(state, { payload }) {
            state.loader = true;
        },
        getAllAppManagmentFlagsSuccess(state, { payload }) {
            state.loader = false;
            state.appFlagsDetails = payload;
        },
        cleanAllAppManagmentFlags(state) {
            state.appFlagsDetails = undefined;
        },
        getAppFlagByID(state, { payload }) {
            state.loader = true;
        },
        getAppFlagByIDSuccess(state, { payload }) {
            state.loader = false;
            state.getAppFlagById = payload;
        },
        cleanAppFlagByID(state) {
            state.getAppFlagById = undefined;
        },
        updateAppManagmentByID(state, { payload }) {
            state.loader = true;
        },
        updateAppManagmentByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        createAppManagmentFlag(state) {
            state.loader = true;
        },
        createAppManagmentFlagSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteAppManagmentByID(state, { payload }) {
            state.loader = true;
        },
        deleteAppManagmentByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllMasterCms(state, { payload }) {
            state.loader = true;
        },
        getAllMasterCmsSuccess(state, { payload }) {
            state.loader = false;
            state.masterCmsList = payload;
        },
        cleanMasterCmsList(state) {
            state.masterCmsList = undefined;
        },
        getMasterCmsByID(state, { payload }) {
            state.loader = true;
        },
        getMasterCmsByIDSuccess(state, { payload }) {
            state.loader = false;
            state.masterCmsById = payload;
        },
        cleanMasterCmsByID(state) {
            state.masterCmsById = undefined;
        },
        createMasterCmsSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteMasterCmsByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        updateMasterCmsByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllUserNotification(state, { payload }) {
            state.loader = true;
        },
        getAllUserNotificationSuccess(state, { payload }) {
            state.loader = false;
            state.userNotificationList = payload;
        },
        cleanAllUserNotification(state) {
            state.userNotificationList = undefined;
        },
        getUserNotificationByID(state, { payload }) {
            state.loader = true;
        },
        getUserNotificationByIDSuccess(state, { payload }) {
            state.userNotificationById = payload;
        },
        cleanUserNotificationByID(state) {
            state.userNotificationById = undefined;
        },
        createUserNotificationSuccess(state, { payload }) {
            state.loader = false;
        },
        getMasterDropdown(state) {
            state.loader = true;
        },
        getMasterDropdownSuccess(state, { payload }) {
            state.loader = false;
            state.masterDropdown = payload;
        },
        getAllMessageNotification(state, { payload }) {
            state.loader = true;
        },
        getAllMessageNotificationSuccess(state, { payload }) {
            state.loader = false;
            state.messageNotificationList = payload;
        },
        cleanAllMessageNotification(state) {
            state.messageNotificationList = undefined;
        },
        createMessageNotificationSuccess(state, { payload }) {
            state.loader = false;
        }
    }
});
export const { getAllConfig, getAllConfigSuccess, cleanAllConfig, getConfigByID, getConfigByIDSuccess, cleanConfigByID, createConfig,getAllMessageNotification,getAllMessageNotificationSuccess,cleanAllMessageNotification,createMessageNotificationSuccess,
    createConfigSuccess, updateConfigByID, updateConfigByIDSuccess, deleteConfigByIDSuccess, getAllMasterCms, getAllMasterCmsSuccess, getMasterCmsByID, getMasterCmsByIDSuccess, updateMasterCmsByIDSuccess, deleteMasterCmsByIDSuccess, createMasterCmsSuccess, cleanMasterCmsList, cleanMasterCmsByID,
    getAllAppManagmentFlags, getAllAppManagmentFlagsSuccess, getAppFlagByID, getAppFlagByIDSuccess, updateAppManagmentByIDSuccess, createUserNotificationSuccess, getMasterDropdown, getMasterDropdownSuccess,
    createAppManagmentFlagSuccess, deleteAppManagmentByIDSuccess, cleanAppFlagByID, cleanAllAppManagmentFlags, getAllUserNotification, getAllUserNotificationSuccess, cleanAllUserNotification } = config.actions;

export default config.reducer;
