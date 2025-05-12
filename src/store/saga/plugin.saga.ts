
import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { copyAssessmentApi, createAssessmentApi, createChildInstituteApi, createInstituteMemberApi, createManageTbApi, createMasterInstituteApi, createQuestionApi, deleteAssessmentApi, deleteChildInstituteApi, deleteInstituteMemberByIdApi, deleteMasterInstituteByIDApi, deleteQuestionApi, getAllAssessmentListApi, getAllChildInstituteApi, getAllClosedQueryListbyIdApi, getAllInstituteListApi, getAllKbaseCoursereportDataApi, getAllKbaseDataApi, getAllManageTbApi, getAllMasterInstituteApi, getAllMemberByInstituteIdApi, getAllOpenQueryListbyIdApi, getAllQueryListbyIdApi, getAllQueryReportsListbyIdApi, getAllQuestionListApi, getAllQuestionWithoutPaginationApi, getAllQuestionWithoutPaginationReportApi, getAllSubscribersSearchApi, getAllTransferedQueryListbyIdApi, getAssessmentByIdApi, getChildInstituteByIDApi, getChildInstituteByTypeApi, getInstituteQueryReportByIdApi, getKbaseCourseReportApi, getKbaseReportApi, getMasterInstituteByIDApi, getMembersByInstituteApi, getParentInstituteByTypeApi, getQuestionByIdApi, sendAssessmentNotificationApi, setActiveAssessmentApi, TransferOwnershipApi, transferQueryApi, updateAssessmentApi, updateChildInstituteByIDApi, updateMasterInstituteByIDApi, updateQuestionApi } from "../../utils/api";
import { copyAssessment, createAssessment, createInstituteMember, createManageTb, createMasterInstitute, createQuestion, deleteAssessment, deleteChildInstitute, deleteInstituteMemberById, deleteMasterinstituteById, deleteQuestion, getInstituteReport, getKbaseCoursereportCsv, getKbasereportcsv, getQuestionsWithoutPagination, sendAssessmentNotification, setActiveAssessment, transferOwnership, transferQuery, updateAssessment, updateChildInstituteById, updateMasterinstituteById, updateQuestion } from "../actions/plugin.action";
import { copyAssessmentSuccess, createAssessmentSuccess, createChildInstitute, createChildInstituteSuccess, createInstituteMemberSuccess, createManageTbSuccess, createMasterInstituteSuccess, createQuestionSuccess, deleteAssessmentSuccess, deleteInstituteMemberByIdSuccess, deleteMasterInstituteByIDSuccess, deleteQuestionSuccess, getAllAssessmentList, getAllAssessmentListSuccess, getAllChildInstitute, getAllChildInstituteSuccess, getAllClosedQueryListbyId, getAllClosedQueryListbyIdSuccess, getAllInstituteList, getAllInstituteListSuccess, getAllManageTb, getAllManageTbSuccess, getAllMasterInstitute, getAllMasterInstituteSuccess, getAllMemberByInstituteId, getAllMemberByInstituteIdSuccess, getAllOpenQueryListById, getAllOpenQueryListByIdSuccess, getAllQueryListById, getAllQueryListByIdSuccess, getAllQueryReportsListbyId, getAllQueryReportsListbyIdSuccess, getAllQuestionList, getAllQuestionListSuccess, getAllSubscribersSearch, getAllSubscribersSearchSuccess, getAllTransferedQueryListById, getAllTransferedQueryListByIdSuccess, getAssessmentById, getAssessmentByIdSuccess, getChildInstituteByID, getChildInstituteByIDSuccess, getChildInstituteByType, getChildInstituteByTypeSuccess, getKbaseCoursereport, getKbaseCoursereportSuccess, getKbasereport, getKbasereportSuccess, getMasterInstituteByID, getMasterInstituteByIDSuccess, getMembersByInstitute, getMembersByInstituteSuccess, getParentInstituteByType, getParentInstituteByTypeSuccess, getQuestionById, getQuestionByIdSuccess, getQuestionsWithoutPaginationReport, getQuestionsWithoutPaginationReportSuccess, getQuestionsWithoutPaginationSuccess, setActiveAssessmentSuccess, transferOwnershipSuccess, transferQuerrySuccess, updateAssessmentSuccess, updateChildInstituteByIdSuccess, updateMasterInstituteByIdSuccess, updateQuestionSuccess } from "../reducer/plugin.reducer";
import { getReportEnd, getReportStart } from "../reducer/report.reducer";

