import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import { CountryEditForm } from "../../../forms/CountryEditForm";
import { IRootState } from "../../../store";
import { deleteCountry } from "../../../store/actions/masterTable.action";
import { logActivity } from "../../../store/actions/report.action";
import { clearCountry, clearCountryDetails, getCountry, getCountryById } from "../../../store/reducer/masterTable.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({ page: "", limit: "", search: "", sortOrder: "", sortBy: "" });
    const dispatch = useDispatch();
    const { countryDetails, loader, countryById } = useSelector((state: IRootState) => state.master);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getCountry(window.location.search));
        }
        dispatch(setPageTitle("Country List"));
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(clearCountry());
        };
    }, []);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <span
                        className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                        {countryDetails?.totalItems || 0}
                    </span>
                    <h5 className="font-semibold text-lg">Country</h5>
                    <PrimaryTextInput
                        id={"search"}
                        type="text"
                        placeholder="Search Country..."
                        className="form-input w-auto"
                        value={query.search || ""}
                        onChange={(e) => {
                            setQuery({ search: e });
                        }}
                    />
                </div>

                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.country.create"]}>
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
                columns={[{ accessor: "_id", hidden: true },
                {
                    accessor: "sr", title: "Sr. no", render(rec, index) {
                        const pageNumber = parseInt(query.page || "1");
                        const itemsPerPage = parseInt(query.limit || "15");
                        return (index + 1) + (pageNumber - 1) * itemsPerPage;
                    }
                },
                { accessor: "title", title: "Country Name", sortable: true, }
                    , {
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
                        <AuthLayout actions={["admin.country.edit", "admin.country.delete"]}
                            showDash>
                            <div className="flex items-center justify-end gap-6 mr-3 ">
                                <AuthLayout actions={["admin.country.edit"]}>
                                    <Tippy content="Edit">
                                        <button type="button"
                                            onClick={() => {
                                                dispatch(getCountryById(item?._id));
                                                open();
                                            }}>
                                            <IconPencil />
                                        </button>
                                    </Tippy>
                                </AuthLayout>
                                <AuthLayout actions={["admin.country.delete"]}>
                                    <Tippy content="Delete">
                                        <button type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                    if (isConfirmed) {
                                                        dispatch(deleteCountry(
                                                            item?._id,
                                                            (res) => {
                                                                if (res.status) {
                                                                    dispatch(logActivity({
                                                                        "action": "delete",
                                                                        "moduleName": window.location.pathname,
                                                                        "payload": item
                                                                    }));
                                                                    dispatch(getCountry(window.location.search));
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
                records={countryDetails?.list}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.country.edit")) {
                        dispatch(getCountryById(record?._id));
                        open();
                    }
                }}
                idAccessor={({ _id }) => _id}
                page={countryDetails?.currentPage || undefined}
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
                totalRecords={countryDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    close();
                    dispatch(getCountry(window.location.search));
                    dispatch(clearCountryDetails());
                }}
                title={
                    <span className="text-xl font-bold">{countryById?._id ? "Edit Country" : "Add New Country"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <CountryEditForm
                    close={() => {
                        dispatch(clearCountryDetails());
                        dispatch(getCountry(window.location.search));
                        close();
                    }} />
            </DrawerModal>
        </div>
    );
};

export default Index;
