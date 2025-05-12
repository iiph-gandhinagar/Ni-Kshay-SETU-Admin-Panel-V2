import { AxiosError, AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getAllDashboardDataApi, getDashboardAppOpenedCountApi, getDashboardAssessmentCountApi, getDashboardAssessmentGraphCountApi, getDashboardCadreWiseCountApi, getDashboardChatbotCountApi, getDashboardGeneralCount1Api, getDashboardGeneralCount2Api, getDashboardGeneralCount3Api, getDashboardLeaderboardCountApi, getDashboardManageTBCountApi, getDashboardMapCountApi, getDashboardModuleUsageCountApi, getDashboardProAssessmentGraphCountApi, getDashboardQuery2coeCountApi, getDashboardSubscriberCountApi, getDashboardVisitorCountApi } from "../../utils/api";
import { fetchAllDashboardData, getAllDashboardData, getAllDashboardDataSuccess, getDashboardAppOpenedCount, getDashboardAppOpenedCountSuccess, getDashboardAssessmentCount, getDashboardAssessmentCountSuccess, getDashboardAssessmentGraphCount, getDashboardAssessmentGraphCountSuccess, getDashboardCadreWiseCount, getDashboardCadreWiseCountSuccess, getDashboardChatbotCount, getDashboardChatbotCountSuccess, getDashboardGeneralCount, getDashboardGeneralCountSuccess, getDashboardLeaderboardCount, getDashboardLeaderboardCountSuccess, getDashboardManageTBCount, getDashboardManageTBCountSuccess, getDashboardMapCount, getDashboardMapCountSuccess, getDashboardModuleUsageCount, getDashboardModuleUsageCountSuccess, getDashboardProAssessmentGraphCount, getDashboardProAssessmentGraphCountSuccess, getDashboardQuery2coeCount, getDashboardQuery2coeCountSuccess, getDashboardSubscriberCount, getDashboardSubscriberCountSuccess, getDashboardVisitorCount, getDashboardVisitorCountSuccess } from "../reducer/dashboard.reducer";


export function* getAllDashboardDataSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getAllDashboardDataApi, action?.payload);
        if (response.data.status) {
            yield put(getAllDashboardDataSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllDashboardDataSuccess(undefined));
            console.error("Error getAllDashboardData:", error);
        }
    }
}
export function* getDashboardMapCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardMapCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardMapCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardMapCountSuccess(undefined));
            console.error("Error getDashboardMapCountSaga:", error);
        }
    }
}
export function* getDashboardCadreWiseCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardCadreWiseCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardCadreWiseCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardCadreWiseCountSuccess(undefined));
            console.error("Error getDashboardCadreWiseCountSaga:", error);
        }
    }
}
export function* getDashboardModuleUsageCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardModuleUsageCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardModuleUsageCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardModuleUsageCountSuccess(undefined));
            console.error("Error getDashboardModuleUsageCountSaga:", error);
        }
    }
}
export function* getDashboardLeaderboardCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardLeaderboardCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardLeaderboardCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardLeaderboardCountSuccess(undefined));
            console.error("Error getDashboardLeaderboardCountSaga:", error);
        }
    }
}
export function* getDashboardChatbotCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardChatbotCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardChatbotCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardChatbotCountSuccess(undefined));
            console.error("Error getDashboardChatbotCountSaga:", error);
        }
    }
}
export function* getDashboardManageTBCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardManageTBCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardManageTBCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardManageTBCountSuccess(undefined));
            console.error("Error getDashboardManageTBCountSaga:", error);
        }
    }
}
export function* getDashboardQuery2coeCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardQuery2coeCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardQuery2coeCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardQuery2coeCountSuccess(undefined));
            console.error("Error getDashboardQuery2coeCountSaga:", error);
        }
    }
}
export function* getDashboardAssessmentGraphCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardAssessmentGraphCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardAssessmentGraphCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardAssessmentGraphCountSuccess(undefined));
            console.error("Error getDashboardAssessmentGraphCountSaga:", error);
        }
    }
}

export function* getDashboardProAssessmentGraphCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardProAssessmentGraphCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardProAssessmentGraphCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardProAssessmentGraphCountSuccess(undefined));
            console.error("Error getDashboardProAssessmentGraphCountSaga:", error);
        }
    }
}