export function* getAllMasterInstituteSaga(action: ReturnType<typeof getAllMasterInstitute>) {
    try {
        const response: AxiosResponse = yield call(getAllMasterInstituteApi, action.payload);
        if (response.data.status) {
            yield put(getAllMasterInstituteSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllMasterInstituteSuccess(undefined));
            console.error("Error getAllMasterInstituteSaga:", error);
        }
    }
}
export function* createMasterInstituteSaga(action: ReturnType<typeof createMasterInstitute>) {
    try {
        const response: AxiosResponse = yield call(createMasterInstituteApi, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(createMasterInstituteSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createMasterInstituteSuccess(undefined));
            console.error("Error createMasterInstituteSaga:", error);
        }
    }
}
export function* getParentInstituteByTypeSaga(action: ReturnType<typeof getParentInstituteByType>) {
    try {
        const response: AxiosResponse = yield call(getParentInstituteByTypeApi, action.payload);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack();
            yield put(getParentInstituteByTypeSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(getParentInstituteByTypeSuccess(undefined));
            console.error("Error getParentInstituteByTypeSaga:", error);
        }
    }
}

export function* getChildInstituteByTypeSaga(action: ReturnType<typeof getChildInstituteByType>) {
    try {
        const response: AxiosResponse = yield call(getChildInstituteByTypeApi, action.payload);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack();
            yield put(getChildInstituteByTypeSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(getChildInstituteByTypeSuccess(undefined));
            console.error("Error getChildInstituteByTypeSaga:", error);
        }
    }
}

export function* getMembersByInstituteSaga(action: ReturnType<typeof getMembersByInstitute>) {
    try {
        const response: AxiosResponse = yield call(getMembersByInstituteApi, action.payload);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack();
            yield put(getMembersByInstituteSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(getMembersByInstituteSuccess(undefined));
            console.error("Error getMembersByInstituteSaga:", error);
        }
    }
}
export function* getAllSubscribersSearchSaga(action: ReturnType<typeof getAllSubscribersSearch>) {
    try {
        const response: AxiosResponse = yield call(getAllSubscribersSearchApi, action.payload);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack();
            yield put(getAllSubscribersSearchSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(getAllSubscribersSearchSuccess(undefined));
            console.error("Error getAllSubscribersSearchSaga:", error);
        }
    }
}


export function* getMasterInstituteByIDSaga(action: ReturnType<typeof getMasterInstituteByID>) {
    try {
        const response: AxiosResponse = yield call(getMasterInstituteByIDApi, action.payload);
        if (response.data.status) {
            yield put(getMasterInstituteByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getMasterInstituteByIDSuccess(undefined));
            console.error("Error getMasterInstituteByIDSaga:", error);
        }
    }
}
export function* getChildInstituteByIDSaga(action: ReturnType<typeof getChildInstituteByID>) {
    try {
        const response: AxiosResponse = yield call(getChildInstituteByIDApi, action.payload);
        if (response.data.status) {
            yield put(getChildInstituteByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getChildInstituteByIDSuccess(undefined));
            console.error("Error getChildInstituteByIDSaga:", error);
        }
    }
}

