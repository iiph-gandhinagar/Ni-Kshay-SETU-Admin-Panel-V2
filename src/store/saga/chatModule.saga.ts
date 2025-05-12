
import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createAbbreviationApi, createSystemQuestionApi, deleteAbbreviationByIDApi, deleteSystemQuestionByIDApi, getAbbreviationByIDApi, getAllAbbreviationApi, getAllSystemQuestionsApi, getSystemQuestionByIDApi, updateAbbreviationByIDApi, updateSystemQuestionByIDApi } from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createAbbreviationByID, deleteAbbreviationByID, deleteSystemQuestionByID, updateSystemQuestionByID } from "../actions/chatModule.action";
import { createAbbreviationSuccess, createSystemQuestion, createSystemQuestionSuccess, deleteAbbreviationByIDSuccess, deleteSystemQuestionByIDSuccess, getAbbreviationByID, getAbbreviationByIDSuccess, getAllAbbreviations, getAllAbbreviationsSuccess, getAllSystemQuestions, getAllSystemQuestionsSuccess, getSystemQuestionByID, getSystemQuestionByIDSuccess, updateAbbreviationByID, updateAbbreviationByIDSuccess, updateSystemQuestionByIDSuccess } from "../reducer/chatModule.reducer";

export function* getAllAbbreviationSaga(action: ReturnType<typeof getAllAbbreviations>) {
    try {
        const response: AxiosResponse = yield call(getAllAbbreviationApi, action.payload);
        if (response.data.status) {
            yield put(getAllAbbreviationsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllAbbreviationsSuccess(undefined));
            console.error("Error getAllAbbreviationSaga:", error);
        }
    }
}
export function* getAbbreviationByIDSaga(action: ReturnType<typeof getAbbreviationByID>) {
    try {
        const response: AxiosResponse = yield call(getAbbreviationByIDApi, action.payload);
        if (response.data.status) {
            yield put(getAbbreviationByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAbbreviationByIDSuccess(undefined));
            console.error("Error getAbbreviationByIDSaga:", error);
        }
    }
}
export function* createAbbreviationSaga(action: ReturnType<typeof createAbbreviationByID>) {
    try {
        const response: AxiosResponse = yield call(createAbbreviationApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createAbbreviationSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error?.response?.data?.message);
            yield put(createAbbreviationSuccess(undefined));
            console.error("Error createAbbreviationSaga:", error);
        }
    }
}
export function* updateAbbreviationByIDSaga(action: ReturnType<typeof updateAbbreviationByID>) {
    try {
        const response: AxiosResponse = yield call(updateAbbreviationByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateAbbreviationByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateAbbreviationByIDSuccess(undefined));
            console.error("Error updateAbbreviationSaga:", error);
        }
    }
}

export function* deleteAbbreviationByIDSaga(action: ReturnType<typeof deleteAbbreviationByID>) {
    try {
        const response: AxiosResponse = yield call(deleteAbbreviationByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteAbbreviationByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteAbbreviationByIDSuccess(undefined));
            console.error("Error deleteAbbreviationByIdSaga:", error);
        }
    }
}
export function* getAllSystemQuestionSaga(action: ReturnType<typeof getAllSystemQuestions>) {
    try {
        const response: AxiosResponse = yield call(getAllSystemQuestionsApi, action.payload);
        if (response.data.status) {
            yield put(getAllSystemQuestionsSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllSystemQuestionsSuccess(undefined));
            console.error("Error getAllSystemQuestionSaga:", error);
        }
    }
}
export function* getSystemQuestionByIDSaga(action: ReturnType<typeof getSystemQuestionByID>) {
    try {
        const response: AxiosResponse = yield call(getSystemQuestionByIDApi, action.payload);
        if (response.data.status) {
            yield put(getSystemQuestionByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getSystemQuestionByIDSuccess(undefined));
            console.error("Error getSystemQuestionByIDSaga:", error);
        }
    }
}
export function* createSystemQuestionSaga(action: ReturnType<typeof createSystemQuestion>) {
    try {
        const response: AxiosResponse = yield call(createSystemQuestionApi, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(createSystemQuestionSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(createSystemQuestionSuccess(undefined));
            console.error("Error createSystemQuestionSaga:", error);
        }
    }
}
export function* updateSystemQuestionByIDSaga(action: ReturnType<typeof updateSystemQuestionByID>) {
    try {
        const response: AxiosResponse = yield call(updateSystemQuestionByIDApi, action.payload.id, action.payload.obj);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(updateSystemQuestionByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            action?.payload?.callBack(error?.response?.data);
            yield put(updateSystemQuestionByIDSuccess(undefined));
            console.error("Error updateSystemQuestionSaga:", error);
        }
    }
}

export function* deleteSystemQuestionByIDSaga(action: ReturnType<typeof deleteSystemQuestionByID>) {
    try {
        const response: AxiosResponse = yield call(deleteSystemQuestionByIDApi, action.payload.id);
        if (response.data.status) {
            if (action?.payload?.callBack)
                action?.payload?.callBack(response.data);
            yield put(deleteSystemQuestionByIDSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(deleteSystemQuestionByIDSuccess(undefined));
            console.error("Error deleteSystemQuestionByIdSaga:", error);
        }
    }
}
export function* watchAbbreviationSaga() {
    yield takeLatest(getAllAbbreviations.type, getAllAbbreviationSaga);
    yield takeLatest(getAbbreviationByID.type, getAbbreviationByIDSaga);
    yield takeLatest(createAbbreviationByID.type, createAbbreviationSaga);
    yield takeLatest(updateAbbreviationByID.type, updateAbbreviationByIDSaga);
    yield takeLatest(deleteAbbreviationByID.type, deleteAbbreviationByIDSaga);
    yield takeLatest(getAllSystemQuestions.type, getAllSystemQuestionSaga);
    yield takeLatest(getSystemQuestionByID.type, getSystemQuestionByIDSaga);
    yield takeLatest(createSystemQuestion.type, createSystemQuestionSaga);
    yield takeLatest(updateSystemQuestionByID.type, updateSystemQuestionByIDSaga);
    yield takeLatest(deleteSystemQuestionByID.type, deleteSystemQuestionByIDSaga);
}
