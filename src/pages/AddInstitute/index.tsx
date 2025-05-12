import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "use-query-params";
import { BorderBtn, PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconCaretDown from "../../components/Icon/IconCaretDown";
import IconInfoCircle from "../../components/Icon/IconInfoCircle";
import IconPencil from "../../components/Icon/IconPencil";
import IconPlus from "../../components/Icon/IconPlus";
import IconTrashLines from "../../components/Icon/IconTrashLines";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import AuthLayout from "../../components/Layouts/AuthLayout";
import DrawerModal from "../../components/Layouts/Drawer";
import TableComponent from "../../components/Tables";
import { IRootState } from "../../store";
import { deleteChildInstitute } from "../../store/actions/plugin.action";
import { logActivity } from "../../store/actions/report.action";
import { cleanAllRoles, getAllRoles } from "../../store/reducer/auth.reducer";
import { cleartAllDistrictList } from "../../store/reducer/masterTable.reducer";
import { cleanAllChildInstitutes, clearChildByType, clearChildInstituteId, clearSubscribersSearch, getAllChildInstitute, getChildInstituteByID } from "../../store/reducer/plugin.reducer";
import { setPageTitle } from "../../store/themeConfigSlice";
import { WarningToast } from "../../utils/toasts";
import { AddChildInstituteForm } from "./AddChildInstituteForm";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "", limit: "", sortBy: "", sortOrder: "", search: "", type: "", manager: "", createdAt: "", role: "",
    });
    const { rolesDetails } = useSelector((state: IRootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loader, childInstituteById, childInstituteDetails } = useSelector((state: IRootState) => state.plugin);
    const [opened, { open, close }] = useDisclosure(false);
    const [openModal, setOpenModal] = useState(false);
    const clearFilters = () => {
        setQuery({
            page: "1",
            search: undefined,
            role: undefined,
            sortBy: undefined,
            sortOrder: undefined,
        });
    };
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllChildInstitute(window.location.search));
            dispatch(cleartAllDistrictList());
        }
        dispatch(setPageTitle("Institute List"));
    }, [window.location.search, query]);
    useEffect(() => {
        dispatch(getAllRoles("?page=1&limit=10&search=Institutes"));
        return () => {
            dispatch(cleanAllChildInstitutes());
            dispatch(clearChildInstituteId());
            dispatch(clearChildByType());
            dispatch(cleanAllRoles());
        };
    }, []);
    return (
        <>
            <BorderBtn
                className="mb-4"
                borderColor='border-primary'
                textColor='text-primary'
                title="Back"
                leftIcon={<IconCaretDown className="rotate-90" />}
                onClick={() => navigate("/query2coe/landing-page")} />
            <div className="panel mt-6">
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                    <div className="flex items-center flex-wrap gap-3">
                        <span
                            className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                            {childInstituteDetails?.totalItems || 0}
                        </span>
                        <h5 className="font-semibold text-lg">My Institute</h5>
                        <PrimaryTextInput
                            type="text"
                            id='Master-seaarch'
                            placeholder="Search..."
                            className="form-input w-auto"
                            value={query?.search || ""}
                            onChange={(e) => {
                                setQuery({ page: "1", search: e || undefined });
                            }}
                        />
                        <PrimaryBtn
                            title=" Clear Filters"
                            onClick={clearFilters} />
                    </div>
                    <div className="flex items-center flex-wrap gap-3">
                        <AuthLayout actions={["admin.institute.create"]}>
                            <PrimaryBtn
                                title="Add Manager"
                                onClick={open}
                                leftIcon={<IconPlus />}
                            />
                        </AuthLayout>
                        <div className="mt-1 mr-3 cursor-pointer"
                            onClick={() => { setOpenModal(true); }}>
                            <IconInfoCircle />
                        </div>
                    </div>
                </div>
                <Modal opened={openModal}
                    onClose={() => setOpenModal(false)}
                    centered
                    title={<span className="text-lg font-bold">COE & Nodal Masterdata Rules:</span>}
                >
                    <div className="text-lg p-2">
                        <ol className="list-decimal list-inside">
                            <li className="mt-2">COE Creation Flow:
                                <ul className="list-disc list-inside ml-5">
                                    <li>COE must first create a Nodal Institute.</li>
                                    <li>Afterward, the DR-TB Institute is created, linked to the Nodal Institute.</li>
                                </ul>
                            </li>
                            <li className="mt-2">Membership Management:
                                <ul className="list-disc list-inside ml-5">
                                    <li>COE must add members to their institute.</li>
                                </ul>
                            </li>
                            <li className="mt-2"> Account Creation Hierarchy:
                                <ul className="list-disc list-inside ml-5">
                                    <li>COE Account must be created first.</li>
                                    <li>Nodal Institute Account is created afterward, linked to its parent COE.</li>
                                    <li>DR-TB Institute Account is created after the Nodal Institute, linked to its parent institute.</li>
                                </ul>
                            </li>

                        </ol>
                    </div>
                </Modal>

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
                            accessor: "instituteId", title: "Institute Name", sortable: true,
                            render(record) {
                                return record?.instituteId?.title;
                            },
                            filter(params) {
                                return (
                                    <PrimaryTextInput
                                        id="title"
                                        placeholder="Search Institute..."
                                        value={query?.search || ""}
                                        onChange={(e) => {
                                            setQuery({ page: "1", search: e || undefined });
                                        }}
                                    />
                                );
                            },
                        },
                        {
                            accessor: "role.name", title: "Type", sortable: false,
                            filtering: query?.role ? true : false,
                            filter(params) {
                                return (
                                    <SelectInput
                                        className="min-w-48"
                                        id="type"
                                        value={query?.role}
                                        onChange={(e) => {
                                            setQuery({ page: "1", role: e });

                                        }}
                                        options={rolesDetails?.list?.map((e) => {
                                            return {
                                                label: e.name,
                                                value: e._id
                                            };
                                        })}
                                    />
                                );
                            },
                        },
                        {
                            accessor: "subscriber", title: "Institute Manager", sortable: false,
                            render(record) {
                                return record?.subscriber?.name;
                            },
                        },
                        {
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
                                <AuthLayout actions={["admin.institute.update", "admin.institute.delete"]}
                                    showDash>
                                    <div className="flex items-center justify-end gap-6 mr-3 ">
                                        <AuthLayout actions={["admin.institute.update"]}>
                                            <Tippy content="Edit">
                                                <button type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        dispatch(getChildInstituteByID(item?._id));
                                                        open();
                                                    }}>
                                                    <IconPencil />
                                                </button>
                                            </Tippy>
                                        </AuthLayout>
                                        <AuthLayout actions={["admin.institute.delete"]}>
                                            <Tippy content="Delete">
                                                <button type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                            if (isConfirmed) {
                                                                dispatch(deleteChildInstitute(
                                                                    item?._id,
                                                                    (res) => {
                                                                        if (res?.status) {
                                                                            dispatch(logActivity({
                                                                                "action": "delete",
                                                                                "moduleName": window.location.pathname,
                                                                                "payload": item
                                                                            }));
                                                                            dispatch(getAllChildInstitute(window.location.search));
                                                                        }
                                                                    }));
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <IconTrashLines />
                                                </button>
                                            </Tippy>
                                        </AuthLayout>
                                    </div>
                                </AuthLayout>
                            )
                        }
                    ]}
                    records={childInstituteDetails?.list}
                    onRowClick={({ record }) => {
                        navigate("/query2coe/dashboard?id=" + record?.instituteId?._id + "&title=" + record?.instituteId?.title + "&role=" + record?.role?._id);
                    }}
                    idAccessor={({ _id }) => _id}
                    page={childInstituteDetails?.currentPage || undefined}
                    onPageChange={(page) => {
                        setQuery({ page: page?.toString() });
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
                        setQuery({ page: "1", limit: e?.toString() });
                    }}
                    totalRecords={childInstituteDetails?.totalItems || 0}
                    className="whitespace-nowrap table-hover"
                    highlightOnHover
                />
                <DrawerModal
                    opened={opened}
                    onClose={() => {
                        close();
                        dispatch(getAllChildInstitute(window.location.search));
                        dispatch(clearChildInstituteId());
                        dispatch(clearSubscribersSearch());
                    }}
                    title={
                        <span className="text-xl font-bold">{childInstituteById?._id ? "Edit Manager" : "Add Manager"}</span>
                    }
                    headerStyle={{ backgroundColor: "#FAFBFA" }}
                    contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}>
                    <AddChildInstituteForm
                        close={() => {
                            dispatch(getAllChildInstitute(window.location.search));
                            dispatch(clearChildInstituteId());
                            dispatch(clearSubscribersSearch());
                            close();
                        }} />
                </DrawerModal>
            </div>
        </>
    );
};

export default Index;