export function* updateMasterInstituteByIDSaga(action: ReturnType<typeof updateMasterinstituteById>) {
    try {
        const response: AxiosResponse = yield call(updateMasterInstituteByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateMasterInstituteByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateMasterInstituteByIdSuccess(undefined));
            console.error("Error updateMasterInstituteByIDSagas:", error);
        }
    }
}
export function* deleteMasterInstituteSaga(action: ReturnType<typeof deleteMasterinstituteById>) {
    try {
        const response: AxiosResponse = yield call(deleteMasterInstituteByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteMasterInstituteByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteMasterInstituteByIDSuccess(undefined));
            console.error("Error deleteMasterInstituteSagas:", error);
        }
    }
}
export function* getAllChildInstituteSaga(action: ReturnType<typeof getAllChildInstitute>) {
    try {
        const response: AxiosResponse = yield call(getAllChildInstituteApi, action.payload);
        if (response.data.status) {
            yield put(getAllChildInstituteSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllChildInstituteSuccess(undefined));
            console.error("Error getAllChildInstituteSaga:", error);
        }
    }
}
;
export function* createChildInstituteSaga(action: ReturnType<typeof createChildInstitute>) {
    try {
        const response: AxiosResponse = yield call(createChildInstituteApi, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(createChildInstituteSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createChildInstituteSuccess(undefined));
            console.error("Error createChildInstituteSaga:", error);
        }
    }
}
export function* deleteChildInstituteSaga(action: ReturnType<typeof deleteChildInstitute>) {
    try {
        const response: AxiosResponse = yield call(deleteChildInstituteApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteMasterInstituteByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteMasterInstituteByIDSuccess(undefined));
            console.error("Error deleteChildInstituteSaga:", error);
        }
    }
}
export function* updateChildInstituteByIDSaga(action: ReturnType<typeof updateChildInstituteById>) {
    try {
        const response: AxiosResponse = yield call(updateChildInstituteByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateChildInstituteByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateChildInstituteByIdSuccess(undefined));
            console.error("Error updateChildInstituteByIDSaga:", error);
        }
    }
}
export function* getAllManageTbSaga(action: ReturnType<typeof getAllManageTb>) {
    try {
        const response: AxiosResponse = yield call(getAllManageTbApi, action.payload);
        if (response.data.status) {
            yield put(getAllManageTbSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllManageTbSuccess(undefined));
            console.error("Error getAllManageTb:", error);
        }
    }
}
export function* createManageTbSaga(action: ReturnType<typeof createManageTb>) {
    try {
        const response: AxiosResponse = yield call(createManageTbApi, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(createManageTbSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createManageTbSuccess(undefined));
            console.error("Error createManageTb:", error);
        }
    }
}
export function* createInstituteMemberSaga(action: ReturnType<typeof createInstituteMember>) {
    try {
        const response: AxiosResponse = yield call(createInstituteMemberApi, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(createInstituteMemberSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createInstituteMemberSuccess(undefined));
            console.error("Error createInstituteMember:", error);
        }
    }
}
export function* getAllMemberByInstituteIdSaga(action: ReturnType<typeof getAllMemberByInstituteId>) {
    try {
        const response: AxiosResponse = yield call(getAllMemberByInstituteIdApi, action.payload);
        if (response.data.status) {
            yield put(getAllMemberByInstituteIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllMemberByInstituteIdSuccess(undefined));
            console.error("Error getAllMemberByInstituteId:", error);
        }
    }
}

