import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconDownload from "../../../components/Icon/IconDownload";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { getAllUserAppVersionWithoutPagination } from "../../../store/actions/report.action";
import { clearAllUserAppVersion, getAllUserAppVersion } from "../../../store/reducer/report.reducer";
import { ErrorToast } from "../../../utils/toasts";


const wrapInQuotes = (value: string) => {
    value = value.trim();
    if (/[,";\n\t]/.test(value)) {
        return `"${value.replace(/"/g, "\"\"").replace(/;/g, ";;").replace(/\t/g, " ")}"`;
    }
    return value;
};
const UserAppVersionLogDownload = (reportData: Array<any>) => {
    const csvHeaders = ["User", "App Version", "Current Platform", "iOS", "Android", "Web", "Created At"];
    const csvRows = reportData?.map((log: any) => {
        const user = wrapInQuotes(log?.userName || "-");
        const appVersion = wrapInQuotes(log?.appVersion || "-");
        const currentPlatform = wrapInQuotes(log?.currentPlatform || "-");
        const hasIos = wrapInQuotes(log?.hasIos ? "Yes" : "No");
        const hasAndroid = wrapInQuotes(log?.hasAndroid ? "Yes" : "No");
        const hasWeb = wrapInQuotes(log?.hasWeb ? "Yes" : "No");
        const createdAt = wrapInQuotes(moment(log?.createdAt).format("DD MMM YYYY, hh:mm a") || "-");
        return [user, appVersion, currentPlatform, hasIos, hasAndroid, hasWeb, createdAt].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `user_app_version_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const Index = () => {
    const dispatch = useDispatch();
    const { loader, userAppVersionList } = useSelector((state: IRootState) => state.report);
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", fromDate: "", toDate: "", sortOrder: "", sortBy: "", currentPlatform: "", appVersion: "", search: "",
    });
    const clearFilters = () => {
        setQuery({
            page: "1", limit: "15", sortOrder: null, sortBy: null, currentPlatform: null, appVersion: null, search: null, fromDate: null, toDate: null,
        });
    };
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllUserAppVersion(window.location.search));
        }
        return () => {
            dispatch(clearAllUserAppVersion());
        };
    }, [window.location.search, query]);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center gap-5">
                    <CircleWithNum number={userAppVersionList?.totalItems}
                        title={"User App Version"} />
                    <PrimaryTextInput
                        id={"search"}
                        type="text"
                        placeholder="Search..."
                        className="form-input w-auto"
                        value={query.search || ""}
                        onChange={(e) => {
                            setQuery({ search: e });
                        }}
                    />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters} />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <DateRangeFilter query={query as any}
                        setQuery={setQuery as any} />
                    <PrimaryBtn
                        title="CSV"
                        leftIcon={<IconDownload />}
                        onClick={() => {
                            const searchParams = new URLSearchParams(window.location.search);
                            searchParams.delete("page");
                            searchParams.delete("limit");
                            dispatch(getAllUserAppVersionWithoutPagination(`?${searchParams}`
                                , (res) => {
                                    if (res?.status) {
                                        const logData = res.data;
                                        if (Array.isArray(logData)) {
                                            UserAppVersionLogDownload(logData);
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
                isloading={loader}
                columns={[
                    { accessor: "_id", hidden: true },
                    {
                        accessor: "sr", title: "Sr. no", render(rec, index) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "15");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    },
                    {
                        title: "User",
                        accessor: "userName",
                        sortable: true,
                    },
                    {
                        title: "App Version",
                        accessor: "appVersion",
                        sortable: true,
                        filtering: query?.appVersion ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="version"
                                    placeholder="App Version..."
                                    value={query?.appVersion || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", appVersion: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        title: "Current Platform",
                        accessor: "currentPlatform",
                        sortable: true,
                        filtering: query?.currentPlatform ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="currentPlatform"
                                    placeholder="Current Platform..."
                                    value={query?.currentPlatform || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", currentPlatform: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        title: "iOS",
                        accessor: "hasIos",
                        render: (record: any) => {
                            return record?.hasIos ? "Yes" : "No";
                        }
                    },
                    {
                        title: "Android",
                        accessor: "hasAndroid",
                        render: (record: any) => {
                            return record?.hasAndroid ? "Yes" : "No";
                        }
                    },
                    {
                        title: "Web",
                        accessor: "hasWeb",
                        render: (record: any) => {
                            return record?.hasWeb ? "Yes" : "No";
                        }
                    },
                    {
                        title: "Created At",
                        accessor: "createdAt",
                        sortable: true,
                        render(record) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    },
                ]}
                idAccessor={({ _id }) => _id}
                records={userAppVersionList?.list}
                page={userAppVersionList?.currentPage || undefined}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                recordsPerPageOptions={[15, 25, 35, 55, 100]}
                recordsPerPage={parseInt(query?.limit || "15")}
                onRecordsPerPageChange={(e) => {
                    setQuery({ page: "1", limit: e.toString() });
                }}
                totalRecords={userAppVersionList?.totalItems || 0}
                onSortStatusChange={(item) => {
                    setQuery({ page: "1", sortOrder: item?.direction, sortBy: item?.columnAccessor?.toLocaleString() });
                }}
                sortStatus={{
                    columnAccessor: query?.sortBy || "_id",
                    direction: query?.sortOrder === "desc" ? "desc" : "asc"
                }}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
        </div>
    );
};

export default Index;
