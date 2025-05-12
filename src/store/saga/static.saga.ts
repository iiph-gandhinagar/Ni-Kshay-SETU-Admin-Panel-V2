import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    createStaticAppConfigApi,
    createStaticBlogApi,
    createStaticFaqApi,
    createStaticKeyFeatureApi,
    createStaticModuleApi,
    createStaticReleaseApi,
    createStaticResourceMaterialApi,
    createStaticTestimonialApi,
    createStaticWhatWeDoApi,
    deleteStaticAppConfigApi,
    deleteStaticBlogApi,
    deleteStaticFaqApi,
    deleteStaticKeyFeatureApi,
    deleteStaticModuleApi,
    deleteStaticReleaseApi,
    deleteStaticResourceMaterialApi,
    deleteStaticTestimonialApi,
    deleteStaticWhatWeDoApi,
    getAllStaticAppConfigListApi,
    getAllStaticBlogListApi,
    getAllStaticEnquiryListApi,
    getAllStaticFaqListApi,
    getAllStaticKeyFeatureListApi,
    getAllStaticModuleListApi,
    getAllStaticReleaseListApi,
    getAllStaticResourceMaterialListApi,
    getAllStaticTestimonialListApi,
    getAllStaticWhatWeDoListApi,
    getStaticAppConfigByIdApi,
    getStaticBlogByIdApi,
    getStaticFaqByIdApi,
    getStaticKeyFeatureByIdApi,
    getStaticModuleByIdApi,
    getStaticReleaseByIdApi,
    getStaticResourceMaterialByIdApi,
    getStaticTestimonialByIdApi,
    getStaticWhatWeDoByIdApi,
    updateStaticAppConfigApi,
    updateStaticBlogApi,
    updateStaticFaqApi,
    updateStaticKeyFeatureApi,
    updateStaticModuleApi,
    updateStaticReleaseApi,
    updateStaticResourceMaterialApi,
    updateStaticTestimonialApi,
    updateStaticWhatWeDoApi,
    uploadImageApi
} from "../../utils/api";
import { ErrorToast } from "../../utils/toasts";
import { createStaticAppConfig, createStaticBlog, createStaticFaq, createStaticKeyFeature, createStaticModule, createStaticRelease, createStaticResourceMaterial, createStaticTestimonial, createStaticWhatWeDo, deleteStaticAppConfigById, deleteStaticBlogById, deleteStaticFaqById, deleteStaticKeyFeatureById, deleteStaticModuleById, deleteStaticReleaseById, deleteStaticResourceMaterialById, deleteStaticTestimonialById, deleteStaticWhatWeDoById, updateStaticAppConfigById, updateStaticBlogById, updateStaticFaqById, updateStaticKeyFeatureById, updateStaticModuleById, updateStaticReleaseById, updateStaticResourceMaterialById, updateStaticTestimonialById, updateStaticWhatWeDoById, uploadStaticBlogImage, uploadStaticKeyFeatureFile, uploadStaticModuleFile, uploadStaticResourceMaterialFile, uploadStaticWhatWeDoFile } from "../actions/static.action";
import { createStaticAppConfigSuccess, createStaticBlogSuccess, createStaticFaqSuccess, createStaticKeyFeatureSuccess, createStaticModuleSuccess, createStaticReleaseSuccess, createStaticResourceMaterialSuccess, createStaticTestimonialSuccess, createStaticWhatWeDoSuccess, deleteStaticAppConfigByIdSuccess, deleteStaticBlogByIdSuccess, deleteStaticFaqByIdSuccess, deleteStaticKeyFeatureByIdSuccess, deleteStaticModuleByIdSuccess, deleteStaticReleaseByIdSuccess, deleteStaticResourceMaterialByIdSuccess, deleteStaticTestimonialByIdSuccess, deleteStaticWhatWeDoByIdSuccess, getAllStaticAppConfigList, getAllStaticAppConfigListSuccess, getAllStaticBlogList, getAllStaticBlogListSuccess, getAllStaticFaqList, getAllStaticFaqListSuccess, getAllStaticKeyFeatureList, getAllStaticKeyFeatureListSuccess, getAllStaticModuleList, getAllStaticModuleListSuccess, getAllStaticReleaseList, getAllStaticReleaseListSuccess, getAllStaticResourceMaterialList, getAllStaticResourceMaterialListSuccess, getAllStaticTestimonialList, getAllStaticTestimonialListSuccess, getAllStaticWhatWeDoList, getAllStaticWhatWeDoListSuccess, getStaticAppConfigById, getStaticAppConfigByIdSuccess, getStaticBlogById, getStaticBlogByIdSuccess, getStaticEnquiryList, getStaticEnquiryListSuccess, getStaticFaqById, getStaticFaqByIdSuccess, getStaticKeyFeatureById, getStaticKeyFeatureByIdSuccess, getStaticModuleById, getStaticModuleByIdSuccess, getStaticReleaseById, getStaticReleaseByIdSuccess, getStaticResourceMaterialById, getStaticResourceMaterialByIdSuccess, getStaticTestimonialById, getStaticTestimonialByIdSuccess, getStaticWhatWeDoById, getStaticWhatWeDoByIdSuccess, updateStaticAppConfigByIdSuccess, updateStaticBlogByIdSuccess, updateStaticFaqByIdSuccess, updateStaticKeyFeatureByIdSuccess, updateStaticModuleByIdSuccess, updateStaticReleaseByIdSuccess, updateStaticResourceMaterialByIdSuccess, updateStaticTestimonialByIdSuccess, updateStaticWhatWeDoByIdSuccess } from "../reducer/static.reducer";