export function* deleteInstituteMemberByIdSaga(action: ReturnType<typeof deleteInstituteMemberById>) {
    try {
        const response: AxiosResponse = yield call(deleteInstituteMemberByIdApi, action.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response?.data);
            yield put(deleteInstituteMemberByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(deleteInstituteMemberByIdSuccess(undefined));
            console.error("Error deleteInstituteMemberById:", error);
        }
    }
}
export function* transferOwnershipSaga(action: ReturnType<typeof createInstituteMember>) {
    try {
        const response: AxiosResponse = yield call(TransferOwnershipApi, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(transferOwnershipSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(transferOwnershipSuccess(undefined));
            console.error("Error createInstituteMember:", error);
        }
    }
}
export function* getAllInstituteListSaga(action: ReturnType<typeof getAllInstituteList>) {
    try {
        const response: AxiosResponse = yield call(getAllInstituteListApi);
        if (response.data.status) {
            yield put(getAllInstituteListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllInstituteListSuccess(undefined));
            console.error("Error getAllInstituteList:", error);
        }
    }
}
export function* getAllQueryListByIdSaga(action: ReturnType<typeof getAllQueryListById>) {
    try {
        const response: AxiosResponse = yield call(getAllQueryListbyIdApi, action?.payload);
        if (response.data.status) {
            yield put(getAllQueryListByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllQueryListByIdSuccess(undefined));
            console.error("Error getAllQueryListById:", error);
        }
    }
}
export function* transferQuerySaga(action: ReturnType<typeof transferQuery>) {
    try {
        const response: AxiosResponse = yield call(transferQueryApi, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(transferQuerrySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(transferQuerrySuccess(undefined));
            console.error("Error transferQuery:", error);
        }
    }
}
export function* getAllClosedQueryListbyIdSaga(action: ReturnType<typeof getAllClosedQueryListbyId>) {
    try {
        const response: AxiosResponse = yield call(getAllClosedQueryListbyIdApi, action?.payload);
        if (response.data.status) {
            yield put(getAllClosedQueryListbyIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllClosedQueryListbyIdSuccess(undefined));
            console.error("Error getAllClosedQueryListbyId:", error);
        }
    }
}
export function* getAllTransferedQueryListbyIdSaga(action: ReturnType<typeof getAllTransferedQueryListById>) {
    try {
        const response: AxiosResponse = yield call(getAllTransferedQueryListbyIdApi, action?.payload);
        if (response.data.status) {
            yield put(getAllTransferedQueryListByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllTransferedQueryListByIdSuccess(undefined));
            console.error("Error getAllTransferedQueryListById:", error);
        }
    }
}

export function* getAllOpenQueryListbyIdSaga(action: ReturnType<typeof getAllOpenQueryListById>) {
    try {
        const response: AxiosResponse = yield call(getAllOpenQueryListbyIdApi, action?.payload);
        if (response.data.status) {
            yield put(getAllOpenQueryListByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllOpenQueryListByIdSuccess(undefined));
            console.error("Error getAllOpenQueryListById:", error);
        }
    }
}
export function* getAllQueryReportsListbyIdSaga(action: ReturnType<typeof getAllQueryReportsListbyId>) {
    try {
        const response: AxiosResponse = yield call(getAllQueryReportsListbyIdApi, action?.payload);
        if (response.data.status) {
            yield put(getAllQueryReportsListbyIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllQueryReportsListbyIdSuccess(undefined));
            console.error("Error getAllQueryReportsListbyId:", error);
        }
    }
}
export function* getAllQuestionListSaga(action: ReturnType<typeof getAllQuestionList>) {
    try {
        const response: AxiosResponse = yield call(getAllQuestionListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllQuestionListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllQuestionListSuccess(undefined));
            console.error("Error getAllQuestionList:", error);
        }
    }
}
export function* getQuestionByIdSaga(action: ReturnType<typeof getQuestionById>) {
    try {
        const response: AxiosResponse = yield call(getQuestionByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getQuestionByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getQuestionByIdSuccess(undefined));
            console.error("Error getQuestionById:", error);
        }
    }
}
export function* updateQuestionSaga(action: ReturnType<typeof updateQuestion>) {
    try {
        const response: AxiosResponse = yield call(updateQuestionApi, action.payload.id, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(updateQuestionSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateQuestionSuccess(undefined));
            console.error("Error updateQuestion:", error);
        }
    }
}
export function* deleteQuestionSaga(action: ReturnType<typeof deleteQuestion>) {
    try {
        const response: AxiosResponse = yield call(deleteQuestionApi, action.payload.id);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(deleteQuestionSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(deleteQuestionSuccess(undefined));
            console.error("Error deleteQuestion:", error);
        }
    }
}
export function* createQuestionSaga(action: ReturnType<typeof createQuestion>) {
    try {
        const response: AxiosResponse = yield call(createQuestionApi, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(createQuestionSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createQuestionSuccess(undefined));
            console.error("Error createQuestion:", error);
        }
    }
}
export function* getAllAssessmentListSaga(action: ReturnType<typeof getAllAssessmentList>) {
    try {
        const response: AxiosResponse = yield call(getAllAssessmentListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllAssessmentListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllAssessmentListSuccess(undefined));
            console.error("Error getAllAssessmentList:", error);
        }
    }
}
export function* getAssessmentByIdSaga(action: ReturnType<typeof getAssessmentById>) {
    try {
        const response: AxiosResponse = yield call(getAssessmentByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getAssessmentByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAssessmentByIdSuccess(undefined));
            console.error("Error getAssessmentById:", error);
        }
    }
}
export function* updateAssessmentSaga(action: ReturnType<typeof updateAssessment>) {
    try {
        const response: AxiosResponse = yield call(updateAssessmentApi, action.payload.id, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(updateAssessmentSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateAssessmentSuccess(undefined));
            console.error("Error updateAssessment:", error);
        }
    }
}
export function* deleteAssessmentSaga(action: ReturnType<typeof deleteAssessment>) {
    try {
        const response: AxiosResponse = yield call(deleteAssessmentApi, action.payload.id);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(deleteAssessmentSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(deleteAssessmentSuccess(undefined));
            console.error("Error deleteAssessment:", error);
        }
    }
}
export function* createAssessmentSaga(action: ReturnType<typeof createAssessment>) {
    try {
        const response: AxiosResponse = yield call(createAssessmentApi, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(createAssessmentSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createAssessmentSuccess(undefined));
            console.error("Error createAssessment:", error);
        }
    }
}
export function* getQuestionsWithoutPaginationSaga(action: ReturnType<typeof getQuestionsWithoutPagination>) {
    try {
        const response: AxiosResponse = yield call(getAllQuestionWithoutPaginationApi, action?.payload?.params);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(getQuestionsWithoutPaginationSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(getQuestionsWithoutPaginationSuccess(undefined));
            console.error("Error getAssessmentById:", getQuestionsWithoutPagination);
        }
    }
}

