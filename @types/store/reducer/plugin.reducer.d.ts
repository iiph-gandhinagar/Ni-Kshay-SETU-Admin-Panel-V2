import { translationLang } from "app-reducer";

export interface InstituteListProps {
    _id: string;
    parentId: string;
    title: string;
    manager: string;
    countryId: string;
    role: string;
    stateId: string;
    districtId: string;
    phoneNo: string;
    cadreType: string;
    createdAt: string;
    updatedAt: string;
}
export interface ChildInstituteListProps {
    _id: string;
    instituteId: string;
    subscriber: {
        _id: string,
        name: string,
        phoneNo: string,
        cadreId: {
            title: string,
            _id: string
        }
    };
    email: string;
    role: string;
    districtId: string;
    phoneNo: string;
    cadreId: string;
    createdAt: string;
    updatedAt: string;
}
export interface MemberListProps {
    _id: string;
    name: string;
    title: string;
    email: string;
    cadre: string;
    manager: string;
    countryId: string;
    type: string;
    stateId: string;
    districtId: string;
    phoneNo: string;
    cadreType: string;
    createdAt: string;
    updatedAt: string;
    isActive?: boolean;
}
export interface InstituteDetailsProps {
    list: Array<InstituteListProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
export interface InstituteDetailsProps {
    list: Array<InstituteListProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
export interface ChildInstituteDetailsProps {
    list: Array<ChildInstituteListProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
export interface parentByTypeProps {
    _id: string,
    title: string,
    role: string
}
export interface childByTypeProps {
    _id: string,
    title: string,
    name: string,
    phoneNo: string,
    cadreId: {
        _id: string,
        title: string
    }

}
interface getMasterInstituteByIdprops {
    _id: string;
    title: string;
    role: string;
    parentId: string;
    countryId: string;
    stateId: string;
    districtId: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface manageTbListDetailsProps {
    _id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface manageTbListProps {
    list: manageTbListDetails[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
interface getMembersListByIdProps {
    _id: string;
    name: string;
    phoneNo: string;
    cadreId: {
        _id: string;
        title: string;
    };
    email: string;
    userContext: {
        queryDetails: {
            instituteId: {
                _id: string;
                title: string;
            };
            querySolved: number;
            type: {
                _id: string;
                name: string;
            };
        }
    };
}
export interface getAllInstituteListProps {
    _id: string;
    title: string;
    role: string;
    typeDetails: {
        _id: string;
        name: string;
        description: string;
        permission: string[];
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}
interface getAllQueryListByIdProps {
    [key: string]: string
}
interface querryReportsProps {
    totalQueries: number,
    closedQueries: number,
    openQueries: number,
    transferQueries: number,
    queryRaised: {
        [key: string]: string
    },
    queryResponded: {
        [key: string]: string
    }
}
interface QuestionProps {
    _id: string;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: string;
    language: string;
    explanation: string;
    category: string;
    id: number;
    cadreId: Array<string>;
    isAllCadre: boolean;
    cadreType: Array<string>
    qLevel: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface QuestionListProps {
    list: QuestionProps[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

interface Country {
    _id: string;
    title: string;
}

interface State {
    _id: string;
    title: string;
}

interface District {
    _id: string;
    title: string;
}

interface Cadre {
    _id: string;
    title: string;
}

interface AssessmentQuestionProps {
    isVisible: boolean;
    qLevel: string;
    _id: string;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: string;
    category: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface AssessmentProps {
    _id: string;
    title: Partial<{ [key in translationLang]: string }>;
    timeToComplete: number | string;
    countryId: Country;
    stateId: State[];
    districtId: District[];
    isAllState: boolean;
    isAllCadre: boolean;
    isAllBlock: boolean;
    isAllDistrict: boolean;
    isAllHealthFacility: boolean;
    cadreId: Cadre[];
    blockId: Cadre[];
    healthFacilityId: Cadre[];
    cadreType: string[];
    assessmentType: string;
    language: string;
    initialInvitation: boolean;
    createdBy: string;
    toDate: string;
    fromDate: string;
    certificateType: string;
    questions: AssessmentQuestionProps[];
    active: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface AssessmentListProps {
    list: AssessmentProps[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}
interface GobalQueryListProps {
    [key: string]: Array<{
        [key: string]: string;
    }>
}
interface ReportDataProps {
    openQueries: {
        openQueries: Array<{
            [key: string]: string;
        }>,
        openRespondedQueries: Array<{
            [key: string]: string;
        }>,
    },
    closedQueries: {
        closedQueries: Array<{
            [key: string]: string;
        }>,
        closedRespondedQueries: Array<{
            [key: string]: string;
        }>,
    },
    transferedQueries: {
        transferedQueries: Array<{
            [key: string]: string;
        }>,
        transferRespondedQueries: Array<{
            [key: string]: string;
        }>,
    }
}
export interface ResultReportQuestion {
    questionId: {
        _id?: string;
        question?: string;
        option1?: string;
        option2?: string;
        option3?: string;
        option4?: string;
        correctAnswer?: string;
        language?: string;
        category?: string;
        createdAt?: string;
        updatedAt?: string;
        isVisible?: boolean;
    };
    answer?: string;
    isCorrect?: boolean;
    isSubmit?: boolean;
    selectedOption?: string;
}

export interface ResultReportUser {
    _id?: string;
    name?: string;
    phoneNo?: string;
    cadreType?: string;
    countryId?: string | null;
    stateId?: {
        _id?: string;
        title?: string;
    };
    cadreId?: {
        _id?: string;
        title?: string;
    };
    districtId?: {
        _id?: string;
        title?: string;
    };
    blockId?: {
        _id?: string;
        title?: string;
    };
    healthFacilityId?: {
        _id?: string;
        healthFacilityCode?: string;
    };
}
export interface ResultReportAssessment {
    _id?: string;
    assessmentId?: {
        _id?: string;
        title?: {
            [key: string]: string
        };
    };
    userId?: ResultReportUser;
    totalMarks?: number;
    totalTime?: number;
    obtainedMarks?: number;
    attempted?: number;
    rightAnswer?: number;
    wrongAnswer?: number;
    skip?: number;
    isCalculated?: boolean;
    history?: ResultReportQuestion[];
    createdAt?: string;
    updatedAt?: string;
}
export interface pluginReducerProps {
    loader: boolean;
    InstituteDetails?: InstituteDetailsProps;
    masterInstituteById?: InstituteListProps;
    childInstituteById?: ChildInstituteListProps;
    childInstituteDetails?: ChildInstituteDetailsProps;
    memberById?: MemberListProps;
    parentByType?: Array<parentByTypeProps>
    childByType?: Array<childByTypeProps>
    membersList?: Array<childByTypeProps>
    getMasterInstituteById?: getMasterInstituteByIdprops
    manageTbList?: manageTbListProps
    getMembersListById?: Array<getMembersListByIdProps>
    instituteList?: Array<getAllInstituteListProps>
    QueryListById?: GobalQueryListProps
    closedQueryListById?: GobalQueryListProps
    transferedQueryListById?: GobalQueryListProps
    openQueryListById?: GobalQueryListProps
    QuerryReportsById?: querryReportsProps
    QuestionList?: QuestionListProps;
    questionById?: QuestionProps;
    AssessmentList?: AssessmentListProps;
    AssessmentById?: AssessmentProps;
    QuestionListWithoutPagination?: Array<QuestionProps>
    selectedQuestionList?: QuestionProps[]
    reportData?: ReportDataProps,
    kbasereport?: any,
    kbaseCoursereport?: any,
}
