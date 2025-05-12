import { AxiosError, AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { IRootState } from "..";
import { createAssessmentCertificateApi, createBlockApi, createCaderApi, createCountryApi, createDistrictApi, createHealthFacilityApi, createPluginManagementByIDApi, createPrimaryCaderApi, createStateApi, createSymptomApi, deleteAssessmentCertificateApi, deleteBlockApi, deleteCaderApi, deleteCountryApi, deleteDistrictByIdApi, deleteHealthFacilityApi, deletePluginManagementByIDApi, deletePrimaryCaderByIDApi, deleteStateApi, deleteSymptomByIDApi, getAllAssessmentCertificateListApi, getAllAssessmentCertificateWithoutPaginationApi, getAllBlockListApi, getAllCaderTypeListApi, getAllCaderTypesApi, getAllCadreListApi, getAllCountryListApi, getAllDistrictListApi, getAllHealthFacilityListApi, getAllPluginManagementListApi, getAllPrimaryCadersApi, getAllPrimaryCadersListApi, getAllStateListApi, getAllSurveyListApi, getAllSymptomsApi, getAssessmentCertificateByIdApi, getAssessmentQuestionReportApi, getAssessmentResultReportApi, getBlockApi, getBlockByIDApi, getcaderApi, getCaderByIDApi, getCaderBytypesListApi, getCountryApi, getCountryByIDApi, getDistrictApi, getDistrictByIDApi, getHealthFacilityApi, getHealthFacilityByIDApi, getPluginManagementByIDApi, getPrimaryCaderByIDApi, getRedirectNodeApi, getStateApi, getStateByIDApi, getSymptomByIDApi, updateAssessmentCertificateApi, updateBlockApi, updateCaderApi, updateCountryApi, updateDistrictApi, updateHealthFacilityApi, updatePluginManagementByIDApi, updatePrimaryCaderByIDApi, updateStateApi, updateSymptomApi, uploadImageApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createAssessmentCertificate, createPluginManagement, createSymptom, deleteAssessmentCertificateById, deleteBlock, deleteCadere, deleteCountry, deleteDistrict, deleteHealthFacility, deletePluginManagement, deletePrimaryCadere, deleteState, deleteSymptomById, getAssessmentQuestionReport, getAssessmentResultReport, updateAssessmentCertificate, updateCader, updatePluginManagement, updatePrimaryCader, updateState, updateSymptom, uploadImage } from "../actions/masterTable.action";
import { createAssessmentCertificateSuccess, createBlock, createBlockSuccess, createCader, createCaderSuccess, createCountry, createCountrySuccess, createDistrict, createDistrictSuccess, createHealthFacility, createHealthFacilitySuccess, createPrimaryCader, createPrimaryCaderSuccess, createState, createStateSuccess, createSymptomSuccess, deleteAssessmentCertificateByIdSuccess, deleteBlockSuccess, deleteCaderSuccess, deleteCountrySuccess, deleteDistrictByIdSuccess, deleteHealthFacilitySuccess, deletePrimaryCaderSuccess, deleteStateSuccess, deleteSymptomByIdSuccess, getAllAssessmentCertificatesList, getAllAssessmentCertificatesListSuccess, getAllAssessmentCertificatesListWithoutPaginationSuccess, getAllBlockList, getAllBlockListSuccess, getAllCaderTypeList, getAllCaderTypeListSuccess, getAllCaderTypes, getAllCaderTypesSuccess, getAllCadreList, getAllCadreListSuccess, getAllCountryList, getAllCountryListSuccess, getAllDistrictList, getAllDistrictListSuccess, getAllHealthFacilityList, getAllHealthFacilityListSuccess, getAllPluginManagementList, getAllPluginManagementListSuccess, getAllPrimaryCaderList, getAllPrimaryCaderListSuccess, getAllStateList, getAllStateListSuccess, getAllSurveyList, getAllSurveyListSuccess, getAllSymptomsList, getAllSymptomsListSuccess, getAssessmentCertificateById, getAssessmentCertificateByIdSuccess, getAssessmentCertificateListWithoutPagination, getAssessmentQuestionReportSuccess, getAssessmentResultReportSuccess, getBlock, getBlockById, getBlockByIdSuccess, getBlockSuccess, getcader, getCaderById, getCaderByIdSuccess, getCaderBytypesList, getCaderBytypesListSuccess, getcaderSuccess, getCountry, getCountryById, getCountryByIdSuccess, getCountrySuccess, getDistrict, getDistrictById, getDistrictByIdSuccess, getDistrictSuccess, getHealthFacilities, getHealthFacilitiesSuccess, getHealthFacilityById, getHealthFacilityByIdSuccess, getPluginManagementById, getPluginManagementByIdSuccess, getPrimaryCader, getPrimaryCaderById, getPrimaryCaderByIdSuccess, getPrimaryCaderSuccess, getRedirectNode, getRedirectNodeSuccess, getState, getStateById, getStateByIdSuccess, getStateSuccess, getSymptomByIdSuccess, getSymtomById, updateAssessmentCertificateSuccess, updateBlock, updateBlockSuccess, updateCaderSuccess, updateCountry, updateCountrySuccess, updateDistrict, updateDistrictSuccess, updateHealthFacility, updateHealthFacilitySuccess, updatePrimaryCaderSuccess, updateStateSuccess, updateSymptomSuccess } from "../reducer/masterTable.reducer";

export function* getAllCountryListSaga() {
    try {
        const response: AxiosResponse = yield call(getAllCountryListApi);
        if (response.data.status) {
            yield put(getAllCountryListSuccess(response.data.data?.list));
        }
    } catch (error: any) {
        console.error("Error getAllCountryListSaga:", error);
        if (error?.response?.data?.code == 403) {
            ErrorToast("You do not have Country permissions!");
        }
    }
}
export function* getAllStateListSaga() {
    try {
        const response: AxiosResponse = yield call(getAllStateListApi);
        if (response.data.status) {
            yield put(getAllStateListSuccess(response.data.data));
        }
    } catch (error) {
        console.error("Error getAllStateListSaga:", error);
    }
}
export function* getAllCadreListSaga() {
    try {
        const response: AxiosResponse = yield call(getAllCadreListApi);
        if (response.data.status) {
            yield put(getAllCadreListSuccess(response.data.data));
        }
    } catch (error) {
        console.error("Error getAllCadreListSaga:", error);
    }
}
export function* getAllDistrictListSaga(action: ReturnType<typeof getAllDistrictList>) {
    const matches = action.payload.match(/(stateId|state)=([^&]*)/g);
    const stateIds = matches ? matches.map((match: string) => match.split("=")[1]) : [];
    try {
        const authUser: { roleType: string; isAllState: boolean } = yield select(
            (state: IRootState) => state.auth?.authUser
        );
        const response: AxiosResponse = yield call(getAllDistrictListApi, authUser, action.payload);
        if (response.data.status) {
            if ((authUser?.roleType === "country_level")) {
                yield put(getAllDistrictListSuccess(response.data.data));
            } else {
                yield put(getAllDistrictListSuccess(response.data.data.filter((district: any) => stateIds.includes(district.stateId))));
            }
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllDistrictListSuccess(undefined));
            console.error("Error getAllDistrictListSaga:", error);
        }
    }
}
export function* getAllCaderTypeListSaga() {
    try {
        const response: AxiosResponse = yield call(getAllCaderTypeListApi);
        if (response.data.status) {
            yield put(getAllCaderTypeListSuccess(response.data.data));
        }
    } catch (error) {
        console.error("Error getAllCaderTypeListSaga:", error);
    }
}
export function* getcaderSaga(action: ReturnType<typeof getcader>) {
    try {
        const response: AxiosResponse = yield call(getcaderApi, action.payload);
        if (response.data.status) {
            yield put(getcaderSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getcaderSuccess(undefined));
            console.error("Error getcaderSaga:", error);
            if (error?.response?.data?.code == 403) {
                ErrorToast("You do not have Cadre permissions!");
            }
        }
    }
}
export function* getCountrySaga(action: ReturnType<typeof getCountry>) {
    try {
        const response: AxiosResponse = yield call(getCountryApi, action.payload);
        if (response.data.status) {
            yield put(getCountrySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getCountrySuccess(undefined));
            console.error("Error getCountrySaga:", error);
        }
    }
}
export function* getBlockSaga(action: ReturnType<typeof getBlock>) {
    try {
        const response: AxiosResponse = yield call(getBlockApi, action.payload);
        if (response.data.status) {
            yield put(getBlockSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getBlockSuccess(undefined));
            console.error("Error getBlockSaga:", error);
        }
    }
}

