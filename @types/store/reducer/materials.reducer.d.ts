declare module "materials-Props" {
    import { translationLang } from "app-reducer";
    export interface allRootMaterialProps {
        _id: string,
        title: Partial<{ [key in translationLang]: string }>,
        iconType: string,
    }
    export interface materialByid {
        _id?: string,
        countryId: string,
        stateId?: string[],
        isAllState: boolean,
        cadreId?: string[]
        isAllCadre: boolean,
        title: Partial<{ [key in translationLang]: string }>,
        typeOfMaterials: string,
        parentId?: string | null,
        iconType: string,
        index: number,
        children?: materialByid[]
        relatedMaterials: string[]
        createdBy?: string,
    }
    export interface descendantsMaterialProps {
        _id: string,
        title: Partial<{ [key in translationLang]: string }>,
        children: Array<materialByid>
    }
    export interface materialsReducerProps {
        loader: boolean;
        allRootMaterial: Array<allRootMaterialProps>,
        descendantsMaterial?: descendantsMaterialProps
        materialByID?: materialByid
    }
}
