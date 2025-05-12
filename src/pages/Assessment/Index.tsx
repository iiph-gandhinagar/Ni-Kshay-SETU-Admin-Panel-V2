import { assessmentQuestionReportProps } from "master-table";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrayParam, useQueryParams } from "use-query-params";
import { ResultReportAssessment } from "../../../@types/store/reducer/plugin.reducer";
import { BorderBtn, PrimaryBtn } from "../../components/buttons/primaryBtn";
import CustomSwitch from "../../components/CheckBox/Switch";
import CircleWithNum from "../../components/custom/CircleWithNum";
import Dropdown from "../../components/Dropdown";
import IconBellBing from "../../components/Icon/IconBellBing";
import IconCaretDown from "../../components/Icon/IconCaretDown";
import IconCopy from "../../components/Icon/IconCopy";
import IconDownload from "../../components/Icon/IconDownload";
import IconMenuDots from "../../components/Icon/IconMenuDots";
import IconPencil from "../../components/Icon/IconPencil";
import IconPlus from "../../components/Icon/IconPlus";
import IconTrashLines from "../../components/Icon/IconTrashLines";
import { MultiSelectInput, SelectInput } from "../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { BoxCard } from "../../components/Layouts/BoxCard";
import TableComponent from "../../components/Tables";
import { IRootState } from "../../store";
import { getAssessmentQuestionReport, getAssessmentResultReport } from "../../store/actions/masterTable.action";
import { copyAssessment, deleteAssessment, sendAssessmentNotification, setActiveAssessment } from "../../store/actions/plugin.action";
import { logActivity } from "../../store/actions/report.action";
import { clearAllCaderTypes, cleartAllCaderTypeList, cleartAllStateList, getAllCaderTypeList, getAllCaderTypes, getAllStateList, getCaderBytypesList } from "../../store/reducer/masterTable.reducer";
import { clearAllAssessmentList, getAllAssessmentList } from "../../store/reducer/plugin.reducer";
import { hasSinglePermission } from "../../utils/functions";
import { ErrorToast, SuccessToast, WarningToast } from "../../utils/toasts";