export function* getHealthFacilitiesSaga(action: ReturnType<typeof getHealthFacilities>) {
    try {
        const response: AxiosResponse = yield call(getHealthFacilityApi, action.payload);
        if (response.data.status) {
            yield put(getHealthFacilitiesSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getHealthFacilitiesSuccess(undefined));
            console.error("Error getHealthFacilitiesSaga:", error);
        }
    }
}

export function* getBlockByIdSaga(action: ReturnType<typeof getBlockById>) {
    try {
        const response: AxiosResponse = yield call(getBlockByIDApi, action.payload);
        if (response.data.status) {
            yield put(getBlockByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getBlockByIdSuccess(undefined));
            console.error("Error getBlockByIdSaga:", error);
        }
    }
}

export function* getCaderByIdSaga(action: ReturnType<typeof getCaderById>) {
    try {
        const response: AxiosResponse = yield call(getCaderByIDApi, action.payload);
        if (response.data.status) {
            yield put(getCaderByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getCaderByIdSuccess(undefined));
            console.error("Error getCaderByIdSaga:", error);
        }
    }
}
export function* getCountryByIdSaga(action: ReturnType<typeof getCountryById>) {
    try {
        const response: AxiosResponse = yield call(getCountryByIDApi, action.payload);
        if (response.data.status) {
            yield put(getCountryByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getCountryByIdSuccess(undefined));
            console.error("Error getCountryByIdSaga:", error);
        }
    }
}
export function* getStateByIdSaga(action: ReturnType<typeof getStateById>) {
    try {
        const response: AxiosResponse = yield call(getStateByIDApi, action.payload);
        if (response.data.status) {
            yield put(getStateByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStateByIdSuccess(undefined));
            console.error("Error getStateByIdSaga:", error);
        }
    }
}

