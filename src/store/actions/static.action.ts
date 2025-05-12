import { createAction } from "@reduxjs/toolkit";
import { ActionMeta } from "../../../@types/store";

// Action to create a static blog obj
export const createStaticBlog = createAction("static/createStaticBlog",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

// Action to update a static blog obj by ID
export const updateStaticBlogById = createAction("static/updateStaticBlogById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

// Action to delete a static blog obj by ID
export const deleteStaticBlogById = createAction("static/deleteStaticBlogById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });
// Static FAQ Actions
export const createStaticFaq = createAction("static/createStaticFaq",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateStaticFaqById = createAction("static/updateStaticFaqById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteStaticFaqById = createAction("static/deleteStaticFaqById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

// Static App Config Actions
export const createStaticAppConfig = createAction("static/createStaticAppConfig",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateStaticAppConfigById = createAction("static/updateStaticAppConfigById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteStaticAppConfigById = createAction("static/deleteStaticAppConfigById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

// Static Key Features Actions
export const createStaticKeyFeature = createAction("static/createStaticKeyFeature",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateStaticKeyFeatureById = createAction("static/updateStaticKeyFeatureById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteStaticKeyFeatureById = createAction("static/deleteStaticKeyFeatureById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

// Static Testimonial Actions
export const createStaticTestimonial = createAction("static/createStaticTestimonial",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateStaticTestimonialById = createAction("static/updateStaticTestimonialById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteStaticTestimonialById = createAction("static/deleteStaticTestimonialById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

// Static Module Actions
export const createStaticModule = createAction("static/createStaticModule",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateStaticModuleById = createAction("static/updateStaticModuleById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteStaticModuleById = createAction("static/deleteStaticModuleById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });


// Static Release Actions
export const createStaticRelease = createAction("static/createStaticRelease",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateStaticReleaseById = createAction("static/updateStaticReleaseById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteStaticReleaseById = createAction("static/deleteStaticReleaseById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

// Static What We Do Actions
export const createStaticWhatWeDo = createAction("static/createStaticWhatWeDo",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateStaticWhatWeDoById = createAction("static/updateStaticWhatWeDoById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteStaticWhatWeDoById = createAction("static/deleteStaticWhatWeDoById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

// Static Resource Material Actions
export const createStaticResourceMaterial = createAction("static/createStaticResourceMaterial",
    (obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                obj: obj,
                callBack: callBack
            }
        };
    });

export const updateStaticResourceMaterialById = createAction("static/updateStaticResourceMaterialById",
    (id: string, obj: any, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                obj: obj,
                callBack: callBack
            }
        };
    });

export const deleteStaticResourceMaterialById = createAction("static/deleteStaticResourceMaterialById",
    (id: string, callBack: ActionMeta<undefined>["callBack"]) => {
        return {
            payload: {
                id: id,
                callBack: callBack
            }
        };
    });

export const uploadStaticBlogImage = createAction(
    "static/uploadStaticBlogImage",
    (file: File, isStaticBlog: boolean, callBack: (response: any) => void) => ({
        payload: { file, isStaticBlog },
        meta: { callBack }
    })
);
export const uploadStaticKeyFeatureFile = createAction(
    "static/uploadStaticKeyFeatureFile",
    (file: File[], typeOfMaterial: string, isStaticKeyFeature: boolean, callBack: (response: any) => void) => ({
        payload: { file, isStaticKeyFeature, typeOfMaterial },
        meta: { callBack }
    })
);
export const uploadStaticWhatWeDoFile = createAction(
    "static/uploadStaticWhatWeDoFile",
    (file: File, isStaticWhatWeDo: boolean, callBack: (response: any) => void) => ({
        payload: { file, isStaticWhatWeDo },
        meta: { callBack }
    })
);
export const uploadStaticModuleFile = createAction(
    "static/uploadStaticModuleFile",
    (file: File[], typeOfMaterial: string, isStaticModule: boolean, callBack: (response: any) => void) => ({
        payload: { file, isStaticModule, typeOfMaterial },
        meta: { callBack }
    })
);
export const uploadStaticResourceMaterialFile = createAction(
    "static/uploadStaticResourceMaterialFile",
    (file: File[], typeOfMaterial: string, isStaticResourceMaterial: boolean, callBack: (response: any) => void) => ({
        payload: { file, isStaticResourceMaterial, typeOfMaterial },
        meta: { callBack }
    })
);
