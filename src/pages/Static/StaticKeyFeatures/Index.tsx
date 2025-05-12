import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CustomSwitch from "../../../components/CheckBox/Switch";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import StaticKeyFeatureEditForm from "../../../forms/StaticKeyFeatureEditForm";
import { IRootState } from "../../../store";
import { logActivity } from "../../../store/actions/report.action";
import { deleteStaticKeyFeatureById, updateStaticKeyFeatureById } from "../../../store/actions/static.action";
import { cleanStaticKeyFeatureById, cleanStaticKeyFeatureList, getAllStaticKeyFeatureList, getStaticKeyFeatureById } from "../../../store/reducer/static.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, SuccessToast, WarningToast } from "../../../utils/toasts";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortBy: "", sortOrder: ""
    });
    const { staticKeyFeatureList, loader, staticKeyFeatureById } = useSelector((state: IRootState) => state.static);
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15", sortBy: "active", sortOrder: "desc" });
        } else {
            dispatch(getAllStaticKeyFeatureList(window.location.search));
        }
    }, [window.location.search, query]);

    useEffect(() => {
        return () => {
            dispatch(cleanStaticKeyFeatureList());
        };
    }, []);

    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Static Key Features'
                        number={staticKeyFeatureList?.totalItems} />
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
                    <AuthLayout actions={["admin.static-key-feature.create"]}>
                        <PrimaryBtn
                            title="New Static Key Feature"
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
                        accessor: "title",
                        title: "Title",
                        sortable: true,
                        render(record: any) {
                            return record.title["en"];
                        }
                    }, {
                        accessor: "description",
                        title: "Description",
                        sortable: true,
                        render(record: any) {
                            return (
                                <div className="overflow-hidden text-wrap"
                                    dangerouslySetInnerHTML={{ __html: record?.description?.en }}>
                                </div>
                            );
                        }
                    }, {
                        accessor: "orderIndex",
                        title: "Order Index",
                        sortable: true,
                    }, {
                        accessor: "active",
                        sortable: true,
                        title: "Active",
                        render(record: any) {
                            return <CustomSwitch
                                id="active"
                                checked={record?.active}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    dispatch(updateStaticKeyFeatureById(record?._id, { active: e }, (res) => {
                                        if (res.status) {
                                            SuccessToast("Successfully Saved!");
                                            dispatch(getAllStaticKeyFeatureList(window.location.search));
                                        } else {
                                            ErrorToast(res.message);
                                        }
                                    }));
                                }} />;
                        }
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
                            <AuthLayout actions={["admin.static-key-feature.edit", "admin.static-key-feature.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.static-key-feature.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getStaticKeyFeatureById(item._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.static-key-feature.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteStaticKeyFeatureById(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllStaticKeyFeatureList(window.location.search));
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
                totalRecords={staticKeyFeatureList?.totalItems}
                records={staticKeyFeatureList?.list}
                idAccessor={({ _id }) => _id}
                page={staticKeyFeatureList?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.static-key-feature.edit")) {
                        dispatch(getStaticKeyFeatureById(record?._id));
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
                    dispatch(cleanStaticKeyFeatureById());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{staticKeyFeatureById?._id ? "Edit Static Key Feature" : "Add Static Key Feature"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
            >
                <StaticKeyFeatureEditForm
                    close={() => {
                        dispatch(getAllStaticKeyFeatureList(window.location.search));
                        close();
                    }}
                />
            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