export function* getDistrictByIdSaga(action: ReturnType<typeof getDistrictById>) {
    try {
        const response: AxiosResponse = yield call(getDistrictByIDApi, action.payload);
        if (response.data.status) {
            yield put(getDistrictByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDistrictByIdSuccess(undefined));
            console.error("Error getDistrictByIdSaga:", error);
        }
    }
}
export function* getDistrictSaga(action: ReturnType<typeof getDistrict>) {
    try {
        const response: AxiosResponse = yield call(getDistrictApi, action.payload);
        if (response.data.status) {
            yield put(getDistrictSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDistrictSuccess(undefined));
            console.error("Error getDistrictSaga:", error);
        }
    }
}

export function* createStateSaga(action: ReturnType<typeof createState>) {
    try {
        const response: AxiosResponse = yield call(createStateApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createStateSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createStateSuccess(undefined));
            console.error("Error createStateSaga:", error);
        }
    }
}
export function* updateStateSaga(action: ReturnType<typeof updateState>) {
    try {
        const response: AxiosResponse = yield call(updateStateApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateStateSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateStateSuccess(undefined));
            console.error("Error updateStateSaga:", error);
        }
    }
}

export function* createDistrictSaga(action: ReturnType<typeof createDistrict>) {
    try {
        const response: AxiosResponse = yield call(createDistrictApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createDistrictSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            ErrorToast(error?.response?.data?.message);
            yield put(createDistrictSuccess(undefined));
            console.error("Error createDistrictSaga:", error);
        }
    }
}
export function* updateDistrictSaga(action: ReturnType<typeof updateDistrict>) {
    try {
        const response: AxiosResponse = yield call(updateDistrictApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateDistrictSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateDistrictSuccess(undefined));
            console.error("Error updateDistrictSaga:", error);
        }
    }
}

export function* deleteDistrictByIdSaga(action: ReturnType<typeof deleteDistrict>) {
    try {
        const response: AxiosResponse = yield call(deleteDistrictByIdApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteDistrictByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteDistrictByIdSuccess(undefined));
            console.error("Error deleteDistrictByIdSaga:", error);
        }
    }
}
export function* createCaderSaga(action: ReturnType<typeof createCader>) {
    try {
        const response: AxiosResponse = yield call(createCaderApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createCaderSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(error?.response?.data);
            yield put(createCaderSuccess(undefined));
            console.error("Error createCaderSaga:", error);
        }
    }
}
export function* updateCaderSaga(action: ReturnType<typeof updateCader>) {
    try {
        const response: AxiosResponse = yield call(updateCaderApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateCaderSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateCaderSuccess(undefined));
            console.error("Error updateCaderSaga:", error);
        }
    }
}
export function* deleteCaderSaga(action: ReturnType<typeof deleteCadere>) {
    try {
        const response: AxiosResponse = yield call(deleteCaderApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteCaderSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteCaderSuccess(undefined));
            console.error("Error deleteCaderSaga:", error);
        }
    }
}

