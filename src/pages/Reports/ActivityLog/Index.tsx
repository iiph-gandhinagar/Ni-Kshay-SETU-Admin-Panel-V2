import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { ActivityLogModal } from "../../../components/ActivityLogModal";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconDownload from "../../../components/Icon/IconDownload";
import IconEye from "../../../components/Icon/IconEye";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { getAllAdminActivityWithoutPagination } from "../../../store/actions/report.action";
import { clearAllActivity, getAllActivity } from "../../../store/reducer/report.reducer";
import { ErrorToast } from "../../../utils/toasts";



const wrapInQuotes = (value: string) => {
    value = value.trim();
    if (/[,";\n\t]/.test(value)) {
        return `"${value.replace(/"/g, "\"\"").replace(/;/g, ";;").replace(/\t/g, " ")}"`;
    }
    return value;
};
const ActivityLogDownload = (reportData: Array<any>) => {
    const csvHeaders = [
        "Module",
        "Action",
        "Causer",
        "Causer Email",
        "Created At",
    ];
    const csvRows = reportData?.map((log: any) => {
        const module = wrapInQuotes(log.moduleName || "-");
        const action = wrapInQuotes(log.action || "-");
        const causer = wrapInQuotes(log.causerId?.firstName || "-");
        const causerEmail = wrapInQuotes(log.causerId?.email || "-");
        const createdAt = wrapInQuotes(moment(log.createdAt).format("DD MMM YYYY,hh:mm a") || "-");
        return [
            module,
            action,
            causer,
            causerEmail,
            createdAt,
        ].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `activity_log_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const Index = () => {
    const [activityLogModal, setActivityLogModal] = useState<boolean>(false);
    const [activity, setActivity] = useState();
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortOrder: "", sortBy: "", fromDate: "", toDate: "",
    });
    const { userActivityList, loader } = useSelector((state: IRootState) => state.report);
    const dispatch = useDispatch();
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllActivity(window.location.search));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(clearAllActivity());
        };
    }, []);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Activity Logs'
                        number={userActivityList?.totalItems} />
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
                            dispatch(getAllAdminActivityWithoutPagination(`?${searchParams}`,
                                (res) => {
                                    if (res?.status) {
                                        const logData = res.data;
                                        if (Array.isArray(logData)) {
                                            ActivityLogDownload(logData);
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
                        accessor: "_id",
                        title: "id",
                        hidden: true
                    }, {
                        accessor: "sr", title: "Sr. no", render(rec, index) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "15");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    }, {
                        accessor: "action",
                        title: "Action",
                        render(record: any) {
                            switch (record.action) {
                                case "create":
                                    return <span className="text-white bg-green-500 px-2 py-1 rounded-lg font-semibold tracking-wider uppercase ">Created</span>;
                                case "update":
                                    return <span className="text-white bg-yellow-500 px-2 py-1 rounded-lg font-semibold tracking-wider uppercase">Updated</span>;
                                case "delete":
                                    return <span className="text-white bg-red-500 px-2 py-1 rounded-lg font-semibold tracking-wider uppercase">Deleted</span>;
                                default:
                                    return "";
                            }
                        }
                    }, {
                        accessor: "moduleName",
                        title: "Module Name",

                    }, {
                        accessor: "causerId.firstName",
                        title: "Causer",
                    }, {
                        accessor: "createdAt",
                        title: "Created At",
                        sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    }, {
                        accessor: "view",
                        title: "View",
                        titleClassName: "!text-right !pr-8",
                        render: (item: any) => (
                            <div className="flex items-center justify-end gap-6 mr-4 ">
                                <AuthLayout actions={["admin.activity-log.show"]}>
                                    <button
                                        onClick={() => {
                                            setActivityLogModal(true);
                                            setActivity(item);
                                        }}
                                        type="button">
                                        <IconEye />
                                    </button>
                                </AuthLayout>
                            </div>
                        )
                    }
                ]}
                isloading={loader}
                totalRecords={userActivityList?.totalItems}
                records={userActivityList?.list}
                idAccessor={({ _id }) => _id}
                page={userActivityList?.currentPage || undefined}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                onSortStatusChange={(item) => {
                    setQuery({ page: "1", sortOrder: item?.direction, sortBy: item?.columnAccessor?.toLocaleString() });
                }}
                sortStatus={{
                    columnAccessor: query?.sortBy || "_id",
                    direction: query?.sortOrder === "desc" ? "desc" : "asc"
                }}
                recordsPerPage={parseInt(query?.limit || "15")}
                recordsPerPageOptions={[15, 25, 35, 55, 100]}
                onRecordsPerPageChange={(e) => {
                    setQuery({ page: "1", limit: e.toString() });
                }}
            />
            <ActivityLogModal
                data={activity}
                isOpen={activityLogModal}
                onClose={() => {
                    setActivityLogModal(false);
                }}
            />
        </BoxCard>
    );
};

export default Index;
