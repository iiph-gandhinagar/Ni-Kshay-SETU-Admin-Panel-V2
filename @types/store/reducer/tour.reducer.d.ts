
declare module "tour" {
    import { translationLang } from "app-reducer";
    export interface tourSlidesProps {
        title: Partial<{ [key in translationLang]: string }>;
        colorGradient?: Array<string>;
        createdAt: any;
        description: Partial<{ [key in translationLang]: string }>;
        textColor: Array<string>;
        icon: string;
        orderIndex: number;
        shortDescription: Partial<{ [key in translationLang]: string }>;
        _id?: string;
    }
    export interface tourListProps {
        _id?: string;
        name?: string;
        title: Partial<{ [key in translationLang]: string }>;
        active?: boolean;
        default?: boolean;
        type?: string;
        tourSlides: Array<tourSlidesProps>;
        updatedAt?: string;
    }
    export interface tourDetailsProps {
        list: Array<tourListProps>;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
    export interface tourReducerProps {
        loader: boolean;
        tourDetails?: tourDetailsProps;
        tourById?: tourListProps;
    }
}