export function* createCountrySaga(action: ReturnType<typeof createCountry>) {
    try {
        const response: AxiosResponse = yield call(createCountryApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createCountrySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createCountrySuccess(undefined));
            console.error("Error createCountrySaga:", error);
        }
    }
}
export function* updateCountrySaga(action: ReturnType<typeof updateCountry>) {
    try {
        const response: AxiosResponse = yield call(updateCountryApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(updateCountrySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateCountrySuccess(undefined));
            console.error("Error updateCountrySaga:", error);
        }
    }
}
export function* deleteCountrySaga(action: ReturnType<typeof deleteCountry>) {
    try {
        const response: AxiosResponse = yield call(deleteCountryApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteCountrySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteCountrySuccess(undefined));
            console.error("Error deleteCountrySaga:", error);
        }
    }
}
export function* createBlockSaga(action: ReturnType<typeof createBlock>) {
    try {
        const response: AxiosResponse = yield call(createBlockApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createBlockSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createBlockSuccess(undefined));
            console.error("Error createBlockSaga:", error);
        }
    }
}
export function* updateBlockSaga(action: ReturnType<typeof updateBlock>) {
    try {
        const response: AxiosResponse = yield call(updateBlockApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateBlockSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateBlockSuccess(undefined));
            console.error("Error updateBlockSaga:", error);
        }
    }
}
export function* deleteBlockSaga(action: ReturnType<typeof deleteBlock>) {
    try {
        const response: AxiosResponse = yield call(deleteBlockApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteBlockSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteBlockSuccess(undefined));
            console.error("Error deleteBlockSaga:", error);
        }
    }
}
export function* deleteStateSaga(action: ReturnType<typeof deleteState>) {
    try {
        const response: AxiosResponse = yield call(deleteStateApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteStateSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteStateSuccess(undefined));
            console.error("Error deleteStateSaga:", error);
        }
    }
}
export function* getStateSaga(action: ReturnType<typeof getState>) {
    try {
        const response: AxiosResponse = yield call(getStateApi, action.payload);
        if (response.data.status) {
            yield put(getStateSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStateSuccess(undefined));
            console.error("Error getStateSaga:", error);
        }
    }
}
export function* getAllCaderTypesSaga(action: ReturnType<typeof getAllCaderTypes>) {
    try {
        const response: AxiosResponse = yield call(getAllCaderTypesApi);
        if (response.data.status || response.data.success) {
            yield put(getAllCaderTypesSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllCaderTypesSuccess(undefined));
            console.error("Error getAllCaderTypesSaga:", error);
        }
    }
}
export function* getCaderBytypesListSaga(action: ReturnType<typeof getCaderBytypesList>) {
    try {
        const response: AxiosResponse = yield call(getCaderBytypesListApi, action.payload);
        if (response.data.status || response.data.success) {
            yield put(getCaderBytypesListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getCaderBytypesListSuccess(undefined));
            console.error("Error getCaderBytypesListSaga:", error);
        }
    }
}
export function* getAllBlockListSaga(action: ReturnType<typeof getAllBlockList>) {
    try {
        const response: AxiosResponse = yield call(getAllBlockListApi, action.payload);
        if (response.data.status || response.data.success) {
            yield put(getAllBlockListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllBlockListSuccess(undefined));
            console.error("Error getAllBlockListSaga:", error);
        }
    }
}
export function* getHealthFacilityByIdSaga(action: ReturnType<typeof getHealthFacilityById>) {
    try {
        const response: AxiosResponse = yield call(getHealthFacilityByIDApi, action.payload);
        if (response.data.status) {
            yield put(getHealthFacilityByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getHealthFacilityByIdSuccess(undefined));
            console.error("Error getHealthFacilityByIdSaga:", error);
        }
    }
}
export function* getAllHealthFacilityListSaga(action: ReturnType<typeof getAllHealthFacilityList>) {
    try {
        const response: AxiosResponse = yield call(getAllHealthFacilityListApi, action.payload);
        if (response.data.status || response.data.success) {
            yield put(getAllHealthFacilityListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllHealthFacilityListSuccess(undefined));
            console.error("Error getAllHealthFacilityListSaga:", error);
        }
    }
}
export function* createHealthFacilitySaga(action: ReturnType<typeof createHealthFacility>) {
    try {
        const response: AxiosResponse = yield call(createHealthFacilityApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createHealthFacilitySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error.response?.data);
            ErrorToast(error?.response?.data?.message);
            yield put(createHealthFacilitySuccess(undefined));
            console.error("Error createHealthFacilitySaga:", error);
        }
    }
}
export function* updateHealthFacilitySaga(action: ReturnType<typeof updateHealthFacility>) {
    try {
        const response: AxiosResponse = yield call(updateHealthFacilityApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateHealthFacilitySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateHealthFacilitySuccess(undefined));
            console.error("Error updateHealthFacilitySaga:", error);
        }
    }
}
export function* deleteHealthFacilitySaga(action: ReturnType<typeof deleteHealthFacility>) {
    try {
        const response: AxiosResponse = yield call(deleteHealthFacilityApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteHealthFacilitySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteHealthFacilitySuccess(undefined));
            console.error("Error deleteHealthFacilitySaga:", error);
        }
    }
}
export function* getPrimaryCaderSaga(action: ReturnType<typeof getPrimaryCader>) {
    try {
        const response: AxiosResponse = yield call(getAllPrimaryCadersApi, action.payload);
        if (response.data.status) {
            yield put(getPrimaryCaderSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getPrimaryCaderSuccess(undefined));
            console.error("Error getPrimaryCaderSaga:", error);
        }
    }
}
export function* getPrimaryCaderByIdSaga(action: ReturnType<typeof getPrimaryCaderById>) {
    try {
        const response: AxiosResponse = yield call(getPrimaryCaderByIDApi, action.payload);
        if (response.data.status) {
            yield put(getPrimaryCaderByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getPrimaryCaderByIdSuccess(undefined));
            console.error("Error getPrimaryCaderByIdSaga:", error);
        }
    }
}
export function* getAllPrimaryCaderListSaga(action: ReturnType<typeof getAllPrimaryCaderList>) {
    try {
        const response: AxiosResponse = yield call(getAllPrimaryCadersListApi);
        if (response.data.status || response.data.success) {
            yield put(getAllPrimaryCaderListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllPrimaryCaderListSuccess(undefined));
            console.error("Error getAllPrimaryCaderListSaga:", error);
        }
    }
}
export function* createPrimaryCaderSaga(action: ReturnType<typeof createPrimaryCader>) {
    try {
        const response: AxiosResponse = yield call(createPrimaryCaderApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createPrimaryCaderSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createPrimaryCaderSuccess(undefined));
            console.error("Error createPrimaryCaderSaga:", error);
        }
    }
}
export function* updatePrimaryCaderSaga(action: ReturnType<typeof updatePrimaryCader>) {
    try {
        const response: AxiosResponse = yield call(updatePrimaryCaderByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updatePrimaryCaderSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updatePrimaryCaderSuccess(undefined));
            console.error("Error updatePrimaryCaderSaga:", error);
        }
    }
}
export function* deletePrimaryCaderSaga(action: ReturnType<typeof deletePrimaryCadere>) {
    try {
        const response: AxiosResponse = yield call(deletePrimaryCaderByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deletePrimaryCaderSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deletePrimaryCaderSuccess(undefined));
            console.error("Error deletePrimaryCaderSaga:", error);
        }
    }
}
export function* getAllSymptomsListSaga(action: ReturnType<typeof getAllSymptomsList>) {
    try {
        const response: AxiosResponse = yield call(getAllSymptomsApi, action.payload);
        if (response.data.status || response.data.success) {
            yield put(getAllSymptomsListSuccess(response.data?.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllSymptomsListSuccess(undefined));
            console.error("Error getAllSymptomsListSuccess:", error);
        }
    }
}

export function* getSymtomByIdSaga(action: ReturnType<typeof getSymtomById>) {
    try {
        const response: AxiosResponse = yield call(getSymptomByIDApi, action.payload);
        if (response.data.status || response.data.success) {
            yield put(getSymptomByIdSuccess(response.data?.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getSymptomByIdSuccess(undefined));
            console.error("Error getSymtomByIdSaga:", error);
        }
    }
}

export function* updateSymptomSaga(action: ReturnType<typeof updateSymptom>) {
    try {
        const response: AxiosResponse = yield call(updateSymptomApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateSymptomSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateSymptomSuccess(undefined));
            console.error("Error updateSymptomSaga:", error);
        }
    }
}

export function* createSymptomSaga(action: ReturnType<typeof createSymptom>) {
    try {
        const response: AxiosResponse = yield call(createSymptomApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createSymptomSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createSymptomSuccess(undefined));
            console.error("Error createSymptomSaga:", error);
        }
    }
}

