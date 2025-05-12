import { createSlice } from "@reduxjs/toolkit";
import { reportReducerProps } from "../../../@types/store/reducer/report.reducer";


const initialState: reportReducerProps = {
    loader: false,
    userAssessmentsList: undefined,
    proAssessmentsList: undefined,
    oldAssessmentsList: undefined,
    userActivity: undefined,
    userActivityList: undefined,
    subscriberActivityList: undefined,
    inquiryList: undefined,
    userAppVersionList: undefined,
    reportLoader: false,
    chatbotActivityList: undefined,
    subscriberById: undefined,
    prescriptionList: undefined,
    assessmentList: undefined,
    oldAssessmentList: undefined,
    actionList: undefined,
};
const report = createSlice({
    name: "report",
    initialState: initialState,
    reducers: {
        getAllUserAssessments(state, { payload }) {
            state.loader = true;
        },
        getAllUserAssessmentsSuccess(state, { payload }) {
            state.loader = false;
            state.userAssessmentsList = payload;
        },
        clearAllUserAssessments(state) {
            state.userAssessmentsList = undefined;
        },
        getAllOldAssessments(state, { payload }) {
            state.loader = true;
        },
        getAllOldAssessmentsSuccess(state, { payload }) {
            state.loader = false;
            state.oldAssessmentsList = payload;
        },
        clearAllOldAssessments(state) {
            state.oldAssessmentsList = undefined;
        },
        getAllProAssessments(state, { payload }) {
            state.loader = true;
        },
        getAllProAssessmentsSuccess(state, { payload }) {
            state.loader = false;
            state.proAssessmentsList = payload;
        },
        clearAllProAssessments(state) {
            state.proAssessmentsList = undefined;
        },
        getAllActivity(state, { payload }) {
            state.loader = true;
        },
        getAllActivitySuccess(state, { payload }) {
            state.loader = false;
            state.userActivityList = payload;
        },
        clearAllActivity(state) {
            state.userActivityList = undefined;
        },
        logActivitySuccess(state, { payload }) {
            state.loader = false;
        },
        clearActivity(state) {
            state.userActivity = undefined;
        },
        getAllsubscriberActivity(state, { payload }) {
            state.loader = true;
        },
        getAllsubscriberActivitySuccess(state, { payload }) {
            state.loader = false;
            state.subscriberActivityList = payload;
        },
        clearAllsubscriberActivity(state) {
            state.subscriberActivityList = undefined;
        },
        getAllChatbotActivity(state, { payload }) {
            state.loader = true;
        },
        getAllChatbotActivitySuccess(state, { payload }) {
            state.loader = false;
            state.chatbotActivityList = payload;
        },
        clearAllChatbotActivity(state) {
            state.chatbotActivityList = undefined;
        },
        getAllInquiry(state, { payload }) {
            state.loader = true;
        },
        getAllInquirySuccess(state, { payload }) {
            state.loader = false;
            state.inquiryList = payload;
        },
        clearAllInquiry(state) {
            state.subscriberActivityList = undefined;
        },
        getAllUserAppVersion(state, { payload }) {
            state.loader = true;
        },
        getAllUserAppVersionSuccess(state, { payload }) {
            state.loader = false;
            state.userAppVersionList = payload;
        },
        clearAllUserAppVersion(state) {
            state.userAppVersionList = undefined;
        },
        getReportStart(state) {
            state.reportLoader = true;
        },
        getReportEnd(state) {
            state.reportLoader = false;
        },
        getSubscriberById(state, { payload }) {
            state.loader = true;
        },
        getSubscriberByIdSuccess(state, { payload }) {
            state.loader = false;
            state.subscriberById = payload;
        },
        clearSubscriberById(state) {
            state.subscriberById = undefined;
        },
        getAllPrescriptions(state, { payload }) {
            state.loader = true;
        },
        getAllPrescriptionsSuccess(state, { payload }) {
            state.loader = false;
            state.prescriptionList = payload;
        },
        clearAllPrescriptions(state) {
            state.prescriptionList = undefined;
        },
        getAllAssessmentListWithoutPagination(state) {
            state.loader = true;
        },
        getAllAssessmentListWithoutPaginationSuccess(state, { payload }) {
            state.assessmentList = payload;
        },
        clearAllAssessmentListWithoutPagination(state) {
            state.assessmentList = undefined;
        },
        getAllOldAssessmentListWithoutPagination(state) {
            state.loader = true;
        },
        getAllOldAssessmentListWithoutPaginationSuccess(state, { payload }) {
            state.oldAssessmentList = payload;
        },
        clearAllOldAssessmentListWithoutPagination(state) {
            state.oldAssessmentList = undefined;
        },
        getAllActions(state) {
            state.loader = true;
        },
        getAllActionsSuccess(state, { payload }) {
            state.actionList = payload;
        },
        clearAllActions(state) {
            state.actionList = undefined;
        }

    }
});
export const { clearAllOldAssessmentListWithoutPagination, getAllOldAssessmentListWithoutPagination, getAllOldAssessmentListWithoutPaginationSuccess, clearAllOldAssessments, getAllOldAssessments, getAllOldAssessmentsSuccess, getAllActions, clearAllActions, getAllActionsSuccess, clearAllProAssessments, getAllProAssessments, getAllProAssessmentsSuccess, clearAllAssessmentListWithoutPagination, getAllAssessmentListWithoutPagination, getAllAssessmentListWithoutPaginationSuccess, clearSubscriberById, clearAllPrescriptions, getAllPrescriptions, getAllPrescriptionsSuccess, getAllUserAssessments, getAllUserAssessmentsSuccess, clearAllUserAssessments, logActivitySuccess, clearActivity, getAllActivity, getAllActivitySuccess, clearAllActivity, getAllsubscriberActivity, getAllsubscriberActivitySuccess, clearAllsubscriberActivity, getAllInquiry, getAllInquirySuccess, clearAllInquiry, getAllUserAppVersion, getAllUserAppVersionSuccess, clearAllUserAppVersion, getReportStart, getReportEnd, clearAllChatbotActivity, getAllChatbotActivity, getAllChatbotActivitySuccess, getSubscriberById, getSubscriberByIdSuccess } = report.actions;

export default report.reducer;
