import { createSlice } from "@reduxjs/toolkit";
import { pluginReducerProps } from "../../../@types/store/reducer/plugin.reducer";
const initialState: pluginReducerProps = {
    loader: false,
    InstituteDetails: undefined,
    masterInstituteById: undefined,
    parentByType: [],
    childByType: [],
    membersList: [],
    childInstituteById: undefined,
    childInstituteDetails: undefined,
    manageTbList: undefined,
    getMembersListById: undefined,
    instituteList: undefined,
    QueryListById: undefined,
    closedQueryListById: undefined,
    transferedQueryListById: undefined,
    QuerryReportsById: undefined,
    QuestionList: undefined,
    questionById: undefined,
    AssessmentList: undefined,
    AssessmentById: undefined,
    QuestionListWithoutPagination: undefined,
    selectedQuestionList: undefined,
    openQueryListById: undefined,
    reportData: undefined,
    kbasereport: undefined,
    kbaseCoursereport: undefined,
};

const plugin = createSlice({
    name: "plugin",
    initialState: initialState,
    reducers: {
        getAllMasterInstitute(state, { payload }) {
            state.loader = true;
        },
        getAllMasterInstituteSuccess(state, { payload }) {
            state.loader = false;
            state.InstituteDetails = payload;
        },
        cleanAllInstitute(state) {
            state.InstituteDetails = undefined;
        },
        createMasterInstitute(state, { payload }) {
            state.loader = true;
        },
        createMasterInstituteSuccess(state, { payload }) {
            state.loader = false;
        },
        getParentInstituteByType(state, { payload }) {
            state.loader = true;
        },
        getParentInstituteByTypeSuccess(state, { payload }) {
            state.loader = false;
            state.parentByType = payload;
        },
        clearParentInstituteByType(state) {
            state.parentByType = [];
        },
        getMasterInstituteByID(state, { payload }) {
            state.loader = true;
        },
        getMasterInstituteByIDSuccess(state, { payload }) {
            state.loader = false;
            state.masterInstituteById = payload;
        },
        updateMasterinstituteById(state) {
            state.loader = true;
        },
        updateMasterInstituteByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteMasterInstituteByID(state) {
            state.loader = true;
        },
        deleteMasterInstituteByIDSuccess(state, { payload }) {
            state.loader = false;
        },
        clearMasterInstituteId(state) {
            state.masterInstituteById = undefined;
        },
        getAllChildInstitute(state, { payload }) {
            state.loader = true;
        },
        getAllChildInstituteSuccess(state, { payload }) {
            state.loader = false;
            state.childInstituteDetails = payload;
        },
        createChildInstitute(state, { payload }) {
            state.loader = true;
        },
        createChildInstituteSuccess(state, { payload }) {
            state.loader = false;
        },
        getChildInstituteByType(state, { payload }) {
            state.loader = true;
        },
        getChildInstituteByTypeSuccess(state, { payload }) {
            state.loader = false;
            state.childByType = payload;
        },
        clearChildByType(state) {
            state.childByType = [];
        },
        getMembersByInstitute(state, { payload }) {
            state.loader = true;
        },
        getMembersByInstituteSuccess(state, { payload }) {
            state.loader = false;
            state.membersList = payload;
        },
        getAllSubscribersSearch(state, { payload }) {
            state.loader = true;
        },
        getAllSubscribersSearchSuccess(state, { payload }) {
            state.loader = false;
            state.membersList = payload;
        },
        clearSubscribersSearch(state) {
            state.membersList = undefined;
        },
        getChildInstituteByID(state, { payload }) {
            state.loader = true;
        },
        getChildInstituteByIDSuccess(state, { payload }) {
            state.loader = false;
            state.childInstituteById = payload;
        },
        clearChildInstituteId(state) {
            state.childInstituteById = undefined;
        },
        updateChildInstituteById(state) {
            state.loader = true;
        },
        updateChildInstituteByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteChildInstitute(state) {
            state.loader = true;
        },
        deleteChildInstituteSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllManageTb(state, { payload }) {
            state.loader = true;
        },
        clearAllManageTbList(state) {
            state.manageTbList = undefined;
        },
        getAllManageTbSuccess(state, { payload }) {
            state.loader = false;
            state.manageTbList = payload;
        },
        createManageTb(state, { payload }) {
            state.loader = true;
        },
        createManageTbSuccess(state, { payload }) {
            state.loader = false;
        },
        cleanAllChildInstitutes(state) {
            state.childInstituteDetails = undefined;
        },
        createInstituteMember(state) {
            state.loader = true;
        },
        createInstituteMemberSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllMemberByInstituteId(state, { payload }) {
            state.loader = true;
        },
        getAllMemberByInstituteIdSuccess(state, { payload }) {
            state.loader = false;
            state.getMembersListById = payload;
        },
        clearAllMembersByInstituteId(state) {
            state.getMembersListById = undefined;
        },
        deleteInstituteMemberById(state, { payload }) {
            state.loader = true;
        },
        deleteInstituteMemberByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        transferOwnership(state) {
            state.loader = false;
        },
        transferOwnershipSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllInstituteList(state) {
            state.loader = true;
        },
        getAllInstituteListSuccess(state, { payload }) {
            state.loader = false;
            state.instituteList = payload;
        },
        clearInstituteList(state) {
            state.instituteList = undefined;
        },
        getAllQueryListById(state, { payload }) {
            state.loader = true;
        },
        getAllQueryListByIdSuccess(state, { payload }) {
            state.loader = false;
            state.QueryListById = payload;
        },
        clearAllQueryListById(state) {
            state.QueryListById = undefined;
        },
        transferQuerrySuccess(state, { payload }) {
            state.loader = false;
        },
        getAllClosedQueryListbyId(state, { payload }) {
            state.loader = true;
        },
        getAllClosedQueryListbyIdSuccess(state, { payload }) {
            state.loader = false;
            state.closedQueryListById = payload;
        },
        getAllTransferedQueryListById(state, { payload }) {
            state.loader = true;
        },
        getAllTransferedQueryListByIdSuccess(state, { payload }) {
            state.loader = false;
            state.transferedQueryListById = payload;
        },
        clearAllTransferedQueryListbyId(state) {
            state.transferedQueryListById = undefined;
        },
        getAllOpenQueryListById(state, { payload }) {
            state.loader = true;
        },
        getAllOpenQueryListByIdSuccess(state, { payload }) {
            state.loader = false;
            state.openQueryListById = payload;
        },
        clearAllOpenQueryListbyId(state) {
            state.openQueryListById = undefined;
        },
        clearAllClosedQueryListById(state) {
            state.closedQueryListById = undefined;
        },
        getAllQueryReportsListbyId(state, { payload }) {
            state.loader = true;
        },
        getAllQueryReportsListbyIdSuccess(state, { payload }) {
            state.loader = false;
            state.QuerryReportsById = payload;
        },
        clearAllQuerryReportsById(state) {
            state.QuerryReportsById = undefined;
        },
        getAllQuestionList(state, { payload }) {
            state.loader = true;
        },
        getAllQuestionListSuccess(state, { payload }) {
            state.loader = false;
            state.QuestionList = payload;
        },
        clearAllQuestionList(state) {
            state.QuestionList = undefined;
        },
        getQuestionById(state, { payload }) {
            state.loader = true;
        },
        getQuestionByIdSuccess(state, { payload }) {
            state.loader = false;
            state.questionById = payload;
        },
        clearQuestionById(state) {
            state.questionById = undefined;
        },
        createQuestionSuccess(state, { payload }) {
            state.loader = false;
        },
        updateQuestionSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteQuestionSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllAssessmentList(state, { payload }) {
            state.loader = false;
        },
        getAllAssessmentListSuccess(state, { payload }) {
            state.loader = false;
            state.AssessmentList = payload;
        },
        clearAllAssessmentList(state) {
            state.AssessmentList = undefined;
        },
        getAssessmentById(state, { payload }) {
            state.loader = true;
        },
        getAssessmentByIdSuccess(state, { payload }) {
            state.loader = false;
            state.AssessmentById = payload;
        },
        clearAssessmentById(state) {
            state.AssessmentById = undefined;
        },
        updateAssessmentSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteAssessmentSuccess(state, { payload }) {
            state.loader = false;
        },
        createAssessmentSuccess(state, { payload }) {
            state.loader = false;
        },
        getQuestionsWithoutPagination(state, { payload }) {
            state.loader = false;
        },
        getQuestionsWithoutPaginationSuccess(state, { payload }) {
            state.loader = false;
            state.QuestionListWithoutPagination = payload;
        },
        getQuestionsWithoutPaginationReport(state, { payload }) {
            state.loader = false;
        },
        getQuestionsWithoutPaginationReportSuccess(state, { payload }) {
            state.loader = false;
            state.QuestionListWithoutPagination = payload;
        },
        clearQuestionsWithoutPagination(state) {
            state.QuestionListWithoutPagination = undefined;
        },
        setSelectedQestions(state, { payload }) {
            state.selectedQuestionList = payload;
        },
        clearSelectedQuestions(state) {
            state.selectedQuestionList = [];
        },
        getReportData(state, { payload }) {
            state.loader = true;
        },
        getReportDataSuccess(state, { payload }) {
            state.loader = false;
            state.reportData = payload;
        },
        clearReportData(state) {
            state.reportData = undefined;
        },
        copyAssessmentSuccess(state, { payload }) {
            state.loader = false;
        },
        setActiveAssessmentSuccess(state, { payload }) {
            state.loader = false;
        },
        getKbasereport(state, { payload }) {
            state.loader = true;
        },
        getKbasereportSuccess(state, { payload }) {
            state.loader = false;
            state.kbasereport = payload;
        },
        clearKbasereport(state) {
            state.kbasereport = undefined;
        },
        getKbaseCoursereport(state, { payload }) {
            state.loader = true;
        },
        getKbaseCoursereportSuccess(state, { payload }) {
            state.loader = false;
            state.kbaseCoursereport = payload;
        },
        clearKbaseCoursereport(state) {
            state.kbaseCoursereport = undefined;
        },
    }
});
export const { getAllMasterInstitute, getAllMasterInstituteSuccess, cleanAllInstitute, createMasterInstituteSuccess, updateChildInstituteById, updateChildInstituteByIdSuccess, updateMasterinstituteById, getAllInstituteList, getAllInstituteListSuccess, createQuestionSuccess, deleteQuestionSuccess, updateQuestionSuccess, getAllAssessmentList, getAllAssessmentListSuccess, getAssessmentById, getAssessmentByIdSuccess, clearAllAssessmentList, clearAssessmentById, getAllOpenQueryListById, getAllOpenQueryListByIdSuccess, clearAllOpenQueryListbyId,
    getParentInstituteByType, getParentInstituteByTypeSuccess, getMasterInstituteByID, getMasterInstituteByIDSuccess, updateMasterInstituteByIdSuccess, deleteMasterInstituteByIDSuccess, clearParentInstituteByType, clearChildByType, getAllQueryListById, getAllQueryListByIdSuccess, clearAllQuerryReportsById, getQuestionById, getQuestionByIdSuccess, clearQuestionById, createAssessmentSuccess, updateAssessmentSuccess, deleteAssessmentSuccess, setSelectedQestions, clearSelectedQuestions, copyAssessmentSuccess,
    clearMasterInstituteId, getAllChildInstitute, getAllChildInstituteSuccess, createChildInstitute, createChildInstituteSuccess, getChildInstituteByType, getChildInstituteByTypeSuccess, transferOwnershipSuccess, clearAllMembersByInstituteId, transferQuerrySuccess, getAllQueryReportsListbyId, getAllQueryReportsListbyIdSuccess, clearAllQuestionList, getQuestionsWithoutPagination, getQuestionsWithoutPaginationSuccess, clearQuestionsWithoutPagination,
    getMembersByInstitute, getMembersByInstituteSuccess, getAllSubscribersSearch, getAllSubscribersSearchSuccess, getChildInstituteByID, getChildInstituteByIDSuccess, clearChildInstituteId, clearSubscribersSearch, deleteChildInstituteSuccess, getAllClosedQueryListbyId, getAllClosedQueryListbyIdSuccess, getAllTransferedQueryListById, getAllTransferedQueryListByIdSuccess, clearAllClosedQueryListById, clearAllTransferedQueryListbyId, setActiveAssessmentSuccess,
    getAllManageTb, getAllManageTbSuccess, clearAllManageTbList, createManageTbSuccess, cleanAllChildInstitutes, createInstituteMemberSuccess, getAllMemberByInstituteIdSuccess, getAllMemberByInstituteId, deleteInstituteMemberByIdSuccess, clearAllQueryListById, clearInstituteList, getAllQuestionList, getAllQuestionListSuccess, getQuestionsWithoutPaginationReport, getQuestionsWithoutPaginationReportSuccess,getKbaseCoursereport,getKbasereportSuccess, clearKbasereport, clearKbaseCoursereport,getKbaseCoursereportSuccess,getKbasereport } = plugin.actions;

export default plugin.reducer;