export function* deleteSymptomByIdSaga(action: ReturnType<typeof deleteSymptomById>) {
    try {
        const response: AxiosResponse = yield call(deleteSymptomByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteSymptomByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteSymptomByIdSuccess(undefined));
            console.error("Error deleteSymptomSaga:", error);
        }
    }
}

export function* getAllAssessmentCertificatesListWithoutPaginationSuccessSaga(action: ReturnType<typeof getAssessmentCertificateListWithoutPagination>) {
    try {
        const response: AxiosResponse = yield call(getAllAssessmentCertificateWithoutPaginationApi);
        if (response.data.status || response.data.success) {
            yield put(getAllAssessmentCertificatesListWithoutPaginationSuccess(response.data?.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllAssessmentCertificatesListWithoutPaginationSuccess(undefined));
            console.error("Error getAssessmentCertificateListWithoutPagination:", error);
        }
    }
}

export function* getAssessmentCertificateByIdSaga(action: ReturnType<typeof getAssessmentCertificateById>) {
    try {
        const response: AxiosResponse = yield call(getAssessmentCertificateByIdApi, action.payload);
        if (response.data.status || response.data.success) {
            yield put(getAssessmentCertificateByIdSuccess(response.data?.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAssessmentCertificateByIdSuccess(undefined));
            console.error("Error getAssessmentCertificateByIdSaga:", error);
        }
    }
}

export function* updateAssessmentCertificateSaga(action: ReturnType<typeof updateAssessmentCertificate>) {
    try {
        const response: AxiosResponse = yield call(updateAssessmentCertificateApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateAssessmentCertificateSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateAssessmentCertificateSuccess(undefined));
            console.error("Error updateAssessmentCertificateSaga:", error);
        }
    }
}

export function* createAssessmentCertificateSaga(action: ReturnType<typeof createAssessmentCertificate>) {
    try {
        const response: AxiosResponse = yield call(createAssessmentCertificateApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(createAssessmentCertificateSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createAssessmentCertificateSuccess(undefined));
            console.error("Error createAssessmentCertificateSaga:", error);
        }
    }
}

export function* deleteAssessmentCertificateByIdSaga(action: ReturnType<typeof deleteAssessmentCertificateById>) {
    try {
        const response: AxiosResponse = yield call(deleteAssessmentCertificateApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteAssessmentCertificateByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteAssessmentCertificateByIdSuccess(undefined));
            console.error("Error deleteAssessmentCertificateSaga:", error);
        }
    }
}
function* uploadImageSaga(action: ReturnType<typeof uploadImage>) {
    const { payload: { file, isCertificate }, meta: { callBack } } = action;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isCertificate", JSON.stringify(isCertificate));
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_IMAGE_FAILURE", payload: error });
        callBack(error);
    }
}

