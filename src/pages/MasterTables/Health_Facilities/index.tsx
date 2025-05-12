import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { MultiSelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import { HealthFacilityEditForm } from "../../../forms/HealthFacilityEditForm";
import { IRootState } from "../../../store";
import { deleteHealthFacility } from "../../../store/actions/masterTable.action";
import { logActivity } from "../../../store/actions/report.action";
import { clearAllBlockList, clearHealthFacilities, clearHealthFacilityById, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllBlockList, getAllCountryList, getAllDistrictList, getAllStateList, getHealthFacilities, getHealthFacilityById } from "../../../store/reducer/masterTable.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "", limit: "", sortBy: "", sortOrder: "", healthFacilityCode: "", cadreTypes: ArrayParam, stateId: ArrayParam, districtId: ArrayParam, blockId: ArrayParam
    });
    const clearFilters = () => {
        setQuery({
            ...query,
            sortBy: null,
            sortOrder: null,
            healthFacilityCode: null,
            cadreTypes: null,
            stateId: null,
            districtId: null,
            blockId: null,
        });
    };
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    const { healthFacilityDetails, loader, healthFacilityById, districtList, blockList, stateList } = useSelector((state: IRootState) => state.master);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getHealthFacilities(window.location.search));
        }
        if (query.stateId) {
            const searchParams = new URLSearchParams();
            query.stateId.forEach((key) => {
                if (key)
                    searchParams.append("stateId", key);
            });
            dispatch(getAllDistrictList("?" + searchParams?.toString()));
        }
        dispatch(setPageTitle("Health Facility List"));
    }, [window.location.search, query]);
    useEffect(() => {
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        dispatch(getAllBlockList("?districtId=" + query?.districtId?.join(",")));
        dispatch(getAllDistrictList("?stateId=" + query?.stateId?.join(",")));
        return () => {
            dispatch(cleartAllCountryList());
            dispatch(cleartAllStateList());
            dispatch(clearHealthFacilities());
        };
    }, []);
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
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Health Facilities'
                        number={healthFacilityDetails?.totalItems || 0} />
                    <PrimaryTextInput
                        type="text"
                        id='Master-seaarch'
                        placeholder="Search Health Facilities..."
                        className="form-input w-auto"
                        value={query?.healthFacilityCode || ""}
                        onChange={(e) => {
                            setQuery({ page: "1", healthFacilityCode: e || undefined });
                        }}
                    />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.health-facility.create"]}>
                        <PrimaryBtn
                            title="Add New"
                            onClick={open}
                            leftIcon={<IconPlus />}
                        />
                    </AuthLayout>
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
                        accessor: "countryId", title: "Country Name", sortable: true, render(record, index) {
                            return record?.countryId?.title;
                        }
                        ,
                    },
                    {
                        accessor: "stateId", title: "State Name", sortable: true,
                        filtering: query?.stateId ? true : false,
                        render(record) {
                            return record?.stateId?.title;
                        },
                        filter(params) {
                            return (
                                <MultiSelectInput

                                    className="min-w-48"
                                    id="stateId"
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
                    },
                    {
                        accessor: "districtId", title: "District Name", sortable: true,
                        filtering: query?.districtId ? true : false,
                        render(record) {
                            return record?.districtId?.title;
                        },
                        filter(params) {
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
                        },
                    },
                    {
                        accessor: "blockId", title: "Block Name", sortable: true,
                        filtering: query?.blockId ? true : false,
                        render(record) {
                            return record?.blockId?.title;
                        },
                        filter(params) {
                            return (
                                query?.districtId ?
                                    <MultiSelectInput
                                        className="min-w-48"
                                        id="blockId"
                                        value={query?.blockId as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", blockId: e });

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
                        accessor: "healthFacilityCode", title: "Health Facility", sortable: true,
                    },
                    {
                        accessor: "createdAt", title: "Created At", sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        },
                    },
                    {
                        accessor: "action",
                        title: "Actions",
                        titleClassName: "!text-right !pr-8",
                        render: (item: any) => (
                            <AuthLayout actions={["admin.health-facility.edit", "admin.health-facility.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.health-facility.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getHealthFacilityById(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.health-facility.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteHealthFacility(
                                                                item?._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getHealthFacilities(window.location.search));
                                                                    } else {
                                                                        ErrorToast(res?.message);
                                                                    }
                                                                }
                                                            ));
                                                        }
                                                    });
                                                }}>
                                                <IconTrashLines />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                </div>
                            </AuthLayout>
                        )
                    }
                ]}
                records={healthFacilityDetails?.list}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.health-facility.edit")) {
                        dispatch(getHealthFacilityById(record?._id));
                        open();
                    }
                }}
                idAccessor={({ _id }) => _id}
                page={healthFacilityDetails?.currentPage || undefined}
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
                totalRecords={healthFacilityDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    close();
                    dispatch(clearHealthFacilityById());
                    dispatch(cleartAllDistrictList());
                    dispatch(clearAllBlockList());
                    dispatch(getHealthFacilities(window.location.search));
                }}
                title={
                    <span className="text-xl font-bold">{healthFacilityById?._id ? "Edit Health Facility" : "Add Health Facility"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <HealthFacilityEditForm
                    close={() => {
                        dispatch(clearHealthFacilityById());
                        dispatch(cleartAllDistrictList());
                        dispatch(clearAllBlockList());
                        dispatch(getHealthFacilities(window.location.search));
                        close();
                    }} />
            </DrawerModal>
        </div>
    );
};

export default Index;
