import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import { PermissionEditForm } from "../../../forms/PermissionEditForm";
import { IRootState } from "../../../store";
import { deletePermissionByID } from "../../../store/actions/auth.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanPermissionByID, cleanPermissions, getPermissionByID, getPermissions } from "../../../store/reducer/auth.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortBy: "", sortOrder: "", name: "", moduleName: ""
    });
    const clearFilters = () => {
        setQuery({
            page: query.page,
            limit: query.limit,
            sortBy: null,
            sortOrder: null,
            name: null,
            moduleName: null
        });
    };
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const { permissionsDetails, loader, permissionByID } = useSelector((state: IRootState) => state.auth);
    useEffect(() => {
        if (!window.location.search) {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getPermissions(window.location.search));
        }
        dispatch(setPageTitle("Permission List"));
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(cleanPermissions());
        };
    }, []);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <span
                        className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                        {permissionsDetails?.totalItems || 0}
                    </span>
                    <h5 className="font-semibold text-lg">Permissions</h5>
                    <PrimaryTextInput
                        id="name"
                        placeholder="Search Permissions..."
                        value={query?.name || ""}
                        onChange={(e) => {
                            setQuery({ page: "1", name: e || undefined });
                        }}
                    />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.permission.create"]}>
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
                        accessor: "name", title: "Name", sortable: true,
                        filtering: query?.name ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="name"
                                    placeholder="Search Name..."
                                    value={query?.name || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", name: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        accessor: "moduleName", title: "Module Name", sortable: true,
                        filtering: query?.moduleName ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="moduleName"
                                    placeholder="Search Module Name..."
                                    value={query?.moduleName || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", moduleName: e || undefined });
                                    }}
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
                            <AuthLayout actions={["admin.permission.edit", "admin.permission.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.permission.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getPermissionByID(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.permission.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deletePermissionByID(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getPermissions(window.location.search));
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
                records={permissionsDetails?.list}
                page={permissionsDetails?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.permission.edit")) {
                        dispatch(getPermissionByID(record?._id));
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
                totalRecords={permissionsDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    dispatch(getPermissions(window.location.search));
                    dispatch(cleanPermissionByID());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{permissionByID?._id ? "Edit Permission" : "Add Permission"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <PermissionEditForm close={() => {
                    dispatch(getPermissions(window.location.search));
                    dispatch(cleanPermissionByID());
                    close();
                }} />
            </DrawerModal>
        </div>
    );
};

export default Index;
