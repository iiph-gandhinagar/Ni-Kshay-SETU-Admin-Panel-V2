import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { getAllActionsApi, getAllAdminActivityApi, getAllAdminActivityWithoutPaginationApi, getAllAssessmentWithoutPaginationApi, getAllChatbotActivityApi, getAllChatbotActivityWithoutPaginationApi, getAllInquiryApi, getAllInquiryWithoutPaginationApi, getAllOldAssessmentWithoutPaginationApi, getAllPrescriptionsApi, getAllprescriptionWithoutPaginationApi, getAllSubscriberActivityApi, getAllSubscriberActivityWithoutPaginationApi, getAllSubscribersWithoutpaginationApi, getAllUserAppVersionApi, getAllUserAppVersionWithoutPaginationApi, getOldAssessmentApi, getOldAssessmentWithoutApi, getProAssessmentApi, getProAssessmentWithoutApi, getSubscriberByIdApi, getSubscriberLeaderboardInfoApi, getUserAssessmentApi, getUserAssessmentWithoutApi, setActivityApi, updateSubscriberByIdApi } from "../../utils/api";
import { getAllAdminActivityWithoutPagination, getAllChatbotActivityWithoutPagination, getAllInquiriesWithoutPagination, getAllOldAssessmentsWithoutPagination, getAllprescriptionWithoutPagination, getAllProAssessmentsWithoutPagination, getAllSubscriberActivityWithoutPagination, getAllSubscribersWithoutPagination, getAllUserAppVersionWithoutPagination, getAllUserAssessmentsWithoutPagination, getSubscriberLeaderboardInfo, logActivity, updateSubscriberById } from "../actions/report.action";
import { getAllActions, getAllActionsSuccess, getAllActivity, getAllActivitySuccess, getAllAssessmentListWithoutPagination, getAllAssessmentListWithoutPaginationSuccess, getAllChatbotActivity, getAllChatbotActivitySuccess, getAllInquiry, getAllInquirySuccess, getAllOldAssessmentListWithoutPagination, getAllOldAssessmentListWithoutPaginationSuccess, getAllOldAssessments, getAllOldAssessmentsSuccess, getAllPrescriptions, getAllPrescriptionsSuccess, getAllProAssessments, getAllProAssessmentsSuccess, getAllsubscriberActivity, getAllsubscriberActivitySuccess, getAllUserAppVersion, getAllUserAppVersionSuccess, getAllUserAssessments, getAllUserAssessmentsSuccess, getReportEnd, getReportStart, getSubscriberById, getSubscriberByIdSuccess, logActivitySuccess } from "../reducer/report.reducer";

export function* getAllUserAssessmentsSaga(action: ReturnType<typeof getAllUserAssessments>) {
    try {
        const response: AxiosResponse = yield call(getUserAssessmentApi, action?.payload);
        if (response.data.status) {
            yield put(getAllUserAssessmentsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllUserAssessmentsSuccess(undefined));
            console.error("Error getAllUserAssessmentsSaga:", error);
        }
    }
}

export function* getAllOldAssessmentsSaga(action: ReturnType<typeof getAllOldAssessments>) {
    try {
        const response: AxiosResponse = yield call(getOldAssessmentApi, action?.payload);
        if (response.data.status) {
            yield put(getAllOldAssessmentsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllOldAssessmentsSuccess(undefined));
            console.error("Error getAllOldAssessmentsSaga:", error);
        }
    }
}

export function* getAllProAssessmentsSaga(action: ReturnType<typeof getAllProAssessments>) {
    try {
        const response: AxiosResponse = yield call(getProAssessmentApi, action?.payload);
        if (response.data.status) {
            yield put(getAllProAssessmentsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllProAssessmentsSuccess(undefined));
            console.error("Error getAllProAssessmentsSaga:", error);
        }
    }
}

