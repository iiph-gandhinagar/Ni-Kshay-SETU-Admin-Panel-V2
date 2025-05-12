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
import { SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import DrawerModal from "../../../components/Layouts/Drawer";
import TableComponent from "../../../components/Tables";
import SymptomsEditForm from "../../../forms/SymptomsEditForm";
import { IRootState } from "../../../store";
import { deleteSymptomById } from "../../../store/actions/masterTable.action";
import { logActivity } from "../../../store/actions/report.action";
import { clearSymptomById, clearSymptomList, getAllSymptomsList, getSymtomById } from "../../../store/reducer/masterTable.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortOrder: "", sortBy: "", category: "", symptomTitle: ""
    });
    const clearFilters = () => {
        setQuery({
            ...query,
            search: null,
            sortOrder: null,
            sortBy: null,
            category: null,
            symptomTitle: null
        });
    };
    const dispatch = useDispatch();
    const { symptomsDetail, symptomById, loader } = useSelector((v: IRootState) => v.master);
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllSymptomsList(window.location.search));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(clearSymptomList());
            dispatch(clearSymptomById());
        };
    }, []);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Symptoms'
                        number={symptomsDetail?.totalItems} />
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
                    <PrimaryBtn
                        title="Clear Filters"
                        onClick={clearFilters}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.symptom.create"]}>
                        <PrimaryBtn
                            title="New Symptom"
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
                    },
                    {
                        accessor: "category",
                        title: "Category",
                        sortable: true,
                        filtering: false,
                        filter(params) {
                            return (
                                <SelectInput
                                    isClearable
                                    className="min-w-48"
                                    id="categry"
                                    value={query?.category}
                                    onChange={(e) => {
                                        setQuery({ page: "1", category: e });
                                    }}
                                    options={[{ label: "1", value: "1" }, { label: "2", value: "2" }]}
                                />
                            );
                        },
                    },
                    {
                        accessor: "title",
                        title: "Symptoms title",
                        sortable: true,
                        render(record: any) {
                            return record.title?.en;
                        },
                        filtering: query?.symptomTitle ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="symptomTitle"
                                    placeholder="Symptom Title..."
                                    value={query?.symptomTitle || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", symptomTitle: e || undefined });
                                    }}
                                />
                            );
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
                        render: (item: any) => (
                            <AuthLayout actions={["admin.symptom.edit", "admin.symptom.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.symptom.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    dispatch(getSymtomById(item._id));
                                                    open();
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.symptom.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteSymptomById(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllSymptomsList(window.location.search));
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
                totalRecords={symptomsDetail?.totalItems}
                records={symptomsDetail?.list}
                idAccessor={({ _id }) => _id}
                page={symptomsDetail?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.symptom.edit")) {
                        dispatch(getSymtomById(record._id));
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
                    dispatch(clearSymptomById());
                    close();
                }}
                title={
                    <span className="text-xl font-bold"> {symptomById?._id ? "Edit Symptom" : "Add Symptom"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
            >
                <SymptomsEditForm
                    close={() => {
                        dispatch(getAllSymptomsList(window.location.search));
                        dispatch(clearSymptomById());
                        close();
                    }}
                />
            </DrawerModal>
        </BoxCard>
    );
};
export default Index;
