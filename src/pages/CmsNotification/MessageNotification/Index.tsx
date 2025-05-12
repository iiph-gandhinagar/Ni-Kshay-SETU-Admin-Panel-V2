import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconDownload from "../../../components/Icon/IconDownload";
import IconPlus from "../../../components/Icon/IconPlus";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import { MessageNotificationEditForm } from "../../../forms/MessageNotificationEditForm";
import { IRootState } from "../../../store";
import { cleanAllMessageNotification, getAllMessageNotification } from "../../../store/reducer/config.reducer";


const handleDownloadCSV = () => {
    const csvContent = [
        ["user_name", "phone_no"],
        ["Amisha", "9824065062"],
        ["Bhumika", "9824056543"]
    ];
    const csvString = csvContent.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortOrder: "", sortBy: "", userName: "", phoneNo: ""
    });
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllMessageNotification(window.location.search));
        }
    }, [window.location.search, query]);

    useEffect(() => {
        return () => {
            dispatch(cleanAllMessageNotification());
        };
    }, []);

    const { messageNotificationList, loader } = useSelector((v: IRootState) => v.config);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Message Notifications'
                        number={messageNotificationList?.totalItems} />
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
                    <PrimaryBtn
                        title="Sample CSV"
                        leftIcon={<IconDownload />}
                        onClick={handleDownloadCSV}
                    />
                    <AuthLayout actions={["admin.message-notification.create"]}>
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
                        title: "ID",
                        hidden: true
                    }, {
                        accessor: "userName",
                        title: "User Name",
                        filtering: query?.userName ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="userName"
                                    placeholder="User Name..."
                                    value={query?.userName || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", userName: e || undefined });
                                    }}
                                />
                            );
                        },
                    }, {
                        accessor: "phoneNo",
                        title: "Phone No",
                        filtering: query?.phoneNo ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    placeholder="Phone No"
                                    id="phoneNo"
                                    value={query?.phoneNo || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", phoneNo: e || undefined });
                                    }}
                                />
                            );
                        },
                    }, {
                        accessor: "message",
                        title: "Message",
                    }, {
                        accessor: "createdAt",
                        title: "Created At",
                        sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    }, {
                        accessor: "updatedAt",
                        title: "Updated At",
                    }
                ]}
                isloading={loader}
                totalRecords={messageNotificationList?.totalItems}
                records={messageNotificationList?.list}
                idAccessor={({ _id }) => _id}
                page={messageNotificationList?.currentPage || undefined}
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
                    dispatch(getAllMessageNotification(window.location.search));
                    close();
                }}
                title={
                    <span className="text-xl font-bold"> Add Message Notification</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
            >
                <MessageNotificationEditForm
                    close={
                        () => {
                            dispatch(getAllMessageNotification(window.location.search));
                            close();
                        }}
                />
            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