function* getAllStaticBlogListSaga(action: ReturnType<typeof getAllStaticBlogList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticBlogListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllStaticBlogListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllStaticBlogListSuccess(undefined));
            console.error("Error getAllStaticBlogListSaga:", error);
        }
    }
}

function* getStaticBlogByIdSaga(action: ReturnType<typeof getStaticBlogById>) {
    try {
        const response: AxiosResponse = yield call(getStaticBlogByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticBlogByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticBlogByIdSuccess(undefined));
            console.error("Error getStaticBlogByIdSaga:", error);
        }
    }
}

function* createStaticBlogSaga(action: ReturnType<typeof createStaticBlog>) {
    try {
        const response: AxiosResponse = yield call(createStaticBlogApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createStaticBlogSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createStaticBlogSuccess(undefined));
            console.error("Error createStaticBlogSaga:", error);
        }
    }
}

function* updateStaticBlogSaga(action: ReturnType<typeof updateStaticBlogById>) {
    try {
        const response: AxiosResponse = yield call(updateStaticBlogApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateStaticBlogByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(updateStaticBlogByIdSuccess(undefined));
            console.error("Error updateStaticBlogSaga:", error);
        }
    }
}

function* deleteStaticBlogSaga(action: ReturnType<typeof deleteStaticBlogById>) {
    try {
        const response: AxiosResponse = yield call(deleteStaticBlogApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteStaticBlogByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(deleteStaticBlogByIdSuccess(undefined));
            console.error("Error deleteStaticBlogSaga:", error);
        }
    }
}
// Static FAQ Sagas
function* getAllStaticFaqListSaga(action: ReturnType<typeof getAllStaticFaqList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticFaqListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllStaticFaqListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllStaticFaqListSuccess(undefined));
            console.error("Error getAllStaticFaqListSaga:", error);
        }
    }
}

function* getStaticFaqByIdSaga(action: ReturnType<typeof getStaticFaqById>) {
    try {
        const response: AxiosResponse = yield call(getStaticFaqByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticFaqByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticFaqByIdSuccess(undefined));
            console.error("Error getStaticFaqByIdSaga:", error);
        }
    }
}

function* createStaticFaqSaga(action: ReturnType<typeof createStaticFaq>) {
    try {
        const response: AxiosResponse = yield call(createStaticFaqApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createStaticFaqSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createStaticFaqSuccess(undefined));
            console.error("Error createStaticFaqSaga:", error);
        }
    }
}

function* updateStaticFaqSaga(action: ReturnType<typeof updateStaticFaqById>) {
    try {
        const response: AxiosResponse = yield call(updateStaticFaqApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateStaticFaqByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(updateStaticFaqByIdSuccess(undefined));
            console.error("Error updateStaticFaqSaga:", error);
        }
    }
}

