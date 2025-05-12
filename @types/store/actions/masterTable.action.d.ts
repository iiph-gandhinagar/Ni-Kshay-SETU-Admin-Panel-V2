declare module "master-table-action" {
    export interface StateEditFormProps {
        title?: string,
        countryId?: string,
        id?: number,
    }
    export interface CaderEditFormProps {
        title?: string,
        cadreType?: string,
        cadreGroup?: string,
        audienceId?: number | string,
        id?: number,
    }
    export interface BlockEditFormProps {
        title?: string,
        countryId?: string,
        stateId?: string,
        districtId?: string,
        id?: number,
    }
    export interface CountryEditFormProps {
        title?: string,
        id?: number,
    }
    export interface DistrictEditFormProps {
        title?: string,
        stateId?: string,
        countryId?: string,
        id?: number,
    }
    export interface RoleEditFormProps {
        name?: string,
        description?: string,
        permission?: Array<string>,
    }
    export interface MemberEditFormProps {
        subscriberId?: string,
        instituteId?: string,
        instituteRole?: string,
        phoneNo?: string,
        email?: string,
        cadreId?: string,
        isActive?: boolean
    }
    export interface subscriberEditFormProps {
        name?: string;
        email?: string;
        phoneNo?: string;
        password?: string;
        cadreType?: string;
        isVerified?: boolean;
        countryId?: string;
        countryCode?: string;
        stateId?: string;
        cadreId?: string;
        districtId?: string;
        blockId?: string;
        healthFacilityId?: string;
        forgotOtpTime?: string;
        isOldUser?: boolean;
        userContext?: {
            chatHotQuestionOffset?: number;
            feedbackHistory?: string[];
        }
    }
    export interface PermissionEditFormProps {
        name?: string,
        guardName?: string,
        description?: string,
        id?: number,
        moduleName?: string,
    }
    export interface HealthFacilityEditFormProps {
        title?: string,
        stateId?: string,
        countryId?: string,
        districtId?: string,
        blockId?: string,
        healthFacilityCode?: string,
        id?: number,
        latitude?: string,
        longitude?: string,
        ANCClinic?: boolean,
        ARTCentre?: boolean,
        CBNAAT?: boolean,
        CONFIRMATIONCENTER?: boolean,
        DMC?: boolean,
        DeAddictionCentres?: boolean,
        DistrictDRTBCentre?: boolean,
        ICTC?: boolean,
        IRL?: boolean,
        LPALab?: boolean,
        NODALDRTBCENTER?: boolean,
        NutritionalRehabilitationCentre?: boolean,
        PediatricCareFacility?: boolean,
        TRUNAT?: boolean,
        TobaccoCessationClinic?: boolean,
        XRAY?: boolean,
    }
    export interface AbbreviationEditFormProps {
        title?: string,
        patterns?: Array<string>,
    }
    export interface SystemQuestionEditFormProps {
        _id?: string
        title?: string,
        category?: string,
        questions?: Array<{ [key: string]: string }>,
        answers?: Array<{ [key: string]: string }>,
        active?: boolean,
        NTEPId?: number,
    }
    export interface AppConfigEditFormProps {
        key: string,
        value: {
            en: string,
            [key: string]: string
        },
    }
    export interface InstituteMasterDataFormProps {
        title: string,
        parentId?: string,
        role?: string,
        countryId?: string,
        stateId?: string,
        districtId?: string,
        blockId?: string,
    }
    export interface AddInstituteFormProps {
        instituteId?: string,
        name?: string,
        role?: string,
        subscriber?: string | any,
        email?: string,
        phoneNo?: string,
        cadreId?: string,
    }
    export interface ChildInstituteEditFormProps {
        title: string,
        name?: string,
        type?: string,
        manager?: string,
        email?: string,
        phoneNo?: string,
        cadre?: string,
        countryId: string,
        stateId?: string,
        districtId?: string,
        blockId?: string,
    }

    export interface SymptomsEditFormProps {
        title?: {
            [key: string]: string
        },
        category?: string,
        icon?: string
    }

    export interface AddManagementEditFormProps {
        variable?: string,
        value?: {
            [key: string]: string
        },
        type?: string
    }
}
