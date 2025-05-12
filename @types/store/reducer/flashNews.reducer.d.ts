declare module "flash-news" {
    interface flashNewsByIdProps {
        _id: string;
        title: string;
        description: string;
        source: string;
        href: string;
        orderIndex: number;
        active: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
    export interface flashSimilarAppByIdProps {
        _id: string;
        title: string;
        subTitle: string;
        href: string;
        hrefIos: string;
        hrefWeb: string;
        orderIndex: number;
        active: boolean;
        deletedAt?: string | null;
        createdAt?: string;
        updatedAt?: string;
        image: string;
    }
    export interface flashSimilarAppListProps {
        list: flashSimilarAppByIdProps[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
    export interface flashNewsListProps {
        list: flashNewsByIdProps[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
    export interface flashNewsProps {
        loader: boolean;
        flashNewsList?: flashNewsListProps;
        flashNewsById?: flashNewsByIdProps;
        flashSimilarAppList?: flashSimilarAppListProps;
        flashSimilarAppById?: flashSimilarAppByIdProps;
    }
}
