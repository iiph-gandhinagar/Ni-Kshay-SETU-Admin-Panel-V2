export interface SubscriberListProps {
    _id: string;
    name: string;
    phoneNo: string;
    password: string;
    cadreType: string;
    isVerified: boolean;
    countryId: {
        _id: string,
        title: string
    },
    stateId: {
        _id: string,
        title: string
    },
    cadreId: {
        _id: string,
        title: string
    };
    districtId: {
        _id: string,
        title: string
    };
    blockId: {
        _id: string,
        title: string
    };
    healthFacilityId: {
        _id: string,
        title: string
    };
    forgotOtpTime: string;
    id: number,
    createdAt: string;
    updatedAt: string;
    isOldUser: boolean;
}
export interface SubscriberDetailsProps {
    list: Array<SubscriberListProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
export interface subscriberReducerProps {
    loader: boolean;
    SubscriberDetails?: SubscriberDetailsProps
}

