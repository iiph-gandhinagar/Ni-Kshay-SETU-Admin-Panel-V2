declare module "chatModule-reducer" {
    export interface abbreviationDetailsProps {
        list: Array<abbreviationListProps>;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
    export interface abbreviationListProps {
        _id: string
        title: string,
        patterns: Array<string>;
    }
    export interface systemQuestionDetailsProps {
        list: Array<systemQuestionListProps>;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
    export interface systemQuestionListProps {
        _id: string
        title: string,
        category: string,
        questions: Array<{ [key: string]: string }>,
        answers: Array<{ [key: string]: string }>,
        active: boolean,
        NTEPId: number,

    }

    export interface chatModuleReducerProps {
        loader: boolean;
        abbreviationDetails?: abbreviationDetailsProps
        abbreviationById?: abbreviationListProps
        systemQuestionDetails?: systemQuestionDetailsProps
        systemQuestionById?: systemQuestionListProps
    }
}
