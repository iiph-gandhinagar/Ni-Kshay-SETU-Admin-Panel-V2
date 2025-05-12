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
import FlashRelatedAppEditForm from "../../../forms/FlashRelatedAppEditForm";
import { IRootState } from "../../../store";
import { deleteFlashSimilarAppByID, updateFlashSimilarAppByID } from "../../../store/actions/flashNews.action";
import { cleanFlashSimilarAppById, cleanFlashSimilarAppList, getAllFlashSimilarAppList, getFlashSimilarAppById } from "../../../store/reducer/flashNews.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, SuccessToast, WarningToast } from "../../../utils/toasts";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortOrder: "", sortBy: ""
    });
    const { flashSimilarAppList, loader, flashSimilarAppById } = useSelector((state: IRootState) => state.flashNews);
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15", sortBy: "active", sortOrder: "desc" });
        } else {
            dispatch(getAllFlashSimilarAppList(window.location.search));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(cleanFlashSimilarAppList());
        };
    }, []);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Flash Similar Apps'
                        number={flashSimilarAppList?.totalItems} />
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
                    <AuthLayout actions={["admin.flash-similar-app.create"]}>
                        <PrimaryBtn
                            title="New Flash App"
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
                        sortable: true
                    }, {
                        accessor: "subTitle",
                        title: "Sub Title",
                        sortable: true
                    }, {
                        accessor: "href",
                        title: "Href",
                        sortable: true
                    }, {
                        accessor: "orderIndex",
                        title: "Order Index",
                        sortable: true
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
                                    dispatch(updateFlashSimilarAppByID(record?._id, { active: e }, (res) => {
                                        if (res.status) {
                                            SuccessToast("Successfully Saved!");
                                            dispatch(getAllFlashSimilarAppList(window.location.search));
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
                        }
                    },
                    {
                        accessor: "action",
                        title: "Actions",
                        titleClassName: "!text-right !pr-8",
                        render: (item: any) => (
                            <AuthLayout actions={["admin.flash-similar-app.edit", "admin.flash-similar-app.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.flash-similar-app.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getFlashSimilarAppById(item._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.flash-similar-app.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteFlashSimilarAppByID(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(getAllFlashSimilarAppList(window.location.search));
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
                totalRecords={flashSimilarAppList?.totalItems}
                records={flashSimilarAppList?.list}
                idAccessor={({ _id }) => _id}
                page={flashSimilarAppList?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.flash-similar-app.edit")) {
                        dispatch(getFlashSimilarAppById(record._id));
                        open();
                    }
                }}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                recordsPerPage={parseInt(query?.limit || "15")}
                recordsPerPageOptions={[15, 25, 35, 55, 100]}
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
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    dispatch(cleanFlashSimilarAppById());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{flashSimilarAppById?._id ? "Edit App" : "Add App"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
            >
                <FlashRelatedAppEditForm
                    close={() => {
                        dispatch(cleanFlashSimilarAppById());
                        dispatch(getAllFlashSimilarAppList(window.location.search));
                        close();
                    }} />

            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
