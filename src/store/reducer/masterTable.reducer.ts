import { createSlice } from "@reduxjs/toolkit";
import { masterTableProps } from "master-table";
const initialState: masterTableProps = {
    loader: false,
    caderDetails: undefined,
    countryDetails: undefined,
    blockDetails: undefined,
    districtDetails: undefined,
    stateDetails: undefined,
    blockById: undefined,
    districtById: undefined,
    caderById: undefined,
    stateById: undefined,
    countryById: undefined,
    countryList: undefined,
    caderList: undefined,
    stateList: undefined,
    cadreTypeList: undefined,
    districtList: undefined,
    blockList: undefined,
    allCaderTypes: undefined,
    healthFacilityDetails: undefined,
    healthFacilityById: undefined,
    healthFacilityList: undefined,
    primaryCaderDetails: undefined,
    primaryCaderById: undefined,
    primaryCaderList: undefined,
    symptomsDetail: undefined,
    symptomById: undefined,
    assessmentCertificateList: undefined,
    assessmentCertificateById: undefined,
    assessmentCertificatesListWithoutPagination: undefined,
    assessmentQuestionReport: undefined,
    assessmentResultReport: undefined,
    redirectNodes: [],
    pluginManagementList: undefined,
    pluginManagementById: undefined,
    surveyList: undefined
};
const MasterTable = createSlice({
    name: "masterTable",
    initialState: initialState,
    reducers: {
        getcader(state, { payload }) {
            state.loader = true;
        },
        getcaderSuccess(state, { payload }) {
            state.caderDetails = payload;
            state.loader = false;
        },
        clearCader(state) {
            state.caderDetails = undefined;
        },
        getHealthFacilities(state, { payload }) {
            state.loader = true;
        },
        getHealthFacilitiesSuccess(state, { payload }) {
            state.loader = false;
            state.healthFacilityDetails = payload;
        },
        clearHealthFacilities(state) {
            state.healthFacilityDetails = undefined;
        },
        createHealthFacility(state, { payload }) {
            state.loader = true;
        },
        createHealthFacilitySuccess(state, { payload }) {
            state.loader = false;
        },
        updateHealthFacility(state, { payload }) {
            state.loader = true;
        },
        updateHealthFacilitySuccess(state, { payload }) {
            state.loader = false;
        },
        deleteHealthFacility(state, { payload }) {
            state.loader = true;
        },
        deleteHealthFacilitySuccess(state, { payload }) {
            state.loader = false;
        },
        getHealthFacilityById(state, { payload }) {
            state.loader = true;
        },
        getHealthFacilityByIdSuccess(state, { payload }) {
            state.healthFacilityById = payload;
            state.loader = false;
        },
        clearHealthFacilityById(state) {
            state.healthFacilityById = undefined;
        },
        deleteHealthFacilityById(state, { payload }) {
            state.loader = true;
        },
        deleteHealthFacilityByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllCountryList(state) {
            state.loader = true;
        },
        getAllCountryListSuccess(state, { payload }) {
            state.countryList = payload;
            state.loader = false;
        },
        cleartAllCountryList(state) {
            state.countryList = undefined;
        },
        getAllStateList(state) {
            state.loader = true;
        },
        getAllStateListSuccess(state, { payload }) {
            state.stateList = payload;
            state.loader = false;
        },
        getAllCadreList(state) {
            state.loader = true;
        },
        getAllCadreListSuccess(state, { payload }) {
            state.caderList = payload;
            state.loader = false;
        },
        cleartAllStateList(state) {
            state.stateList = undefined;
        },
        getAllDistrictList(state, { payload }) {
            state.loader = true;
        },
        getAllDistrictListSuccess(state, { payload }) {
            state.districtList = payload;
            state.loader = false;
        },
        cleartAllDistrictList(state) {
            state.districtList = undefined;
        },
        getAllCaderTypeList(state) {
            state.loader = true;
        },
        getAllCaderTypeListSuccess(state, { payload }) {
            state.cadreTypeList = payload;
            state.loader = false;
        },
        cleartAllCaderTypeList(state) {
            state.cadreTypeList = undefined;
        },
        getCaderById(state, { payload }) {
            state.loader = true;
        },
        getCaderByIdSuccess(state, { payload }) {
            state.caderById = payload;
            state.loader = false;
        },
        getStateById(state, { payload }) {
            state.loader = true;
        },
        getStateByIdSuccess(state, { payload }) {
            state.stateById = payload;
            state.loader = false;
        },
        getCountry(state, { payload }) {
            state.loader = true;
        },
        getCountrySuccess(state, { payload }) {
            state.countryDetails = payload;
            state.loader = false;
        },
        clearCountry(state) {
            state.countryDetails = undefined;
        },
        getCountryById(state, { payload }) {
            state.loader = true;
        },
        getCountryByIdSuccess(state, { payload }) {
            state.countryById = payload;
            state.loader = false;
        },
        getBlock(state, { payload }) {
            state.loader = true;
        },
        getBlockSuccess(state, { payload }) {
            state.blockDetails = payload;
            state.loader = false;
        },
        clearBlock(state) {
            state.blockDetails = undefined;
        },
        getBlockById(state, { payload }) {
            state.loader = true;
        },
        getBlockByIdSuccess(state, { payload }) {
            state.blockById = payload;
            state.loader = false;
        },
        clearBlockById(state) {
            state.blockById = undefined;
        },
        deleteBlockById(state, { payload }) {
            state.loader = true;
        },
        deleteBlockByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        getDistrict(state, { payload }) {
            state.loader = true;
        },
        getDistrictSuccess(state, { payload }) {
            state.districtDetails = payload;
            state.loader = false;
        },
        clearDistrict(state) {
            state.districtDetails = undefined;
        },
        getDistrictById(state, { payload }) {
            state.loader = true;
        },
        getDistrictByIdSuccess(state, { payload }) {
            state.districtById = payload;
            state.loader = false;
        },
        clearDistrictById(state) {
            state.districtById = undefined;
        },
        deleteDistrictById(state, { payload }) {
            state.loader = true;
        },
        deleteDistrictByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        getState(state, { payload }) {
            state.loader = true;
        },
        getStateSuccess(state, { payload }) {
            state.stateDetails = payload;
            state.loader = false;
        },
        clearState(state) {
            state.stateDetails = undefined;
        },
        createState(state, { payload }) {
            state.loader = true;
        },
        createStateSuccess(state, { payload }) {
            state.loader = false;
        },
        updateState(state) {
            state.loader = true;
        },
        updateStateSuccess(state, { payload }) {
            state.loader = false;
        },
        createDistrict(state, { payload }) {
            state.loader = true;
        },
        createDistrictSuccess(state, { payload }) {
            state.loader = false;
        },
        updateDistrict(state, { payload }) {
            state.loader = true;
        },
        updateDistrictSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllCaderTypes(state) {
            state.loader = true;
            state.allCaderTypes = undefined;
        },
        getAllCaderTypesSuccess(state, { payload }) {
            state.allCaderTypes = payload;
            state.loader = false;
        },
        clearAllCaderTypes(state) {
            state.allCaderTypes = undefined;
        },
        getCaderBytypesList(state, { payload }) {
            state.loader = false;
            state.caderList = undefined;
        },
        getCaderBytypesListSuccess(state, { payload }) {
            state.loader = false;
            state.caderList = payload;
        },
        clearCaderBytypesList(state) {
            state.caderList = undefined;
        },
        createCader(state, { payload }) {
            state.loader = true;
        },
        createCaderSuccess(state, { payload }) {
            state.loader = false;
        },
        updateCader(state, { payload }) {
            state.loader = true;
        },
        updateCaderSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteCader(state, { payload }) {
            state.loader = true;
        },
        deleteCaderSuccess(state, { payload }) {
            state.loader = false;
        },
        clearCaderDetails(state) {
            state.caderById = undefined;
        },
        createCountry(state, { payload }) {
            state.loader = true;
        },
        createCountrySuccess(state, { payload }) {
            state.loader = false;
        },
        updateCountry(state, { payload }) {
            state.loader = true;
        },
        updateCountrySuccess(state, { payload }) {
            state.loader = false;
        },
        deleteCountry(state, { payload }) {
            state.loader = true;
        },
        deleteCountrySuccess(state, { payload }) {
            state.loader = false;
        },
        clearCountryDetails(state) {
            state.countryById = undefined;
        },
        deleteState(state, { payload }) {
            state.loader = true;
        },
        deleteStateSuccess(state, { payload }) {
            state.loader = false;
        },
        clearStateByID(state) {
            state.stateById = undefined;
        },
        createBlock(state, { payload }) {
            state.loader = true;
        },
        createBlockSuccess(state, { payload }) {
            state.loader = false;
        },
        updateBlock(state, { payload }) {
            state.loader = true;
        },
        updateBlockSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteBlock(state, { payload }) {
            state.loader = true;
        },
        deleteBlockSuccess(state, { payload }) {
            state.loader = false;
        },
        getAllBlockList(state, { payload }) {
            state.loader = true;
        },
        getAllBlockListSuccess(state, { payload }) {
            state.loader = false;
            state.blockList = payload;
        },
        clearAllBlockList(state) {
            state.blockList = undefined;
        },
        getAllHealthFacilityList(state, { payload }) {
            state.loader = true;
        },
        getAllHealthFacilityListSuccess(state, { payload }) {
            state.loader = false;
            state.healthFacilityList = payload;
        },
        clearAllHealthFacilityList(state) {
            state.healthFacilityList = undefined;
        },
        getAllPrimaryCaderList(state) {
            state.loader = true;
        },
        getAllPrimaryCaderListSuccess(state, { payload }) {
            state.loader = true;
            state.primaryCaderList = payload;
        },
        clearAllPrimaryCaderList(state) {
            state.primaryCaderList = undefined;
        },
        getPrimaryCader(state, { payload }) {
            state.loader = true;
        },
        getPrimaryCaderSuccess(state, { payload }) {
            state.loader = false;
            state.primaryCaderDetails = payload;
        },
        clearPrimaryCaders(state) {
            state.primaryCaderDetails = undefined;
        },
        createPrimaryCader(state, { payload }) {
            state.loader = true;
        },
        createPrimaryCaderSuccess(state, { payload }) {
            state.loader = false;
        },
        updatePrimaryCader(state) {
            state.loader = true;
        },
        updatePrimaryCaderSuccess(state, { payload }) {
            state.loader = false;
        },
        deletePrimaryCader(state, { payload }) {
            state.loader = true;
        },
        deletePrimaryCaderSuccess(state, { payload }) {
            state.loader = false;
        },
        getPrimaryCaderById(state, { payload }) {
            state.loader = true;
        },
        getPrimaryCaderByIdSuccess(state, { payload }) {
            state.primaryCaderById = payload;
            state.loader = false;
        },
        clearPrimaryCaderById(state) {
            state.primaryCaderById = undefined;
        },
        getAllSymptomsList(state, { payload }) {
            state.loader = true;
        },
        getAllSymptomsListSuccess(state, { payload }) {
            state.loader = false;
            state.symptomsDetail = payload;
        },
        getSymtomById(state, { payload }) {
            state.loader = true;
        },
        getSymptomByIdSuccess(state, { payload }) {
            state.loader = false;
            state.symptomById = payload;
        },
        clearSymptomById(state) {
            state.symptomById = undefined;
        },
        updateSymptom(state, { payload }) {
            state.loader = true;
        },
        updateSymptomSuccess(state, { payload }) {
            state.loader = false;
        },
        createSymptom(state, { payload }) {
            state.loader = true;
        },
        createSymptomSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteSymptomById(state, { payload }) {
            state.loader = true;
        },
        deleteSymptomByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        clearSymptomList(state) {
            state.symptomsDetail = undefined;
        },
        getAllAssessmentCertificatesList(state, { payload }) {
            state.loader = true;
        },
        getAllAssessmentCertificatesListSuccess(state, { payload }) {
            state.loader = false;
            state.assessmentCertificateList = payload;
        },
        getAssessmentCertificateById(state, { payload }) {
            state.loader = true;
        },
        getAssessmentCertificateByIdSuccess(state, { payload }) {
            state.loader = false;
            state.assessmentCertificateById = payload;
        },
        clearAssessmentCertificateById(state) {
            state.assessmentCertificateById = undefined;
        },
        updateAssessmentCertificate(state, { payload }) {
            state.loader = true;
        },
        updateAssessmentCertificateSuccess(state, { payload }) {
            state.loader = false;
        },
        createAssessmentCertificate(state, { payload }) {
            state.loader = true;
        },
        createAssessmentCertificateSuccess(state, { payload }) {
            state.loader = false;
        },
        deleteAssessmentCertificateById(state, { payload }) {
            state.loader = true;
        },
        deleteAssessmentCertificateByIdSuccess(state, { payload }) {
            state.loader = false;
        },
        clearAssessmentCertificateList(state) {
            state.assessmentCertificateList = undefined;
        },
        getAssessmentCertificateListWithoutPagination(state) {
            state.loader = true;
        },
        getAllAssessmentCertificatesListWithoutPaginationSuccess(state, { payload }) {
            state.loader = false;
            state.assessmentCertificatesListWithoutPagination = payload;
        },
        clearAssessmentCertificateListWithoutPagination(state) {
            state.assessmentCertificatesListWithoutPagination = undefined;
        },
        getAssessmentQuestionReportSuccess(state, { payload }) {
            state.loader = false;
        },
        getAssessmentResultReportSuccess(state, { payload }) {
            state.loader = false;
        },
        getRedirectNode(state, { payload }) {
            state.loader = true;
            state.redirectNodes = [];
        },
        getRedirectNodeSuccess(state, { payload }) {
            state.loader = false;
            state.redirectNodes = payload;
        },
        clearRedirectNode(state) {
            state.loader = false;
            state.redirectNodes = [];
        },
        getAllPluginManagementList(state, { payload }) {
            state.loader = true;
        },
        getAllPluginManagementListSuccess(state, { payload }) {
            state.loader = false;
            state.pluginManagementList = payload;
        },
        getPluginManagementById(state, { payload }) {
            state.loader = true;
        },
        getPluginManagementByIdSuccess(state, { payload }) {
            state.loader = false;
            state.pluginManagementById = payload;
        },
        clearPluginManagementById(state) {
            state.pluginManagementById = undefined;
        },
        clearPluginManagementList(state) {
            state.pluginManagementList = undefined;
        },
        getAllSurveyList(state) {
            state.loader = true;
        },
        getAllSurveyListSuccess(state, { payload }) {
            state.loader = false;
            state.surveyList = payload;
        },
        clearAllSurveyList(state) {
            state.surveyList = undefined;
        }
    }
});

