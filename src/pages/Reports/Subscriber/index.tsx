import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import rasterizeHTML from "rasterizehtml";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconArrowForward from "../../../components/Icon/IconArrowForward";
import IconBarChart from "../../../components/Icon/IconBarChart";
import IconDownload from "../../../components/Icon/IconDownload";
import IconInfoCircle from "../../../components/Icon/IconInfoCircle";
import IconPencil from "../../../components/Icon/IconPencil";
import { DateRangeFilter } from "../../../components/Inputs/DateRangeFilter";
import { MultiSelectInput, SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import { SubscriberEditForm } from "../../../forms/SubscriberEditForm";
import { IRootState } from "../../../store";
import { getAllSubscribersWithoutPagination, getSubscriberLeaderboardInfo, logActivity } from "../../../store/actions/report.action";
import { sendOtp } from "../../../store/actions/subscriber.action";
import { clearAllBlockList, clearAllCaderTypes, clearAllHealthFacilityList, clearCaderBytypesList, cleartAllCaderTypeList, cleartAllDistrictList, cleartAllStateList, getAllBlockList, getAllCaderTypes, getAllDistrictList, getAllHealthFacilityList, getAllPrimaryCaderList, getAllStateList, getCaderBytypesList } from "../../../store/reducer/masterTable.reducer";
import { clearSubscriberById, getSubscriberById } from "../../../store/reducer/report.reducer";
import { cleanAllSubscriber, getAllSubscriber } from "../../../store/reducer/subscriber.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { downloadCSV, hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, SuccessToast, WarningToast } from "../../../utils/toasts";
const downloadImage = async () => {
    const element = document.getElementById("modal-content");
    if (!element) return;

    // Show element temporarily
    const originalVisibility = element.style.visibility;
    element.style.visibility = "visible";

    try {
        const htmlContent = `
            <html>
                <head>
                    ${document.head.innerHTML}
                </head>
                <body>
                    ${element.outerHTML}
                </body>
            </html>
        `;

        const canvas = document.createElement("canvas");
        const rect = element.getBoundingClientRect();
        const scale = window.devicePixelRatio || 1;

        canvas.width = rect.width * scale;
        canvas.height = rect.height * scale;

        await rasterizeHTML.drawHTML(htmlContent, canvas);
        const imageUrl = canvas.toDataURL("image/png");

        // Download logic
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "user-info-image.png";
        link.click();
    } catch (error) {
        console.error("Error:", error);
    } finally {
        element.style.visibility = originalVisibility;
    }
};
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "25", fromDate: "", toDate: "", sortBy: "", sortOrder: "", name: "", phoneNo: "", email: "", stateId: ArrayParam,
        districtId: ArrayParam, blockId: ArrayParam, healthFacilityId: ArrayParam, cadreId: ArrayParam,
        cadreTypes: ArrayParam, primaryCadres: ArrayParam, status: ""
    });

    const clearFilters = () => {
        setQuery({
            page: "1",
            limit: "25",
            fromDate: null,
            toDate: null,
            sortBy: null,
            sortOrder: null,
            name: null,
            phoneNo: null,
            email: null,
            stateId: null,
            districtId: null, blockId: null, healthFacilityId: null, cadreId: null,
            cadreTypes: null, primaryCadres: null, status: null
        });
    };
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const { SubscriberDetails, loader } = useSelector((state: IRootState) => state.subscriber);
    const { reportLoader } = useSelector((state: IRootState) => state.report);
    const { stateList, caderList, allCaderTypes, districtList, blockList, healthFacilityList, primaryCaderList } = useSelector((state: IRootState) => state.master);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "25" });
        } else {
            dispatch(getAllSubscriber(window.location.search));
        }
        if (query.cadreTypes) {
            const searchParams = new URLSearchParams();
            query.cadreTypes.forEach((key) => {
                if (key)
                    searchParams.append("cadreTypes", key);
            });
            dispatch(getCaderBytypesList("?" + searchParams?.toString()));
        }
        if (query.stateId) {
            const searchParams = new URLSearchParams();
            query.stateId.forEach((key) => {
                if (key)
                    searchParams.append("stateId", key);
            });
            dispatch(getAllDistrictList("?" + searchParams?.toString()));
        }
        if (query.districtId) {
            const searchParams = new URLSearchParams();
            query.districtId.forEach((key) => {
                if (key)
                    searchParams.append("districtId", key);
            });
            dispatch(getAllBlockList("?" + searchParams?.toString()));
        }
        if (query.blockId) {
            const searchParams = new URLSearchParams();
            query.blockId.forEach((key) => {
                if (key)
                    searchParams.append("blockId", key);
            });
            dispatch(getAllHealthFacilityList("?" + searchParams?.toString()));
        }
        dispatch(setPageTitle("Subscriber List"));
    }, [window.location.search, query]);
    useEffect(() => {
        if (!query?.cadreTypes) {
            dispatch(getCaderBytypesList(""));
        }
    }, [query?.cadreTypes]);
    useEffect(() => {
        dispatch(getAllStateList());
        dispatch(getAllPrimaryCaderList());
        dispatch(getAllCaderTypes());
        dispatch(getCaderBytypesList(""));
        return () => {
            dispatch(clearAllCaderTypes());
            dispatch(cleartAllStateList());
            dispatch(cleanAllSubscriber());
            dispatch(clearCaderBytypesList());
            dispatch(clearAllBlockList());
            dispatch(cleartAllCaderTypeList());
            dispatch(cleartAllDistrictList());
            dispatch(clearAllHealthFacilityList());
        };
    }, []);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [userData, setUserData] = useState<any>();
    const openInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const closeInfoModal = () => {
        setIsInfoModalOpen(false);
    };
    const { authUser } = useSelector((state: IRootState) => state.auth);
    useEffect(() => {
        if (authUser) {
            const defaultState = authUser?.district?.[0]?.stateId || authUser?.state?.[0]?._id;
            const defaultDistrict = authUser?.district?.[0]?._id;
            if (!query.districtId && authUser?.roleType === "district_level") {
                setQuery({ ...query, stateId: defaultState, districtId: defaultDistrict });
            }
        }
    }, [query.stateId, query.districtId, authUser]);
    const [textValue, setTextValues] = useState<any>({
        email: query?.email,
        phoneNo: query?.phoneNo,
        name: query?.name
    });
    return (
        <div className="panel mt-6 relative">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Subscribers'
                        number={SubscriberDetails?.totalItems || 0} />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters} />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <DateRangeFilter query={query as any}
                        setQuery={setQuery} />
                    <PrimaryBtn
                        title="CSV"
                        leftIcon={!reportLoader && <IconDownload />}
                        isLoading={reportLoader}
                        onClick={() => {
                            const searchParams = new URLSearchParams(window.location.search);
                            searchParams.delete("page");
                            searchParams.delete("limit");
                            dispatch(getAllSubscribersWithoutPagination(`?${searchParams}`
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
                        accessor: "sr", title: "Sr. no", render(rec, index: number) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "25");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    },
                    {
                        accessor: "name", title: "Name", sortable: true,
                        filtering: query?.name ? true : false,
                        render(record) {
                            return record?.name;
                        },
                        filter() {
                            return (
                                <PrimaryTextInput
                                    iconRight={<IconArrowForward className="cursor-pointer" />}
                                    rightIconClick={() => setQuery({ page: "1", name: textValue?.name })}
                                    placeholder="Name..."
                                    id="name"
                                    type="text"
                                    onChange={(e) => setTextValues({ name: e })}
                                    value={textValue.name as string}
                                    onBlur={() => setQuery({ page: "1", name: textValue?.name })}
                                    onEnterPress={() => setQuery({ page: "1", name: textValue?.name })}
                                />
                            );
                        },
                    },
                    {
                        accessor: "status",
                        title: "Status",
                        sortable: true,
                        render(record) {
                            const status = record?.status || "Unverified";
                            let statusColor = "";
                            switch (status) {
                                case "Verified":
                                    statusColor = "bg-green-100 text-green-700 border-green-400";
                                    break;
                                case "OnBoarded":
                                    statusColor = "bg-blue-100 text-blue-700 border-blue-400";
                                    break;
                                case "Unverified":
                                default:
                                    statusColor = "bg-red-100 text-red-700 border-red-400";
                                    break;
                            }
                            return (
                                <span className={`px-3 py-1 rounded-full border ${statusColor} text-sm font-semibold`}>
                                    {status}
                                </span>
                            );
                        },
                        filtering: query?.status ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    className="min-w-48"
                                    id="status"
                                    value={query?.status}
                                    onChange={(e) => {
                                        setQuery({ page: "1", status: e });
                                    }}
                                    options={[
                                        { label: "Verified", value: "Verified" },
                                        { label: "Unverified", value: "Unverified" },
                                    ]}
                                />
                            );
                        },
                    },
                    {
                        accessor: "phoneNo", title: "Phone No", sortable: true,
                        filtering: query?.phoneNo ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    iconRight={<IconArrowForward className="cursor-pointer" />}
                                    rightIconClick={() => setQuery({ page: "1", phoneNo: textValue?.phoneNo })}
                                    placeholder="Phone No..."
                                    id="phoneNo"
                                    type="text"
                                    onChange={(e) => setTextValues({ phoneNo: e })}
                                    value={textValue.phoneNo as string}
                                    onBlur={() => setQuery({ page: "1", phoneNo: textValue?.phoneNo })}
                                    onEnterPress={() => setQuery({ page: "1", phoneNo: textValue?.phoneNo })}
                                />
                            );
                        },
                    },
                    {
                        accessor: "email",
                        title: "Email",
                        sortable: true,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    iconRight={<IconArrowForward className="cursor-pointer" />}
                                    rightIconClick={() => setQuery({ page: "1", email: textValue?.email })}
                                    placeholder="Email..."
                                    id="email"
                                    type="text"
                                    onChange={(e) => setTextValues({ email: e })}
                                    value={textValue.email as string}
                                    onBlur={() => setQuery({ page: "1", email: textValue?.email })}
                                    onEnterPress={() => setQuery({ page: "1", email: textValue?.email })}
                                />
                            );
                        },
                    },
                    {
                        accessor: "cadreType", title: "Cadre type", sortable: true,
                        render(record: any) {
                            return record?.cadreType?.replace("_", " ");
                        },
                        filtering: query?.cadreTypes ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="cadreTypes"
                                    value={query?.cadreTypes as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", cadreTypes: e, cadreId: undefined });
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
                        accessor: "cadreGroup", title: "Primary Cadre",
                        // sortable: true,
                        filtering: query?.primaryCadres ? true : false,
                        render(record) {
                            return record?.cadreGroup;
                        },
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="cadreGroup"
                                    value={query?.primaryCadres as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", primaryCadres: e, cadreId: undefined, cadreTypes: undefined });

                                    }}
                                    options={primaryCaderList?.map((e) => ({
                                        label: e?.title,
                                        value: e?._id
                                    }))}
                                />
                            );
                        },
                    },
                    {
                        accessor: "cadreId", title: "Cadre", sortable: true,
                        filtering: query?.cadreId ? true : false,
                        render(record) {
                            return record?.cadre;
                        },
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
                    },
                    {
                        accessor: "countryId", title: "Country", sortable: true,
                        render(record) {
                            return record?.country;
                        },
                    },
                    {
                        accessor: "stateId", title: "State", sortable: true,
                        filtering: query?.stateId ? true : false,
                        render(record) {
                            return record?.state;
                        },
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="stateId"
                                    value={query?.stateId as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", stateId: e, districtId: undefined, blockId: undefined, healthFacilityId: undefined });
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
                        accessor: "districtId", title: "District", sortable: true,
                        filtering: query?.districtId ? true : false,
                        render(record) {
                            return record?.district;
                        },
                        filter(params: { close: () => void; }) {
                            return (
                                query?.stateId ?
                                    <MultiSelectInput
                                        className="min-w-48"
                                        id="districtId"
                                        value={query?.districtId as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", districtId: e, blockId: undefined, healthFacilityId: undefined });
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
                        accessor: "blockId", title: "Block", sortable: true,
                        filtering: query?.blockId ? true : false,
                        render(record) {
                            return record?.block;
                        },
                        filter(params: { close: () => void; }) {
                            return (
                                query?.districtId ?
                                    <MultiSelectInput
                                        className="min-w-48"
                                        id="blockId"
                                        value={query?.blockId as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", blockId: e, healthFacilityId: undefined });
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
                        accessor: "healthFacilityId", title: "Health facility", sortable: true,
                        render(record) {
                            return record?.healthFacility;
                        },
                        filtering: query?.healthFacilityId ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                query?.blockId ?
                                    <MultiSelectInput
                                        className="min-w-48"
                                        id="healthFacilityId"
                                        value={query?.healthFacilityId as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", healthFacilityId: e });

                                        }}
                                        options={healthFacilityList?.map((e) => ({
                                            label: e.healthFacilityCode,
                                            value: e._id
                                        }))}
                                    /> : <div>Select Block</div>
                            );
                        },
                    }, {
                        accessor: "createdAt",
                        title: "Created At",
                        sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    },
                    {
                        accessor: "action",
                        title: "Actions",
                        titleClassName: "!text-right !pr-8",
                        render: (item: any) => (
                            <AuthLayout actions={["admin.master-institute.edit", "admin.master-institute.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.master-institute.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getSubscriberById(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.master-institute.edit"]}>
                                        <Tippy content="Leaderboard">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch(getSubscriberLeaderboardInfo(item?._id,
                                                        (res) => {
                                                            if (res?.status) {
                                                                setUserData(res?.data);
                                                                openInfoModal();
                                                            } else {
                                                                ErrorToast(res?.message);
                                                            }
                                                        }
                                                    ));
                                                }}>
                                                <IconBarChart />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.master-institute.delete"]}>
                                        <Tippy content="Forgot OTP">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure?", "Do you want to resend the OTP?", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(sendOtp(
                                                                item?._id,
                                                                (res) => {
                                                                    if (res?.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "update",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        SuccessToast(res?.message);
                                                                    } else {
                                                                        ErrorToast(res?.message);
                                                                    }
                                                                }));
                                                        }
                                                    });
                                                }}>
                                                <IconInfoCircle />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                </div>
                            </AuthLayout>
                        )
                    }
                ]}
                records={SubscriberDetails?.list}
                idAccessor={({ _id }) => _id}
                page={SubscriberDetails?.currentPage || undefined}
                onRowClick={({ event, record }: any) => {
                    if (hasSinglePermission("admin.master-institute.edit")) {
                        dispatch(getSubscriberById(record?._id));
                        open();
                    }
                }}
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
                totalRecords={SubscriberDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <Modal opened={isInfoModalOpen}
                onClose={() => closeInfoModal()}>
                <div
                    className="p-6 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">User Information</h3>
                    <div id="modal-content"
                        className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h4>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium text-gray-700">Name: </span>
                                    <span className="text-gray-900">{userData?.userId.name}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Phone: </span>
                                    <span className="text-gray-900">{userData?.userId.phoneNo}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Email: </span>
                                    <span className="text-gray-900">{userData?.userId.email}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Level: </span>
                                    <span className="text-gray-900">{userData?.levelId.level}</span>
                                </p>
                                {userData?.badgeId && (
                                    <p>
                                        <span className="font-medium text-gray-700">Badge: </span>
                                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                            {userData?.badgeId.badge}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Usage Statistics</h4>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium text-gray-700">App Usage: </span>
                                    <span className="text-gray-900">{userData?.appOpenedCount} times</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Time Spent: </span>
                                    <span className="text-gray-900">{userData?.minSpent} minutes</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Correctness: </span>
                                    <span className="text-green-600">{userData?.correctnessOfAnswers}%</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Sub-Module Usage: </span>
                                    <span className="text-gray-900">{userData?.subModuleUsageCount}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Chatbot Usage: </span>
                                    <span className="text-gray-900">{userData?.chatbotUsageCount}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">KBase Completion: </span>
                                    <span className="text-blue-600">{userData?.kbaseCompletion}%</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Tasks Completed: </span>
                                    <span className="text-gray-900">{userData?.taskCompleted}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Total Assessments: </span>
                                    <span className="text-gray-900">{userData?.totalAssessments}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Performance: </span>
                                    <span className="text-green-600">{userData?.performance}%</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <button
                            onClick={() => closeInfoModal()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Close
                        </button>
                        <button
                            onClick={downloadImage}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Download
                        </button>
                    </div>
                </div>
            </Modal>
            <DrawerModal
                opened={opened}
                onClose={() => {
                    close();
                    dispatch(getAllSubscriber(window.location.search));
                    dispatch(clearSubscriberById());
                }}
                title={
                    <span className="text-xl font-bold">Edit Subscriber</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <SubscriberEditForm
                    close={() => {
                        dispatch(getAllSubscriber(window.location.search));
                        close();
                    }} />
            </DrawerModal>
        </div>
    );
};

export default Index;