function* deleteStaticFaqSaga(action: ReturnType<typeof deleteStaticFaqById>) {
    try {
        const response: AxiosResponse = yield call(deleteStaticFaqApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteStaticFaqByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(deleteStaticFaqByIdSuccess(undefined));
            console.error("Error deleteStaticFaqSaga:", error);
        }
    }
}
// Static App Config Sagas
function* getAllStaticAppConfigSaga(action: ReturnType<typeof getAllStaticAppConfigList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticAppConfigListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllStaticAppConfigListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllStaticAppConfigListSuccess(undefined));
            console.error("Error getAllStaticAppConfigSaga:", error);
        }
    }
}

function* getStaticAppConfigByIdSaga(action: ReturnType<typeof getStaticAppConfigById>) {
    try {
        const response: AxiosResponse = yield call(getStaticAppConfigByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticAppConfigByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticAppConfigByIdSuccess(undefined));
            console.error("Error getStaticAppConfigByIdSaga:", error);
        }
    }
}

function* createStaticAppConfigByIDSaga(action: ReturnType<typeof createStaticAppConfig>) {
    try {
        const response: AxiosResponse = yield call(createStaticAppConfigApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createStaticAppConfigSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createStaticAppConfigSuccess(undefined));
            console.error("Error createStaticAppConfigByIDSaga:", error);
        }
    }
}

function* updateStaticAppConfigByIDSaga(action: ReturnType<typeof updateStaticAppConfigById>) {
    try {
        const response: AxiosResponse = yield call(updateStaticAppConfigApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateStaticAppConfigByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(updateStaticAppConfigByIdSuccess(undefined));
            console.error("Error updateStaticAppConfigByIDSaga:", error);
        }
    }
}

function* deleteStaticAppConfigByIDSaga(action: ReturnType<typeof deleteStaticAppConfigById>) {
    try {
        const response: AxiosResponse = yield call(deleteStaticAppConfigApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteStaticAppConfigByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(deleteStaticAppConfigByIdSuccess(undefined));
            console.error("Error deleteStaticAppConfigByIDSaga:", error);
        }
    }
}

// Static Key Feature Sagas
function* getAllStaticKeyFeatureSaga(action: ReturnType<typeof getAllStaticKeyFeatureList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticKeyFeatureListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllStaticKeyFeatureListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllStaticKeyFeatureListSuccess(undefined));
            console.error("Error getAllStaticKeyFeatureSaga:", error);
        }
    }
}

function* getStaticKeyFeatureByIdSaga(action: ReturnType<typeof getStaticKeyFeatureById>) {
    try {
        const response: AxiosResponse = yield call(getStaticKeyFeatureByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticKeyFeatureByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticKeyFeatureByIdSuccess(undefined));
            console.error("Error getStaticKeyFeatureByIdSaga:", error);
        }
    }
}

function* createStaticKeyFeatureByIDSaga(action: ReturnType<typeof createStaticKeyFeature>) {
    try {
        const response: AxiosResponse = yield call(createStaticKeyFeatureApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createStaticKeyFeatureSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createStaticKeyFeatureSuccess(undefined));
            console.error("Error createStaticKeyFeatureByIDSaga:", error);
        }
    }
}

function* updateStaticKeyFeatureByIDSaga(action: ReturnType<typeof updateStaticKeyFeatureById>) {
    try {
        const response: AxiosResponse = yield call(updateStaticKeyFeatureApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateStaticKeyFeatureByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(updateStaticKeyFeatureByIdSuccess(undefined));
            console.error("Error updateStaticKeyFeatureByIDSaga:", error);
        }
    }
}

function* deleteStaticKeyFeatureByIDSaga(action: ReturnType<typeof deleteStaticKeyFeatureById>) {
    try {
        const response: AxiosResponse = yield call(deleteStaticKeyFeatureApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteStaticKeyFeatureByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(deleteStaticKeyFeatureByIdSuccess(undefined));
            console.error("Error deleteStaticKeyFeatureByIDSaga:", error);
        }
    }
}

// Static Testimonial Sagas
function* getAllStaticTestimonialSaga(action: ReturnType<typeof getAllStaticTestimonialList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticTestimonialListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllStaticTestimonialListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllStaticTestimonialListSuccess(undefined));
            console.error("Error getAllStaticTestimonialSaga:", error);
        }
    }
}