export const { getAllSurveyList, getAllSurveyListSuccess, clearAllSurveyList, getcader, getcaderSuccess, getBlock, getBlockSuccess, getCountry, getCountrySuccess, getDistrict, getDistrictSuccess, getState, getStateSuccess, getAllBlockList, getAllBlockListSuccess,
    getBlockById, getBlockByIdSuccess, clearBlockById, deleteBlockByIdSuccess, createState, createStateSuccess, updateStateSuccess, clearAllBlockList, clearCaderBytypesList, getAssessmentQuestionReportSuccess, getAssessmentResultReportSuccess,
    getDistrictById, getDistrictByIdSuccess, clearDistrictById, deleteDistrictByIdSuccess, createDistrict, createDistrictSuccess, updateDistrict, updateDistrictSuccess, clearAssessmentCertificateById, clearAssessmentCertificateList,
    getAllDistrictList, getAllDistrictListSuccess, getAllCaderTypes, getAllCaderTypesSuccess, getCaderBytypesList, getCaderBytypesListSuccess, createBlock, createBlockSuccess, updateBlock, updateBlockSuccess, deleteBlockSuccess, getAllAssessmentCertificatesListWithoutPaginationSuccess, getAssessmentCertificateListWithoutPagination, clearAssessmentCertificateListWithoutPagination,
    getAllCountryList, getAllCountryListSuccess, getAllStateList, getAllStateListSuccess, getCaderById, getCaderByIdSuccess, createCader, createCaderSuccess, updateCaderSuccess, clearHealthFacilities, deleteCaderSuccess, getAllCaderTypeList, getAllCaderTypeListSuccess, clearCaderDetails, getCountryById, getCountryByIdSuccess, deleteStateSuccess, clearStateByID,
    createCountry, clearCountryDetails, createCountrySuccess, updateCountry, updateCountrySuccess, deleteCountrySuccess, getStateById, getStateByIdSuccess, getHealthFacilities, getHealthFacilitiesSuccess, getAllAssessmentCertificatesList, getAllAssessmentCertificatesListSuccess, deleteAssessmentCertificateById, getAssessmentCertificateByIdSuccess, getAssessmentCertificateById, createAssessmentCertificateSuccess, deleteAssessmentCertificateByIdSuccess, updateAssessmentCertificateSuccess,
    cleartAllCaderTypeList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, clearAllCaderTypes, clearState, clearBlock, clearCader, clearCountry, clearDistrict, createHealthFacility, createHealthFacilitySuccess,
    updateCader, updateHealthFacility, updateHealthFacilitySuccess, deleteHealthFacilitySuccess, clearHealthFacilityById, getHealthFacilityById, getHealthFacilityByIdSuccess, deleteHealthFacilityByIdSuccess,
    updateState, getAllHealthFacilityList, getAllHealthFacilityListSuccess, clearAllHealthFacilityList, getPrimaryCader, getPrimaryCaderSuccess, getAllPrimaryCaderList, getAllPrimaryCaderListSuccess, getPrimaryCaderById, getPrimaryCaderByIdSuccess,
    clearAllPrimaryCaderList, clearPrimaryCaderById, clearPrimaryCaders, createPrimaryCader, createPrimaryCaderSuccess, deletePrimaryCaderSuccess, updatePrimaryCaderSuccess, getAllSymptomsList, getAllSymptomsListSuccess, getSymtomById,
    getSymptomByIdSuccess, clearSymptomById, updateSymptomSuccess, createSymptomSuccess, deleteSymptomByIdSuccess, clearSymptomList, getRedirectNode, clearRedirectNode, getRedirectNodeSuccess, getAllCadreList, getAllCadreListSuccess, getAllPluginManagementList, getAllPluginManagementListSuccess, getPluginManagementById, getPluginManagementByIdSuccess, clearPluginManagementList, clearPluginManagementById } = MasterTable.actions;

export default MasterTable.reducer;
