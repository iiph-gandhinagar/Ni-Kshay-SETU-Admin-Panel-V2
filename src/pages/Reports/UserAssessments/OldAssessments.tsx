import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconDownload from "../../../components/Icon/IconDownload";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { MultiSelectInput, SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { getAllOldAssessmentsWithoutPagination } from "../../../store/actions/report.action"; // Adjusted action
import { clearAllBlockList, clearAllHealthFacilityList, clearCaderBytypesList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllBlockList, getAllCaderTypes, getAllCountryList, getAllDistrictList, getAllHealthFacilityList, getAllStateList, getCaderBytypesList } from "../../../store/reducer/masterTable.reducer";
import { clearSubscribersSearch, getAllSubscribersSearch } from "../../../store/reducer/plugin.reducer";
import { clearAllOldAssessmentListWithoutPagination, getAllOldAssessmentListWithoutPagination, getAllOldAssessments } from "../../../store/reducer/report.reducer"; // Adjusted reducer
import { downloadCSV } from "../../../utils/functions";

const OldAssessments = () => {
    const dispatch = useDispatch();
    const { loader, oldAssessmentsList, reportLoader, oldAssessmentList } = useSelector((state: IRootState) => state.report); // Adjusted selector
    const { stateList, caderList, districtList, blockList, allCaderTypes, healthFacilityList, countryList } = useSelector((state: IRootState) => state.master);
    const { membersList } = useSelector((status: IRootState) => status.plugin);

    const [query, setQuery] = useQueryParams({
        page: "1", limit: "25", sortBy: "", sortOrder: "", country: "", stateIds: ArrayParam, userPhoneNo: "", cadreTypes: ArrayParam,
        districtIds: ArrayParam, blockIds: ArrayParam, healthFacilityIds: ArrayParam, userCadreId: ArrayParam, fromDate: "", toDate: "", title: ArrayParam, userIds: ArrayParam, userEmail: ""
    });
    const clearFilters = () => {
        setQuery({
            page: "1",
            limit: "25",
            sortOrder: null,
            sortBy: null,
            stateIds: null,
            country: null,
            cadreTypes: null,
            userCadreId: null,
            districtIds: null,
            blockIds: null,
            healthFacilityIds: null,
            fromDate: null, toDate: null, title: null, userIds: null, userEmail: null, userPhoneNo: null
        });
    };
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllOldAssessments(window.location.search)); // Adjusted action
        }
        if (query.stateIds) {
            const searchParams = new URLSearchParams();
            query.stateIds.forEach((key) => {
                if (key)
                    searchParams.append("stateId", key);
            });
            dispatch(getAllDistrictList("?" + searchParams?.toString()));
        }
        if (query.cadreTypes) {
            const searchParams = new URLSearchParams();
            query.cadreTypes.forEach((key) => {
                if (key)
                    searchParams.append("cadreTypes", key);
            });
            dispatch(getCaderBytypesList("?" + searchParams?.toString()));
        }
        if (query.districtIds) {
            const searchParams = new URLSearchParams();
            query.districtIds.forEach((key) => {
                if (key)
                    searchParams.append("districtId", key);
            });
            dispatch(getAllBlockList("?" + searchParams?.toString()));
        }
        if (query.blockIds) {
            const searchParams = new URLSearchParams();
            query.blockIds.forEach((key) => {
                if (key)
                    searchParams.append("blockId", key);
            });
            dispatch(getAllHealthFacilityList("?" + searchParams?.toString()));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        if (query.userIds) {
            const url = new URL(window.location.href);
            url.searchParams.set("userIds", ""); // Remove or set `userId` to null
            window.history.replaceState({}, "", url.toString()); // Replace the URL without reload
        }
    }, []);
    useEffect(() => {
        dispatch(getAllStateList());
        dispatch(getAllCountryList());
        dispatch(getCaderBytypesList(""));
        dispatch(getAllCaderTypes());
        dispatch(getAllOldAssessmentListWithoutPagination());
        return () => {
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
            dispatch(clearCaderBytypesList());
            dispatch(clearAllBlockList());
            dispatch(cleartAllDistrictList());
            dispatch(clearAllHealthFacilityList());
            dispatch(clearAllOldAssessmentListWithoutPagination());
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
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum number={oldAssessmentsList?.totalItems} // Adjusted data source
                        title={"Old Assessments"} />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters} />
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
                            dispatch(getAllOldAssessmentsWithoutPagination(`?${searchParams}` // Adjusted action
                                , (res) => {
                                    downloadCSV(res, "old_assessments.csv");
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
                    }, {
                        title: "Assessment",
                        accessor: "assessmentId",
                        sortable: true,
                        render(record, index) {
                            return record?.assessmentTitle;
                        },
                        filtering: query?.title ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    menuPortalTarget={null}
                                    id="title"
                                    value={query?.title as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", title: e });
                                    }}
                                    options={oldAssessmentList && oldAssessmentList?.map((e: any) => ({
                                        label: e,
                                        value: e
                                    }))}
                                />
                            );
                        },
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
                    }, {
                        accessor: "userId.cadreType", title: "Cadre type", sortable: true,
                        render(record: any) {
                            return record?.userId?.cadreType?.replace("_", " ");
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
                                    className="min-w-48"
                                    isClearable
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
                        title: "Health Facility",
                        accessor: "userId.healthFacility",
                        sortable: true,
                        render: (record) => {
                            return record?.userId?.healthFacility?.[0]?.healthFacilityCode;
                        },
                        filtering: query?.healthFacilityIds ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                query?.blockIds ?
                                    <MultiSelectInput
                                        className="min-w-48"
                                        id="healthFacility"
                                        value={query?.healthFacilityIds as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", healthFacilityIds: e });
                                        }}
                                        options={healthFacilityList?.map((e) => ({
                                            label: e.healthFacilityCode,
                                            value: e._id
                                        }))}
                                    /> : <div>Select Block</div>
                            );
                        },
                    },
                    {
                        title: "Total Marks",
                        accessor: "totalMarks",
                        sortable: true,
                    }, {
                        title: "Obtained Marks",
                        accessor: "obtainedMarks",
                        sortable: true,
                    }, {
                        title: "Attempted",
                        accessor: "attempted",
                        sortable: true,
                    }, {
                        title: "Right Answer",
                        accessor: "rightAnswer",
                        sortable: true,
                    }, {
                        title: "Wrong Answer",
                        accessor: "wrongAnswer",
                        sortable: true,
                    },
                    {
                        title: "Skipped",
                        accessor: "skip",
                        sortable: true,
                    },
                    {
                        title: "Created At",
                        accessor: "createdAt",
                        sortable: true,
                        render(record) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    }

                ]}
                idAccessor={({ _id }) => _id}
                records={oldAssessmentsList?.list} // Adjusted data source
                page={oldAssessmentsList?.currentPage || undefined} // Adjusted data source
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                recordsPerPageOptions={[25, 35, 55, 100]}
                recordsPerPage={parseInt(query?.limit || "25")}
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
                totalRecords={oldAssessmentsList?.totalItems || 0} // Adjusted data source
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
        </div>
    );
};

export default OldAssessments;