function* getStaticTestimonialByIdSaga(action: ReturnType<typeof getStaticTestimonialById>) {
    try {
        const response: AxiosResponse = yield call(getStaticTestimonialByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticTestimonialByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticTestimonialByIdSuccess(undefined));
            console.error("Error getStaticTestimonialByIdSaga:", error);
        }
    }
}

function* createStaticTestimonialByIDSaga(action: ReturnType<typeof createStaticTestimonial>) {
    try {
        const response: AxiosResponse = yield call(createStaticTestimonialApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createStaticTestimonialSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createStaticTestimonialSuccess(undefined));
            console.error("Error createStaticTestimonialByIDSaga:", error);
        }
    }
}

function* updateStaticTestimonialByIDSaga(action: ReturnType<typeof updateStaticTestimonialById>) {
    try {
        const response: AxiosResponse = yield call(updateStaticTestimonialApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateStaticTestimonialByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(updateStaticTestimonialByIdSuccess(undefined));
            console.error("Error updateStaticTestimonialByIDSaga:", error);
        }
    }
}

function* deleteStaticTestimonialByIDSaga(action: ReturnType<typeof deleteStaticTestimonialById>) {
    try {
        const response: AxiosResponse = yield call(deleteStaticTestimonialApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteStaticTestimonialByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(deleteStaticTestimonialByIdSuccess(undefined));
            console.error("Error deleteStaticTestimonialByIDSaga:", error);
        }
    }
}
// static-module Sagas
function* getAllStaticModuleSaga(action: ReturnType<typeof getAllStaticModuleList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticModuleListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllStaticModuleListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllStaticModuleListSuccess(undefined));
            console.error("Error getAllStaticModuleSaga:", error);
        }
    }
}

function* getStaticModuleByIdSaga(action: ReturnType<typeof getStaticModuleById>) {
    try {
        const response: AxiosResponse = yield call(getStaticModuleByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticModuleByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticModuleByIdSuccess(undefined));
            console.error("Error getStaticModuleByIdSaga:", error);
        }
    }
}

function* createStaticModuleSaga(action: ReturnType<typeof createStaticModule>) {
    try {
        const response: AxiosResponse = yield call(createStaticModuleApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createStaticModuleSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createStaticModuleSuccess(undefined));
            console.error("Error createStaticModuleSaga:", error);
        }
    }
}

function* updateStaticModuleSaga(action: ReturnType<typeof updateStaticModuleById>) {
    try {
        const response: AxiosResponse = yield call(updateStaticModuleApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateStaticModuleByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(updateStaticModuleByIdSuccess(undefined));
            console.error("Error updateStaticModuleSaga:", error);
        }
    }
}

function* deleteStaticModuleSaga(action: ReturnType<typeof deleteStaticModuleById>) {
    try {
        const response: AxiosResponse = yield call(deleteStaticModuleApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteStaticModuleByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(deleteStaticModuleByIdSuccess(undefined));
            console.error("Error deleteStaticModuleSaga:", error);
        }
    }
}

// static-release Sagas
function* getAllStaticReleaseSaga(action: ReturnType<typeof getAllStaticReleaseList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticReleaseListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllStaticReleaseListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllStaticReleaseListSuccess(undefined));
            console.error("Error getAllStaticReleaseSaga:", error);
        }
    }
}

function* getStaticReleaseByIdSaga(action: ReturnType<typeof getStaticReleaseById>) {
    try {
        const response: AxiosResponse = yield call(getStaticReleaseByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticReleaseByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticReleaseByIdSuccess(undefined));
            console.error("Error getStaticReleaseByIdSaga:", error);
        }
    }
}

function* createStaticReleaseSaga(action: ReturnType<typeof createStaticRelease>) {
    try {
        const response: AxiosResponse = yield call(createStaticReleaseApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createStaticReleaseSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createStaticReleaseSuccess(undefined));
            console.error("Error createStaticReleaseSaga:", error);
        }
    }
}

function* updateStaticReleaseSaga(action: ReturnType<typeof updateStaticReleaseById>) {
    try {
        const response: AxiosResponse = yield call(updateStaticReleaseApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateStaticReleaseByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(updateStaticReleaseByIdSuccess(undefined));
            console.error("Error updateStaticReleaseSaga:", error);
        }
    }
}

