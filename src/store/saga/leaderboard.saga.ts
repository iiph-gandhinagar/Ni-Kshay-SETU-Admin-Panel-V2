import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createLeaderboardBadgeApi, createLeaderboardLevelApi, createLeaderboardTaskApi, deleteLeaderboardBadgeApi, deleteLeaderboardLevelApi, deleteLeaderboardTaskApi, getAllLeaderboardBadgeListApi, getAllLeaderboardLevelListApi, getAllLeaderboardSubscriberRankApi, getAllLeaderboardSubscriberRankWithoutPaginationApi, getAllLeaderboardTaskListApi, getLeaderboardBadgeByIdApi, getLeaderboardLevelByIdApi, getLeaderboardTaskByIdApi, updateLeaderboardBadgeApi, updateLeaderboardLevelApi, updateLeaderboardTaskApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createLeaderboardBadgeByID, createLeaderboardLevelByID, createLeaderboardTaskByID, deleteLeaderboardBadgeByID, deleteLeaderboardLevelByID, deleteLeaderboardTaskByID, getAllLeaderboardSubscriberRankWithoutPagination, updateLeaderboardBadgeByID, updateLeaderboardLevelByID, updateLeaderboardTaskByID } from "../actions/leaderboard.action";
import { createLeaderboardBadgeByIDSuccess, createLeaderboardLevelByIDSuccess, createLeaderboardTaskByIDSuccess, deleteLeaderboardBadgeByIDSuccess, deleteLeaderboardLevelByIDSuccess, deleteLeaderboardTaskByIDSuccess, getAllLeaderboardBadgeList, getAllLeaderboardBadgeListSuccess, getAllLeaderboardLevelList, getAllLeaderboardLevelListSuccess, getAllLeaderboardSubscriberRank, getAllLeaderboardSubscriberRankSuccess, getAllLeaderboardTaskList, getAllLeaderboardTaskListSuccess, getLeaderboardBadgeById, getLeaderboardBadgeByIdSuccess, getLeaderboardLevelById, getLeaderboardLevelByIdSuccess, getLeaderboardTaskById, getLeaderboardTaskByIdSuccess, updateLeaderboardBadgeByIDSuccess, updateLeaderboardLevelByIDSuccess, updateLeaderboardTaskByIDSuccess } from "../reducer/leaderboard.reducer";
import { getReportEnd, getReportStart } from "../reducer/report.reducer";

export function* getAllLeaderboardLevelListSaga(action: ReturnType<typeof getAllLeaderboardLevelList>) {
    try {
        const response: AxiosResponse = yield call(getAllLeaderboardLevelListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllLeaderboardLevelListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllLeaderboardLevelListSuccess(undefined));
            console.error("Error getAllLeaderboardLevelListSaga:", error);
        }
    }
}
export function* getLeaderboardLevelByIdSaga(action: ReturnType<typeof getLeaderboardLevelById>) {
    try {
        const response: AxiosResponse = yield call(getLeaderboardLevelByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getLeaderboardLevelByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getLeaderboardLevelByIdSuccess(undefined));
            console.error("Error getLeaderboardLevelByIdSaga:", error);
        }
    }
}
export function* updateLeaderboardLevelByIDSaga(action: ReturnType<typeof updateLeaderboardLevelByID>) {
    try {
        const response: AxiosResponse = yield call(updateLeaderboardLevelApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateLeaderboardLevelByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(updateLeaderboardLevelByIDSuccess(undefined));
            console.error("Error updateLeaderboardLevelByID:", error);
        }
    }
}
export function* createLeaderboardLevelByIDSaga(action: ReturnType<typeof createLeaderboardLevelByID>) {
    try {
        const response: AxiosResponse = yield call(createLeaderboardLevelApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createLeaderboardLevelByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(createLeaderboardLevelByIDSuccess(undefined));
            console.error("Error createLeaderboardLevelByID:", error);
        }
    }
} export function* deleteLeaderboardLevelByIDSaga(action: ReturnType<typeof deleteLeaderboardLevelByID>) {
    try {
        const response: AxiosResponse = yield call(deleteLeaderboardLevelApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteLeaderboardLevelByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(deleteLeaderboardLevelByIDSuccess(undefined));
            console.error("Error deleteLeaderboardLevelByID:", error);
        }
    }
}

export function* getAllLeaderboardBadgeListSaga(action: ReturnType<typeof getAllLeaderboardBadgeList>) {
    try {
        const response: AxiosResponse = yield call(getAllLeaderboardBadgeListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllLeaderboardBadgeListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllLeaderboardBadgeListSuccess(undefined));
            console.error("Error getAllLeaderboardBadgeListSaga:", error);
        }
    }
}
export function* getLeaderboardBadgeByIdSaga(action: ReturnType<typeof getLeaderboardBadgeById>) {
    try {
        const response: AxiosResponse = yield call(getLeaderboardBadgeByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getLeaderboardBadgeByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getLeaderboardBadgeByIdSuccess(undefined));
            console.error("Error getLeaderboardBadgeByIdSaga:", error);
        }
    }
}
export function* updateLeaderboardBadgeByIDSaga(action: ReturnType<typeof updateLeaderboardBadgeByID>) {
    try {
        const response: AxiosResponse = yield call(updateLeaderboardBadgeApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateLeaderboardBadgeByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(updateLeaderboardBadgeByIDSuccess(undefined));
            console.error("Error updateLeaderboardBadgeByID:", error);
        }
    }
}
export function* createLeaderboardBadgeByIDSaga(action: ReturnType<typeof createLeaderboardBadgeByID>) {
    try {
        const response: AxiosResponse = yield call(createLeaderboardBadgeApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createLeaderboardBadgeByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(createLeaderboardBadgeByIDSuccess(undefined));
            console.error("Error createLeaderboardBadgeByID:", error);
        }
    }
} export function* deleteLeaderboardBadgeByIDSaga(action: ReturnType<typeof deleteLeaderboardBadgeByID>) {
    try {
        const response: AxiosResponse = yield call(deleteLeaderboardBadgeApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteLeaderboardBadgeByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(deleteLeaderboardBadgeByIDSuccess(undefined));
            console.error("Error deleteLeaderboardBadgeByID:", error);
        }
    }
}

