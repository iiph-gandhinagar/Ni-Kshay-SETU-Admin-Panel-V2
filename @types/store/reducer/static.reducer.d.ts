import { translationLang } from "app-reducer";

interface staticBlogByIdProps {
    _id?: string;
    title: Partial<{ [key in translationLang]: string }> & { en: string; };
    slug: string;
    shortDescription: Partial<{ [key in TranslationLang]: string }> & { en: string; };
    description: Partial<{ [key in TranslationLang]: string }> & { en: string; };
    orderIndex: number;
    source: string;
    author: string;
    image1: string;
    image2: string;
    image3: string;
    active: boolean;
    keywords: string[];
}
interface staticBlogListProps {
    list: staticBlogByIdProps[]
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
interface staticFaqByIdProps {
    _id?: string;
    question: Partial<{ [key in TranslationLang]: string }> & { en: string; };
    description: Partial<{ [key in TranslationLang]: string }> & { en: string; };
    orderIndex: number;
    active: boolean;
}
interface staticFaqListProps {
    list: staticFaqByIdProps[]
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface staticAppConfigByIdProps {
    _id?: string;
    key: string;
    type: string;
    value: {
        [key: string]: string
    };
}
interface staticAppConfigListProps {
    list: staticAppConfigByIdProps[]
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
interface staticKeyFeatureByIdProps {
    _id: string;
    title: { [key: string]: string };
    description: { [key: string]: string };
    icon: string[];
    backgroundIcon: string[];
    orderIndex: number;
    active: boolean;
}
interface staticKeyFeatureListProps {
    list: staticKeyFeatureByIdProps[]
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
interface staticTestimonialByIdProps {
    _id: string;
    name: { [key: string]: string };
    description: { [key: string]: string };
    orderIndex: number;
    active: boolean;
}
interface staticTestimonialListProps {
    list: staticTestimonialByIdProps[]
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface staticReleaseByIdProps {
    _id?: string;
    feature: { [key: string]: string };
    bugFix: { [key: string]: string };
    date: string;
    orderIndex: number;
    active: boolean;
}

interface staticReleaseListProps {
    list: staticReleaseByIdProps[]
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface staticWhatWeDoByIdProps {
    _id?: string;
    title: { [key: string]: string };
    location: { [key: string]: string };
    coverImage: string;
    orderIndex: number;
    active: boolean;
}

interface staticWhatWeDoListProps {
    list: staticWhatWeDoByIdProps[]
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface staticModuleByIdProps {
    _id?: string;
    title: { [key: string]: string };
    description: { [key: string]: string };
    image: string[];
    slug: string;
    orderIndex: number;
    active: boolean;
}
interface staticModuleListProps {
    list: staticModuleByIdProps[]
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface staticEnquiryListprops {
    list: Array<{
        _id?: string;
        subject: string;
        message: string;
        emai: string;
        createdAt: string;
        updatedAt: string;
    }>
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface staticResourceMaterialByIdProps {
    _id?: string;
    title: { [key: string]: string };
    material: string[];
    typeOfMaterials: string;
    orderIndex: number;
    active: boolean;
}
interface staticResourceMaterialListProps {
    list: staticResourceMaterialByIdProps[]
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface staticProps {
    loader: boolean,
    staticBlogList?: staticBlogListProps,
    staticBlogById?: staticBlogByIdProps,
    staticFaqList?: staticFaqListProps,
    staticFaqById?: staticFaqByIdProps,
    staticAppConfigList?: staticAppConfigListProps,
    staticAppConfigById?: staticAppConfigByIdProps,
    staticKeyFeatureList?: staticKeyFeatureListProps,
    staticKeyFeatureById?: staticKeyFeatureByIdProps,
    staticTestimonialList?: staticTestimonialListProps,
    staticTestimonialById?: staticTestimonialByIdProps,
    staticReleaseList?: staticReleaseListProps,
    staticReleaseById?: staticReleaseByIdProps,
    staticWhatWeDoList?: staticWhatWeDoListProps,
    staticWhatWeDoById?: staticWhatWeDoByIdProps,
    staticModuleList?: staticModuleListProps,
    staticModuleById?: staticModuleByIdProps,
    staticResourceMaterialList?: staticResourceMaterialListProps,
    staticResourceMaterialById?: staticResourceMaterialByIdProps,
    staticEnquiryList?: staticEnquiryListprops,
}