export function* getQuestionsWithoutPaginationReportSaga(action: ReturnType<typeof getQuestionsWithoutPaginationReport>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getAllQuestionWithoutPaginationReportApi, action?.payload?.params);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(getQuestionsWithoutPaginationReportSuccess(response.data.data));
        }
        yield put(getReportEnd());

    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(getQuestionsWithoutPaginationReportSuccess(undefined));
            console.error("Error getAssessmentById:", getQuestionsWithoutPaginationReport);
        }
    }
}
export function* copyAssessmentSaga(action: ReturnType<typeof copyAssessment>) {
    try {
        const response: AxiosResponse = yield call(copyAssessmentApi, action.payload.id);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(copyAssessmentSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(copyAssessmentSuccess(undefined));
            console.error("Error copyAssessment:", error);
        }
    }
}

export function* setActiveAssessmentSaga(action: ReturnType<typeof setActiveAssessment>) {
    try {
        const response: AxiosResponse = yield call(setActiveAssessmentApi, action.payload.obj);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(setActiveAssessmentSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(setActiveAssessmentSuccess(undefined));
            console.error("Error setActiveAssessment:", error);
        }
    }
}

export function* getInstituteReportSaga(action: ReturnType<typeof getInstituteReport>) {
    try {
        const response: AxiosResponse = yield call(getInstituteQueryReportByIdApi, action?.payload?.id, action?.payload?.typeOfQuery);
        if (action?.payload?.callBack)
            action?.payload?.callBack(response.data);
        if (response.data.status) {
            yield put(getQuestionsWithoutPaginationReportSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(getQuestionsWithoutPaginationReportSuccess(undefined));
            console.error("Error getAssessmentById:", getQuestionsWithoutPaginationReport);
        }
    }
}

function* sendAssessmentNotificationSaga(action: ReturnType<typeof sendAssessmentNotification>) {
    const {
        payload: { id, callBack },
    } = action;
    try {
        const response: AxiosResponse = yield call(sendAssessmentNotificationApi, id);
        callBack(response);
    } catch (error) {
        callBack(error as any);
    }
}

export function* getKbaseCoursereportSaga(action: ReturnType<typeof getKbaseCoursereport>) {
    try {
        const response: AxiosResponse = yield call(getAllKbaseCoursereportDataApi, action?.payload);
        if (response.data.status) {
            yield put(getKbaseCoursereportSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getKbaseCoursereportSuccess(undefined));
            console.error("Error getKbaseCoursereport:", error);
        }
    }
}

export function* getKbasereportSaga(action: ReturnType<typeof getKbasereport>) {
    try {
        const response: AxiosResponse = yield call(getAllKbaseDataApi, action?.payload);
        if (response.data.status) {
            yield put(getKbasereportSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getKbasereportSuccess(undefined));
            console.error("Error getKbasereport:", error);
        }
    }
}
export function* getKbasereportCsvSaga(action: ReturnType<typeof getKbasereportcsv>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getKbaseReportApi, action?.payload?.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            console.error("Error getKbasereport:", getKbasereport);
        }
    }
}

export function* getKbaseCoursereportCsvSaga(action: ReturnType<typeof getKbaseCoursereportCsv>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getKbaseCourseReportApi, action?.payload?.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            console.error("Error getKbaseCoursereport:", getKbaseCoursereport);
        }
    }
}