export function* getAllLeaderboardTaskListSaga(action: ReturnType<typeof getAllLeaderboardTaskList>) {
    try {
        const response: AxiosResponse = yield call(getAllLeaderboardTaskListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllLeaderboardTaskListSuccess(response.data.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllLeaderboardTaskListSuccess(undefined));
            console.error("Error getAllLeaderboardTaskListSaga:", error);
        }
    }
}
export function* getLeaderboardTaskByIdSaga(action: ReturnType<typeof getLeaderboardTaskById>) {
    try {
        const response: AxiosResponse = yield call(getLeaderboardTaskByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getLeaderboardTaskByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getLeaderboardTaskByIdSuccess(undefined));
            console.error("Error getLeaderboardTaskByIdSaga:", error);
        }
    }
}
export function* updateLeaderboardTaskByIDSaga(action: ReturnType<typeof updateLeaderboardTaskByID>) {
    try {
        const response: AxiosResponse = yield call(updateLeaderboardTaskApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateLeaderboardTaskByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(updateLeaderboardTaskByIDSuccess(undefined));
            console.error("Error updateLeaderboardTaskByID:", error);
        }
    }
}
export function* createLeaderboardTaskByIDSaga(action: ReturnType<typeof createLeaderboardTaskByID>) {
    try {
        const response: AxiosResponse = yield call(createLeaderboardTaskApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createLeaderboardTaskByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(createLeaderboardTaskByIDSuccess(undefined));
            console.error("Error createLeaderboardTaskByID:", error);
        }
    }
} export function* deleteLeaderboardTaskByIDSaga(action: ReturnType<typeof deleteLeaderboardTaskByID>) {
    try {
        const response: AxiosResponse = yield call(deleteLeaderboardTaskApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteLeaderboardTaskByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action.payload?.callBack(error.response?.data);
            yield put(deleteLeaderboardTaskByIDSuccess(undefined));
            console.error("Error deleteLeaderboardTaskByID:", error);
        }
    }
}

export function* getAllLeaderboardSubscriberRankSaga(action: ReturnType<typeof getAllLeaderboardSubscriberRank>) {
    try {
        const response: AxiosResponse = yield call(getAllLeaderboardSubscriberRankApi, action?.payload);
        if (response.data.status) {
            yield put(getAllLeaderboardSubscriberRankSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllLeaderboardSubscriberRankSuccess(undefined));
            console.error("Error getAllLeaderboardSubscriberRankSaga", error);
        }
    }
}

export function* getAllLeaderboardSubscriberRankWithoutPaginationSaga(action: ReturnType<typeof getAllLeaderboardSubscriberRankWithoutPagination>) {
    try {
        yield put(getReportStart());
        const response: AxiosResponse = yield call(getAllLeaderboardSubscriberRankWithoutPaginationApi, action.payload.params);
        if (action?.payload?.callBack) {
            action?.payload?.callBack(response.data);
        }
        yield put(getReportEnd());
    } catch (error) {
        if (error instanceof AxiosError) {
            action.payload?.callBack(error.response?.data);
            console.error("Error getAllLeaderboardSubscriberRankWithoutPaginationSaga:", error);
        }
    }
}


export function* watchLeaderboardSaga() {
    yield takeLatest(getAllLeaderboardLevelList.type, getAllLeaderboardLevelListSaga);
    yield takeLatest(getLeaderboardLevelById.type, getLeaderboardLevelByIdSaga);
    yield takeLatest(updateLeaderboardLevelByID.type, updateLeaderboardLevelByIDSaga);
    yield takeLatest(createLeaderboardLevelByID.type, createLeaderboardLevelByIDSaga);
    yield takeLatest(deleteLeaderboardLevelByID.type, deleteLeaderboardLevelByIDSaga);
    yield takeLatest(getAllLeaderboardBadgeList.type, getAllLeaderboardBadgeListSaga);
    yield takeLatest(getLeaderboardBadgeById.type, getLeaderboardBadgeByIdSaga);
    yield takeLatest(updateLeaderboardBadgeByID.type, updateLeaderboardBadgeByIDSaga);
    yield takeLatest(createLeaderboardBadgeByID.type, createLeaderboardBadgeByIDSaga);
    yield takeLatest(deleteLeaderboardBadgeByID.type, deleteLeaderboardBadgeByIDSaga);
    yield takeLatest(getAllLeaderboardTaskList.type, getAllLeaderboardTaskListSaga);
    yield takeLatest(getLeaderboardTaskById.type, getLeaderboardTaskByIdSaga);
    yield takeLatest(updateLeaderboardTaskByID.type, updateLeaderboardTaskByIDSaga);
    yield takeLatest(createLeaderboardTaskByID.type, createLeaderboardTaskByIDSaga);
    yield takeLatest(deleteLeaderboardTaskByID.type, deleteLeaderboardTaskByIDSaga);
    yield takeLatest(getAllLeaderboardSubscriberRank.type, getAllLeaderboardSubscriberRankSaga);
    yield takeLatest(getAllLeaderboardSubscriberRankWithoutPagination.type, getAllLeaderboardSubscriberRankWithoutPaginationSaga);
}
