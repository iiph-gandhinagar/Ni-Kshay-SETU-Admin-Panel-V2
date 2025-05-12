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
import { getAllInquiriesWithoutPagination } from "../../../store/actions/report.action";
import { clearAllInquiry, getAllInquiry } from "../../../store/reducer/report.reducer";
import { ErrorToast } from "../../../utils/toasts";



const wrapInQuotes = (value: string) => {
    value = value.trim();
    if (/[,";\n\t]/.test(value)) {
        return `"${value.replace(/"/g, "\"\"").replace(/;/g, ";;").replace(/\t/g, " ")}"`;
    }
    return value;
};
const InquiryLogDownload = (reportData: Array<any>) => {
    const csvHeaders = [
        "Name",
        "Email",
        "Phone No",
        "Subject",
        "Message",
        "Created At",
    ];
    const csvRows = reportData?.map((log: any) => {
        const name = wrapInQuotes(log?.name || "-");
        const email = wrapInQuotes(log?.email || "-");
        const phoneNo = wrapInQuotes(log?.phoneNo || "-");
        const subject = wrapInQuotes(log?.subject || "-");
        const message = wrapInQuotes(log?.message || "-");
        const createdAt = wrapInQuotes(moment(log?.createdAt).format("DD MMM YYYY, hh:mm a") || "-");

        return [name, email, phoneNo, subject, message, createdAt].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inquiries_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const Index = () => {
    const dispatch = useDispatch();
    const { loader, inquiryList } = useSelector((state: IRootState) => state.report);
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortOrder: "", sortBy: "", email: "", phoneNo: "", name: "", search: "", fromDate: "", toDate: "",
    });
    const clearFilters = () => {
        setQuery({
            page: "1", limit: "15", sortOrder: null, sortBy: null, email: null, phoneNo: null, name: null, search: null, fromDate: null, toDate: null,
        });
    };
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllInquiry(window.location.search));
        }
        return () => {
            dispatch(clearAllInquiry());
        };
    }, [window.location.search, query]);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center gap-5">
                    <CircleWithNum number={inquiryList?.totalItems}
                        title={"Inquiries"} />
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
                            dispatch(getAllInquiriesWithoutPagination(`?${searchParams}`,
                                (res) => {
                                    if (res?.status) {
                                        const logData = res.data;
                                        if (Array.isArray(logData)) {
                                            InquiryLogDownload(logData);
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
                        title: "Name",
                        accessor: "userId.name",
                        sortable: true,
                        filtering: query?.name ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="name"
                                    placeholder="Name..."
                                    value={query?.name || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", name: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        title: "Email",
                        accessor: "userId.email",
                        render: (rec) => {
                            return rec?.userId?.email ?? rec?.email;
                        },
                        sortable: true,
                        filtering: query?.email ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="email"
                                    placeholder="Email..."
                                    value={query?.email || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", email: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        title: "Phone Number",
                        accessor: "userId.phoneNo",
                        sortable: true,
                        filtering: query?.phoneNo ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="phoneNo"
                                    placeholder="Phone Number..."
                                    value={query?.phoneNo || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", phoneNo: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        title: "Subject",
                        accessor: "subject",
                    },
                    {
                        title: "Message",
                        accessor: "message",
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
                records={inquiryList?.list}
                page={inquiryList?.currentPage || undefined}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                recordsPerPageOptions={[15, 25, 35, 55, 100]}
                recordsPerPage={parseInt(query?.limit || "15")}
                onRecordsPerPageChange={(e) => {
                    setQuery({ page: "1", limit: e.toString() });
                }}
                totalRecords={inquiryList?.totalItems || 0}
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
