import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconDownload from "../../../components/Icon/IconDownload";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { SelectInput } from "../../../components/Inputs/SelectInput";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { getAllLeaderboardSubscriberRankWithoutPagination } from "../../../store/actions/leaderboard.action";
import { cleanLeaderboardBadgeList, cleanLeaderboardLevelList, cleanLeaderboardSubscriberRank, getAllLeaderboardBadgeList, getAllLeaderboardLevelList, getAllLeaderboardSubscriberRank } from "../../../store/reducer/leaderboard.reducer";
import { clearSubscribersSearch, getAllSubscribersSearch } from "../../../store/reducer/plugin.reducer";
import { ErrorToast } from "../../../utils/toasts"; // Add this import

// Helper function to wrap values in quotes for CSV
const wrapInQuotes = (value: string) => {
    value = value.trim();
    if (/[,";\n\t]/.test(value)) {
        return `"${value.replace(/"/g, "\"\"").replace(/;/g, ";;").replace(/\t/g, " ")}"`;
    }
    return value;
};

// Function to download leaderboard subscriber rankings as CSV
const downloadLeaderboardSubscriberRank = (subscriberData: Array<any>) => {
    const csvHeaders = [
        "Subscriber",
        "Level",
        "Badge",
        "Mins Spent",
        "Sub Module Usage Count",
        "App Opened Count",
        "Chatbot Usage Count",
        "Total Assessments",
        "Total Task",
        "Created At",
    ];

    const csvRows = subscriberData?.map((log: any) => {
        const subscriber = wrapInQuotes(log?.userId?.name || "-");
        const level = wrapInQuotes(log?.levelId?.level || "N/A");
        const badge = wrapInQuotes(log?.badgeId?.badge || "N/A");
        const minsSpent = wrapInQuotes(log?.minSpent?.toString() || "-");
        const subModuleUsageCount = wrapInQuotes(log?.subModuleUsageCount?.toString() || "-");
        const appOpenedCount = wrapInQuotes(log?.appOpenedCount?.toString() || "-");
        const chatbotUsageCount = wrapInQuotes(log?.chatbotUsageCount?.toString() || "-");
        const totalAssessments = wrapInQuotes(log?.totalAssessments?.toString() || "-");
        const taskCompleted = wrapInQuotes(log?.taskCompleted?.toString() || "-");
        const createdAt = wrapInQuotes(moment(log?.createdAt).format("DD MMM YYYY, hh:mm a") || "-");

        return [subscriber, level, badge, minsSpent, subModuleUsageCount, appOpenedCount, chatbotUsageCount, totalAssessments, taskCompleted, createdAt].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leaderboard_subscriber_rankings_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortOrder: "", sortBy: "", title: "", createdBy: "",
        levelId: "", badgeId: "", userId: "", fromDate: "", toDate: ""
    });
    const { reportLoader } = useSelector((state: IRootState) => state.report);

    const [inputValue, setInput] = useState("");
    const clearFilters = () => {
        setQuery({ page: "1", limit: "15", search: null, sortOrder: null, sortBy: null, title: null, createdBy: null, levelId: null, badgeId: null, userId: null, fromDate: null, toDate: null });
    };
    const dispatch = useDispatch();
    const { leaderboardBadgeList, leaderboardLevelList, leaderboardSubscriberRank, loader } = useSelector((state: IRootState) => state.leaderboard);
    const { membersList } = useSelector((status: IRootState) => status.plugin);


    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllLeaderboardSubscriberRank(window.location.search));
        }
    }, [window.location.search, query]);

    useEffect(() => {
        if (query?.levelId) {
            dispatch(getAllLeaderboardBadgeList(`?isDrpDwn=true&levelId=${query?.levelId}`));
        }
        dispatch(getAllLeaderboardLevelList("?isDrpDwn=true"));
    }, [query]);

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
    const handleDownload = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("page");
        searchParams.delete("limit");
        dispatch(getAllLeaderboardSubscriberRankWithoutPagination(`?${searchParams}`,
            (res) => {
                if (res?.status) {
                    const subscriberData = res.data;
                    if (Array.isArray(subscriberData)) {
                        downloadLeaderboardSubscriberRank(subscriberData);
                    } else {
                        ErrorToast("Unexpected data format received.");
                    }
                } else {
                    ErrorToast(res.message);
                }
            }
        ));
    };
    useEffect(() => {
        return () => {
            dispatch(cleanLeaderboardSubscriberRank());
            dispatch(cleanLeaderboardBadgeList());
            dispatch(cleanLeaderboardLevelList());
            dispatch(clearSubscribersSearch());
        };
    }, []);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='LB Subscriber Rankings'
                        number={leaderboardSubscriberRank?.totalSubscribers} />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <DateRangeFilter query={query as any}
                        setQuery={setQuery as any} />
                    <PrimaryBtn
                        title="CSV"
                        leftIcon={!reportLoader && <IconDownload />}
                        isLoading={reportLoader}
                        onClick={handleDownload}
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
                        accessor: "userId.name",
                        title: "Subscriber",
                        filtering: query?.userId ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    isClearable={true}
                                    id="userId"
                                    className="min-w-48"
                                    menuPortalTarget={null}
                                    onInputChange={(e) => setInput(e)}
                                    value={query?.userId}
                                    placeholder={"Search by Name or Number..."}
                                    onChange={(e) => {
                                        setQuery({ page: "1", userId: e });
                                    }}
                                    options={localMembersList?.map((member) => ({
                                        label: `${member?.name} [${member?.phoneNo}]`,
                                        value: member?._id,
                                    }))}
                                />
                            );
                        }
                    }, {
                        accessor: "levelId.level",
                        title: "Level",
                        render(rec) {
                            return rec?.levelId?.level || "N/A";
                        },
                        filtering: query?.levelId ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    id="levelId"
                                    className="min-w-48"
                                    menuPortalTarget={null}
                                    value={query?.levelId}
                                    onChange={(e) => {
                                        setQuery({ page: "1", levelId: e });
                                    }}
                                    options={leaderboardLevelList?.list
                                        ?.filter((e) => e?.level !== undefined && e?._id !== undefined)
                                        .map((e) => ({
                                            label: e.level as string,
                                            value: e._id as string,
                                        }))}
                                />
                            );
                        }
                    }, {
                        accessor: "badgeId.badge",
                        title: "Badge",
                        render(rec) {
                            return rec?.badgeId?.badge || "N/A";
                        },
                        filtering: query?.badgeId ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    id="badgeId"
                                    className="min-w-48"
                                    menuPortalTarget={null}
                                    value={query?.badgeId}
                                    onChange={(e) => {
                                        setQuery({ page: "1", badgeId: e });
                                    }}
                                    options={leaderboardBadgeList && query?.levelId ? leaderboardBadgeList?.map((e: any) => ({
                                        label: e?.badge,
                                        value: e?._id
                                    })) : leaderboardBadgeList?.list?.map((e: any) => ({
                                        label: e?.badge,
                                        value: e?._id
                                    }))
                                    }
                                />
                            );
                        }

                    }, {
                        accessor: "minSpent",
                        title: "Mins Spent",
                        sortable: true,
                    }, {
                        accessor: "subModuleUsageCount",
                        title: "Sub Module Usage Count",
                        sortable: true,
                    }, {
                        accessor: "appOpenedCount",
                        title: "App Opened Count",
                        sortable: true,
                    }, {
                        accessor: "chatbotUsageCount",
                        title: "Chatbot Usage Count",
                        sortable: true,
                    }, {
                        accessor: "totalAssessments",
                        title: "Total Assessments",
                        sortable: true,
                    }, {
                        accessor: "taskCompleted",
                        title: "Total Task",
                        sortable: true,
                    }, {
                        accessor: "createdAt",
                        sortable: true,
                        title: "Created At",
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    }
                ]}
                isloading={loader}
                totalRecords={leaderboardSubscriberRank?.totalSubscribers}
                records={leaderboardSubscriberRank?.list}
                idAccessor={({ _id }) => _id}
                page={leaderboardSubscriberRank?.currentPage || undefined}
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
        </BoxCard>
    );
};

export default Index;
