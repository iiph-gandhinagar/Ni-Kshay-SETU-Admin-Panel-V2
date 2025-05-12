import { DataTable } from "mantine-datatable";
import { FC } from "react";
import { TableComponentProps } from "../../../@types/components/table";

const TableComponent: FC<TableComponentProps> = ({
    columns,
    onPageChange = () => null,
    onRecordsPerPageChange = () => null,
    page = undefined,
    recordsPerPage = 0,
    recordsPerPageOptions = [],
    sortStatus = { columnAccessor: "", direction: "asc" },
    totalRecords,
    className,
    highlightOnHover = true,
    minHeight = 300,
    onSortStatusChange = () => null,
    records,
    selectedRecords,
    onSelectedRecordsChange = () => null,
    striped = false,
    draggable = true,
    idAccessor = () => null,
    onRowClick = () => null,
    isloading = false,
    height = 840,
}) => {
    const getNestedValue = (obj: any, path: string) => {
        return path.split(".").reduce((acc, part) => acc?.[part], obj);
    };

    const processedColumns = columns.map(column => {
        const { accessor, render: originalRender, ...rest } = column;

        return {
            ...rest,
            accessor,
            render: (record: any, index: number) => {
                // Use original render function if it exists
                if (originalRender) {
                    const renderedValue = originalRender(record, index);
                    if ((typeof renderedValue === "string" || renderedValue == null) && !renderedValue?.trim()) {
                        return "─";
                    }
                    return renderedValue;
                }

                // Handle accessor-based values
                let value;
                if (typeof accessor === "function") {
                    value = accessor;
                } else {
                    value = getNestedValue(record, accessor as any);
                }

                // Handle empty values only for string accessors
                if (typeof accessor === "string") {
                    if (value == null || value === "") {
                        return "─";
                    }
                }

                return value;
            }
        };
    });
    return (
        <DataTable
            fetching={isloading}
            customLoader={<span className="animate-[spin_2s_linear_infinite] border-[30px] border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-12 h-12 inline-block align-middle m-auto" />}
            key={"_id"}
            onRowClick={onRowClick}
            idAccessor={idAccessor}
            striped={striped}
            className={className}
            draggable={draggable}
            records={records}
            columns={processedColumns}
            highlightOnHover={highlightOnHover}
            totalRecords={totalRecords}
            recordsPerPage={recordsPerPage}
            page={page}
            onPageChange={onPageChange}
            recordsPerPageOptions={recordsPerPageOptions}
            onRecordsPerPageChange={onRecordsPerPageChange}
            sortStatus={sortStatus}
            onSortStatusChange={onSortStatusChange}
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={onSelectedRecordsChange}
            minHeight={minHeight}
            height={height}
            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} entries from ${totalRecords}`}
        />
    );
};

export default TableComponent;
