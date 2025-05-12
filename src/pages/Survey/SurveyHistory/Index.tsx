import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconDownload from "../../../components/Icon/IconDownload";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { MultiSelectInput, SelectInput } from "../../../components/Inputs/SelectInput";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { getAllSurveyHistoryWithoutPagination } from "../../../store/actions/survey.actions";
import { cleartAllCaderTypeList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllBlockList, getAllCountryList, getAllDistrictList, getAllStateList, getAllSurveyList, getCaderBytypesList } from "../../../store/reducer/masterTable.reducer";
import { clearSubscribersSearch, getAllSubscribersSearch } from "../../../store/reducer/plugin.reducer";
import { cleanSurveyHistoryList, getAllSurveyHistory } from "../../../store/reducer/survey.reducer";
import { ErrorToast } from "../../../utils/toasts";
const downloadSurveyHistory = (surveyData: Array<any>) => {
    const csvHeaders = [
        "Name",
        "Phone No",
        "Email",
        "Cadre",
        "Country",
        "State",
        "District",
        "Block",
        "Survey Title",
        "Question Title",
        "Answer",
        "Created At",
    ];
    const csvRows = surveyData.map(entry => {
        const userData = entry.userData || {};
        const userId = entry.userId || {};
        const surveyDetails = entry.surveyDetails || {};
        const questionAnswer = entry.questionAnswer || {};

        return {
            Name: `"${userId.name?.replace(/"/g, "\"\"") || "-"}"`,
            "Phone No": `"${userId.phoneNo?.replace(/"/g, "\"\"") || "-"}"`,
            Cadre: `"${userData.cadre?.replace(/"/g, "\"\"") || "-"}"`,
            Email: `"${userId.email?.replace(/"/g, "\"\"") || "-"}"`,
            Country: `"${userData.country?.replace(/"/g, "\"\"") || "-"}"`,
            State: `"${userData.state?.replace(/"/g, "\"\"") || "-"}"`,
            "District": `"${userData.district?.replace(/"/g, "\"\"") || "-"}"`,
            "Block": `"${userData.block?.replace(/"/g, "\"\"") || "-"}"`,
            "Survey Title": `"${surveyDetails.title?.en?.replace(/"/g, "\"\"") || "-"}"`,
            "Question Title": `"${surveyDetails.questions?.title?.en?.replace(/"/g, "\"\"") || "-"}"`,
            Answer: `"${questionAnswer.answer?.replace(/"/g, "\"\"") || "-"}"`,
            "Created At": `"${moment(entry.createdAt).format("DD MMM YYYY hh:mm a")}"`,
        };
    });

    // Create CSV content
    const csvContent = [
        csvHeaders.join(","),
        ...csvRows.map(row => Object.values(row).join(","))
    ].join("\n");
    // Create a Blob for the CSV file and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `survey_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const SurveyHistory = () => {
    const { stateList, caderList, districtList, blockList, countryList, surveyList } = useSelector((state: IRootState) => state.master);
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortBy: "", sortOrder: "", fromDate: "", toDate: "", surveyId: ArrayParam,
        stateIds: ArrayParam,
        country: "",
        userCadreId: ArrayParam,
        districtIds: ArrayParam,
        userIds: ArrayParam,
        blockIds: ArrayParam,
    });
    const clearFilters = () => {
        setQuery({
            page: "1",
            limit: "15",
            search: null,
            sortBy: null,
            sortOrder: null,
            fromDate: null,
            toDate: null,
            stateIds: null,
            country: null,
            userCadreId: null,
            districtIds: null,
            blockIds: null,
            userIds: null,
            surveyId: null,
        });
    };
    const { surveyHistoryList, loader } = useSelector((v: IRootState) => v.survey);
    const { reportLoader } = useSelector((status: IRootState) => status.report);
    const { membersList } = useSelector((status: IRootState) => status.plugin);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!window.location.search) {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllSurveyHistory(window.location.search));
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
        return () => {
            dispatch(cleanSurveyHistoryList());
        };
    }, []);

    const handleDownload = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("page");
        searchParams.delete("limit");
        dispatch(getAllSurveyHistoryWithoutPagination(`?${searchParams}`,
            (res) => {
                if (res?.status) {
                    if (Array.isArray(res.data)) {
                        downloadSurveyHistory(res.data);
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
        dispatch(getAllStateList());
        dispatch(getAllCountryList());
        dispatch(getAllSurveyList());
        dispatch(getCaderBytypesList(""));
        return () => {
            dispatch(cleartAllDistrictList());
            dispatch(cleanSurveyHistoryList());
            dispatch(cleartAllCaderTypeList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
            dispatch(clearSubscribersSearch());
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
                    <CircleWithNum title='Survey History'
                        number={surveyHistoryList?.totalItems || 0} />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex gap-3">
                    <DateRangeFilter query={query as any}
                        setQuery={setQuery as any} />
                    <PrimaryBtn
                        title="CSV"
                        isLoading={reportLoader}
                        leftIcon={!reportLoader && <IconDownload />}
                        onClick={handleDownload}
                    />
                </div>
            </div>
            <TableComponent
                idAccessor={({ _id }: any) => _id}
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
                    },
                    {
                        accessor: "userData.name", title: "User Name", sortable: true,
                        filtering: query?.userIds ? true : false,
                        render(record) {
                            return record?.userId?.name;
                        },
                        filter(params) {
                            return (
                                <MultiSelectInput
                                    menuPortalTarget={null}
                                    placeholder="Search by Name or Number..."
                                    className="w-500 mb-3"
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
                        accessor: "surveyDetails.title.en", title: "Survey Title",
                        filtering: query?.surveyId ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="state"
                                    value={query?.surveyId as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", surveyId: e });
                                    }}
                                    options={surveyList?.map((e) => ({
                                        label: e.title?.en,
                                        value: e._id
                                    })) as any}
                                />
                            );
                        },
                    },
                    {
                        accessor: "surveyDetails.questions.title.en",
                        title: "Questions",
                        render(record: any) {
                            return (
                                <div>
                                    {record?.surveyDetails?.questions?.title?.en || "N/A"}
                                </div>
                            );
                        },
                    },
                    {
                        accessor: "questionAnswer.answer",
                        title: "Answers",
                        render(record: any) {
                            return (
                                <div>
                                    {record?.questionAnswer?.answer || "N/A"}
                                </div>
                            );
                        },
                    },
                    {
                        accessor: "userData.cadre",
                        title: "Cadre",
                        sortable: true,
                        filtering: query?.userCadreId ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="cadreId"
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
                        accessor: "userData.country",
                        title: "Country",
                        sortable: true,
                        filtering: query?.country ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <SelectInput
                                    className="min-w-48"
                                    isClearable
                                    id="country"
                                    value={query?.country}
                                    onChange={(e) => {
                                        setQuery({ page: "1", country: e, stateIds: null, districtIds: null, blockIds: null });
                                    }}
                                    options={countryList?.map((e) => ({
                                        label: e.title,
                                        value: e._id
                                    }))}
                                />
                            );
                        },
                    }, {
                        accessor: "userData.state",
                        title: "State",
                        sortable: true,
                        filtering: query?.stateIds ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="state"
                                    value={query?.stateIds as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", stateIds: e, districtIds: null, blockIds: null });
                                    }}
                                    options={stateList?.map((e) => ({
                                        label: e.title,
                                        value: e._id
                                    }))}
                                />
                            );
                        },
                    }, {
                        accessor: "userData.district",
                        title: "District",
                        sortable: true,
                        filtering: query?.districtIds ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                query?.stateIds ?
                                    <MultiSelectInput
                                        className="min-w-48"
                                        id="districtId"
                                        value={query?.districtIds as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", districtIds: e, blockIds: null });

                                        }}
                                        options={districtList?.map((e) => ({
                                            label: e.title,
                                            value: e._id
                                        }))}
                                    /> : <div>Select State</div>
                            );
                        }
                    }, {
                        accessor: "userData.block",
                        title: "Block",
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
                                            setQuery({ page: "1", blockIds: e });
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
                        accessor: "createdAt",
                        title: "Created At", sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    },
                ]}
                isloading={loader}
                totalRecords={surveyHistoryList?.totalItems}
                records={surveyHistoryList?.list}
                page={surveyHistoryList?.currentPage || undefined}
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

export default SurveyHistory;
