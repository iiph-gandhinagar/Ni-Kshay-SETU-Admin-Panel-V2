import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import MessageModal from "../../../components/custom/MessageModal";
import IconDownload from "../../../components/Icon/IconDownload";
import IconInfoCircle from "../../../components/Icon/IconInfoCircle";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { MultiSelectInput, SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { getAllChatbotActivityWithoutPagination } from "../../../store/actions/report.action";
import { clearCaderBytypesList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllCountryList, getAllDistrictList, getAllStateList, getCaderBytypesList } from "../../../store/reducer/masterTable.reducer";
import { clearSubscribersSearch, getAllSubscribersSearch } from "../../../store/reducer/plugin.reducer";
import { getAllChatbotActivity } from "../../../store/reducer/report.reducer";
import { downloadCSV } from "../../../utils/functions";

const Index = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const showModal = (message: any) => {
        setSelectedMessage(message);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const [query, setQuery] = useQueryParams({
        page: "1",
        limit: "25",
        sortBy: "",
        sortOrder: "",
        country: "",
        stateIds: ArrayParam,
        districtIds: ArrayParam,
        userCadreId: ArrayParam, fromDate: "", toDate: "", userIds: ArrayParam, userEmail: ""
    });
    const clearFilters = () => {
        setQuery({
            page: "1",
            limit: "25",
            sortOrder: null,
            sortBy: null,
            stateIds: null,
            country: null,
            userCadreId: null,
            districtIds: null,
            fromDate: null, toDate: null, userIds: null, userEmail: null
        });
    };

    const dispatch = useDispatch();
    const { chatbotActivityList, loader, reportLoader } = useSelector((state: IRootState) => state.report);
    const { membersList } = useSelector((status: IRootState) => status.plugin);
    const { authUser } = useSelector((state: IRootState) => state.auth);
    const { stateList, caderList, districtList, countryList } = useSelector((state: IRootState) => state.master);

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "25" });
        } else {
            dispatch(getAllChatbotActivity(window.location.search));
        }
        if (query.userCadreId) {
            const searchParams = new URLSearchParams();
            query.userCadreId.forEach((key) => {
                if (key)
                    searchParams.append("cadre", key);
            });
            dispatch(getCaderBytypesList("?" + searchParams?.toString()));
        }
        if (query.stateIds) {
            const searchParams = new URLSearchParams();
            query.stateIds.forEach((key) => {
                if (key)
                    searchParams.append("stateId", key);
            });
            dispatch(getAllDistrictList("?" + searchParams?.toString()));
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
        if (authUser) {
            const defaultState = authUser?.district?.[0]?.stateId || authUser?.state?.[0]?._id;
            const defaultDistrict = authUser?.district?.[0]?._id;
            if (!query.districtIds && authUser?.roleType === "district_level") {
                setQuery({ ...query, stateIds: defaultState, districtIds: defaultDistrict });
            }
        }
    }, [query.stateIds, query.districtIds, authUser]);
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
    useEffect(() => {
        dispatch(getAllStateList());
        dispatch(getAllCountryList());
        dispatch(getCaderBytypesList(""));
        return () => {
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
            dispatch(clearCaderBytypesList());
            dispatch(cleartAllDistrictList());
            dispatch(clearSubscribersSearch());
        };
    }, []);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum
                        title='Total Conversations'
                        number={chatbotActivityList?.totalItems || 0}
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
                        leftIcon={!reportLoader && <IconDownload />}
                        isLoading={reportLoader}
                        onClick={() => {
                            const searchParams = new URLSearchParams(window.location.search);
                            searchParams.delete("page");
                            searchParams.delete("limit");
                            dispatch(getAllChatbotActivityWithoutPagination(`?${searchParams}`
                                , (res) => {
                                    downloadCSV(res, "subscribers.csv");
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
                        accessor: "sr",
                        title: "Sr. no",
                        render(rec, index: number) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "25");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
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
                                placeholder="Email"
                                id="email"
                                type="text"
                                onChange={(e) => setQuery({ userEmail: e })}
                                value={query.userEmail as string}
                            />;
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
                                    id="country"
                                    value={query?.country}
                                    onChange={(e) => {
                                        setQuery({ page: "1", country: e, stateIds: null, districtIds: null });

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
                                        setQuery({ page: "1", stateIds: e, districtIds: null });
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
                                            setQuery({ page: "1", districtIds: e, });

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
                        accessor: "message",
                        title: "Messages",
                        render(record) {
                            return <Tippy content="View Messages">
                                <button type="button"
                                    onClick={() => showModal(record.message)}>
                                    <IconInfoCircle />
                                </button>
                            </Tippy>;
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
                records={chatbotActivityList?.list}
                idAccessor={({ _id }) => _id}
                page={chatbotActivityList?.currentPage || undefined}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                recordsPerPageOptions={[25, 35, 55, 100]}
                recordsPerPage={parseInt(query?.limit || "25")}
                onRecordsPerPageChange={(e) => {
                    setQuery({ page: "1", limit: e.toString() });
                }}
                onSortStatusChange={(item) => {
                    setQuery({
                        page: "1",
                        sortOrder: item?.direction,
                        sortBy: item?.columnAccessor?.toLocaleString()
                    });
                }}
                sortStatus={{
                    columnAccessor: query?.sortBy || "_id",
                    direction: query?.sortOrder === "desc" ? "desc" : "asc"
                }}
                totalRecords={chatbotActivityList?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <MessageModal
                isModalVisible={isModalVisible}
                onClose={handleCancel}
                selectedMessage={selectedMessage}
            />
        </div>
    );
};

export default Index;
