import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { deleteUserDetailByID } from "../../../store/actions/auth.action";
import { cleanUserList, getUsers } from "../../../store/reducer/auth.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortBy: "", sortOrder: "", firstName: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userDetails, loader, userDetailById } = useSelector((state: IRootState) => state.auth);
    useEffect(() => {
        if (!window.location.search) {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getUsers(window.location.search));
        }
        dispatch(setPageTitle("User List"));
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(cleanUserList());
        };
    }, []);

    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <span
                        className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                        {userDetails?.totalItems || 0}
                    </span>
                    <h5 className="font-semibold text-lg">Users</h5>
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.admin-user.create"]}>
                        <PrimaryBtn
                            title="Add New"
                            onClick={() => { navigate(`/user/upsert${window.location.search}`); }}
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
                        accessor: "firstName", title: "Name", sortable: true,
                        render(record) {
                            return record?.firstName + " " + record?.lastName;
                        },
                        filtering: query?.firstName ? true : false,
                        filter(params) {
                            return (
                                <PrimaryTextInput
                                    id="name"
                                    placeholder="Search Name..."
                                    value={query?.firstName || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", firstName: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        accessor: "email", title: "Email", sortable: true,
                    },
                    {
                        accessor: "cadre", title: "Cadre", sortable: true,
                        render(record) {
                            return record?.cadre?.length > 0 ? record?.cadre?.map((cadre: { title: string, _id: string; }) => cadre.title) : "-";
                        }
                    },
                    {
                        accessor: "role", title: "Role", sortable: true,
                        render(record) {
                            return record?.role?.name;
                        }
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
                            <AuthLayout actions={["admin.admin-user.edit", "admin.admin-user.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.admin-user.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    navigate(`/user/upsert${window.location.search}&id=${item._id}`);
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.admin-user.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteUserDetailByID(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(getUsers(window.location.search));
                                                                    } else {
                                                                        ErrorToast(res?.message);
                                                                    }
                                                                }
                                                            ));
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
                idAccessor={({ _id }) => _id}
                records={userDetails?.list}
                page={userDetails?.currentPage || undefined}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.admin-user.edit"))
                        navigate(`/user/upsert${window.location.search}&id=${record._id}`);
                }}
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
                totalRecords={userDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
        </div>
    );
};

export default Index;