function* deleteStaticReleaseSaga(action: ReturnType<typeof deleteStaticReleaseById>) {
    try {
        const response: AxiosResponse = yield call(deleteStaticReleaseApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteStaticReleaseByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(deleteStaticReleaseByIdSuccess(undefined));
            console.error("Error deleteStaticReleaseSaga:", error);
        }
    }
}

// static-what-we-do Sagas
function* getAllStaticWhatWeDoSaga(action: ReturnType<typeof getAllStaticWhatWeDoList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticWhatWeDoListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllStaticWhatWeDoListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllStaticWhatWeDoListSuccess(undefined));
            console.error("Error getAllStaticWhatWeDoSaga:", error);
        }
    }
}

function* getStaticWhatWeDoByIdSaga(action: ReturnType<typeof getStaticWhatWeDoById>) {
    try {
        const response: AxiosResponse = yield call(getStaticWhatWeDoByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticWhatWeDoByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticWhatWeDoByIdSuccess(undefined));
            console.error("Error getStaticWhatWeDoByIdSaga:", error);
        }
    }
}

function* createStaticWhatWeDoSaga(action: ReturnType<typeof createStaticWhatWeDo>) {
    try {
        const response: AxiosResponse = yield call(createStaticWhatWeDoApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createStaticWhatWeDoSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createStaticWhatWeDoSuccess(undefined));
            console.error("Error createStaticWhatWeDoSaga:", error);
        }
    }
}

function* updateStaticWhatWeDoSaga(action: ReturnType<typeof updateStaticWhatWeDoById>) {
    try {
        const response: AxiosResponse = yield call(updateStaticWhatWeDoApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateStaticWhatWeDoByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(updateStaticWhatWeDoByIdSuccess(undefined));
            console.error("Error updateStaticWhatWeDoSaga:", error);
        }
    }
}

function* deleteStaticWhatWeDoSaga(action: ReturnType<typeof deleteStaticWhatWeDoById>) {
    try {
        const response: AxiosResponse = yield call(deleteStaticWhatWeDoApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteStaticWhatWeDoByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(deleteStaticWhatWeDoByIdSuccess(undefined));
            console.error("Error deleteStaticWhatWeDoSaga:", error);
        }
    }
}

// static-resource-material Sagas
function* getAllStaticResourceMaterialSaga(action: ReturnType<typeof getAllStaticResourceMaterialList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticResourceMaterialListApi, action?.payload);
        if (response.data.status) {
            yield put(getAllStaticResourceMaterialListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getAllStaticResourceMaterialListSuccess(undefined));
            console.error("Error getAllStaticResourceMaterialSaga:", error);
        }
    }
}

function* getStaticResourceMaterialByIdSaga(action: ReturnType<typeof getStaticResourceMaterialById>) {
    try {
        const response: AxiosResponse = yield call(getStaticResourceMaterialByIdApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticResourceMaterialByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticResourceMaterialByIdSuccess(undefined));
            console.error("Error getStaticResourceMaterialByIdSaga:", error);
        }
    }
}

