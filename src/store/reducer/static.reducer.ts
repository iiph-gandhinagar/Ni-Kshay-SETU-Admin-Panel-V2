import { createSlice } from "@reduxjs/toolkit";
import { staticProps } from "../../../@types/store/reducer/static.reducer";


const initialState: staticProps = {
    loader: false,
    staticBlogList: undefined,
    staticBlogById: undefined,
    staticFaqList: undefined,
    staticFaqById: undefined,
    staticAppConfigList: undefined,
    staticAppConfigById: undefined,
    staticKeyFeatureList: undefined,
    staticKeyFeatureById: undefined,
    staticTestimonialList: undefined,
    staticTestimonialById: undefined,
    staticReleaseList: undefined,
    staticReleaseById: undefined,
    staticWhatWeDoList: undefined,
    staticWhatWeDoById: undefined,
    staticModuleList: undefined,
    staticModuleById: undefined,
    staticResourceMaterialList: undefined,
    staticResourceMaterialById: undefined,
};

const staticSlice = createSlice({
    name: "static",
    initialState,
    reducers: {
        // Static Blog
        getAllStaticBlogList(state, { payload }) {
            state.loader = true;
        },
        getAllStaticBlogListSuccess(state, { payload }) {
            state.loader = false;
            state.staticBlogList = payload;
        },
        cleanStaticBlogList(state) {
            state.staticBlogList = undefined;
        },
        getStaticBlogById(state, { payload }) {
            state.loader = true;
        },
        getStaticBlogByIdSuccess(state, { payload }) {
            state.loader = false;
            state.staticBlogById = payload;
        },
        cleanStaticBlogById(state) {
            state.staticBlogById = undefined;
        },
        updateStaticBlogByIdSuccess(state) {
            state.loader = false;
        },
        createStaticBlogSuccess(state) {
            state.loader = false;
        },
        deleteStaticBlogByIdSuccess(state) {
            state.loader = false;
        },

        // Static FAQ
        getAllStaticFaqList(state, { payload }) {
            state.loader = true;
        },
        getAllStaticFaqListSuccess(state, { payload }) {
            state.loader = false;
            state.staticFaqList = payload;
        },
        cleanStaticFaqList(state) {
            state.staticFaqList = undefined;
        },
        getStaticFaqById(state, { payload }) {
            state.loader = true;
        },
        getStaticFaqByIdSuccess(state, { payload }) {
            state.loader = false;
            state.staticFaqById = payload;
        },
        cleanStaticFaqById(state) {
            state.staticFaqById = undefined;
        },
        updateStaticFaqByIdSuccess(state) {
            state.loader = false;
        },
        createStaticFaqSuccess(state) {
            state.loader = false;
        },
        deleteStaticFaqByIdSuccess(state) {
            state.loader = false;
        },

        // Static App Config
        getAllStaticAppConfigList(state, { payload }) {
            state.loader = true;
        },
        getAllStaticAppConfigListSuccess(state, { payload }) {
            state.loader = false;
            state.staticAppConfigList = payload;
        },
        cleanStaticAppConfigList(state) {
            state.staticAppConfigList = undefined;
        },
        getStaticAppConfigById(state, { payload }) {
            state.loader = true;
        },
        getStaticAppConfigByIdSuccess(state, { payload }) {
            state.loader = false;
            state.staticAppConfigById = payload;
        },
        cleanStaticAppConfigById(state) {
            state.staticAppConfigById = undefined;
        },
        updateStaticAppConfigByIdSuccess(state) {
            state.loader = false;
        },
        createStaticAppConfigSuccess(state) {
            state.loader = false;
        },
        deleteStaticAppConfigByIdSuccess(state) {
            state.loader = false;
        },

        // Static Key Feature
        getAllStaticKeyFeatureList(state, { payload }) {
            state.loader = true;
        },
        getAllStaticKeyFeatureListSuccess(state, { payload }) {
            state.loader = false;
            state.staticKeyFeatureList = payload;
        },
        cleanStaticKeyFeatureList(state) {
            state.staticKeyFeatureList = undefined;
        },
        getStaticKeyFeatureById(state, { payload }) {
            state.loader = true;
        },
        getStaticKeyFeatureByIdSuccess(state, { payload }) {
            state.loader = false;
            state.staticKeyFeatureById = payload;
        },
        cleanStaticKeyFeatureById(state) {
            state.staticKeyFeatureById = undefined;
        },
        updateStaticKeyFeatureByIdSuccess(state) {
            state.loader = false;
        },
        createStaticKeyFeatureSuccess(state) {
            state.loader = false;
        },
        deleteStaticKeyFeatureByIdSuccess(state) {
            state.loader = false;
        },

        // Static Testimonial
        getAllStaticTestimonialList(state, { payload }) {
            state.loader = true;
        },
        getAllStaticTestimonialListSuccess(state, { payload }) {
            state.loader = false;
            state.staticTestimonialList = payload;
        },
        cleanStaticTestimonialList(state) {
            state.staticTestimonialList = undefined;
        },
        getStaticTestimonialById(state, { payload }) {
            state.loader = true;
        },
        getStaticTestimonialByIdSuccess(state, { payload }) {
            state.loader = false;
            state.staticTestimonialById = payload;
        },
        cleanStaticTestimonialById(state) {
            state.staticTestimonialById = undefined;
        },
        updateStaticTestimonialByIdSuccess(state) {
            state.loader = false;
        },
        createStaticTestimonialSuccess(state) {
            state.loader = false;
        },
        deleteStaticTestimonialByIdSuccess(state) {
            state.loader = false;
        },
        // Static Release
        getAllStaticReleaseList(state, { payload }) {
            state.loader = true;
        },
        getAllStaticReleaseListSuccess(state, { payload }) {
            state.loader = false;
            state.staticReleaseList = payload;
        },
        cleanStaticReleaseList(state) {
            state.staticReleaseList = undefined;
        },
        getStaticReleaseById(state, { payload }) {
            state.loader = true;
        },
        getStaticReleaseByIdSuccess(state, { payload }) {
            state.loader = false;
            state.staticReleaseById = payload;
        },
        cleanStaticReleaseById(state) {
            state.staticReleaseById = undefined;
        },
        updateStaticReleaseByIdSuccess(state) {
            state.loader = false;
        },
        createStaticReleaseSuccess(state) {
            state.loader = false;
        },
        deleteStaticReleaseByIdSuccess(state) {
            state.loader = false;
        },

        // Static What We Do
        getAllStaticWhatWeDoList(state, { payload }) {
            state.loader = true;
        },
        getAllStaticWhatWeDoListSuccess(state, { payload }) {
            state.loader = false;
            state.staticWhatWeDoList = payload;
        },
        cleanStaticWhatWeDoList(state) {
            state.staticWhatWeDoList = undefined;
        },
        getStaticWhatWeDoById(state, { payload }) {
            state.loader = true;
        },
        getStaticWhatWeDoByIdSuccess(state, { payload }) {
            state.loader = false;
            state.staticWhatWeDoById = payload;
        },
        cleanStaticWhatWeDoById(state) {
            state.staticWhatWeDoById = undefined;
        },
        updateStaticWhatWeDoByIdSuccess(state) {
            state.loader = false;
        },
        createStaticWhatWeDoSuccess(state) {
            state.loader = false;
        },
        deleteStaticWhatWeDoByIdSuccess(state) {
            state.loader = false;
        },

        // Static Module
        getAllStaticModuleList(state, { payload }) {
            state.loader = true;
        },
        getAllStaticModuleListSuccess(state, { payload }) {
            state.loader = false;
            state.staticModuleList = payload;
        },
        cleanStaticModuleList(state) {
            state.staticModuleList = undefined;
        },
        getStaticModuleById(state, { payload }) {
            state.loader = true;
        },
        getStaticModuleByIdSuccess(state, { payload }) {
            state.loader = false;
            state.staticModuleById = payload;
        },
        cleanStaticModuleById(state) {
            state.staticModuleById = undefined;
        },
        updateStaticModuleByIdSuccess(state) {
            state.loader = false;
        },
        createStaticModuleSuccess(state) {
            state.loader = false;
        },
        deleteStaticModuleByIdSuccess(state) {
            state.loader = false;
        },

        // Static Resource Material
        getAllStaticResourceMaterialList(state, { payload }) {
            state.loader = true;
        },
        getAllStaticResourceMaterialListSuccess(state, { payload }) {
            state.loader = false;
            state.staticResourceMaterialList = payload;
        },
        cleanStaticResourceMaterialList(state) {
            state.staticResourceMaterialList = undefined;
        },
        getStaticResourceMaterialById(state, { payload }) {
            state.loader = true;
        },
        getStaticResourceMaterialByIdSuccess(state, { payload }) {
            state.loader = false;
            state.staticResourceMaterialById = payload;
        },
        cleanStaticResourceMaterialById(state) {
            state.staticResourceMaterialById = undefined;
        },
        updateStaticResourceMaterialByIdSuccess(state) {
            state.loader = false;
        },
        createStaticResourceMaterialSuccess(state) {
            state.loader = false;
        },
        deleteStaticResourceMaterialByIdSuccess(state) {
            state.loader = false;
        },
        getStaticEnquiryList(state, { payload }) {
            state.loader = true;
        },
        getStaticEnquiryListSuccess(state, { payload }) {
            state.loader = false;
            state.staticEnquiryList = payload;
        },
        cleanStaticEnquiry(state) {
            state.staticEnquiryList = undefined;
        },
    },
});

