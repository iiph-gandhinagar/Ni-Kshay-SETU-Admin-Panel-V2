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
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import LbTaskListEditForm from "../../../forms/LbTaskListEditForm";
import { IRootState } from "../../../store";
import { deleteLeaderboardTaskByID } from "../../../store/actions/leaderboard.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanLeaderboardTaskById, cleanLeaderboardTaskList, getAllLeaderboardBadgeList, getAllLeaderboardLevelList, getAllLeaderboardTaskList, getLeaderboardTaskById } from "../../../store/reducer/leaderboard.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortBy: "", sortOrder: "", levelId: "", badgeId: ""
    });
    const clearFilters = () => {
        setQuery({ page: "1", limit: "15", search: null, sortBy: null, sortOrder: null, levelId: null, badgeId: null });
    };
    const { leaderboardTaskList, leaderboardLevelList, loader, leaderboardBadgeList, leaderboardTaskById } = useSelector((state: IRootState) => state.leaderboard);
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllLeaderboardTaskList(window.location.search));
        }
    }, [window.location.search, query]);

    useEffect(() => {
        if (query?.levelId) {
            dispatch(getAllLeaderboardBadgeList(`?isDrpDwn=true&levelId=${query?.levelId}`));
        } else {
            dispatch(getAllLeaderboardLevelList("?isDrpDwn=true"));
        }
    }, [query]);
    useEffect(() => {
        return () => {
            dispatch(cleanLeaderboardTaskList());
        };
    }, []);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='LB Task List'
                        number={leaderboardTaskList?.totalItems} />
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
                        accessor: "levelId.level",
                        title: "Level",
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
                        accessor: "badgeId.badge",
                        title: "Badge",
                        filtering: query?.badgeId ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    id="badgeId"
                                    className="min-w-48"
                                    menuPortalTarget={null}
                                    value={query?.badgeId}
                                    onChange={(e) => {
                                        setQuery({ page: "1", badgeId: e });
                                    }}
                                    options={leaderboardBadgeList && query?.levelId ? leaderboardBadgeList?.map((e: any) => ({
                                        label: e?.badge,
                                        value: e?._id
                                    })) : leaderboardBadgeList?.list?.map((e: any) => ({
                                        label: e?.badge,
                                        value: e?._id
                                    }))
                                    }
                                />
                            );
                        }
                    }, {
                        accessor: "minSpent",
                        title: "Mins Spent",
                        sortable: true
                    }, {
                        accessor: "subModuleUsageCount",
                        title: "Sub Module Usage Count",
                        sortable: true
                    }, {
                        accessor: "appOpenedCount",
                        title: "App Opened Count",
                        sortable: true
                    }, {
                        accessor: "chatbotUsageCount",
                        title: "Chatbot Usage Count",
                        sortable: true
                    }, {
                        accessor: "kbaseCompletion",
                        title: "K-base Completion(%)",
                        sortable: true
                    }, {
                        accessor: "totalAssessments",
                        title: "Number Of Assessments",
                        sortable: true
                    }, {
                        accessor: "correctnessOfAnswers",
                        title: "Correctness Of Answers",
                        sortable: true
                    }, {
                        accessor: "createdAt",
                        sortable: true,
                        title: "Created At",
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    }, {
                        accessor: "action",
                        title: "Actions",
                        titleClassName: "!text-right !pr-8",
                        render: (item: any) => (
                            <AuthLayout actions={["admin.lb-task-list.edit", "admin.lb-task-list.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.lb-task-list.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getLeaderboardTaskById(item._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.lb-task-list.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteLeaderboardTaskByID(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllLeaderboardTaskList(window.location.search));
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
                totalRecords={leaderboardTaskList?.totalItems}
                records={leaderboardTaskList?.list}
                idAccessor={({ _id }) => _id}
                page={leaderboardTaskList?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.lb-task-list.edit")) {
                        dispatch(getLeaderboardTaskById(record._id));
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
                    dispatch(cleanLeaderboardTaskById());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{leaderboardTaskById?._id ? "Edit Lb Task List" : "Add Lb Task List"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
            >
                <LbTaskListEditForm
                    close={() => {
                        dispatch(getAllLeaderboardTaskList(window.location.search));
                        close();
                    }}
                />
            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
