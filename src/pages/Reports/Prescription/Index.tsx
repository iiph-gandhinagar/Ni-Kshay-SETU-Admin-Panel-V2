import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconDownload from "../../../components/Icon/IconDownload";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { getAllprescriptionWithoutPagination } from "../../../store/actions/report.action";
import { clearAllPrescriptions, getAllPrescriptions } from "../../../store/reducer/report.reducer";
import { ErrorToast } from "../../../utils/toasts";
const wrapInQuotes = (value: string) => {
    value = value.trim();
    if (/[,";\n\t]/.test(value)) {
        return `"${value.replace(/"/g, "\"\"").replace(/;/g, ";;").replace(/\t/g, " ")}"`;
    }
    return value;
};
const Index = () => {
    const { prescriptionList, loader, reportLoader } = useSelector((state: IRootState) => state.report);
    const [query, setQuery] = useQueryParams({
        page: "1",
        limit: "25",
        search: "",
        sortOrder: "",
        sortBy: "",
        regimen: "",
        diagnosis: "",
        prescription: "",
        notes: "",
        fromDate: "", toDate: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllPrescriptions(window.location.search));
        }
        return () => {
            dispatch(clearAllPrescriptions());
        };
    }, [window.location.search, query]);

    const clearFilters = () => {
        setQuery({
            page: "1",
            limit: "25",
            search: null,
            sortOrder: null,
            sortBy: null,
            regimen: null,
            diagnosis: null,
            prescription: null,
            notes: null,
            fromDate: null, toDate: null,
        });
    };
    const PrescriptionReportDownload = (prescriptionData: Array<any>) => {
        const csvHeaders = [
            "Diagnosis",
            "Regimen",
            "Prescription",
            "Notes",
            "Created At",
            "Updated At",
        ];

        const csvRows = prescriptionData.map((prescription: any) => {
            const diagnosis = wrapInQuotes(prescription?.diagnosis || "-");
            const regimen = wrapInQuotes(prescription?.regimen || "-");
            const prescriptionText = wrapInQuotes(prescription?.prescription || "-");
            const notes = wrapInQuotes(prescription?.notes || "-");
            const createdAt = wrapInQuotes(moment(prescription?.createdAt).format("DD MMM YYYY, hh:mm a") || "-");
            const updatedAt = wrapInQuotes(moment(prescription?.updatedAt).format("DD MMM YYYY, hh:mm a") || "-");

            return [diagnosis, regimen, prescriptionText, notes, createdAt, updatedAt].join(",");
        });

        const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `prescriptions_report_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Prescriptions'
                        number={prescriptionList?.totalItems} />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <DateRangeFilter query={query as any}
                        setQuery={setQuery as any} />
                    <PrimaryBtn
                        title="CSV"
                        leftIcon={!reportLoader && <IconDownload />}
                        isLoading={reportLoader}
                        onClick={() => {
                            const searchParams = new URLSearchParams(window.location.search);
                            searchParams.delete("page");
                            searchParams.delete("limit");
                            dispatch(getAllprescriptionWithoutPagination(`?${searchParams}`
                                , (res) => {
                                    if (res?.status) {
                                        const logData = res.data;
                                        if (Array.isArray(logData)) {
                                            PrescriptionReportDownload(logData);
                                        } else {
                                            ErrorToast("Unexpected data format received.");
                                        }
                                    } else {
                                        ErrorToast(res.message);
                                    }
                                }
                            ));
                        }}
                    />
                </div>
            </div>
            <TableComponent
                columns={[
                    {
                        accessor: "sr", title: "Sr. no", render(rec, index) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "25");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    },
                    {
                        accessor: "_id",
                        title: "ID",
                        hidden: true,
                        sortable: true,
                    },
                    {
                        accessor: "diagnosis",
                        title: "Diagnosis",
                        sortable: true,
                        filtering: query?.diagnosis ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="diagnosis"
                                    placeholder="Diagnosis..."
                                    value={query?.diagnosis || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", diagnosis: e || undefined });
                                    }}
                                />
                            );
                        }
                    },
                    {
                        accessor: "regimen",
                        title: "Regimen",
                        sortable: true,
                        filtering: query?.regimen ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="regimen"
                                    placeholder="Regimen..."
                                    value={query?.regimen || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", regimen: e || undefined });
                                    }}
                                />
                            );
                        }
                    },
                    {
                        accessor: "prescription",
                        title: "Prescription",
                        sortable: true,
                        filtering: query?.prescription ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="prescription"
                                    placeholder="Prescription..."
                                    value={query?.prescription || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", prescription: e || undefined });
                                    }}
                                />
                            );
                        }
                    },
                    {
                        accessor: "notes",
                        title: "Notes",
                        sortable: true,
                        filtering: query?.notes ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="notes"
                                    placeholder="Notes..."
                                    value={query?.notes || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", notes: e || undefined });
                                    }}
                                />
                            );
                        }
                    },
                    {
                        accessor: "createdAt",
                        title: "Created At",
                        sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        },
                    },
                ]}
                isloading={loader}
                totalRecords={prescriptionList?.totalItems}
                records={prescriptionList?.list}
                idAccessor={({ _id }) => _id}
                page={prescriptionList?.currentPage || undefined}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                onSortStatusChange={(item) => {
                    setQuery({ page: "1", sortOrder: item?.direction, sortBy: item?.columnAccessor?.toLocaleString() });
                }}
                sortStatus={{
                    columnAccessor: query?.sortBy || "_id",
                    direction: query?.sortOrder === "desc" ? "desc" : "asc",
                }}
                recordsPerPage={parseInt(query?.limit || "25")}
                recordsPerPageOptions={[25, 35, 55, 100]}
                onRecordsPerPageChange={(e) => {
                    setQuery({ page: "1", limit: e.toString() });
                }}
            />
        </BoxCard>
    );
};

export default Index;
