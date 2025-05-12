
declare module "master-table" {
    import { translationLang } from "app-reducer";
    export interface caderListProps {
        _id: string,
        title: string,
        cadreType: string,
        cadreGroup: string,
        id: number
    }
    export interface countryListProps {
        _id: string;
        title: string;
        createdAt: string;
        updatedAt: string;
        id: number
    }
    export interface caderDetailsProps {
        list: Array<caderListProps>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface countryDetailsProps {
        list: Array<countryListProps>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface districtListProps {
        _id: string
        title: string
        countryId: {
            _id: string
            title: string
        },
        createdAt: string
        updatedAt: string
        id: number
        stateId: {
            _id: string
            title: string
        },
    }
    export interface districtUpdateProps {
        _id: string
        title: string
        countryId: string
        createdAt: string
        updatedAt: string
        id: number
        stateId: string
    }
    export interface stateListProps {
        _id: string
        title: string
        countryId: {
            _id: string
            title: string
        },
        createdAt: string
        updatedAt: string
        id: number
    }
    export interface stateUpdateProps {
        _id: string
        title: string
        countryId: string
        createdAt: string
        updatedAt: string
        id: number
    }
    export interface stateDetailsProps {
        list: Array<stateListProps>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface districtDetailsProps {
        list: Array<districtListProps>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface blockListProps {
        _id: string
        title: string
        countryId: {
            _id: string
            title: string
        },
        districtId: {
            _id: string
            title: string
        },
        createdAt: string
        updatedAt: string
        id: number
        stateId: {
            _id: string
            title: string
        },
    }
    export interface blockUpdateProps {
        _id: string
        title: string
        countryId: string,
        districtId: string,
        createdAt: string
        updatedAt: string
        id: number
        stateId: string,
    }
    export interface blockDetailsProps {
        list: Array<blockListProps>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface healthFacilityDetailsProps {
        list: Array<healthFacilityListProps>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface primaryCaderDetailsProps {
        list: Array<primaryCaderListProps>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface primaryCaderListProps {
        _id: string
        title: string
        createdAt: string
        updatedAt: string
        audienceId?: number | string
    }
    export interface healthFacilityListProps {
        _id: string
        healthFacilityCode: string
        districtId: string
        blockId: string
        countryId: {
            _id: string
            title: string
        },
        createdAt: string
        updatedAt: string
        id: number
        stateId: {
            _id: string
            title: string
        },
    }
    export interface healthFacilityUpdateProps {
        _id: string
        healthFacilityCode: string
        countryId: string
        createdAt: string
        districtId: string
        blockId: string
        updatedAt: string
        id: number,
        latitude: string,
        longitude: string,
        stateId: string
        ANCClinic: bolean,
        ARTCentre: bolean,
        CBNAAT: bolean,
        CONFIRMATIONCENTER: bolean,
        DMC: bolean,
        DeAddictionCentres: bolean,
        DistrictDRTBCentre: bolean,
        ICTC: bolean,
        IRL: bolean,
        LPALab: bolean,
        NODALDRTBCENTER: bolean,
        NutritionalRehabilitationCentre: bolean,
        PediatricCareFacility: bolean,
        TRUNAT: bolean,
        TobaccoCessationClinic: bolean,
        XRAY: bolean,
    }
    export interface symptomsListDetailsProps {
        _id: string;
        category: string;
        title: Partial<{ [key in translationLang]: string }>;
        deletedAt: string | null;
        createdAt: string;
        updatedAt: string;
    }

    export interface symptomListProps {
        list: symptomsListDetailsProps[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
    export interface symptomByIdDataProps {
        _id: string;
        category: string;
        title?: {
            [key: string]: string
        };
        icon: string,
        deletedAt: string | null;
        createdAt: string;
        updatedAt: string;
    }
    interface AssessmentCertificateProps {
        _id: string;
        title: string;
        top: number;
        left: number;
        image: string;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
    export interface AssessmentCertificateListProps {
        list: AssessmentCertificateProps[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
    export interface assessmentQuestionReportProps {
        _id: string;
        title: Partial<{ [key in translationLang]: string }>;
        timeToComplete: number | string;
        createdAt: string;
        questions: Array<{
            _id: string;
            question: Partial<{ [key in translationLang]: string }>;
            option1: Partial<{ [key in translationLang]: string }>;
            option2: Partial<{ [key in translationLang]: string }>;
            option3: Partial<{ [key in translationLang]: string }>;
            option4: Partial<{ [key in translationLang]: string }>;
            correctAnswer: string;
        }>;
    }

    export interface CadreListProps {
        _id: string;
        cadreGroup: string;
        title: string;
        cadreType: string;
        id: number;
        updatedAt: string;
    }
    export interface pluginManagementByIdProps {
        _id: string;
        title: string;
        cadreId: Array<string>;
        isAllCadre: boolean;
        createdAt: string;
        updatedAt: string;
        cadreType: string
    }
    export interface pluginManagementListProps {
        list: pluginManagementByIdProps[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }

    export interface surveyMasterListProps {
        _id: string;
        title: Partial<{ [key in translationLang]: string }>;
    }
    export interface masterEditFormProps {
        close: () => void
    }
    type CaderType = "Block_Level" | "District_Level" | "Health-facility_Level" | "National_Level" | "State_Level";
    export interface masterTableProps {
        redirectNodes?: Array<{ title: Partial<{ [key in translationLang]: string }>, _id: string }>
        loader: boolean;
        caderDetails?: caderDetailsProps;
        countryDetails?: countryDetailsProps;
        blockDetails?: blockDetailsProps;
        districtDetails?: districtDetailsProps;
        stateDetails?: stateDetailsProps;
        blockById?: blockUpdateProps;
        districtById?: districtUpdateProps;
        caderById?: caderListProps;
        countryById?: countryListProps;
        stateById?: stateUpdateProps;
        countryList?: Array<countryListProps>;
        caderList?: Array<caderListProps>;
        cadreTypeList?: Array<string>;
        stateList?: Array<stateListProps>;
        blockList?: Array<blockListProps>;
        healthFacilityList?: Array<healthFacilityListProps>;
        districtList?: Array<districtListProps>;
        allCaderTypes?: Array<CaderType>;
        healthFacilityDetails?: healthFacilityDetailsProps;
        healthFacilityById?: healthFacilityUpdateProps;
        primaryCaderDetails?: primaryCaderDetailsProps;
        primaryCaderById?: primaryCaderListProps
        primaryCaderList?: Array<primaryCaderListProps>;
        symptomsDetail?: symptomListProps;
        symptomById?: symptomByIdDataProps;
        assessmentCertificateList?: AssessmentCertificateListProps;
        assessmentCertificateById?: AssessmentCertificateProps;
        assessmentCertificatesListWithoutPagination?: Array<AssessmentCertificateListProps>;
        assessmentQuestionReport?: any;
        assessmentResultReport?: any;
        pluginManagementList?: pluginManagementByListProps;
        pluginManagementById?: pluginManagementByIdProps;
        surveyList?: surveyMasterListProps[]
    }
}
