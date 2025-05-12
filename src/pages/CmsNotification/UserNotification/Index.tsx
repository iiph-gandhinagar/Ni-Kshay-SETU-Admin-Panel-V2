import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconInfoCircle from "../../../components/Icon/IconInfoCircle";
import IconPlus from "../../../components/Icon/IconPlus";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import { UserNotificationEditForm } from "../../../forms/UserNotificationEditForm";
import { IRootState } from "../../../store";
import { getUserNotificationInfo } from "../../../store/actions/config.action";
import { cleanAllUserNotification, getAllUserNotification } from "../../../store/reducer/config.reducer";
import { clearSubscribersSearch } from "../../../store/reducer/plugin.reducer";
import NotificationPopup from "./NotificationPopup";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortOrder: "", sortBy: "", title: "", types: ""
    });
    const [showPopup, setPopup] = useState(false);
    const [data, setData] = useState<any>();
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllUserNotification(window.location.search));
        }
    }, [window.location.search, query]);

    useEffect(() => {
        return () => {
            dispatch(cleanAllUserNotification());
        };
    }, []);

    const { userNotificationList, loader, } = useSelector((v: IRootState) => v.config);
    return (
        <>
            <BoxCard>
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                    <div className="flex items-center flex-wrap gap-3">
                        <CircleWithNum title='User Notifications'
                            number={userNotificationList?.totalItems} />
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
                        <AuthLayout actions={["admin.user-notification.create"]}>
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
                            accessor: "title",
                            title: "Title",
                            sortable: true,
                            filtering: query?.title ? true : false,
                            filter(params) {
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
                        }, {
                            accessor: "type",
                            title: "Type",
                            sortable: true,
                            filtering: query?.types ? true : false,
                            filter(params) {
                                return (
                                    <PrimaryTextInput
                                        id="type"
                                        placeholder="Type..."
                                        value={query?.types || ""}
                                        onChange={(e) => {
                                            setQuery({ page: "1", types: e || undefined });
                                        }}
                                    />
                                );
                            },
                        },
                        {
                            accessor: "createdBy",
                            title: "Created By",
                            sortable: true,
                            render: (item) => (
                                <div>
                                    {item?.createdBy?.firstName} {item?.createdBy?.lastName} ({item?.createdBy?.email})
                                </div>
                            )
                        }, {
                            accessor: "createdAt", title: "Created At", sortable: true,
                            render(record: any) {
                                return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                            },
                        },
                        {
                            accessor: "action",
                            title: "Info",
                            render(record: any) {
                                return (
                                    <Tippy content="Info">
                                        <button type="button"
                                            onClick={() => {
                                                dispatch(getUserNotificationInfo(record?._id, (res) => {
                                                    if (res?.status) {
                                                        setData(res.data);
                                                        setPopup(true);
                                                    }
                                                }));
                                            }}>
                                            <IconInfoCircle />
                                        </button>
                                    </Tippy>
                                );
                            }
                        }
                    ]}
                    isloading={loader}
                    totalRecords={userNotificationList?.totalItems}
                    records={userNotificationList?.list}
                    idAccessor={({ _id }) => _id}
                    page={userNotificationList?.currentPage || undefined}
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
                        dispatch(clearSubscribersSearch());
                        dispatch(getAllUserNotification(window.location.search));
                        close();
                    }}
                    title={
                        <span className="text-xl font-bold"> Add Notification</span>
                    }
                    headerStyle={{ backgroundColor: "#FAFBFA" }}
                    contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
                >
                    <UserNotificationEditForm
                        close={
                            () => {
                                dispatch(clearSubscribersSearch());
                                dispatch(getAllUserNotification(window.location.search));
                                close();
                            }}
                    />

                </DrawerModal>
            </BoxCard>
            {showPopup &&
                <NotificationPopup data={data}
                    onClose={() => setPopup(false)} />}
        </>
    );
};

export default Index;
