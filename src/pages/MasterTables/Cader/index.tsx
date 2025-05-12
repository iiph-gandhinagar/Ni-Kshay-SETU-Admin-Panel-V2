import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { MultiSelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import { CaderEditForm } from "../../../forms/CaderEditForm";
import { IRootState } from "../../../store";
import { deleteCadere } from "../../../store/actions/masterTable.action";
import { logActivity } from "../../../store/actions/report.action";
import { clearAllCaderTypes, clearAllPrimaryCaderList, clearCader, clearCaderBytypesList, clearCaderDetails, cleartAllCaderTypeList, getAllCaderTypeList, getAllCaderTypes, getAllPrimaryCaderList, getCaderById, getCaderBytypesList, getcader } from "../../../store/reducer/masterTable.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortBy: "", sortOrder: "", title: "", cadreTypes: ArrayParam, cadreGroup: ArrayParam, search: "",
    });
    const clearFilters = () => {
        setQuery({
            page: query.page,  // Keep the current page
            limit: query.limit, // Keep the current limit
            sortBy: null,
            sortOrder: null,
            title: null,
            cadreTypes: null,
            cadreGroup: null,
            search: null,
        });
    };
    const dispatch = useDispatch();
    const { caderDetails, loader, caderById, allCaderTypes, primaryCaderList } = useSelector((state: IRootState) => state.master);
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getcader(window.location.search));
        }
        if (query.cadreTypes) {
            const searchParams = new URLSearchParams();
            query.cadreTypes.forEach((key) => {
                if (key)
                    searchParams.append("cadreTypes", key);
            });
            dispatch(getCaderBytypesList("?" + searchParams?.toString()));
        }
        dispatch(setPageTitle("Cadre List"));
    }, [window.location.search, query]);
    useEffect(() => {
        dispatch(getAllCaderTypeList());
        dispatch(getAllCaderTypes());
        dispatch(getAllPrimaryCaderList());
        return () => {
            dispatch(cleartAllCaderTypeList());
            dispatch(clearAllCaderTypes());
            dispatch(clearCaderBytypesList());
            dispatch(clearAllPrimaryCaderList());
            dispatch(clearCader());
        };
    }, []);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <span
                        className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                        {caderDetails?.totalItems || 0}
                    </span>
                    <h5 className="font-semibold text-lg">Cadre</h5>
                    <PrimaryTextInput
                        id={"search"}
                        type="text"
                        placeholder="Search Cadre..."
                        className="form-input w-auto"
                        value={query.search || ""}
                        onChange={(e) => {
                            setQuery({ search: e });
                        }}
                    />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.cadre.create"]}>
                        <PrimaryBtn
                            title="Add New"
                            onClick={open}
                            leftIcon={<IconPlus />}
                        />
                    </AuthLayout>
                </div>
            </div>
            <div className="datatables">
                <TableComponent
                    isloading={loader}
                    columns={[{ accessor: "_id", hidden: true },
                    {
                        accessor: "sr", title: "Sr. no", render(rec, index) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "15");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    },
                    {
                        accessor: "title", title: "Cadre", sortable: true,
                    },
                    {
                        accessor: "cadreType", title: "Cadre Type", sortable: true,
                        render(record, index) {
                            return record?.cadreType?.replace("_", " ");
                        },
                        filtering: query?.cadreTypes ? true : false,
                        filter(params) {
                            return (
                                <MultiSelectInput

                                    className="min-w-48"
                                    id="cadreTypes"
                                    value={query?.cadreTypes as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", cadreTypes: e });

                                    }}
                                    options={allCaderTypes?.map((e: any) => ({
                                        label: e,
                                        value: e
                                    }))}
                                />
                            );
                        },
                    },
                    {
                        accessor: "cadreGroup", title: "Primary Cadre", sortable: true,
                        filtering: query?.cadreGroup ? true : false,
                        render: (record: any) => {
                            return record?.cadreGroup?.title;
                        },
                        filter(params) {
                            return (
                                <MultiSelectInput

                                    className="min-w-48"
                                    id="cadreGroup"
                                    value={query?.cadreGroup as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", cadreGroup: e });

                                    }}
                                    options={primaryCaderList?.map((e: any) => ({
                                        label: e?.title,
                                        value: e?._id
                                    }))}
                                />
                            );
                        },
                    }, {
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
                            <AuthLayout actions={["admin.cadre.edit", "admin.cadre.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.cadre.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getCaderById(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.cadre.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteCadere(
                                                                item?._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getcader(window.location.search));
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
                    records={caderDetails?.list}
                    onRowClick={({ record }) => {
                        if (hasSinglePermission("admin.cadre.edit")) {
                            dispatch(getCaderById(record?._id));
                            open();
                        }
                    }}
                    idAccessor={({ _id }) => _id}
                    page={caderDetails?.currentPage || undefined}
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
                    totalRecords={caderDetails?.totalItems || 0}
                    className="whitespace-nowrap table-hover"
                    highlightOnHover
                />
            </div>
            <DrawerModal
                opened={opened}
                onClose={() => {
                    close();
                    dispatch(clearCaderDetails());
                    dispatch(getcader(window.location.search));
                }}
                title={
                    <span className="text-xl font-bold">{caderById?._id ? "Edit Cadre" : "Add Cadre"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <CaderEditForm
                    close={() => {
                        dispatch(clearCaderDetails());
                        dispatch(getcader(window.location.search));
                        close();
                    }} />
            </DrawerModal>
            {/* </div> */}
        </div>
    );
};

export default Index;
