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
import { MasterCmsEditForm } from "../../../forms/MasterCmsEditForm";
import { IRootState } from "../../../store";
import { deleteMasterCmsByID } from "../../../store/actions/config.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanMasterCmsByID, cleanMasterCmsList, getAllMasterCms, getMasterCmsByID } from "../../../store/reducer/config.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortBy: "", sortOrder: "", search: "", title: ""
    });
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const { masterCmsById, loader, masterCmsList } = useSelector((state: IRootState) => state.config);
    useEffect(() => {
        if (!window.location.search) {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllMasterCms(window.location.search));
        }
        dispatch(setPageTitle("App Config List"));
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(cleanMasterCmsList());
        };
    }, []);
    function stripHtmlTags(htmlString: any) {
        return htmlString?.replace(/<[^>]*>/g, "") || "-";
    }

    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Master CMS'
                        number={masterCmsList?.totalItems} />
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
                    <AuthLayout actions={["admin.master-cm.create"]}>
                        <PrimaryBtn
                            title="New Master CMS"
                            leftIcon={<IconPlus />}
                            onClick={() => {
                                open();
                            }}
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
                        },
                    }, {
                        accessor: "title",
                        title: "Title",
                        sortable: true,
                        filtering: query?.title ? true : false,
                        filter() {
                            return (
                                <PrimaryTextInput
                                    id="title"
                                    placeholder="Title..."
                                    value={query?.title || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", title: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        accessor: "description",
                        title: "Description",
                        render: (item: any) => {
                            return (
                                <div className="overflow-hidden text-wrap"
                                    dangerouslySetInnerHTML={{ __html: item?.description?.en }}>
                                </div>
                            );
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
                            <AuthLayout actions={["admin.master-cm.edit", "admin.master-cm.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.master-cm.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getMasterCmsByID(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.master-cm.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteMasterCmsByID(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllMasterCms(window.location.search));

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
                records={masterCmsList?.list}
                page={masterCmsList?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.master-cm.edit")) {
                        dispatch(getMasterCmsByID(record?._id));
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
                totalRecords={masterCmsList?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    dispatch(getAllMasterCms(window.location.search));
                    dispatch(cleanMasterCmsByID());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{masterCmsById?._id ? "Edit Master CMS" : "Add Master CMS"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 800 ? 800 : "undefined", backgroundColor: "#FAFBFA" }}>
                <MasterCmsEditForm close={() => {
                    dispatch(getAllMasterCms(window.location.search));
                    dispatch(cleanMasterCmsByID());
                    close();
                }} />
            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