export function* getAllAssessmentCertificatesListSaga(action: ReturnType<typeof getAllAssessmentCertificatesList>) {
    try {
        const response: AxiosResponse = yield call(getAllAssessmentCertificateListApi, action.payload);
        if (response.data.status || response.data.success) {
            yield put(getAllAssessmentCertificatesListSuccess(response.data?.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllAssessmentCertificatesListSuccess(undefined));
            console.error("Error getAllAssessmentCertificatesListSuccess:", error);
        }
    }
}
export function* getAssessmentQuestionReportSaga(action: ReturnType<typeof getAssessmentQuestionReport>) {
    try {
        const response: AxiosResponse = yield call(getAssessmentQuestionReportApi, action.payload?.id);
        yield put(getAssessmentQuestionReportSuccess(response.data?.data));
        if (action?.payload?.callBack)
            action?.payload?.callBack(response?.data);
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAssessmentQuestionReportSuccess(undefined));
            console.error("Error getAssessmentQuestionReport:", error);
        }
    }
}
export function* getAssessmentResultReportSaga(action: ReturnType<typeof getAssessmentResultReport>) {
    try {
        const response: AxiosResponse = yield call(getAssessmentResultReportApi, action.payload?.id);
        yield put(getAssessmentResultReportSuccess(response.data?.data));
        if (action?.payload?.callBack)
            action?.payload?.callBack(response?.data);
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAssessmentResultReportSuccess(undefined));
            console.error("Error getAssessmentResultReport:", error);
        }
    }
}
export function* getRedirectNodeSaga(action: ReturnType<typeof getRedirectNode>) {
    try {
        const response: AxiosResponse = yield call(getRedirectNodeApi, action.payload);
        if (response.data.status) {
            yield put(getRedirectNodeSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getRedirectNodeSuccess(undefined));
            console.error("Error loginSaga:", error);
        }
    }
}
export function* getAllPluginManagementListSaga(action: ReturnType<typeof getAllPluginManagementList>) {
    try {
        const response: AxiosResponse = yield call(getAllPluginManagementListApi, action.payload);
        if (response.data.status || response.data.success) {
            yield put(getAllPluginManagementListSuccess(response.data?.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllPluginManagementListSuccess(undefined));
            console.error("Error getAllPluginManagementListSaga:", error);
        }
    }
}
export function* getPluginManagementByIdSaga(action: ReturnType<typeof getPluginManagementById>) {
    try {
        const response: AxiosResponse = yield call(getPluginManagementByIDApi, action.payload);
        if (response.data.status || response.data.success) {
            yield put(getPluginManagementByIdSuccess(response.data?.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getPluginManagementByIdSuccess(undefined));
            console.error("Error getPluginManagementByIdSaga:", error);
        }
    }
}
export function* createPluginManagementSaga(action: ReturnType<typeof createPluginManagement>) {
    try {
        const response: AxiosResponse = yield call(createPluginManagementByIDApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            console.error("Error createPluginManagementSaga:", error);
        }
    }
}
export function* updatePluginManagementSaga(action: ReturnType<typeof updatePluginManagement>) {
    try {
        const response: AxiosResponse = yield call(updatePluginManagementByIDApi, action.payload.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error updatePluginManagementSaga:", error);
        }
    }
}
export function* deletePluginManagementSaga(action: ReturnType<typeof deletePluginManagement>) {
    try {
        const response: AxiosResponse = yield call(deletePluginManagementByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deletePluginManagementSaga:", error);
        }
    }
}
export function* getAllSurveyListSaga(action: ReturnType<typeof getAllSurveyList>) {
    try {
        const response: AxiosResponse = yield call(getAllSurveyListApi);
        if (response.data.status || response.data.success) {
            yield put(getAllSurveyListSuccess(response.data?.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllSurveyListSuccess(undefined));
            console.error("Error getAllSurveyListSaga:", error);
        }
    }
}
export function* watchMasterTableSaga() {
    yield takeLatest(getRedirectNode.type, getRedirectNodeSaga);
    yield takeLatest(getcader.type, getcaderSaga);
    yield takeLatest(getAllCountryList.type, getAllCountryListSaga);
    yield takeLatest(getAllStateList.type, getAllStateListSaga);
    yield takeLatest(getAllDistrictList.type, getAllDistrictListSaga);
    yield takeLatest(getAllCaderTypeList.type, getAllCaderTypeListSaga);
    yield takeLatest(getCountry.type, getCountrySaga);
    yield takeLatest(getBlock.type, getBlockSaga);
    yield takeLatest(getDistrict.type, getDistrictSaga);
    yield takeLatest(getState.type, getStateSaga);
    yield takeLatest(getCaderById.type, getCaderByIdSaga);
    yield takeLatest(getCountryById.type, getCountryByIdSaga);
    yield takeLatest(createState.type, createStateSaga);
    yield takeLatest(updateState.type, updateStateSaga);
    yield takeLatest(createCader.type, createCaderSaga);
    yield takeLatest(updateCader.type, updateCaderSaga);
    yield takeLatest(deleteCadere.type, deleteCaderSaga);
    yield takeLatest(createDistrict.type, createDistrictSaga);
    yield takeLatest(updateDistrict.type, updateDistrictSaga);
    yield takeLatest(deleteDistrict.type, deleteDistrictByIdSaga);
    yield takeLatest(createCountry.type, createCountrySaga);
    yield takeLatest(updateCountry.type, updateCountrySaga);
    yield takeLatest(deleteCountry.type, deleteCountrySaga);
    yield takeLatest(getBlockById.type, getBlockByIdSaga);
    yield takeLatest(getDistrictById.type, getDistrictByIdSaga);
    yield takeLatest(getAllCaderTypes.type, getAllCaderTypesSaga);
    yield takeLatest(getCaderBytypesList.type, getCaderBytypesListSaga);
    yield takeLatest(getAllBlockList.type, getAllBlockListSaga);
    yield takeLatest(getStateById.type, getStateByIdSaga);
    yield takeLatest(deleteState.type, deleteStateSaga);
    yield takeLatest(createBlock.type, createBlockSaga);
    yield takeLatest(updateBlock.type, updateBlockSaga);
    yield takeLatest(deleteBlock.type, deleteBlockSaga);
    yield takeLatest(getHealthFacilities.type, getHealthFacilitiesSaga);
    yield takeLatest(getHealthFacilityById.type, getHealthFacilityByIdSaga);
    yield takeLatest(getAllHealthFacilityList.type, getAllHealthFacilityListSaga);
    yield takeLatest(createHealthFacility.type, createHealthFacilitySaga);
    yield takeLatest(updateHealthFacility.type, updateHealthFacilitySaga);
    yield takeLatest(deleteHealthFacility.type, deleteHealthFacilitySaga);
    yield takeLatest(getPrimaryCader.type, getPrimaryCaderSaga);
    yield takeLatest(getPrimaryCaderById.type, getPrimaryCaderByIdSaga);
    yield takeLatest(getAllPrimaryCaderList.type, getAllPrimaryCaderListSaga);
    yield takeLatest(createPrimaryCader.type, createPrimaryCaderSaga);
    yield takeLatest(updatePrimaryCader.type, updatePrimaryCaderSaga);
    yield takeLatest(deletePrimaryCadere.type, deletePrimaryCaderSaga);
    yield takeLatest(getAllSymptomsList.type, getAllSymptomsListSaga);
    yield takeLatest(getSymtomById.type, getSymtomByIdSaga);
    yield takeLatest(updateSymptom.type, updateSymptomSaga);
    yield takeLatest(createSymptom.type, createSymptomSaga);
    yield takeLatest(deleteSymptomById.type, deleteSymptomByIdSaga);
    yield takeLatest(getAllAssessmentCertificatesList.type, getAllAssessmentCertificatesListSaga);
    yield takeLatest(getAssessmentCertificateById.type, getAssessmentCertificateByIdSaga);
    yield takeLatest(updateAssessmentCertificate.type, updateAssessmentCertificateSaga);
    yield takeLatest(createAssessmentCertificate.type, createAssessmentCertificateSaga);
    yield takeLatest(deleteAssessmentCertificateById.type, deleteAssessmentCertificateByIdSaga);
    yield takeLatest(uploadImage.type, uploadImageSaga);
    yield takeLatest(getAssessmentCertificateListWithoutPagination.type, getAllAssessmentCertificatesListWithoutPaginationSuccessSaga);
    yield takeLatest(getAssessmentQuestionReport.type, getAssessmentQuestionReportSaga);
    yield takeLatest(getAssessmentResultReport.type, getAssessmentResultReportSaga);
    yield takeLatest(getAllCadreList.type, getAllCadreListSaga);
    yield takeLatest(getAllPluginManagementList.type, getAllPluginManagementListSaga);
    yield takeLatest(getPluginManagementById.type, getPluginManagementByIdSaga);
    yield takeLatest(createPluginManagement.type, createPluginManagementSaga);
    yield takeLatest(updatePluginManagement.type, updatePluginManagementSaga);
    yield takeLatest(deletePluginManagement.type, deletePluginManagementSaga);
    yield takeLatest(getAllSurveyList.type, getAllSurveyListSaga);
}
