import { DataTableColumn, DataTableRowClickHandler, DataTableSortStatus } from "mantine-datatable";
type MyDataType = {
    columnAccessor: keyof T | (string & NonNullable<unknown>);
    direction: "asc" | "desc";
};
export interface TableComponentProps {
    onRowClick?: DataTableRowClickHandler<any> | undefined
    idAccessor?: ((record: any) => Key) | undefined
    className?: string | undefined;
    records?: Array<any> | undefined;
    columns: Array<DataTableColumn<any>>;
    highlightOnHover?: boolean | undefined;
    minHeight?: string | number | undefined;
    onRecordsPerPageChange?: (recordsPerPage: number) => void;
    sortStatus?: DataTableSortStatus<any>;
    selectedRecords?: Array<any> | undefined;
    onSelectedRecordsChange?: ((selectedRecords: Array<any>) => void) | undefined;
    onSortStatusChange?: ((sortStatus: DataTableSortStatus<any>) => void) | undefined;
    totalRecords?: number | undefined;
    recordsPerPage?: number;
    page?: number;
    onPageChange?: (page: number) => void;
    recordsPerPageOptions?: number[];
    striped?: boolean | "odd" | "even" | undefined;
    draggable?: Booleanish;
    isloading?: boolean;
    height?: string;
}
