import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconPencil from "../../../components/Icon/IconPencil";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import LbBadgeEditForm from "../../../forms/LbBadgeEditForm";
import { IRootState } from "../../../store";
import { deleteLeaderboardBadgeByID } from "../../../store/actions/leaderboard.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanLeaderboardBadgeById, cleanLeaderboardBadgeList, getAllLeaderboardBadgeList, getAllLeaderboardLevelList, getLeaderboardBadgeById } from "../../../store/reducer/leaderboard.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortBy: "", sortOrder: "", levelId: ""
    });
    const clearFilters = () => {
        setQuery({ page: "1", limit: "15", search: null, sortBy: null, sortOrder: null, levelId: null });
    };
    const { leaderboardBadgeList, loader, leaderboardBadgeById, leaderboardLevelList } = useSelector((state: IRootState) => state.leaderboard);
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllLeaderboardBadgeList(window.location.search));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        dispatch(getAllLeaderboardLevelList("?isDrpDwn=true"));

        return () => {
            dispatch(cleanLeaderboardBadgeList());
        };
    }, [query]);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='LB Badges'
                        number={leaderboardBadgeList?.totalItems} />
                    <PrimaryTextInput
                        id={"search"}
                        type="text"
                        placeholder="Search badge..."
                        className="form-input w-auto"
                        value={query.search || ""}
                        onChange={(e) => {
                            setQuery({ search: e });
                        }}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
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
                        }
                    }, {
                        accessor: "level",
                        title: "Level",
                        render(record: any) {
                            return record?.levelId?.level;
                        },
                        filtering: query?.levelId ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    id="levelId"
                                    className="min-w-48"
                                    menuPortalTarget={null}
                                    value={query?.levelId}
                                    onChange={(e) => {
                                        setQuery({ page: "1", levelId: e });
                                    }}
                                    options={leaderboardLevelList?.list
                                        ?.filter((e) => e?.level !== undefined && e?._id !== undefined)
                                        .map((e) => ({
                                            label: e.level as string,
                                            value: e._id as string,
                                        }))}
                                />
                            );
                        }

                    }, {
                        accessor: "badge",
                        title: "Badge",
                        sortable: true,

                    }, {
                        accessor: "createdAt",
                        title: "Created At",
                        sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    }, {
                        accessor: "action",
                        title: "Actions",
                        titleClassName: "!text-right !pr-8",
                        render: (item: any) => (
                            <AuthLayout actions={["admin.lb-badge.edit", "admin.lb-badge.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.lb-badge.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getLeaderboardBadgeById(item._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.lb-badge.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteLeaderboardBadgeByID(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllLeaderboardBadgeList(window.location.search));
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
                totalRecords={leaderboardBadgeList?.totalItems}
                records={leaderboardBadgeList?.list}
                idAccessor={({ _id }) => _id}
                page={leaderboardBadgeList?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.lb-badge.edit")) {
                        dispatch(getLeaderboardBadgeById(record._id));
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
                    dispatch(cleanLeaderboardBadgeById());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{leaderboardBadgeById?._id ? "Edit Lb Badge" : "Add Lb Badge"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
            >
                <LbBadgeEditForm
                    close={() => {
                        dispatch(getAllLeaderboardBadgeList(window.location.search));
                        close();
                    }}
                />
            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