function* createStaticResourceMaterialSaga(action: ReturnType<typeof createStaticResourceMaterial>) {
    try {
        const response: AxiosResponse = yield call(createStaticResourceMaterialApi, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(createStaticResourceMaterialSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(createStaticResourceMaterialSuccess(undefined));
            console.error("Error createStaticResourceMaterialSaga:", error);
        }
    }
}

function* updateStaticResourceMaterialSaga(action: ReturnType<typeof updateStaticResourceMaterialById>) {
    try {
        const response: AxiosResponse = yield call(updateStaticResourceMaterialApi, action?.payload?.id, action?.payload?.obj);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(updateStaticResourceMaterialByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(updateStaticResourceMaterialByIdSuccess(undefined));
            console.error("Error updateStaticResourceMaterialSaga:", error);
        }
    }
}

function* deleteStaticResourceMaterialSaga(action: ReturnType<typeof deleteStaticResourceMaterialById>) {
    try {
        const response: AxiosResponse = yield call(deleteStaticResourceMaterialApi, action?.payload?.id);
        if (response.data.status) {
            if (action?.payload?.callBack) action?.payload?.callBack(response.data);
            yield put(deleteStaticResourceMaterialByIdSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            ErrorToast(error.response?.data?.message);
            action?.payload?.callBack(error.response?.data);
            yield put(deleteStaticResourceMaterialByIdSuccess(undefined));
            console.error("Error deleteStaticResourceMaterialSaga:", error);
        }
    }
}

// static enquiry
function* getAllStaticEnquirySaga(action: ReturnType<typeof getStaticEnquiryList>) {
    try {
        const response: AxiosResponse = yield call(getAllStaticEnquiryListApi, action?.payload);
        if (response.data.status) {
            yield put(getStaticEnquiryListSuccess(response.data.data));
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            yield put(getStaticEnquiryListSuccess(undefined));
            console.error("Error getAllStaticEnquirySaga:", error);
        }
    }
}

function* uploadStaticBlogImageSaga(action: ReturnType<typeof uploadStaticBlogImage>) {
    const { payload: { file, isStaticBlog }, meta: { callBack } } = action;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isStaticBlog", JSON.stringify(isStaticBlog));
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_IMAGE_FAILURE", payload: error });
        callBack(error);
    }
}

function* uploadStaticWhatWeDoFileSaga(action: ReturnType<typeof uploadStaticWhatWeDoFile>) {
    const { payload: { file, isStaticWhatWeDo }, meta: { callBack } } = action;
    const formData = new FormData();
    formData.append("files", file);
    formData.append("isStaticWhatWeDo", JSON.stringify(isStaticWhatWeDo));
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_FILE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_FILE_FAILURE", payload: error });
        callBack(error);
    }
}

function* uploadStaticModuleFileSaga(action: ReturnType<typeof uploadStaticModuleFile>) {
    const { payload: { file, isStaticModule, typeOfMaterial }, meta: { callBack } } = action;
    const formData = new FormData();
    file.forEach((file: File) => {
        formData.append("files", file);
    }); formData.append("isStaticModule", JSON.stringify(isStaticModule));
    formData.append("typeOfMaterial", typeOfMaterial);
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_FILE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_FILE_FAILURE", payload: error });
        callBack(error);
    }
}
function* uploadStaticResourceMaterialFileSaga(action: ReturnType<typeof uploadStaticResourceMaterialFile>) {
    const { payload: { file, isStaticResourceMaterial, typeOfMaterial }, meta: { callBack } } = action;
    const formData = new FormData();
    file.forEach((file: File) => {
        formData.append("files", file);
    }); formData.append("isStaticResourceMaterial", JSON.stringify(isStaticResourceMaterial));
    formData.append("typeOfMaterial", typeOfMaterial);
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_FILE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_FILE_FAILURE", payload: error });
        callBack(error);
    }
}

