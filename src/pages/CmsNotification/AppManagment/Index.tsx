import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import { AppManagmentEditForm } from "../../../forms/AppManagmentEditForm";
import { IRootState } from "../../../store";
import { deleteAppManagmentByID } from "../../../store/actions/config.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanAllAppManagmentFlags, cleanAppFlagByID, getAllAppManagmentFlags, getAppFlagByID } from "../../../store/reducer/config.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortOrder: "", sortBy: "", value: "", variable: ""
    });
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllAppManagmentFlags(window.location.search));
        }
    }, [window.location.search, query]);

    useEffect(() => {
        return () => {
            dispatch(cleanAppFlagByID());
            dispatch(cleanAllAppManagmentFlags());
        };
    }, []);


    const { appFlagsDetails, loader, getAppFlagById } = useSelector((v: IRootState) => v.config);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='App Management'
                        number={appFlagsDetails?.totalItems} />
                    <PrimaryTextInput
                        id={"search"}
                        type="text"
                        placeholder="Search..."
                        className="form-input w-auto"
                        value={query.search || ""}
                        onChange={(e) => {
                            setQuery({ search: e });
                        }}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.app-management-flag.create"]}>
                        <PrimaryBtn
                            title="Add New"
                            leftIcon={<IconPlus />}
                            onClick={() => {
                                open();
                            }}
                        />
                    </AuthLayout>
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
                            const itemsPerPage = parseInt(query.limit || "15");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    }, {
                        accessor: "variable",
                        title: "Varialble",
                        sortable: true,
                        filtering: query?.variable ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="variable"
                                    placeholder="Variable..."
                                    value={query?.variable || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", variable: e || undefined });
                                    }}
                                />
                            );
                        },
                    }, {
                        accessor: "value",
                        title: "Value",
                        sortable: true,
                        render(record: any) {
                            return record?.value?.en;
                        },
                        filtering: query?.value ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="description"
                                    placeholder="Description..."
                                    value={query?.value || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", value: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        accessor: "type",
                        title: "type",
                        sortable: true,
                    }, {
                        accessor: "createdAt", title: "Created At", sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        },
                    }, {
                        accessor: "action",
                        title: "Actions",
                        titleClassName: "!text-right !pr-8",
                        render: (item: any) => (
                            <AuthLayout actions={["admin.app-management-flag.edit", "admin.app-management-flag.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.app-management-flag.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getAppFlagByID(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.app-management-flag.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteAppManagmentByID(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllAppManagmentFlags(window.location.search));

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
                isloading={loader}
                totalRecords={appFlagsDetails?.totalItems}
                records={appFlagsDetails?.list}
                idAccessor={({ _id }) => _id}
                page={appFlagsDetails?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.app-management-flag.edit")) {
                        dispatch(getAppFlagByID(record?._id));
                        open();
                    }
                }}
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
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    close();
                    dispatch(cleanAppFlagByID());
                }}
                title={
                    <span className="text-xl font-bold">{getAppFlagById?._id ? "Edit Flag" : "Add Flag"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
            >

                <AppManagmentEditForm
                    close={
                        () => {
                            dispatch(getAllAppManagmentFlags(window.location.search));
                            dispatch(cleanAppFlagByID());
                            close();
                        }}
                />

            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
