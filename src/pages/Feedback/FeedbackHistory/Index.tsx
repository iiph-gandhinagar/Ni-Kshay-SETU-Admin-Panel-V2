import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import FeedbackModal from "../../../components/custom/FeedbackModal";
import IconDownload from "../../../components/Icon/IconDownload";
import IconInfoCircle from "../../../components/Icon/IconInfoCircle";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { MultiSelectInput, SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { getAllFeedbackHistoryWithoutPagination } from "../../../store/actions/feedback.action";
import { cleanFeedbackHistoryList, getAllFeedbackHistoryList } from "../../../store/reducer/feedback.reducer";
import { cleartAllCaderTypeList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllBlockList, getAllCountryList, getAllDistrictList, getAllStateList, getCaderBytypesList } from "../../../store/reducer/masterTable.reducer";
import { clearSubscribersSearch, getAllSubscribersSearch } from "../../../store/reducer/plugin.reducer";
import { ErrorToast } from "../../../utils/toasts"; // Add this import

const wrapInQuotes = (value: string) => {
    value = value.trim();
    if (/[,";\n\t]/.test(value)) {
        return `"${value.replace(/"/g, "\"\"").replace(/;/g, ";;").replace(/\t/g, " ")}"`;
    }
    return value;
};
const downloadFeedbackHistory = (feedbackData: Array<any>) => {
    const csvHeaders = [
        "User Name",
        "User Email",
        "Question",
        "Answer",
        "Ratings",
        "Review",
        "Skip",
        "Country",
        "Cadre",
        "State",
        "District",
        "Block",
        "Created At",
    ];

    const csvRows = feedbackData?.map((log: any) => {
        const userName = wrapInQuotes(log?.userId?.name || "-");
        const userEmail = wrapInQuotes(log?.userId?.email || "-");
        const question = wrapInQuotes(log?.feedback?.[0]?.question?.en || "-");
        const answer = wrapInQuotes(log?.feedback?.[0]?.description?.en || "-");
        const ratings = wrapInQuotes(log?.ratings?.toString() || "-");
        const review = wrapInQuotes(log?.review || "-");
        const skip = wrapInQuotes(log?.skip ? "Yes" : "No");
        const country = wrapInQuotes(log?.userData?.country || "-"); // Taking country from userData
        const cadre = wrapInQuotes(log?.userData?.cadre || "-"); // Taking cadre from userData
        const state = wrapInQuotes(log?.userData?.state || "-"); // Taking state from userData
        const district = wrapInQuotes(log?.userData?.district || "-"); // Taking district from userData
        const block = wrapInQuotes(log?.userData?.block || "-"); // Taking block from userData
        const createdAt = wrapInQuotes(moment(log?.createdAt).format("DD MMM YYYY, hh:mm a") || "-");

        return [
            userName,
            userEmail,
            question,
            answer,
            ratings,
            review,
            skip,
            country,
            cadre,
            state,
            district,
            block,
            createdAt,
        ].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `feedback_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const FeedbackHistory = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortOrder: "", sortBy: "", stateIds: ArrayParam, userPhoneNo: "", country: "", search: "",
        districtIds: ArrayParam, blockIds: ArrayParam, healthFacilityIds: ArrayParam, userCadreId: ArrayParam, fromDate: "", toDate: "", assessmentId: ArrayParam, userIds: ArrayParam, userEmail: ""
    });
    const clearFilters = () => {
        setQuery({
            page: "1",
            limit: "15",
            sortOrder: null,
            sortBy: null,
            stateIds: null,
            country: null,
            userCadreId: null,
            districtIds: null,
            blockIds: null,
            healthFacilityIds: null,
            fromDate: null, toDate: null, assessmentId: null, userIds: null, userEmail: null, userPhoneNo: null
        });
    };
    const { feedbackHistoryList, loader } = useSelector((state: IRootState) => state.feedback);
    const { stateList, caderList, districtList, blockList, healthFacilityList, countryList } = useSelector((state: IRootState) => state.master);
    const { reportLoader } = useSelector((status: IRootState) => status.report);
    const { membersList } = useSelector((status: IRootState) => status.plugin);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const showModal = (message: any) => {
        setSelectedMessage(message);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllFeedbackHistoryList(window.location.search));
        }
        if (query.stateIds) {
            const searchParams = new URLSearchParams();
            query.stateIds.forEach((key) => {
                if (key)
                    searchParams.append("stateId", key);
            });
            dispatch(getAllDistrictList("?" + searchParams?.toString()));
        }
        if (query.districtIds) {
            const searchParams = new URLSearchParams();
            query.districtIds.forEach((key) => {
                if (key)
                    searchParams.append("districtId", key);
            });
            dispatch(getAllBlockList("?" + searchParams?.toString()));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        dispatch(getAllStateList());
        dispatch(getAllCountryList());
        dispatch(getCaderBytypesList(""));
        return () => {
            dispatch(cleartAllDistrictList());
            dispatch(cleartAllCaderTypeList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
            dispatch(clearSubscribersSearch());
        };
    }, []);

    useEffect(() => {
        return () => {
            dispatch(cleanFeedbackHistoryList());
        };
    }, []);
    const handleDownload = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("page");
        searchParams.delete("limit");
        dispatch(getAllFeedbackHistoryWithoutPagination(`?${searchParams}`,
            (res) => {
                if (res?.status) {
                    const feedbackData = res.data;
                    if (Array.isArray(feedbackData)) {
                        downloadFeedbackHistory(feedbackData);
                    } else {
                        ErrorToast("Unexpected data format received.");
                    }
                } else {
                    ErrorToast(res.message);
                }
            }
        ));
    };
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
    const { authUser } = useSelector((state: IRootState) => state.auth);
    useEffect(() => {
        if (authUser) {
            const defaultState = authUser?.district?.[0]?.stateId || authUser?.state?.[0]?._id;
            const defaultDistrict = authUser?.district?.[0]?._id;
            if (!query.districtIds && authUser?.roleType === "districtId_level") {
                setQuery({ ...query, stateIds: defaultState, districtIds: defaultDistrict });
            }
        }
    }, [query.stateIds, query.districtIds, authUser]);


    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Feedback History Entries'
                        number={feedbackHistoryList?.totalItems} />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex gap-3">
                    <DateRangeFilter query={query as any}
                        setQuery={setQuery} />
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
                        title: "ID",
                        hidden: true
                    },
                    {
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
                                    label="User"
                                    id="userId"
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
                                placeholder="Email..."
                                id="email"
                                type="text"
                                onChange={(e) => setQuery({ userEmail: e })}
                                value={query.userEmail as string}
                            />;
                        },
                    },
                    {
                        title: "Phone Number",
                        accessor: "userId.phoneNo",
                        sortable: true,
                        filtering: query?.userPhoneNo ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="userPhoneNo"
                                    placeholder="Phone Number..."
                                    value={query?.userPhoneNo || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", userPhoneNo: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        title: "Cadre",
                        accessor: "userData.cadre",
                        sortable: true,
                        filtering: query?.userCadreId ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="userCadreId"
                                    value={query?.userCadreId as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", userCadreId: e });
                                    }}
                                    options={caderList?.map((e) => ({
                                        label: e.title,
                                        value: e._id
                                    }))}
                                />
                            );
                        },
                    }, {
                        title: "Country",
                        accessor: "userData.country",
                        sortable: true,
                        filtering: query?.country ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <SelectInput
                                    isClearable
                                    className="min-w-48"
                                    id="country"
                                    value={query?.country}
                                    onChange={(e) => {
                                        setQuery({ page: "1", country: e, stateIds: null, districtIds: null, blockIds: null, healthFacilityIds: null });

                                    }}
                                    options={countryList?.map((e) => ({
                                        label: e.title,
                                        value: e._id
                                    }))}
                                />
                            );
                        },
                    }, {
                        title: "State",
                        accessor: "userData.state",
                        sortable: true,
                        filtering: query?.stateIds ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="state"
                                    value={query?.stateIds as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", stateIds: e, districtIds: null, blockIds: null, healthFacilityIds: null });
                                    }}
                                    options={stateList?.map((e) => ({
                                        label: e.title,
                                        value: e._id
                                    }))}
                                />
                            );
                        },
                    },
                    {
                        title: "District",
                        accessor: "userData.district",
                        sortable: true,
                        filtering: query?.districtIds ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                query?.stateIds ?
                                    <MultiSelectInput
                                        className="min-w-48"
                                        id="districtIds"
                                        value={query?.districtIds as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", districtIds: e, blockIds: null, healthFacilityIds: null });

                                        }}
                                        options={districtList?.map((e) => ({
                                            label: e.title,
                                            value: e._id
                                        }))}
                                    /> : <div>Select State</div>
                            );
                        },
                    },
                    {
                        title: "Block",
                        accessor: "userData.block",
                        sortable: true,
                        filtering: query?.blockIds ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                query?.districtIds ?
                                    <MultiSelectInput
                                        className="min-w-48"
                                        id="block"
                                        value={query?.blockIds as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", blockIds: e, healthFacilityIds: null });
                                        }}
                                        options={blockList?.map((e) => ({
                                            label: e.title,
                                            value: e._id
                                        }))}
                                    /> : <div>Select District</div>
                            );
                        },
                    },
                    {
                        accessor: "ratings",
                        title: "Ratings",
                        sortable: true,

                    }, {
                        accessor: "review",
                        title: "Review",
                        sortable: true,

                    }, {
                        accessor: "skip",
                        title: "Skip",
                        render(record: any) {
                            return record.skip ? "Yes" : "No";
                        }
                    }, {
                        accessor: "feedback",
                        title: "Feedback",
                        render(record) {
                            return <Tippy content="View Messages">
                                <button type="button"
                                    onClick={() => showModal(record.feedback)}>
                                    <IconInfoCircle />
                                </button>
                            </Tippy>;
                        }
                    }, {
                        accessor: "createdAt",
                        title: "Created At",
                        sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    }
                ]}
                isloading={loader}
                totalRecords={feedbackHistoryList?.totalItems}
                records={feedbackHistoryList?.list}
                idAccessor={({ _id }) => _id}
                page={feedbackHistoryList?.currentPage || undefined}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                sortStatus={{
                    columnAccessor: query?.sortBy || "_id",
                    direction: query?.sortOrder === "desc" ? "desc" : "asc"
                }}
                onSortStatusChange={(e) => {
                    setQuery({ page: "1", sortOrder: e?.direction, sortBy: e?.columnAccessor?.toLocaleString() });
                }}
                recordsPerPage={parseInt(query?.limit || "15")}
                recordsPerPageOptions={[15, 25, 35, 55, 100]}
                onRecordsPerPageChange={(e) => {
                    setQuery({ page: "1", limit: e.toString() });
                }}
            />
            <FeedbackModal
                isModalVisible={isModalVisible}
                feedback={selectedMessage}
                onClose={handleCancel}
            />
        </BoxCard>
    );
};

export default FeedbackHistory;
