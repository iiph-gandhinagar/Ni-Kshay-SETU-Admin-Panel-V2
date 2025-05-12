import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import CustomSwitch from "../../../components/CheckBox/Switch";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconPencil from "../../../components/Icon/IconPencil";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import FlashNewsEditForm from "../../../forms/FlashNewsEditForm";
import { IRootState } from "../../../store";
import { deleteFlashNewsByID, updateFlashNews } from "../../../store/actions/flashNews.action";
import { cleanFlashNewsById, cleanFlashNewsList, getAllFlashNewsList, getFlashNewsById } from "../../../store/reducer/flashNews.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, SuccessToast, WarningToast } from "../../../utils/toasts";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortBy: "", sortOrder: ""
    });
    const { flashNewsList, loader, flashNewsById } = useSelector((state: IRootState) => state.flashNews);
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15", sortBy: "active", sortOrder: "desc" });
        } else {
            dispatch(getAllFlashNewsList(window.location.search));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(cleanFlashNewsList());
        };
    }, []);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Flash News'
                        number={flashNewsList?.totalItems} />
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
                        },
                    }, {
                        accessor: "title",
                        title: "Title",
                        sortable: true
                    }, {
                        accessor: "source",
                        title: "Source",
                        sortable: true
                    }, {
                        accessor: "href",
                        title: "Href",
                        sortable: true,
                        render(record, index) {
                            return (
                                <Tippy
                                    className="overflow-hidden text-wrap"
                                    content={record?.href}>
                                    <a
                                        href={record?.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="truncate whitespace-nowrap overflow-hidden text-ellipsis block text-blue-500 hover:underline max-w-[300px]"
                                    >
                                        {record?.href}
                                    </a>
                                </Tippy>
                            );
                        },

                    }, {
                        accessor: "orderIndex",
                        sortable: true,
                        title: "Order Index",
                    }, {
                        accessor: "active",
                        title: "Active",
                        sortable: true,
                        render(record: any) {
                            return <CustomSwitch
                                id="active"
                                checked={record?.active}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    dispatch(updateFlashNews(record?._id, { active: e }, (res) => {
                                        if (res.status) {
                                            SuccessToast("Successfully Saved!");
                                            dispatch(getAllFlashNewsList(window.location.search));
                                        } else {
                                            ErrorToast(res.message);
                                        }
                                    }));
                                }} />;
                        },
                    }, {
                        accessor: "createdAt", title: "Created At", sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        },
                    }, {
                        accessor: "action",
                        title: "Actions",
                        titleClassName: "!text-right !pr-8",
                        width: 100,
                        render: (item: any) => (
                            <AuthLayout actions={["admin.flash-news.edit", "admin.flash-news.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.flash-news.edit"]}
                                        showDash>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getFlashNewsById(item._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.flash-news.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteFlashNewsByID(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(getAllFlashNewsList(window.location.search));
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
                totalRecords={flashNewsList?.totalItems}
                records={flashNewsList?.list}
                idAccessor={({ _id }) => _id}
                page={flashNewsList?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.flash-news.edit")) {
                        dispatch(getFlashNewsById(record._id));
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
                    dispatch(cleanFlashNewsById());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{flashNewsById?._id ? "Edit Flash News" : "Add Flash News"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
            >
                <FlashNewsEditForm
                    close={() => {
                        dispatch(getAllFlashNewsList(window.location.search));
                        dispatch(cleanFlashNewsById());
                        close();
                    }} />
            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
