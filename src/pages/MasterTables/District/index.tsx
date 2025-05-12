import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { MultiSelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import { DistrictEditForm } from "../../../forms/DistrictEditForm";
import { IRootState } from "../../../store";
import { deleteDistrict } from "../../../store/actions/masterTable.action";
import { logActivity } from "../../../store/actions/report.action";
import { clearDistrict, clearDistrictById, cleartAllCountryList, cleartAllStateList, getAllCountryList, getAllDistrictList, getAllStateList, getDistrict, getDistrictById } from "../../../store/reducer/masterTable.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "", limit: "", sortBy: "", sortOrder: "", title: "", cadreTypes: ArrayParam, stateId: ArrayParam,

    });
    const clearFilters = () => {
        setQuery({
            ...query,
            sortBy: null,
            sortOrder: null,
            title: null,
            cadreTypes: null,
            stateId: null
        });
    };
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    const { districtDetails, loader, districtById, stateList } = useSelector((state: IRootState) => state.master);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getDistrict(window.location.search));
        }
        if (query.stateId) {
            const searchParams = new URLSearchParams();
            query.stateId.forEach((key) => {
                if (key)
                    searchParams.append("stateId", key);
            });
            dispatch(getAllDistrictList("?" + searchParams?.toString()));
        }
        dispatch(setPageTitle("District List"));
    }, [window.location.search, query]);
    useEffect(() => {
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        return () => {
            dispatch(cleartAllCountryList());
            dispatch(cleartAllStateList());
            dispatch(clearDistrict());
        };
    }, []);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <span
                        className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                        {districtDetails?.totalItems || 0}
                    </span>
                    <h5 className="font-semibold text-lg">District</h5>
                    <PrimaryTextInput
                        id={"search"}
                        type="text"
                        placeholder="Search District..."
                        className="form-input w-auto"
                        value={query.title || ""}
                        onChange={(e) => {
                            setQuery({ title: e || undefined });
                        }}
                    />
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.district.create"]}>
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
                    { accessor: "countryId.title", title: "Country Name", sortable: true, },
                    {
                        accessor: "stateId.title", title: "State Name", sortable: true,
                        filtering: query?.stateId ? true : false,
                        render(record) {
                            return record?.stateId?.title;
                        },
                        filter(params) {
                            return (
                                <MultiSelectInput

                                    className="min-w-48"
                                    id="stateId"
                                    value={query?.stateId as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", stateId: e });

                                    }}
                                    options={stateList?.map((e) => ({
                                        label: e.title,
                                        value: e._id
                                    }))}
                                />
                            );
                        },
                    },
                    {
                        accessor: "title", title: "District Name", sortable: true,
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
                            <AuthLayout actions={["admin.district.edit", "admin.district.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.district.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getDistrictById(item?._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.district.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteDistrict(
                                                                item?._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getDistrict(window.location.search));
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
                records={districtDetails?.list}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.district.edit")) {
                        dispatch(getDistrictById(record?._id));
                        open();
                    }
                }}
                idAccessor={({ _id }) => _id}
                page={districtDetails?.currentPage || undefined}
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
                totalRecords={districtDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    close();
                    dispatch(clearDistrictById());
                    dispatch(getDistrict(window.location.search));
                }}
                title={
                    <span className="text-xl font-bold">{districtById?._id ? "Edit District" : "Add New District"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                <DistrictEditForm
                    close={() => {
                        dispatch(clearDistrictById());
                        dispatch(getDistrict(window.location.search));
                        close();
                    }} />
            </DrawerModal>
        </div>
    );
};

export default Index;
