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
import { AbbreviationEditForm } from "../../../forms/AbbreviationEditForm";
import { IRootState } from "../../../store";
import { deleteAbbreviationByID } from "../../../store/actions/chatModule.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanAbbreviationByID, cleanAllAbbreviations, getAbbreviationByID, getAllAbbreviations } from "../../../store/reducer/chatModule.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortBy: "", sortOrder: "", title: ""
    });
    const dispatch = useDispatch();
    const { abbreviationDetails, loader, abbreviationById } = useSelector((state: IRootState) => state.chatModule);
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllAbbreviations(window.location.search));
        }
        dispatch(setPageTitle("Abbreviation List"));
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(cleanAllAbbreviations());
            dispatch(cleanAbbreviationByID());
        };
    }, []);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <span
                        className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                        {abbreviationDetails?.totalItems || 0}
                    </span>
                    <h5 className="font-semibold text-lg">Abbreviations</h5>

                    <PrimaryTextInput
                        id={"search"}
                        type="text"
                        placeholder="Search Abbreviations..."
                        className="form-input w-auto"
                        value={query.title || ""}
                        onChange={(e) => {
                            setQuery({ title: e });
                        }}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.abbreviation.create"]}>
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
                        accessor: "sr", title: "Sr. no", render(rec, index) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "15");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    },
                    {
                        accessor: "title", title: "Title", sortable: true,
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
                            <AuthLayout actions={["admin.abbreviation.edit", "admin.abbreviation.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.abbreviation.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getAbbreviationByID(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.abbreviation.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteAbbreviationByID(
                                                                item?._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllAbbreviations(window.location.search));

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
                idAccessor={({ _id }) => _id}
                records={abbreviationDetails?.list}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.abbreviation.edit")) {
                        dispatch(getAbbreviationByID(record?._id));
                        open();
                    }
                }}
                page={abbreviationDetails?.currentPage || undefined}
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
                totalRecords={abbreviationDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    dispatch(getAllAbbreviations(window.location.search));
                    dispatch(cleanAbbreviationByID());
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{abbreviationById?._id ? "Edit Abbreviation" : "Add Abbreviation"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <AbbreviationEditForm close={() => {
                    dispatch(getAllAbbreviations(window.location.search));
                    dispatch(cleanAbbreviationByID());
                    close();
                }} />
            </DrawerModal>
        </div>
    );
};

export default Index;
