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
import { AppConfigEditForm } from "../../../forms/AppConfigEditForm";
import { IRootState } from "../../../store";
import { deleteConfigByID } from "../../../store/actions/config.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanAllConfig, cleanConfigByID, getAllConfig, getConfigByID } from "../../../store/reducer/config.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortBy: "", sortOrder: "", key: "", moduleName: "", search: "",
    });
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const { configDetails, loader, configById } = useSelector((state: IRootState) => state.config);
    useEffect(() => {
        if (!window.location.search) {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllConfig(window.location.search));
        }
        dispatch(setPageTitle("App Config List"));
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(cleanAllConfig());
        };
    }, []);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <span
                        className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                        {configDetails?.totalItems || 0}
                    </span>
                    <h5 className="font-semibold text-lg">App Config</h5>
                    <PrimaryTextInput
                        id={"search"}
                        type="text"
                        placeholder="Search App Config..."
                        className="form-input w-auto"
                        value={query.search || ""}
                        onChange={(e) => {
                            setQuery({ search: e });
                        }}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.app-config.create"]}>
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
                        accessor: "key", title: "Key", sortable: true,
                        filtering: query?.key ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="key"
                                    placeholder="Key..."
                                    value={query?.key || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", key: e || undefined });
                                    }}
                                />
                            );
                        },
                    }, {
                        accessor: "value.en", title: "Value", sortable: true,
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
                            <AuthLayout actions={["admin.app-config.edit", "admin.app-config.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.app-config.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getConfigByID(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.app-config.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteConfigByID(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllConfig(window.location.search));

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
                records={configDetails?.list}
                page={configDetails?.currentPage || undefined}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.app-config.edit")) {
                        dispatch(getConfigByID(record?._id));
                        open();
                    }
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
                totalRecords={configDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    dispatch(getAllConfig(window.location.search));
                    dispatch(cleanConfigByID());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{configById?._id ? "Edit App Config" : "Add App Config"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <AppConfigEditForm close={() => {
                    dispatch(getAllConfig(window.location.search));
                    dispatch(cleanConfigByID());
                    close();
                }} />
            </DrawerModal>
        </div>
    );
};

export default Index;
