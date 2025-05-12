declare module "components" {
    export interface BoxCardProps {
        children?: ReactNode;
        className?: string;
        headerName?: string | any;
        rightComponent?: ReactNode;
        showBackBtn?: boolean;
    }
    export interface HeaderCircle {
        title?: string,
        number?: number | string,
    }

    export interface AlgorithmsViewCardProps {
        title: string;
        icon?: string;
        onClick?: MouseEventHandler<HTMLDivElement>
        onEdit?: () => void
        onDelete?: () => void
        onNotify?: () => void
        className?: string
    }
}
