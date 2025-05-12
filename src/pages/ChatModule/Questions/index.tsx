import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import { Checkbox } from "../../../components/CheckBox/checkbox";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { MultiSelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { deleteSystemQuestionByID, updateSystemQuestionByID } from "../../../store/actions/chatModule.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanAllSystemQuestions, getAllSystemQuestions, getSystemQuestionByID } from "../../../store/reducer/chatModule.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, SuccessToast, WarningToast } from "../../../utils/toasts";
const Index = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useQueryParams({
        page: "", limit: "", sortBy: "", sortOrder: "", title: "", category: ArrayParam, search: ""
    });
    const { systemQuestionDetails, loader } = useSelector((state: IRootState) => state.chatModule);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15", sortOrder: "desc", sortBy: "active" });
        } else {
            dispatch(getAllSystemQuestions(window.location.search));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(cleanAllSystemQuestions());
        };
    }, []);
    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <span
                        className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                        {systemQuestionDetails?.totalItems || 0}
                    </span>
                    <h5 className="font-semibold text-lg">Questions</h5>
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
                    <AuthLayout actions={["admin.system-question.create"]}>
                        <PrimaryBtn
                            onClick={() => { navigate(`/Chat/Questions/upsert?${window.location.search}`); }}
                            title="Add Question"
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
                {
                    accessor: "title", title: "Title", sortable: true,
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
                },
                {
                    accessor: "category", title: "Category", sortable: true,
                    filtering: query?.category ? true : false,
                    render(record) {
                        return record?.category === "NTEP" ? "NTEP-Kbase" : "System-tools";
                    },
                    filter(params) {
                        return (
                            <MultiSelectInput

                                className="min-w-48"
                                id="category"
                                value={query?.category as Array<string>}
                                onChange={(e) => {
                                    setQuery({ page: "1", category: e });

                                }}
                                options={[
                                    { label: "NTEP-Kbase", value: "NTEP" },
                                    { label: "System-tools", value: "System-tools" }]}
                            />
                        );
                    },
                },
                {
                    accessor: "active", title: "Is Active", sortable: true,
                    render(record, index) {
                        return (
                            <AuthLayout actions={["admin.system-question.edit"]}>
                                <Checkbox
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    id="active"
                                    checked={record?.active}
                                    onChange={(e) => {
                                        dispatch(
                                            updateSystemQuestionByID(record?._id, {
                                                active: e
                                            }, (res) => {
                                                if (res.status) {
                                                    SuccessToast("Successfully Saved!");
                                                    dispatch(getAllSystemQuestions(window.location.search));
                                                } else {
                                                    ErrorToast(res.message);
                                                }
                                            }
                                            ));
                                    }}
                                />
                            </AuthLayout>
                        );
                    },
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
                        <AuthLayout actions={["admin.system-question.edit", "admin.system-question.delete"]}
                            showDash>
                            <div className="flex items-center justify-end gap-6 mr-3 ">
                                <AuthLayout actions={["admin.system-question.edit"]}>
                                    <Tippy content="Edit">
                                        <button type="button"
                                            onClick={() => {
                                                dispatch(getSystemQuestionByID(item?._id));
                                                navigate(`/Chat/Questions/upsert${window.location.search}&id=${item._id}`);
                                            }}>
                                            <IconPencil />
                                        </button>
                                    </Tippy>
                                </AuthLayout>
                                <AuthLayout actions={["admin.system-question.delete"]}>
                                    <Tippy content="Delete">
                                        <button type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                    if (isConfirmed) {
                                                        dispatch(deleteSystemQuestionByID(
                                                            item?._id,
                                                            (res) => {
                                                                if (res.status) {
                                                                    dispatch(logActivity({
                                                                        "action": "delete",
                                                                        "moduleName": window.location.pathname,
                                                                        "payload": item
                                                                    }));
                                                                    dispatch(getAllSystemQuestions(window.location.search));

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
                records={systemQuestionDetails?.list}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.system-question.edit")) {
                        dispatch(getSystemQuestionByID(record?._id));
                        navigate(`/Chat/Questions/upsert${window.location.search}&id=${record._id}`);
                    }
                }}
                idAccessor={({ _id }) => _id}
                page={systemQuestionDetails?.currentPage || undefined}
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
                totalRecords={systemQuestionDetails?.totalItems || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
        </div>
    );
};

export default Index;