function* uploadStaticKeyFeatureFileSaga(action: ReturnType<typeof uploadStaticKeyFeatureFile>) {
    const { payload: { file, isStaticKeyFeature, typeOfMaterial }, meta: { callBack } } = action;
    const formData = new FormData();
    file.forEach((file: File) => {
        formData.append("files", file);
    }); formData.append("isStaticKeyFeature", JSON.stringify(isStaticKeyFeature));
    formData.append("typeOfMaterial", typeOfMaterial);
    try {
        const response: AxiosResponse = yield call(uploadImageApi, formData);
        yield put({ type: "UPLOAD_FILE_SUCCESS", payload: response.data });
        callBack(response.data);
    } catch (error) {
        yield put({ type: "UPLOAD_FILE_FAILURE", payload: error });
        callBack(error);
    }
}
// Watcher Sagas
export function* watchStaticSaga() {
    yield takeLatest(getAllStaticBlogList.type, getAllStaticBlogListSaga);
    yield takeLatest(getStaticBlogById.type, getStaticBlogByIdSaga);
    yield takeLatest(createStaticBlog.type, createStaticBlogSaga);
    yield takeLatest(updateStaticBlogById.type, updateStaticBlogSaga);
    yield takeLatest(deleteStaticBlogById.type, deleteStaticBlogSaga);

    // Static FAQ
    yield takeLatest(getAllStaticFaqList.type, getAllStaticFaqListSaga);
    yield takeLatest(getStaticFaqById.type, getStaticFaqByIdSaga);
    yield takeLatest(createStaticFaq.type, createStaticFaqSaga);
    yield takeLatest(updateStaticFaqById.type, updateStaticFaqSaga);
    yield takeLatest(deleteStaticFaqById.type, deleteStaticFaqSaga);

    // Static App Config
    yield takeLatest(getAllStaticAppConfigList.type, getAllStaticAppConfigSaga);
    yield takeLatest(getStaticAppConfigById.type, getStaticAppConfigByIdSaga);
    yield takeLatest(createStaticAppConfig.type, createStaticAppConfigByIDSaga);
    yield takeLatest(updateStaticAppConfigById.type, updateStaticAppConfigByIDSaga);
    yield takeLatest(deleteStaticAppConfigById.type, deleteStaticAppConfigByIDSaga);

    // Static Key Feature
    yield takeLatest(getAllStaticKeyFeatureList.type, getAllStaticKeyFeatureSaga);
    yield takeLatest(getStaticKeyFeatureById.type, getStaticKeyFeatureByIdSaga);
    yield takeLatest(createStaticKeyFeature.type, createStaticKeyFeatureByIDSaga);
    yield takeLatest(updateStaticKeyFeatureById.type, updateStaticKeyFeatureByIDSaga);
    yield takeLatest(deleteStaticKeyFeatureById.type, deleteStaticKeyFeatureByIDSaga);

    // Static Testimonial
    yield takeLatest(getAllStaticTestimonialList.type, getAllStaticTestimonialSaga);
    yield takeLatest(getStaticTestimonialById.type, getStaticTestimonialByIdSaga);
    yield takeLatest(createStaticTestimonial.type, createStaticTestimonialByIDSaga);
    yield takeLatest(updateStaticTestimonialById.type, updateStaticTestimonialByIDSaga);
    yield takeLatest(deleteStaticTestimonialById.type, deleteStaticTestimonialByIDSaga);

    // Static Release
    yield takeLatest(getAllStaticReleaseList.type, getAllStaticReleaseSaga);
    yield takeLatest(getStaticReleaseById.type, getStaticReleaseByIdSaga);
    yield takeLatest(createStaticRelease.type, createStaticReleaseSaga);
    yield takeLatest(updateStaticReleaseById.type, updateStaticReleaseSaga);
    yield takeLatest(deleteStaticReleaseById.type, deleteStaticReleaseSaga);

    // Static Module
    yield takeLatest(getAllStaticModuleList.type, getAllStaticModuleSaga);
    yield takeLatest(getStaticModuleById.type, getStaticModuleByIdSaga);
    yield takeLatest(createStaticModule.type, createStaticModuleSaga);
    yield takeLatest(updateStaticModuleById.type, updateStaticModuleSaga);
    yield takeLatest(deleteStaticModuleById.type, deleteStaticModuleSaga);


    // Static What We Do
    yield takeLatest(getAllStaticWhatWeDoList.type, getAllStaticWhatWeDoSaga);
    yield takeLatest(getStaticWhatWeDoById.type, getStaticWhatWeDoByIdSaga);
    yield takeLatest(createStaticWhatWeDo.type, createStaticWhatWeDoSaga);
    yield takeLatest(updateStaticWhatWeDoById.type, updateStaticWhatWeDoSaga);
    yield takeLatest(deleteStaticWhatWeDoById.type, deleteStaticWhatWeDoSaga);

    // Static Resource Material
    yield takeLatest(getAllStaticResourceMaterialList.type, getAllStaticResourceMaterialSaga);
    yield takeLatest(getStaticResourceMaterialById.type, getStaticResourceMaterialByIdSaga);
    yield takeLatest(createStaticResourceMaterial.type, createStaticResourceMaterialSaga);
    yield takeLatest(updateStaticResourceMaterialById.type, updateStaticResourceMaterialSaga);
    yield takeLatest(deleteStaticResourceMaterialById.type, deleteStaticResourceMaterialSaga);

    // Static Enquiry
    yield takeLatest(getStaticEnquiryList.type, getAllStaticEnquirySaga);

    // image upload
    yield takeLatest(uploadStaticBlogImage.type, uploadStaticBlogImageSaga);
    yield takeLatest(uploadStaticWhatWeDoFile.type, uploadStaticWhatWeDoFileSaga);
    yield takeLatest(uploadStaticModuleFile.type, uploadStaticModuleFileSaga);
    yield takeLatest(uploadStaticResourceMaterialFile.type, uploadStaticResourceMaterialFileSaga);
    yield takeLatest(uploadStaticKeyFeatureFile.type, uploadStaticKeyFeatureFileSaga);


}
