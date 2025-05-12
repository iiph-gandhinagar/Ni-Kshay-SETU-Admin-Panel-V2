declare module "survey" {
    import { translationLang } from "app-reducer";
    export interface questionsProps {
        active: boolean;
        title: {
            [key: string]: string
        };
        type: string;
        option1: {
            [key: string]: string
        };
        option2: {
            [key: string]: string
        };
        option3: {
            [key: string]: string
        };
        option4: {
            [key: string]: string
        };
        orderIndex: number;
    }
    export interface surveyListProps {
        _id?: string;
        title: Partial<{ [key in translationLang]: string }>;
        countryId: string;
        stateId: any[] | undefined;
        isAllState: boolean;
        districtId: any[] | undefined;
        isAllDistrict: boolean;
        blockId: string[];
        isAllBlock: boolean;
        healthFacilityId: string[];
        isAllHealthFacility: boolean;
        cadreId: any[] | undefined;
        isAllCadre: boolean;
        cadreType: string[];
        questions: Array<questionsProps>;
        active: boolean;
        sendInitialNotification: boolean;
    }
    export interface surveyDetailsProps {
        list: Array<surveyListProps>;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }

    export interface surveyHistoryListProps {
        list: Array<{
            _id: string;
            userId: {
                _id: string;
                name: string;
                phoneNo: string;
                email: string;
            };
            surveyId: {
                _id: string;
                title: {
                    en: string;
                };
            };
            questionAnswer: Array<{
                surveyQuestionId: string;
                answer: string;
                _id: string;
            }>;
            createdAt: string;
            updatedAt: string;
            __v: number;
        }>;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
    export interface surveyReducerProps {
        loader: boolean;
        surveyDetails?: surveDetailsProps;
        surveyById?: surveyListProps;
        surveyHistoryList?: surveyHistoryListProps;
    }
}
