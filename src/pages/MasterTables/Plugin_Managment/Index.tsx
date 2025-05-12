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
import { PluginManagementEditForm } from "../../../forms/PluginManagementEditForm";
import { IRootState } from "../../../store";
import { deletePluginManagement } from "../../../store/actions/masterTable.action";
import { logActivity } from "../../../store/actions/report.action";
import { clearCaderBytypesList, clearPluginManagementById, clearPluginManagementList, getAllPluginManagementList, getCaderBytypesList, getPluginManagementById } from "../../../store/reducer/masterTable.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortBy: "", sortOrder: "", title: "", cadreId: ArrayParam
    });
    const clearFilters = () => {
        setQuery({
            ...query,
            sortBy: null,
            sortOrder: null,
            title: null,
            cadreId: null
        });
    };
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const { pluginManagementList, loader, pluginManagementById, caderList } = useSelector((state: IRootState) => state.master);
    useEffect(() => {
        dispatch(getCaderBytypesList(""));
        if (!window.location.search) {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllPluginManagementList(window.location.search));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(clearPluginManagementList());
            dispatch(clearCaderBytypesList());
        };
    }, []);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <span
                        className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                        {pluginManagementList?.totalItems || 0}
                    </span>
                    <h5 className="font-semibold text-lg">Plugin Management</h5>
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.plugin-management.create"]}>
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
                        accessor: "sr", title: "Sr. no", render(rec: any, index: number) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "15");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    },
                    {
                        accessor: "title", title: "Title", sortable: true,
                        filtering: query?.title ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="title"
                                    placeholder="Title"
                                    value={query?.title || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", title: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        accessor: "cadreId",
                        width: "150",
                        title: "Cadre",
                        render(record: any) {
                            return record?.isAllCadre ? <span> All Cadre Selected </span> : (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: record?.cadreId
                                            ?.map((cadre: any) => `${cadre.title}`)
                                            .join(",<br />"),
                                    }}
                                />
                            );
                        },
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
                        accessor: "Cadre Type",
                        title: "Cadre Type",
                        render(record: any) {
                            return record?.cadreType?.replace("_", " ");
                        }
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
                            <AuthLayout actions={["admin"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.plugin-management.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getPluginManagementById(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.plugin-management.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deletePluginManagement(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllPluginManagementList(window.location.search));
                                                                    } else {
                                                                        ErrorToast(res?.message);
                                                                    }
                                                                }
                                                            ));
                                                        }
                                                    });
                                                }}
                                            >
                                                <IconTrashLines />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                </div>
                            </AuthLayout>
                        )
                    }
                ]}
                idAccessor={({ _id }) => _id}
                records={pluginManagementList?.list}
                page={pluginManagementList?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.app-config.create")) {
                        dispatch(getPluginManagementById(record?._id));
                        open();
                    }
                }}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                recordsPerPageOptions={[15, 25, 35, 55, 100]}
                recordsPerPage={parseInt(query?.limit || "15")}
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
                totalRecords={pluginManagementList?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    dispatch(getAllPluginManagementList(window.location.search));
                    dispatch(clearPluginManagementById());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{pluginManagementById?._id ? "Edit Plugin Management" : "Add Plugin Management"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <PluginManagementEditForm close={() => {
                    dispatch(getAllPluginManagementList(window.location.search));
                    dispatch(clearPluginManagementById());
                    close();
                }} />
            </DrawerModal>
        </div>
    );
};

export default Index;