export function* watchPluginSaga() {
    yield takeLatest(getAllMasterInstitute.type, getAllMasterInstituteSaga);
    yield takeLatest(createMasterInstitute.type, createMasterInstituteSaga);
    yield takeLatest(getParentInstituteByType.type, getParentInstituteByTypeSaga);
    yield takeLatest(getMasterInstituteByID.type, getMasterInstituteByIDSaga);
    yield takeLatest(updateMasterinstituteById.type, updateMasterInstituteByIDSaga);
    yield takeLatest(deleteMasterinstituteById.type, deleteMasterInstituteSaga);
    yield takeLatest(getAllChildInstitute.type, getAllChildInstituteSaga);
    yield takeLatest(createChildInstitute.type, createChildInstituteSaga);
    yield takeLatest(getChildInstituteByType.type, getChildInstituteByTypeSaga);
    yield takeLatest(getMembersByInstitute.type, getMembersByInstituteSaga);
    yield takeLatest(getAllSubscribersSearch.type, getAllSubscribersSearchSaga);
    yield takeLatest(getChildInstituteByID.type, getChildInstituteByIDSaga);
    yield takeLatest(deleteChildInstitute.type, deleteChildInstituteSaga);
    yield takeLatest(updateChildInstituteById.type, updateChildInstituteByIDSaga);
    yield takeLatest(getAllManageTb, getAllManageTbSaga);
    yield takeLatest(createManageTb.type, createManageTbSaga);
    yield takeLatest(createInstituteMember.type, createInstituteMemberSaga);
    yield takeLatest(getAllMemberByInstituteId.type, getAllMemberByInstituteIdSaga);
    yield takeLatest(deleteInstituteMemberById.type, deleteInstituteMemberByIdSaga);
    yield takeLatest(transferOwnership.type, transferOwnershipSaga);
    yield takeLatest(getAllInstituteList.type, getAllInstituteListSaga);
    yield takeLatest(getAllQueryListById.type, getAllQueryListByIdSaga);
    yield takeLatest(transferQuery.type, transferQuerySaga);
    yield takeLatest(getAllClosedQueryListbyId.type, getAllClosedQueryListbyIdSaga);
    yield takeLatest(getAllTransferedQueryListById.type, getAllTransferedQueryListbyIdSaga);
    yield takeLatest(getAllOpenQueryListById.type, getAllOpenQueryListbyIdSaga);
    yield takeLatest(getAllQueryReportsListbyId.type, getAllQueryReportsListbyIdSaga);
    yield takeLatest(getAllQuestionList.type, getAllQuestionListSaga);
    yield takeLatest(getQuestionById.type, getQuestionByIdSaga);
    yield takeLatest(updateQuestion.type, updateQuestionSaga);
    yield takeLatest(deleteQuestion.type, deleteQuestionSaga);
    yield takeLatest(createQuestion.type, createQuestionSaga);
    yield takeLatest(getAllAssessmentList.type, getAllAssessmentListSaga);
    yield takeLatest(getAssessmentById.type, getAssessmentByIdSaga);
    yield takeLatest(updateAssessment.type, updateAssessmentSaga);
    yield takeLatest(deleteAssessment.type, deleteAssessmentSaga);
    yield takeLatest(createAssessment.type, createAssessmentSaga);
    yield takeLatest(getQuestionsWithoutPagination.type, getQuestionsWithoutPaginationSaga);
    yield takeLatest(getQuestionsWithoutPaginationReport.type, getQuestionsWithoutPaginationReportSaga);
    yield takeLatest(copyAssessment.type, copyAssessmentSaga);
    yield takeLatest(setActiveAssessment.type, setActiveAssessmentSaga);
    yield takeLatest(getInstituteReport.type, getInstituteReportSaga);
    yield takeLatest(sendAssessmentNotification.type, sendAssessmentNotificationSaga);
    yield takeLatest(getKbaseCoursereport.type, getKbaseCoursereportSaga);
    yield takeLatest(getKbasereport.type, getKbasereportSaga);
    yield takeLatest(getKbasereportcsv.type, getKbasereportCsvSaga);
    yield takeLatest(getKbaseCoursereportCsv.type, getKbaseCoursereportCsvSaga);
}
