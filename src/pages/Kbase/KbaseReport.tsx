import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import CircleWithNum from "../../components/custom/CircleWithNum";
import IconArrowForward from "../../components/Icon/IconArrowForward";
import IconDownload from "../../components/Icon/IconDownload";
import { MultiSelectInput } from "../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import TableComponent from "../../components/Tables";
import { IRootState } from "../../store";
import { getKbasereportcsv } from "../../store/actions/plugin.action";
import { getAllCaderTypes } from "../../store/reducer/masterTable.reducer";
import { clearKbasereport, getAllSubscribersSearch, getKbasereport } from "../../store/reducer/plugin.reducer";
import { downloadCSV } from "../../utils/functions";

const KbaseReport = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "50", sortBy: "", sortOrder: "",
        userPhoneNo: "", userCadreType: ArrayParam, courseTitle: "", view: "", userEmail: "", userIds: ArrayParam
    });
    const clearFilters = () => {
        setQuery({ page: "1", limit: "50", sortBy: null, sortOrder: null, userPhoneNo: null, userCadreType: null, courseTitle: null, userEmail: null, userIds: null });
    };
    const dispatch = useDispatch();
    const { kbasereport, loader } = useSelector((state: IRootState) => state.plugin);
    const { reportLoader } = useSelector((state: IRootState) => state.report);
    const { allCaderTypes } = useSelector((state: IRootState) => state.master);
    const { membersList } = useSelector((status: IRootState) => status.plugin);

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "50", view: "report" });
        } else {
            dispatch(getKbasereport(window.location.search));
        }
    }, [window.location.search]);

    useEffect(() => {
        dispatch(getAllCaderTypes());
        return () => {
            dispatch(clearKbasereport());

        };
    }, []);
    const [inputValue, setInput] = useState("");
    const [localMembersList, setLocalMembersList] = useState<any[]>([]);
    useEffect(() => {
        setLocalMembersList(membersList || []);
    }, [membersList]);

    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    useEffect(() => {
        if (debouncedValue.length > 2) {
            setLocalMembersList([]);
            dispatch(getAllSubscribersSearch(`?search=${debouncedValue}`));
        }
    }, [debouncedValue, dispatch]);
    const [textValue, setTextValues] = useState<any>({
        userEmail: query?.userEmail,
        userPhoneNo: query?.userPhoneNo,
    });
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Kbase User Report'
                        number={kbasereport?.totalItems || 0} />
                    <PrimaryBtn title="Clear Filters"
                        onClick={clearFilters} />
                </div>
                <PrimaryBtn
                    title="CSV"
                    leftIcon={!reportLoader && <IconDownload />}
                    isLoading={reportLoader}
                    onClick={() => {
                        const searchParams = new URLSearchParams(window.location.search);
                        searchParams.delete("page");
                        searchParams.delete("limit");
                        searchParams.delete("view");
                        dispatch(getKbasereportcsv(`?${searchParams}`
                            , (res) => {
                                downloadCSV(res, `Kbase${Date.now()}.csv`);
                            }
                        ));
                    }}
                />
            </div>
            <TableComponent
                isloading={loader}
                columns={[
                    { accessor: "_id", hidden: true },
                    {
                        accessor: "sr", title: "Sr. no", render(rec, index: number) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "50");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    }, {
                        title: "User",
                        accessor: "userId.name",
                        sortable: true,
                        render(record, index) {
                            return record?.userId?.name;
                        },
                        filtering: query?.userIds ? true : false,
                        filter(params) {
                            return (
                                <MultiSelectInput
                                    menuPortalTarget={null}
                                    placeholder="Search by Name or Number..."
                                    className="w-500 mb-3"
                                    id="userIds"
                                    onInputChange={(e) => setInput(e)}
                                    inputValue={inputValue}
                                    options={localMembersList?.map((member) => ({
                                        label: `${member?.name} [${member?.phoneNo}]`,
                                        value: member?._id,
                                    }))}
                                    onChange={(selectedOptions: any[]) => {
                                        setInput("");
                                        setQuery({ userIds: selectedOptions });
                                    }}
                                    value={query.userIds as Array<string>}
                                />);
                        },
                    },
                    {
                        title: "Email",
                        accessor: "userId.email",
                        sortable: true,
                        filtering: query?.userEmail ? true : false,
                        filter(params) {
                            return <PrimaryTextInput
                                iconRight={<IconArrowForward className="cursor-pointer" />}
                                rightIconClick={() => setQuery({ page: "1", userEmail: textValue?.userEmail })}
                                placeholder="Email..."
                                id="email"
                                type="text"
                                onChange={(e) => setTextValues({ userEmail: e })}
                                value={textValue.userEmail as string}
                                onBlur={() => setQuery({ page: "1", userEmail: textValue?.userEmail })}
                                onEnterPress={() => setQuery({ page: "1", userEmail: textValue?.userEmail })}
                            />;
                        },
                    }, {
                        title: "Phone No",
                        accessor: "userId.phoneNo",
                        sortable: true,
                        filtering: query?.userPhoneNo ? true : false,
                        filter(params) {
                            return <PrimaryTextInput
                                iconRight={<IconArrowForward className="cursor-pointer" />}
                                rightIconClick={() => setQuery({ page: "1", userPhoneNo: textValue?.userPhoneNo })}
                                placeholder="Phone No..."
                                id="phoneNo"
                                type="text"
                                onChange={(e) => setTextValues({ userPhoneNo: e })}
                                value={textValue.userPhoneNo as string}
                                onBlur={() => setQuery({ page: "1", userPhoneNo: textValue?.userPhoneNo })}
                                onEnterPress={() => setQuery({ page: "1", userPhoneNo: textValue?.userPhoneNo })}
                            />;
                        },
                    },
                    {
                        accessor: "cadreType", title: "Cadre Type",
                        render(record: any) {
                            return record?.userId?.cadreType?.replace("_", " ") || "-";
                        },
                        filtering: query?.userCadreType ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="userCadreType"
                                    value={query?.userCadreType as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", userCadreType: e, });
                                    }}
                                    options={allCaderTypes?.map((e) => ({
                                        label: e,
                                        value: e
                                    }))}
                                />
                            );
                        },
                    },
                    {
                        accessor: "courseTitle", title: "Course Title",
                        render(record: any) {
                            return record?.course?.courseTitle || "-";
                        },
                        filtering: query?.courseTitle ? true : false,
                        filter(params) {
                            return <PrimaryTextInput
                                iconRight={<IconArrowForward className="cursor-pointer" />}
                                rightIconClick={() => setQuery({ page: "1", courseTitle: textValue?.courseTitle })}
                                placeholder="Course Title..."
                                id="courseTitle"
                                type="text"
                                onChange={(e) => setTextValues({ courseTitle: e })}
                                value={textValue.courseTitle as string}
                                onBlur={() => setQuery({ page: "1", courseTitle: textValue?.courseTitle })}
                                onEnterPress={() => setQuery({ page: "1", courseTitle: textValue?.courseTitle })}
                            />;
                        },

                    },
                    {
                        accessor: "totalModules", title: "Total Modules",
                        render(record: any) {
                            return record?.totalModule || "-";
                        },
                    },
                    {
                        accessor: "readModules", title: "Read Modules",
                        render(record: any) {
                            return record?.totalReadModule || "-";
                        },
                    },
                    {
                        accessor: "percentage", title: "Percentage",
                        render(record: any) {
                            return `${record?.percentage || 0}%`;
                        },
                    },
                    {
                        accessor: "totalTime", title: "Total Time (mins)", sortable: true,
                        render(record: any) {
                            return record?.totalTime || "-";
                        },
                    },
                    {
                        accessor: "lastAccessDate", title: "Last Access Date",
                        render(record: any) {
                            return moment(record?.lastAccessDate).format("DD MMM YYYY hh:mm a") || "-";
                        },
                    },
                ]}
                records={kbasereport?.list}
                idAccessor={({ userId }) => userId._id}
                page={kbasereport?.currentPage || undefined}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                recordsPerPageOptions={[50, 100]}
                recordsPerPage={parseInt(query?.limit || "50")}
                onRecordsPerPageChange={(e) => {
                    setQuery({ page: "1", limit: e.toString() });
                }}
                onSortStatusChange={(item) => {
                    setQuery({ page: "1", sortOrder: item?.direction, sortBy: item?.columnAccessor?.toLocaleString() });
                }}
                sortStatus={{
                    columnAccessor: query?.sortBy || "_id",
                    direction: query?.sortOrder === "desc" ? "desc" : "asc"
                }}
                totalRecords={kbasereport?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
        </div>
    );
};

export default KbaseReport;