const Assessments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "25", search: "", stateId: ArrayParam, cadreTypes: ArrayParam, language: "", cadreId: ArrayParam, sortOrder: "", sortBy: ""
    });
    const { stateList, caderList, allCaderTypes } = useSelector((state: IRootState) => state.master);
    const { AssessmentList, loader } = useSelector((state: IRootState) => state.plugin);
    const clearFilters = () => {
        setQuery({
            page: "1",
            limit: "25",
            search: null,
            stateId: [],
            cadreId: null,
            language: null,
            cadreTypes: [],
            sortOrder: null,
            sortBy: null
        });
    };

    const wrapInQuotes = (value: string) => {
        if (/[,"\n]/.test(value)) {
            return `"${value.replace(/"/g, "\"\"")}"`;
        }
        return value;
    };
    const QuestionReportDownload = (reportData: assessmentQuestionReportProps) => {
        const csvHeaders = [
            "Assessment Title",
            "Time to Complete (mins)",
            "Question",
            "Option1",
            "Option2",
            "Option3",
            "Option4",
            "Correct Answer",
            "Assessment Date",
        ];
        const csvRows = reportData?.questions?.map((question: any) => {
            const assessmentTitle = wrapInQuotes(reportData.title?.en || "-");
            const timeToComplete = reportData.timeToComplete || "-";
            const assessmentDate = wrapInQuotes(new Date(reportData.createdAt).toLocaleDateString() || "-");
            const questionText = wrapInQuotes(question.question || "-");
            const option1 = wrapInQuotes(question.option1 || "-");
            const option2 = wrapInQuotes(question.option2 || "-");
            const option3 = wrapInQuotes(question.option3 || "-");
            const option4 = wrapInQuotes(question.option4 || "-");
            const correctAnswer = wrapInQuotes(question.correctAnswer || "-");
            return [
                assessmentTitle,
                timeToComplete,
                questionText,
                option1,
                option2,
                option3,
                option4,
                correctAnswer,
                assessmentDate,
            ].join(",");
        });

        const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Assessment_Question_Report_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    function ResultReportDownload(reportData: ResultReportAssessment[]) {
        const headers = [
            "Assessment Title", "Name", "Cadre", "State", "District",
            "Block", "Health Facility", "Mobile No.", "Total Marks",
            "Obtained Marks", "Wrong Answer", "Skipped", "Assessment Submit Date"
        ];
        const uniqueQuestions = new Set();
        reportData.forEach((item: any) => {
            item.history.forEach((question: any) => {
                uniqueQuestions.add({
                    id: question.questionId._id,
                    title: question.questionId.question
                });
            });
        });
        const questionArray = Array.from(uniqueQuestions);
        questionArray.forEach((question: any, index) => {
            headers.push(wrapInQuotes(question.title));
        });
        const csvRows = [];
        csvRows.push(headers.join(","));
        reportData.forEach((item: any) => {
            const assessmentTitle = wrapInQuotes(item.assessmentId?.title.en || "-");
            const user = item.userId || {};
            const state = wrapInQuotes(user?.stateId?.title || "-");
            const district = wrapInQuotes(user?.districtId?.title || "-");
            const block = wrapInQuotes(user?.blockId?.title || "-");
            const healthFacility = wrapInQuotes(user?.healthFacilityId?.healthFacilityCode || "-");
            const totalMarks = wrapInQuotes(item?.totalMarks || "-");
            const obtainedMarks = wrapInQuotes(item?.obtainedMarks || "-");
            const wrongAnswers = wrapInQuotes(item?.wrongAnswer || "-");
            const skipped = wrapInQuotes(item?.skip || "-");
            const assessmentSubmitDate = wrapInQuotes(new Date(item?.updatedAt).toLocaleDateString() || "-");
            const mobileNo = wrapInQuotes(user?.phoneNo || "-");
            const cadre = wrapInQuotes(user?.cadreId?.title || "-");
            const name = wrapInQuotes(user?.name || "-");
            const row = [
                assessmentTitle, name, cadre, state, district, block,
                healthFacility, mobileNo, totalMarks, obtainedMarks,
                wrongAnswers, skipped, assessmentSubmitDate
            ];
            questionArray.forEach((question: any) => {
                const answeredQuestion = item.history.find((q: any) => q.questionId._id === question.id);
                if (answeredQuestion && answeredQuestion.isCorrect) {
                    row.push(wrapInQuotes("1"));
                } else {
                    row.push(wrapInQuotes("0"));
                }
            });
            csvRows.push(row.join(","));
        });
        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `Assessment_Result_Report_${Date.now()}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "25", sortBy: "active", sortOrder: "desc" });
        } else {
            dispatch(getAllAssessmentList(window.location.search));
        }
        if (query.cadreTypes) {
            const searchParams = new URLSearchParams();
            query.cadreTypes.forEach((key) => {
                if (key)
                    searchParams.append("cadreTypes", key);
            });
            dispatch(getCaderBytypesList("?" + searchParams?.toString()));
        }
    }, [window.location.search, query]);
    useEffect(() => {
        if (!query?.cadreTypes) {
            dispatch(getCaderBytypesList(""));
        }
    }, [query?.cadreTypes]);
    useEffect(() => {
        dispatch(getCaderBytypesList(""));
        dispatch(getAllCaderTypeList());
        dispatch(getAllStateList());
        dispatch(getAllCaderTypes());
        return () => {
            dispatch(clearAllAssessmentList());
            dispatch(clearAllCaderTypes());
            dispatch(cleartAllCaderTypeList());
            dispatch(cleartAllStateList());
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
                onClick={() => navigate("/assessment/landing-page")} />
            <BoxCard>
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                    <div className="flex items-center flex-wrap gap-3">
                        <CircleWithNum title='Assessments'
                            number={AssessmentList?.totalItems} />
                        <PrimaryTextInput
                            id={"search"}
                            type="text"
                            placeholder="Search Assessment..."
                            className="form-input w-auto"
                            value={query.search || ""}
                            onChange={(e) => {
                                setQuery({ search: e });
                            }}
                        />
                        <PrimaryBtn
                            title=" Clear Filters"
                            onClick={clearFilters} />
                    </div>
                    <div className="flex items-center flex-wrap gap-3">
                        <AuthLayout actions={["admin.assessment.create"]}>
                            <PrimaryBtn
                                title="Add New"
                                leftIcon={<IconPlus />}
                                onClick={() => {
                                    navigate(`/assessment/create/add?${window.location.search}`);
                                }}
                            />
                        </AuthLayout>
                    </div>
                </div>
                <TableComponent
                    idAccessor={({ _id }: any) => _id}
                    columns={[{
                        accessor: "title", title: "Assessment title",
                        render(record: any) {
                            return record?.title?.en || record?.title?.gu || record?.title?.hi;
                        },
                    },
                    {
                        accessor: "language",
                        title: "Language",
                        render(record) {
                            const languageMap: any = {
                                en: "English",
                                gu: "Gujarati",
                                hi: "Hindi"
                            };
                            return languageMap[record.language] || "Unknown Language";
                        },
                        filtering: query?.language ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    className="min-w-48"
                                    id="qLevel"
                                    value={query?.language as string}
                                    onChange={(e) => {
                                        setQuery({ page: "1", language: e });

                                    }}
                                    options={
                                        [
                                            { label: "English", value: "en" },
                                            { label: "Gujarati", value: "gu" },
                                            { label: "Hindi", value: "hi" },
                                        ]}
                                />
                            );
                        }
                    },
                    {
                        accessor: "cadreType", title: "Cadre type", sortable: true,
                        filtering: query?.cadreTypes ? true : false,
                        render(record) {
                            return record?.cadreType?.[0]?.replace("_", " ");
                        },
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="cadreTypes"
                                    value={query?.cadreTypes as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", cadreTypes: e, cadreId: undefined });
                                    }}
                                    options={[
                                        { label: "All", value: "All" },
                                        ...(Array.isArray(allCaderTypes) ? allCaderTypes.map((e: any) => ({
                                            label: e?.replace("_", " "),
                                            value: e
                                        })) : [])]}
                                />
                            );
                        },
                    },
                    {
                        accessor: "cadreId",
                        title: "Cadre",
                        render(record: any) {
                            return record?.isAllCadre ? (
                                <span>All Cadre Selected</span>
                            ) : (
                                record?.cadreId?.map((cadre: any) => cadre.title).join(", ")
                            );
                        },
                        filtering: query?.cadreId ? true : false,
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"

                                    id="cadreId"
                                    value={query?.cadreId as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", cadreId: e });

                                    }}
                                    options={caderList?.map((e) => ({
                                        label: e.title,
                                        value: e._id
                                    }))}
                                />
                            );
                        },
                    }, {
                        accessor: "stateId",
                        title: "State",
                        render(record: any) {
                            return record?.isAllState ? (
                                <span>All States Selected</span>
                            ) : (
                                record?.stateId?.map((state: any) => state.title).join(", ")
                            );
                        },
                        filtering: query?.stateId ? true : false,
                        filter(params) {
                            return (
                                <MultiSelectInput

                                    className="min-w-48"
                                    id="stateId"
                                    value={query?.stateId as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", stateId: e });

                                    }}
                                    options={stateList?.map((e: any) => ({
                                        label: e.title,
                                        value: e._id
                                    }))}
                                />
                            );
                        },
                    }, {
                        accessor: "questions",
                        title: "Total Question",
                        render(record: any) {
                            return record?.questions?.length || 0;
                        }
                    },
                    {
                        accessor: "createdBy?.firstName",
                        title: "Created By",
                        render(record: any) {
                            return record.createdBy?.firstName + " " + record?.createdBy?.lastName;
                        }
                    }, {
                        accessor: "assessmentType",
                        title: "Assessment Type",
                        render(record: any) {
                            return record.assessmentType === "Planned" ? "Planned" : "Real Time";
                        }
                    }, {
                        accessor: "active",
                        title: "Activated",
                        sortable: true,
                        render(record: any) {
                            return <CustomSwitch
                                id="active"
                                checked={record?.active}
                                onChange={(e) => {
                                    dispatch(setActiveAssessment({ assessmentId: record?._id, active: e }, (res) => {
                                        if (res.status) {
                                            SuccessToast("Successfully Saved!");
                                            dispatch(getAllAssessmentList(window.location.search));
                                        } else {
                                            ErrorToast(res.message);
                                        }
                                    }));
                                }} />;
                        }
                    },
                    {
                        accessor: "timeToComplete",
                        title: "Time to complete (in Minutes)",
                    }, {
                        accessor: "createdAt", title: "Created At", sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        },
                    },
                    {
                        accessor: "action",
                        title: "Actions",
                        titleClassName: "!text-center w-[5%]",
                        render: (item: any) => (
                            <AuthLayout actions={["admin.assessment.edit", "admin.assessment.delete", "admin.assessment.copy", "admin.assessment-report.export", "admin.patient-assessment.export"]}
                                showDash>
                                <div className="text-center">
                                    <div className="dropdown"
                                        onClick={(e) => e.stopPropagation()}>
                                        <Dropdown
                                            placement={"bottom-end"}
                                            btnClassName="bg-white border-[#ECE1D7] rounded-md p-1 border-1 opacity-70"
                                            button={<IconMenuDots />}
                                        >
                                            <ul className=" w-[170px]">
                                                {(moment(item.fromDate).diff(moment(), "minutes") > 30 && item?.assessmentType == "Planned") || (item?.isCopy && !item?.active) || (item?.assessmentType == "real_time" && !item?.active) ?
                                                    <AuthLayout actions={["admin.assessment.edit"]}>
                                                        <li>
                                                            <button type="button"
                                                                onClick={() => {
                                                                    navigate(`/assessment/create/add${window.location.search}&id=${item._id}`);
                                                                }}><div className="flex justify-between items-center w-full">Edit <IconPencil /></div></button>
                                                        </li>
                                                    </AuthLayout> : null
                                                }
                                                <AuthLayout actions={["admin.assessment.delete"]}>
                                                    <li>
                                                        <button type="button"
                                                            onClick={() => {
                                                                WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                                    if (isConfirmed) {
                                                                        dispatch(deleteAssessment(
                                                                            item._id,
                                                                            (res) => {
                                                                                if (res.status) {
                                                                                    dispatch(logActivity({
                                                                                        "action": "delete",
                                                                                        "moduleName": window.location.pathname,
                                                                                        "payload": item
                                                                                    }));
                                                                                    SuccessToast(res?.message);
                                                                                    dispatch(getAllAssessmentList(window.location.search));
                                                                                } else {
                                                                                    ErrorToast(res?.message);
                                                                                }
                                                                            }));
                                                                    }
                                                                });
                                                            }}><div className="flex justify-between items-center w-full ">Delete <IconTrashLines /></div></button>
                                                    </li>
                                                </AuthLayout>
                                                <AuthLayout actions={["admin.assessment-report.export"]}>
                                                    <li>
                                                        <button type="button"
                                                            onClick={() => {
                                                                dispatch(getAssessmentQuestionReport(item._id, (res: any) => {
                                                                    if (res.status) {
                                                                        QuestionReportDownload(res?.data);
                                                                    } else {
                                                                        ErrorToast(res?.message);
                                                                    }
                                                                }));
                                                            }}><div className="flex justify-between items-center w-full ">Question Report <IconDownload /></div></button>
                                                    </li>
                                                </AuthLayout>
                                                <AuthLayout actions={["admin.patient-assessment.export"]}>
                                                    <li>
                                                        <button type="button"
                                                            onClick={() => {
                                                                dispatch(getAssessmentResultReport(item._id, (res: any) => {
                                                                    if (res.status) {
                                                                        ResultReportDownload(res?.data);
                                                                    } else {
                                                                        ErrorToast(res?.message);
                                                                    }
                                                                }));
                                                            }}><div className="flex justify-between items-center w-full ">Result Report <IconDownload /></div></button>
                                                    </li>
                                                </AuthLayout>
                                                <AuthLayout actions={["admin.assessment.copy"]}>
                                                    <li>
                                                        <button type="button"
                                                            onClick={() => {
                                                                dispatch(copyAssessment(
                                                                    item._id,
                                                                    (res) => {
                                                                        if (res.status) {
                                                                            dispatch(getAllAssessmentList(window.location.search));
                                                                        } else {
                                                                            ErrorToast(res?.message);
                                                                        }
                                                                    }
                                                                ));
                                                            }}><div className="flex justify-between items-center w-full ">Duplicate <IconCopy /></div></button>
                                                    </li>
                                                </AuthLayout>
                                                {item?.active && !item?.initialInvitation &&
                                                    <li>
                                                        <button type="button"
                                                            onClick={() => {
                                                                dispatch(sendAssessmentNotification(item?._id,
                                                                    (res: any) => {
                                                                        if (res.status == 201) {
                                                                            SuccessToast("Notifications are in Queue!!");
                                                                            dispatch(getAllAssessmentList(window.location.search));
                                                                        } else {
                                                                            ErrorToast("Error");
                                                                        }
                                                                    }));
                                                            }}>
                                                            <div className="flex justify-between items-center w-full ">Notify <IconBellBing /></div>
                                                        </button>
                                                    </li>
                                                }

                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                            </AuthLayout>
                        ),
                    }
                    ]}
                    isloading={loader}
                    records={AssessmentList?.list}
                    totalRecords={AssessmentList?.totalItems}
                    page={AssessmentList?.currentPage || undefined}
                    onRowClick={({ record }) => {
                        if (hasSinglePermission("admin.assessment.edit"))
                            if (moment(record.fromDate).diff(moment(), "minutes") > 30 && record?.assessmentType == "Planned" || (record?.isCopy && record?.active == false))
                                navigate(`/assessment/create/add${window.location.search}&id=${record._id}`);
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
                    recordsPerPage={parseInt(query?.limit || "25")}
                    recordsPerPageOptions={[25, 35, 55, 100]}
                    onRecordsPerPageChange={(e) => {
                        setQuery({ page: "1", limit: e.toString() });
                    }} />
            </BoxCard>
        </>
    );
};

export default Assessments;
