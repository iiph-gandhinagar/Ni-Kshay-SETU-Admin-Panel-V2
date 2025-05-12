export interface ConfigListProps {
    _id: string;
    key: string;
    value: { [key: string]: string };
    createdAt: string;
    updatedAt: string;
}
export interface ConfigDetailsProps {
    list: Array<ConfigListProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export interface appFlagListProps {
    _id?: string;
    variable?: string;
    value: { [key: string]: string };
    type?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface appFlagsDetailsProps {
    list: Array<appFlagListProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export interface masterCmsByIdProps {
    _id: string;
    title: string;
    description: {
        [key: string]: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface masterCmsListProps {
    list: Array<masterCmsByIdProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export interface userNotificationByIdProps {
    _id?: string;
    title?: string;
    description?: string;
    type?: string;
    userId?: Array<{
        _id?: string;
        name?: string;
        phoneNo?: string;
        email?: string;
    }>;
    stateId?: string[]; // Assuming stateId is an array of string IDs
    isAllState?: boolean;
    districtId?: string[]; // Assuming districtId is an array of string IDs
    isAllDistrict?: boolean;
    cadreId?: string[]; // Assuming cadreId is an array of string IDs
    isAllCadre?: boolean;
    createdBy?: {
        _id?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
    };
    isDeepLink?: boolean;
    automaticNotificationType?: string | null;
    typeTitle?: {
        title?: string;
        _id?: string;
    } | null;
    link?: string;
    createdAt?: string; // ISO date string
    updatedAt?: string; // ISO date string
    __v?: number;
    failedCount?: number;
    status?: string;
    successfulCount?: number;
}

export interface userNotificationListProps {
    list: Array<userNotificationByIdProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
interface messageNotificationListProps {
    list: Array<{
        _id: string;
        userName: string;
        phoneNo: string;
        message: string;
        __v: number;
        createdAt: string;
        updatedAt: string;
    }>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}


export interface configReducerProps {
    loader: boolean;
    configDetails?: ConfigDetailsProps
    configById?: ConfigListProps
    appFlagsDetails?: appFlagsDetailsProps
    getAppFlagById?: appFlagListProps
    masterCmsList?: masterCmsListProps
    masterCmsById?: masterCmsByIdProps
    userNotificationList?: userNotificationListProps,
    userNotificationById?: userNotificationByIdProps,
    masterDropdown?: any,
    messageNotificationList?: messageNotificationListProps
}
