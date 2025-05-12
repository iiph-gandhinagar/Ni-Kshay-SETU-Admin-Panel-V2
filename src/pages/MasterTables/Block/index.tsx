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
import { BlockEditForm } from "../../../forms/BlockEditForm";
import { IRootState } from "../../../store";
import { deleteBlock } from "../../../store/actions/masterTable.action";
import { logActivity } from "../../../store/actions/report.action";
import { clearBlock, clearBlockById, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllCountryList, getAllDistrictList, getAllStateList, getBlock, getBlockById } from "../../../store/reducer/masterTable.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "", limit: "", sortBy: "", sortOrder: "", title: "", cadreTypes: ArrayParam, stateId: ArrayParam, districtId: ArrayParam,
    });
    const clearFilters = () => {
        setQuery({
            ...query,
            sortBy: null,
            sortOrder: null,
            title: null,
            cadreTypes: null,
            stateId: null,
            districtId: null
        });
    };
    const dispatch = useDispatch();
    const { blockDetails, loader, blockById, stateList, districtList } = useSelector((state: IRootState) => state.master);
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getBlock(window.location.search));
            dispatch(cleartAllDistrictList());
        }
        if (query.stateId) {
            const searchParams = new URLSearchParams();
            query.stateId.forEach((key) => {
                if (key)
                    searchParams.append("stateId", key);
            });
            dispatch(getAllDistrictList("?" + searchParams?.toString()));
        }
        dispatch(setPageTitle("Block List"));
    }, [window.location.search, query]);
    useEffect(() => {
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        return () => {
            dispatch(cleartAllCountryList());
            dispatch(cleartAllStateList());
            dispatch(clearBlock());
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
                    <CircleWithNum title='Block'
                        number={blockDetails?.totalItems || 0} />
                    <PrimaryTextInput
                        type="text"
                        id='Master-seaarch'
                        placeholder="Search Block..."
                        className="form-input w-auto"
                        value={query?.title || ""}
                        onChange={(e) => {
                            setQuery({ page: "1", title: e || undefined });
                        }}
                    />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.block.create"]}>
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
                    { accessor: "countryId.title", title: "Country Name", sortable: true },
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
                                        setQuery({ page: "1", stateId: e, districtId: undefined });

                                    }}
                                    options={stateList?.map((e: any) => ({
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
                                        id="district"
                                        value={query?.districtId as Array<string>}
                                        onChange={(e) => {
                                            setQuery({ page: "1", districtId: e });

                                        }}
                                        options={districtList?.map((e: any) => ({
                                            label: e.title,
                                            value: e._id
                                        }))}
                                    /> : <div>Select State</div>
                            );
                        },
                    },
                    {
                        accessor: "title", title: "Block Name", sortable: true,
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
                            <div className="flex items-center justify-end gap-6 mr-3 ">
                                <AuthLayout actions={["admin.block.edit"]}>
                                    <Tippy content="Edit">
                                        <button type="button"
                                            onClick={() => {
                                                dispatch(getBlockById(item?._id));
                                                open();
                                            }}>
                                            <IconPencil />
                                        </button>
                                    </Tippy>
                                </AuthLayout>
                                <AuthLayout actions={["admin.block.delete"]}>
                                    <Tippy content="Delete">
                                        <button type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                    if (isConfirmed) {
                                                        dispatch(deleteBlock(
                                                            item?._id,
                                                            (res) => {
                                                                if (res.status) {
                                                                    dispatch(logActivity({
                                                                        "action": "delete",
                                                                        "moduleName": window.location.pathname,
                                                                        "payload": item
                                                                    }));
                                                                    dispatch(getBlock(window.location.search));
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
                        )
                    }
                ]}
                records={blockDetails?.list}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.block.edit")) {
                        dispatch(getBlockById(record?._id));
                        open();
                    }
                }}
                idAccessor={({ _id }) => _id}
                page={blockDetails?.currentPage || undefined}
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
                totalRecords={blockDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    close();
                    dispatch(getBlock(window.location.search));
                    dispatch(clearBlockById());
                }}
                title={
                    <span className="text-xl font-bold">{blockById?._id ? "Edit Block" : "Add Block"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <BlockEditForm
                    close={() => {
                        dispatch(getBlock(window.location.search));
                        dispatch(clearBlockById());
                        close();
                    }} />
            </DrawerModal>
        </div>
    );
};

export default Index;