export const {
    // Static Blog Actions
    getAllStaticBlogList,
    getAllStaticBlogListSuccess,
    cleanStaticBlogList,
    getStaticBlogById,
    getStaticBlogByIdSuccess,
    cleanStaticBlogById,
    updateStaticBlogByIdSuccess,
    createStaticBlogSuccess,
    deleteStaticBlogByIdSuccess,

    // Static FAQ Actions
    getAllStaticFaqList,
    getAllStaticFaqListSuccess,
    cleanStaticFaqList,
    getStaticFaqById,
    getStaticFaqByIdSuccess,
    cleanStaticFaqById,
    updateStaticFaqByIdSuccess,
    createStaticFaqSuccess,
    deleteStaticFaqByIdSuccess,

    // Static App Config Actions
    getAllStaticAppConfigList,
    getAllStaticAppConfigListSuccess,
    cleanStaticAppConfigList,
    getStaticAppConfigById,
    getStaticAppConfigByIdSuccess,
    cleanStaticAppConfigById,
    updateStaticAppConfigByIdSuccess,
    createStaticAppConfigSuccess,
    deleteStaticAppConfigByIdSuccess,

    // Static Key Feature Actions
    getAllStaticKeyFeatureList,
    getAllStaticKeyFeatureListSuccess,
    cleanStaticKeyFeatureList,
    getStaticKeyFeatureById,
    getStaticKeyFeatureByIdSuccess,
    cleanStaticKeyFeatureById,
    updateStaticKeyFeatureByIdSuccess,
    createStaticKeyFeatureSuccess,
    deleteStaticKeyFeatureByIdSuccess,

    // Static Testimonial Actions
    getAllStaticTestimonialList,
    getAllStaticTestimonialListSuccess,
    cleanStaticTestimonialList,
    getStaticTestimonialById,
    getStaticTestimonialByIdSuccess,
    cleanStaticTestimonialById,
    updateStaticTestimonialByIdSuccess,
    createStaticTestimonialSuccess,
    deleteStaticTestimonialByIdSuccess,
    // Static Release Actions
    getAllStaticReleaseList,
    getAllStaticReleaseListSuccess,
    cleanStaticReleaseList,
    getStaticReleaseById,
    getStaticReleaseByIdSuccess,
    cleanStaticReleaseById,
    updateStaticReleaseByIdSuccess,
    createStaticReleaseSuccess,
    deleteStaticReleaseByIdSuccess,

    // Static What We Do Actions
    getAllStaticWhatWeDoList,
    getAllStaticWhatWeDoListSuccess,
    cleanStaticWhatWeDoList,
    getStaticWhatWeDoById,
    getStaticWhatWeDoByIdSuccess,
    cleanStaticWhatWeDoById,
    updateStaticWhatWeDoByIdSuccess,
    createStaticWhatWeDoSuccess,
    deleteStaticWhatWeDoByIdSuccess,

    // Static Module Actions
    getAllStaticModuleList,
    getAllStaticModuleListSuccess,
    cleanStaticModuleList,
    getStaticModuleById,
    getStaticModuleByIdSuccess,
    cleanStaticModuleById,
    updateStaticModuleByIdSuccess,
    createStaticModuleSuccess,
    deleteStaticModuleByIdSuccess,

    // Static Resource Material Actions
    getAllStaticResourceMaterialList,
    getAllStaticResourceMaterialListSuccess,
    cleanStaticResourceMaterialList,
    getStaticResourceMaterialById,
    getStaticResourceMaterialByIdSuccess,
    cleanStaticResourceMaterialById,
    updateStaticResourceMaterialByIdSuccess,
    createStaticResourceMaterialSuccess,
    deleteStaticResourceMaterialByIdSuccess,

    // static Enquiry Actions
    getStaticEnquiryList,
    getStaticEnquiryListSuccess,
    cleanStaticEnquiry,
} = staticSlice.actions;

export default staticSlice.reducer;