export function* getDashboardSubscriberCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardSubscriberCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardSubscriberCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardSubscriberCountSuccess(undefined));
            console.error("Error getDashboardSubscriberCountSaga:", error);
        }
    }
}
export function* getDashboardAssessmentCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardAssessmentCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardAssessmentCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardAssessmentCountSuccess(undefined));
            console.error("Error getDashboardAssessmentCountSaga:", error);
        }
    }
}
export function* getDashboardGeneralCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        let combinedData = {};

        const response1: AxiosResponse = yield call(getDashboardGeneralCount1Api, action?.payload);
        if (response1.data.status) {
            combinedData = { ...combinedData, ...response1.data.data };
        }

        const response2: AxiosResponse = yield call(getDashboardGeneralCount2Api, action?.payload);
        if (response2.data.status) {
            combinedData = { ...combinedData, ...response2.data.data };
        }

        const response3: AxiosResponse = yield call(getDashboardGeneralCount3Api, action?.payload);
        if (response3.data.status) {
            combinedData = { ...combinedData, ...response3.data.data };
        }

        // Dispatch final merged result
        yield put(getDashboardGeneralCountSuccess(combinedData));
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardGeneralCountSuccess(undefined));
            console.error("Error in getDashboardGeneralCountSaga:", error);
        }
    }
}

export function* getDashboardAppOpenedCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardAppOpenedCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardAppOpenedCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardAppOpenedCountSuccess(undefined));
            console.error("Error getDashboardAppOpenedCountSaga:", error);
        }
    }
}
export function* getDashboardVisitorCountSaga(action: ReturnType<typeof getAllDashboardData>) {
    try {
        const response: AxiosResponse = yield call(getDashboardVisitorCountApi, action?.payload);
        if (response.data.status) {
            yield put(getDashboardVisitorCountSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getDashboardVisitorCountSuccess(undefined));
            console.error("Error getDashboardVisitorCountSaga:", error);
        }
    }
}

export function* fetchAllDashboardDataSaga(action: any) {
    yield all([
        // call(getDashboardModuleUsageCountSaga, action),
        // call(getDashboardCadreWiseCountSaga, action),
        call(getDashboardGeneralCountSaga, action),
        call(getDashboardChatbotCountSaga, action),
        call(getDashboardManageTBCountSaga, action),
        call(getDashboardQuery2coeCountSaga, action),
        call(getDashboardAssessmentGraphCountSaga, action),
        call(getDashboardProAssessmentGraphCountSaga, action),
        call(getDashboardLeaderboardCountSaga, action),
    ]);
    yield call(getDashboardMapCountSaga, action);
    yield call(getDashboardCadreWiseCountSaga, action);
    yield call(getDashboardModuleUsageCountSaga, action);
}



export function* watchDashboardSaga() {
    yield takeLatest(getAllDashboardData.type, getAllDashboardDataSaga);
    yield takeLatest(getDashboardMapCount.type, getDashboardMapCountSaga);
    yield takeLatest(getDashboardCadreWiseCount.type, getDashboardCadreWiseCountSaga);
    yield takeLatest(getDashboardModuleUsageCount.type, getDashboardModuleUsageCountSaga);
    yield takeLatest(getDashboardLeaderboardCount.type, getDashboardLeaderboardCountSaga);
    yield takeLatest(getDashboardChatbotCount.type, getDashboardChatbotCountSaga);
    yield takeLatest(getDashboardManageTBCount.type, getDashboardManageTBCountSaga);
    yield takeLatest(getDashboardQuery2coeCount.type, getDashboardQuery2coeCountSaga);
    yield takeLatest(getDashboardSubscriberCount.type, getDashboardSubscriberCountSaga);
    yield takeLatest(getDashboardAssessmentCount.type, getDashboardAssessmentCountSaga);
    yield takeLatest(getDashboardAssessmentGraphCount.type, getDashboardAssessmentGraphCountSaga);
    yield takeLatest(getDashboardGeneralCount.type, getDashboardGeneralCountSaga);
    yield takeLatest(getDashboardAppOpenedCount.type, getDashboardAppOpenedCountSaga);
    yield takeLatest(getDashboardVisitorCount.type, getDashboardVisitorCountSaga);
    yield takeLatest(getDashboardProAssessmentGraphCount.type, getDashboardProAssessmentGraphCountSaga);
    yield takeLatest(fetchAllDashboardData.type, fetchAllDashboardDataSaga);
}
