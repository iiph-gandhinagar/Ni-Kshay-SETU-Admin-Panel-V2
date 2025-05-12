
import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CustomSwitch from "../../../components/CheckBox/Switch";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconBellBing from "../../../components/Icon/IconBellBing";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { logActivity } from "../../../store/actions/report.action";
import { deleteSurveyByID, sendSurveyNotification, updateSurveyByID } from "../../../store/actions/survey.actions";
import { cleanSurveyDetails, fetchSurveyStart } from "../../../store/reducer/survey.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, SuccessToast, WarningToast } from "../../../utils/toasts";

const SurveyQuestions = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortBy: "", sortOrder: ""
    });
    const { surveyDetails, loader } = useSelector((v: IRootState) => v.survey);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!window.location.search) {
            setQuery({ page: "1", limit: "15", sortBy: "active", sortOrder: "desc" });
        } else {
            dispatch(fetchSurveyStart(window.location.search));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        return () => {
            dispatch(cleanSurveyDetails());
        };
    }, []);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Survey Master Questions'
                        number={surveyDetails?.totalItems || 0} />
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
                    <AuthLayout actions={["admin.survey-master.create"]}>
                        <PrimaryBtn
                            title="Add New"
                            leftIcon={<IconPlus />}
                            onClick={() => {
                                navigate(`/survey/master/add${window.location.search}`);
                            }}
                        />
                    </AuthLayout>
                </div>
            </div>
            <TableComponent
                idAccessor={({ _id }: any) => _id}
                onSortStatusChange={(item) => {
                    setQuery({ page: "1", sortOrder: item?.direction, sortBy: item?.columnAccessor?.toLocaleString() });
                }}
                sortStatus={{
                    columnAccessor: query?.sortBy || "_id",
                    direction: query?.sortOrder === "desc" ? "desc" : "asc"
                }}
                columns={[{ accessor: "title.en", title: "Survey master" }
                    , {
                    accessor: "active",
                    title: "Active",
                    sortable: true,
                    render(record: any) {
                        return <CustomSwitch
                            id="active"
                            checked={record?.active}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                                dispatch(updateSurveyByID(record?._id, { active: e }, (res) => {
                                    if (res.status) {
                                        SuccessToast("Successfully Saved!");
                                        dispatch(fetchSurveyStart(window.location.search));
                                    } else {
                                        ErrorToast(res.message);
                                    }
                                }));
                            }} />;
                    }
                },
                {
                    accessor: "createdAt",
                    title: "Created At", sortable: true,
                    render(record: any) {
                        return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                    }
                },
                {
                    accessor: "action",
                    title: "Actions",
                    titleClassName: "!text-right !pr-8",
                    render: (item: any) => (
                        <AuthLayout actions={["admin.survey-master.edit", "admin.survey-master.delete"]}
                            showDash>
                            <div className="flex items-center justify-end gap-6 mr-3 ">
                                <AuthLayout actions={["admin.survey-master.show"]}>
                                    <Tippy content="Notify">
                                        <button type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(sendSurveyNotification(item?._id, (res) => {
                                                    if (res?.status) {
                                                        SuccessToast(res?.message);
                                                        dispatch(fetchSurveyStart(window.location.search));
                                                    } else {
                                                        ErrorToast(res?.message);
                                                    }
                                                }));
                                            }}>
                                            <IconBellBing />
                                        </button>
                                    </Tippy>
                                </AuthLayout>
                                <AuthLayout actions={["admin.survey-master.edit"]}>
                                    <Tippy content="Edit">
                                        <button type="button"
                                            onClick={() => {
                                                navigate(`/survey/master/add${window.location.search}&id=${item._id}`);
                                            }}>
                                            <IconPencil />
                                        </button>
                                    </Tippy>
                                </AuthLayout>
                                <AuthLayout actions={["admin.survey-master.delete"]}>
                                    <Tippy content="Delete">
                                        <button type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                    if (isConfirmed) {
                                                        dispatch(deleteSurveyByID(
                                                            item._id,
                                                            (res) => {
                                                                if (res.status) {
                                                                    dispatch(logActivity({
                                                                        "action": "delete",
                                                                        "moduleName": window.location.pathname,
                                                                        "payload": item
                                                                    }));
                                                                    dispatch(fetchSurveyStart(window.location.search));
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
                }]}
                isloading={loader}
                records={surveyDetails?.list}
                onRowClick={({ record }) => {
                    if (hasSinglePermission("admin.survey-master.edit")) {
                        navigate(`/survey/master/add${window.location.search}&id=${record?._id}`);
                    }
                }}
                recordsPerPage={parseInt("10")}
                recordsPerPageOptions={[15, 25, 35, 55, 100]}
                totalRecords={surveyDetails?.totalItems || 0}
            />
        </BoxCard>
    );
};

export default SurveyQuestions;