export function* logActivitySaga(action: ReturnType<typeof logActivity>) {
    try {
        const response: AxiosResponse = yield call(setActivityApi, action.payload.obj);
        if (response.data.status) {
            yield put(logActivitySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(logActivitySuccess(undefined));
            console.error("Error logActivitySaga:", error);
        }
    }
}

export function* getAllActivitySaga(action: ReturnType<typeof getAllActivity>) {
    try {
        const response: AxiosResponse = yield call(getAllAdminActivityApi, action.payload);
        if (response.data.status) {
            yield put(getAllActivitySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllActivitySuccess(undefined));
            console.error("Error getAllActivitySaga:", error);
        }
    }
}
export function* getAllAdminActivityWithoutPaginationSaga(action: ReturnType<typeof getAllAdminActivityWithoutPagination>) {
    try {
        const response: AxiosResponse = yield call(getAllAdminActivityWithoutPaginationApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllActivityWithoutPaginationSaga:", error);
        }
    }
}

export function* getAllSubscriberActivitySaga(action: ReturnType<typeof getAllsubscriberActivity>) {
    try {
        const response: AxiosResponse = yield call(getAllSubscriberActivityApi, action.payload);
        if (response.data.status) {
            yield put(getAllsubscriberActivitySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllsubscriberActivitySuccess(undefined));
            console.error("Error getAllActivitySaga:", error);
        }
    }
}

export function* getAllInquirySaga(action: ReturnType<typeof getAllInquiry>) {
    try {
        const response: AxiosResponse = yield call(getAllInquiryApi, action.payload);
        if (response.data.status) {
            yield put(getAllInquirySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllInquirySuccess(undefined));
            console.error("Error getAllInquirySaga:", error);
        }
    }
}

export function* getAllInquiriesWithoutPaginationSaga(action: ReturnType<typeof getAllInquiriesWithoutPagination>) {
    try {
        const response: AxiosResponse = yield call(getAllInquiryWithoutPaginationApi, action?.payload?.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllActivityWithoutPaginationSaga:", error);
        }
    }
}

export function* getAllUserAppVersionSaga(action: ReturnType<typeof getAllUserAppVersion>) {
    try {
        const response: AxiosResponse = yield call(getAllUserAppVersionApi, action.payload);
        if (response.data.status) {
            yield put(getAllUserAppVersionSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllUserAppVersionSuccess(undefined));
            console.error("Error getAllUserAppVersionSaga:", error);
        }
    }
}
export function* getAllSubscriberActivityWithoutPaginationSaga(action: ReturnType<typeof getAllSubscriberActivityWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getAllSubscriberActivityWithoutPaginationApi, action.payload.params);

        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }

        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllSubscriberActivityWithoutPaginationSaga:", error);
        }
    }
}
export function* getAllUserAppVersionWithoutPaginationSaga(action: ReturnType<typeof getAllUserAppVersionWithoutPagination>) {
    try {
        const response: AxiosResponse = yield call(getAllUserAppVersionWithoutPaginationApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllUserAppVersionWithoutPaginationSaga:", error);
        }
    }
}
export function* getAllUserAssessmentsWithoutPaginationSaga(action: ReturnType<typeof getAllUserAssessmentsWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getUserAssessmentWithoutApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllUserAssessmentsWithoutPaginationSaga:", error);
        }
    }
}

export function* getAllOldAssessmentsWithoutPaginationSaga(action: ReturnType<typeof getAllOldAssessmentsWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getOldAssessmentWithoutApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllOldAssessmentsWithoutPaginationSaga:", error);
        }
    }
}
export function* getAllProAssessmentsWithoutPaginationSaga(action: ReturnType<typeof getAllProAssessmentsWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getProAssessmentWithoutApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllProAssessmentsWithoutPaginationSaga:", error);
        }
    }
}
export function* getAllSubscribersWithoutPaginationSaga(action: ReturnType<typeof getAllSubscribersWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getAllSubscribersWithoutpaginationApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllSubscribersWithoutPaginationSaga:", error);
        }
    }
}


export function* getAllChatbotActivitySaga(action: ReturnType<typeof getAllChatbotActivity>) {
    try {
        const response: AxiosResponse = yield call(getAllChatbotActivityApi, action.payload);
        if (response.data.status) {
            yield put(getAllChatbotActivitySuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllChatbotActivitySuccess(undefined));
            console.error("Error getAllChatbotActivitySaga:", error);
        }
    }
}
export function* getAllChatbotActivityWithoutPaginationSaga(action: ReturnType<typeof getAllChatbotActivityWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getAllChatbotActivityWithoutPaginationApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllChatbotActivityWithoutPaginationSaga:", error);
        }
    }
}
export function* getSubscriberByIdSaga(action: ReturnType<typeof getSubscriberById>) {
    try {
        const response: AxiosResponse = yield call(getSubscriberByIdApi, action.payload);
        if (response.data.status) {
            yield put(getSubscriberByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getSubscriberByIdSuccess(undefined));
            console.error("Error getSubscriberByIdSaga:", error);
        }
    }
}

export function* updateSubscriberByIdSaga(action: ReturnType<typeof updateSubscriberById>) {
    try {
        const response: AxiosResponse = yield call(updateSubscriberByIdApi, action.payload.id, action.payload.obj);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error updateSubscriberByIdSaga:", error);
        }
    }
}

export function* getAllPrescriptionsSaga(action: ReturnType<typeof getAllPrescriptions>) {
    try {
        const response: AxiosResponse = yield call(getAllPrescriptionsApi, action.payload);
        if (response.data.status) {
            yield put(getAllPrescriptionsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllPrescriptionsSuccess(undefined));
            console.error("Error getAllPrescriptionsSaga:", error);
        }
    }
}

