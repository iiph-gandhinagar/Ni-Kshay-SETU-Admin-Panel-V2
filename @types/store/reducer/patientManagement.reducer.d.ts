declare module "patient-management-reducer" {
    import { translationLang } from "app-reducer";
    export interface diagnosisNodesDetails {
        _id: string;
        id: number;
        icon?: string;
        nodeType: string;
        isExpandable: boolean;
        hasOptions: boolean;
        timeSpent: string;
        masterNodeId?: string;
        index: number;
        header: NodeHeader;
        subHeader: Partial<{ [key in translationLang]: string }>;
        redirectAlgoType?: string;
        redirectNodeId: string;
        isAllState?: boolean;
        isAllCadre?: boolean;
        stateIds: string[];
        cadreIds: string[];
        title: Partial<{ [key in translationLang]: string }>
        description: Partial<{ [key in translationLang]: string }>
        parentId?: string;
        activated: boolean;
        sendInitialNotification: boolean;
        cadreType: string
    }
    export interface diagnosisNodesDetailsWithChildren extends diagnosisNodesDetails {
        children: diagnosisNodesDetailsWithChildren[];
    }
    export interface descendantsNodesBtIdProps {
        title: Partial<{ [key in translationLang]: string }>
        description: Partial<{ [key in translationLang]: string }>
        children: Array<diagnosisNodesDetailsWithChildren>
    }
    export interface patientManagementProp {
        loader: boolean,
        displayMasterNodes?: Array<diagnosisNodesDetails>,
        descendantsNodesBtId?: descendantsNodesBtIdProps,
        NodeById?: diagnosisNodesDetails
    }
}
