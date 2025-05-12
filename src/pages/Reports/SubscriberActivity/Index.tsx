import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconArrowForward from "../../../components/Icon/IconArrowForward";
import IconDownload from "../../../components/Icon/IconDownload";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { MultiSelectInput, SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { getAllSubscriberActivityWithoutPagination } from "../../../store/actions/report.action";
import { cleartAllCaderTypeList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllCountryList, getAllDistrictList, getAllStateList, getCaderBytypesList } from "../../../store/reducer/masterTable.reducer";
import { clearSubscribersSearch, getAllSubscribersSearch } from "../../../store/reducer/plugin.reducer";
import { clearAllActions, clearAllsubscriberActivity, getAllActions, getAllsubscriberActivity } from "../../../store/reducer/report.reducer";
import { downloadCSV } from "../../../utils/functions";

const Index = () => {
    const { subscriberActivityList, loader, reportLoader, actionList } = useSelector((state: IRootState) => state.report);
    const { stateList, caderList, districtList, countryList } = useSelector((state: IRootState) => state.master);
    const { authUser } = useSelector((state: IRootState) => state.auth);
    const { membersList } = useSelector((status: IRootState) => status.plugin);
    const [inputValue, setInput] = useState("");
    const [localMembersList, setLocalMembersList] = useState<any[]>([]);
    const [debouncedValue, setDebouncedValue] = useState(inputValue);
    const [query, updateQuery] = useQueryParams({
        page: "1",
        limit: "25",
        fromDate: "",
        toDate: "",
        search: "",
        sortOrder: "",
        sortBy: "",
        platform: "",
        actions: "",
        stateId: ArrayParam,
        country: "",
        cadreId: ArrayParam,
        districtId: ArrayParam,
        userIdFilter: ArrayParam, email: "", phoneNo: ""
    });
    const [textValue, setTextValues] = useState<any>({
        search: query?.search,
        email: query?.email,
        phoneNo: query?.phoneNo,
        actions: query?.actions
    });
    const setQuery = (newValues: any) => {
        const sanitizedQuery = Object.fromEntries(
            Object.entries(newValues).map(([key, value]) => [
                key,
                value === "" ? null : value
            ])
        );
        updateQuery(sanitizedQuery);
    };
    const clearFilters = () => {
        setQuery({
            page: "1",
            limit: "25",
            search: null,
            sortOrder: null,
            sortBy: null,
            platform: null,
            actions: null,
            stateId: null,
            country: null,
            cadreId: null,
            districtId: null,
            fromDate: null,
            toDate: null,
            userIdFilter: null,
            email: null,
            phoneNo: null,
        });
    };
    const dispatch = useDispatch();
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({
                page: "1", limit: "25"
            });
        } else {
            dispatch(getAllsubscriberActivity(window.location.search));
        }
        if (query.stateId) {
            dispatch(getAllDistrictList("?stateId=" + query?.stateId?.toString()));
        }
    }, [window.location.search, query]);

    useEffect(() => {
        dispatch(getAllStateList());
        dispatch(getAllCountryList());
        dispatch(getCaderBytypesList(""));
        updateQuery({ userIdFilter: null });
        dispatch(getAllActions());
        return () => {
            dispatch(clearAllsubscriberActivity());
            dispatch(cleartAllDistrictList());
            dispatch(cleartAllCaderTypeList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
            dispatch(clearSubscribersSearch());
            dispatch(clearAllActions());
        };
    }, []);
    useEffect(() => {
        if (authUser) {
            const defaultState = authUser?.district?.[0]?.stateId || authUser?.state?.[0]?._id;
            const defaultDistrict = authUser?.district?.[0]?._id;
            if (!query.districtId && authUser?.roleType === "district_level") {
                setQuery({ ...query, stateId: defaultState, districtId: defaultDistrict });
            }
        }
    }, [query.stateId, query.districtId, authUser]);
    useEffect(() => {
        setLocalMembersList(membersList || []);
    }, [membersList]);


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


    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Subscriber Activities'
                        number={subscriberActivityList?.totalItems} />
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
                            searchParams.forEach((value, key) => {
                                if (key === "userIdFilter") {
                                    searchParams.set("userIds", value);
                                    searchParams.delete("userIdFilter");
                                } else if (key === "email") {
                                    searchParams.set("userEmail", value);
                                    searchParams.delete("email");
                                } else if (key === "actions") {
                                    searchParams.set("action", value);
                                    searchParams.delete("actions");
                                }
                            })

                            dispatch(getAllSubscriberActivityWithoutPagination(`?${searchParams}`
                                , (res) => {
                                    downloadCSV(res, "subscriber_activity.csv");
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
                            const itemsPerPage = parseInt(query.limit || "25");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    }, {
                        title: "User",
                        accessor: "usersId.name",
                        sortable: true,
                        render(record, index) {
                            return record?.userData?.name;
                        },
                        filtering: query?.userIdFilter ? true : false,
                        filter(params) {
                            return (
                                <MultiSelectInput
                                    menuPortalTarget={null}
                                    placeholder="Search by Name or Number..."
                                    className="w-500 mb-3"
                                    id="usersId"
                                    onInputChange={(e) => setInput(e)}
                                    inputValue={inputValue}
                                    options={localMembersList?.map((member) => ({
                                        label: `${member?.name} [${member?.phoneNo}]`,
                                        value: member?._id,
                                    }))}
                                    onChange={(selectedOptions: any[]) => {
                                        setInput("");
                                        setQuery({ userIdFilter: selectedOptions });
                                    }}
                                    value={query.userIdFilter as Array<string>}
                                />);
                        },
                    },
                    {
                        title: "Email",
                        accessor: "userData.email",
                        sortable: true,
                        filtering: query?.email ? true : false,
                        filter(params) {
                            return <PrimaryTextInput
                                iconRight={<IconArrowForward className="cursor-pointer" />}
                                rightIconClick={() => setQuery({ page: "1", email: textValue?.email })}
                                placeholder="Email..."
                                id="email"
                                type="text"
                                onChange={(e) => setTextValues({ email: e })}
                                value={textValue.email as string}
                                onBlur={() => setQuery({ page: "1", email: textValue?.email })}
                                onEnterPress={() => setQuery({ page: "1", email: textValue?.email })}
                            />;
                        },
                    }, {
                        title: "Phone No",
                        accessor: "userData.phoneNo",
                        sortable: true,
                        filtering: query?.phoneNo ? true : false,
                        filter(params) {
                            return <PrimaryTextInput
                                iconRight={<IconArrowForward className="cursor-pointer" />}
                                rightIconClick={() => setQuery({ page: "1", phoneNo: textValue?.phoneNo })}
                                placeholder="Phone No..."
                                id="phoneNo"
                                type="text"
                                onChange={(e) => setTextValues({ phoneNo: e })}
                                value={textValue.phoneNo as string}
                                onBlur={() => setQuery({ page: "1", phoneNo: textValue?.phoneNo })}
                                onEnterPress={() => setQuery({ page: "1", phoneNo: textValue?.phoneNo })}
                            />;
                        },
                    }, {
                        accessor: "userData.cadre",
                        title: "Cadre",
                        sortable: true,
                        filtering: query?.cadreId ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="cadreId"
                                    value={query?.cadreId as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", cadreId: e });
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
                                    id="country"
                                    value={query?.country}
                                    onChange={(e) => {
                                        setQuery({ page: "1", country: e });
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
                        filtering: query?.stateId ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="state"
                                    value={query?.stateId as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", stateId: e });
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
                        filtering: query?.districtId ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                query?.stateId ?
                                    <MultiSelectInput
                                        className="min-w-48"
                                        id="districtId"
                                        value={query?.districtId as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", districtId: e });

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
                    }, {
                        accessor: "action",
                        title: "Action",
                        filtering: query?.actions ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    className="min-w-48"
                                    id="actions"
                                    value={query?.actions}
                                    onChange={(e) => {
                                        setQuery({ page: "1", actions: e });
                                    }}
                                    options={actionList?.map((e: any) => ({
                                        label: e,
                                        value: e
                                    }))}
                                />
                            );
                        },
                    }, {
                        accessor: "ipAddress",
                        title: "IP Address",
                        sortable: true,
                    }, {
                        accessor: "platform",
                        title: "Platform",
                        sortable: true,
                    }, {
                        accessor: "timeSpent",
                        title: "Time Spent",
                        sortable: true,
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
                totalRecords={subscriberActivityList?.totalItems}
                records={subscriberActivityList?.list}
                idAccessor={({ _id }) => _id}
                page={subscriberActivityList?.currentPage || undefined}
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