export function* getAllprescriptionWithoutPaginationSaga(action: ReturnType<typeof getAllprescriptionWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getAllprescriptionWithoutPaginationApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllprescriptionWithoutPaginationSaga:", error);
        }
    }
}

export function* getSubscriberLeaderboardInfoSaga(action: ReturnType<typeof getSubscriberLeaderboardInfo>) {
    try {
        const response: AxiosResponse = yield call(getSubscriberLeaderboardInfoApi, action.payload.id);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getSubscriberLeaderboardInfoSaga:", error);
        }
    }
}

export function* getAllAssessmentListWithoutPaginationSaga(action: ReturnType<typeof getAllAssessmentListWithoutPagination>) {
    try {
        const response: AxiosResponse = yield call(getAllAssessmentWithoutPaginationApi);
        if (response.data.status) {
            yield put(getAllAssessmentListWithoutPaginationSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllAssessmentListWithoutPaginationSuccess(undefined));
            console.error("Error getAllAssessmentListWithoutPaginationSaga:", error);
        }
    }
}

export function* getAllOldAssessmentListWithoutPaginationSaga(action: ReturnType<typeof getAllOldAssessmentListWithoutPagination>) {
    try {
        const response: AxiosResponse = yield call(getAllOldAssessmentWithoutPaginationApi);
        if (response.data.status) {
            yield put(getAllOldAssessmentListWithoutPaginationSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllOldAssessmentListWithoutPaginationSuccess(undefined));
            console.error("Error getAllAssessmentListWithoutPaginationSaga:", error);
        }
    }
}

export function* getAllActionsSaga(action: ReturnType<typeof getAllActions>) {
    try {
        const response: AxiosResponse = yield call(getAllActionsApi);
        if (response.data.status) {
            yield put(getAllActionsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllActionsSuccess(undefined));
            console.error("Error getAllActionsSaga:", error);
        }
    }
}

export function* watchReportSaga() {
    yield takeLatest(getAllUserAssessments.type, getAllUserAssessmentsSaga);
    yield takeLatest(getAllProAssessments.type, getAllProAssessmentsSaga);
    yield takeLatest(logActivity.type, logActivitySaga);
    yield takeLatest(getAllActivity.type, getAllActivitySaga);
    yield takeLatest(getAllsubscriberActivity.type, getAllSubscriberActivitySaga);
    yield takeLatest(getAllAdminActivityWithoutPagination.type, getAllAdminActivityWithoutPaginationSaga);
    yield takeLatest(getAllInquiry.type, getAllInquirySaga);
    yield takeLatest(getAllInquiriesWithoutPagination.type, getAllInquiriesWithoutPaginationSaga);
    yield takeLatest(getAllUserAppVersion.type, getAllUserAppVersionSaga);
    yield takeLatest(getAllSubscriberActivityWithoutPagination.type, getAllSubscriberActivityWithoutPaginationSaga);
    yield takeLatest(getAllUserAppVersionWithoutPagination.type, getAllUserAppVersionWithoutPaginationSaga);
    yield takeLatest(getAllUserAssessmentsWithoutPagination.type, getAllUserAssessmentsWithoutPaginationSaga);
    yield takeLatest(getAllProAssessmentsWithoutPagination.type, getAllProAssessmentsWithoutPaginationSaga);
    yield takeLatest(getAllSubscribersWithoutPagination.type, getAllSubscribersWithoutPaginationSaga);
    yield takeLatest(getAllChatbotActivity.type, getAllChatbotActivitySaga);
    yield takeLatest(getAllChatbotActivityWithoutPagination.type, getAllChatbotActivityWithoutPaginationSaga);
    yield takeLatest(getSubscriberById.type, getSubscriberByIdSaga);
    yield takeLatest(updateSubscriberById.type, updateSubscriberByIdSaga);
    yield takeLatest(getAllPrescriptions.type, getAllPrescriptionsSaga);
    yield takeLatest(getAllprescriptionWithoutPagination.type, getAllprescriptionWithoutPaginationSaga);
    yield takeLatest(getSubscriberLeaderboardInfo.type, getSubscriberLeaderboardInfoSaga);
    yield takeLatest(getAllAssessmentListWithoutPagination.type, getAllAssessmentListWithoutPaginationSaga);
    yield takeLatest(getAllOldAssessmentListWithoutPagination.type, getAllOldAssessmentListWithoutPaginationSaga);
    yield takeLatest(getAllActions.type, getAllActionsSaga);
    yield takeLatest(getAllOldAssessments.type, getAllOldAssessmentsSaga);
    yield takeLatest(getAllOldAssessmentsWithoutPagination.type, getAllOldAssessmentsWithoutPaginationSaga);
}
