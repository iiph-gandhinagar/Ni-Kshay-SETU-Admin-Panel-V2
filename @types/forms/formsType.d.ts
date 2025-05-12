
declare module "formTypes" {
    import { translationLang } from "app-reducer";
    export interface QuestionBankFormProps {
        question: string;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        language: string;
        correctAnswer: string;
        explanation: string;
        qLevel: string;
        cadreId: Array<string>;
        isAllCadre: boolean;
        cadreType: Array<string>;
        category: string;
        isVisible?: boolean;
    }

    export interface AssessmentFormProps {
        createdBy: string;
        title: Partial<{ [key in translationLang]: string }>;
        timeToComplete: number | string;
        countryId: string[{}];
        stateId: string[{}];
        districtId: string[{}];
        cadreId: string[{}];
        cadreType: string[];
        blockId: string[{}];
        healthFacilityId: string[{}];
        isAllState: boolean;
        isAllCadre: boolean;
        isAllBlock: boolean;
        isAllDistrict: boolean;
        isAllHealthFacility: boolean;
        certificateType: string;
        language: string;
        toDate: date;
        fromDate: strindateg;
        active: boolean;
        assessmentType: string;
        questions: any;
    }
    export type AlgorithmsFormProps = partial<{
        "nodeType": string,
        "isExpandable": boolean,
        "hasOptions": boolean,
        "masterNodeId": string,
        "timeSpent": string,
        "index": number,
        "isAllState": boolean | undefined,
        "isAllCadre": boolean | undefined,
        "stateIds": string[] | undefined,
        "cadreIds": string[] | undefined,
        "title": Partial<{ [key in translationLang]: string }>,
        "description": Partial<{ [key in translationLang]: string }>,
        "header": Partial<{ [key in translationLang]: string }>,
        "subHeader": Partial<{ [key in translationLang]: string }>,
        "parentId": string,
        "redirectAlgoType": string,
        "redirectNodeId": string,
        "activated": boolean,
        "sendInitialNotification": boolean,
        "icon": string,
        "cadreType": string,
    }>;
}
