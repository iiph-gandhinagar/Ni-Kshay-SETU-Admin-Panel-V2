interface UserIdProps {
    _id: string;
    phoneNo: string;
    cadre: string;
    email: string;
    name: string;
    block: string | null;
    district: string | null;
    state: string;
    healthFacility: string | null;
}
interface subscriberActivityProps {
    _id: string;
    userData: UserIdProps;
    module: string;
    subModule: string | null;
    action: string;
    completedFlag: boolean;
    ipAddress: string;
    platform: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface subscriberActivityListProps {
    list: subscriberActivityProps[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface inqiryProps {
    _id: string;
    name: string;
    email: string;
    phoneNo: string;
    subject: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface inquiryListProps {
    list: inqiryProps[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export interface userAppVersionProps {
    _id: string;
    userId: {
        _id: string;
        phoneNo: string;
        email: string;
        name: string;
    };
    userName: string;
    appVersion: string;
    currentPlatform: string;
    hasIos: boolean;
    hasAndroid: boolean;
    hasWeb: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface userAppVersionListprops {
    list: userAppVersionProps[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface Question {
    en: string;
}

interface Answer {
    en?: string;
    nid?: number;
    title?: string;
    "H5P-id"?: number;
    Content_status?: string;
    langcode?: string;
    sub_node?: number[];
    gu?: string[];
}

interface Message {
    question: Question[] | string[];
    answer: Answer[];
    type: string;
    category: string;
    platform: string;
    _id: string;
    createdAt: string;
}
interface DataItem {
    _id: string;
    userId: {
        _id: string;
        phoneNo: string;
        blockId: string | null;
        cadreId: {
            _id: string;
            title: string;
        };
        districtId: {
            _id: string;
            title: string;
        };
        healthFacilityId: string | null;
        name: string;
        stateId: {
            _id: string;
            title: string;
        };
        email: string;
    };
    message: Message[];
    sessionId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    llm_history?: Array<{
        question: string;
        answer: string;
    }>;
}

interface chatbotActivityListProps {
    list: DataItem[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
export interface subscriberByIdProps {
    _id: string;
    email: string;
    isVerified: boolean;
    isOldUser: boolean;
    userContext: {
        queryDetails: {
            isActive: boolean;
        };
        chatHotQuestionOffset: number;
        feedbackHistory: any[];
        weeklyAssessmentCount: number;
        _id: string;
    }
    ;
    createdAt: string;
    updatedAt: string;
    __v: number;
    expiredDate: string;
    otp: number;
    cadreId: string;
    cadreType: string;
    countryCode: string;
    countryId: string | null;
    stateId: LocationDetails | null;
    cadreId: LocationDetails | null;
    districtId: LocationDetails | null;
    blockId: LocationDetails | null;
    healthFacilityId: HealthFacilityDetails | null;
    name: string;
    phoneNo: string;
}
interface Prescription {
    _id: string;
    diagnosis: string;
    regimen: string;
    prescription: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface prescriptionListProps {
    list: Prescription[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
export interface reportReducerProps {
    loader: boolean;
    userAssessmentsList?: any
    proAssessmentsList?: any
    userActivityList?: any
    userActivity?: any
    subscriberActivity?: subscriberActivityProps
    subscriberActivityList?: subscriberActivityListProps
    inquiryList?: inquiryListProps
    userAppVersionList?: userAppVersionListprops
    reportLoader?: boolean;
    chatbotActivityList?: chatbotActivityListProps
    subscriberById?: subscriberByIdProps
    prescriptionList?: prescriptionListProps
    assessmentList?: any
    actionList?: any
    oldAssessmentsList?: any
    oldAssessmentList?: any
}
