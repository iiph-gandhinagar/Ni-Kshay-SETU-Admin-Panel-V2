import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrayParam, useQueryParams } from "use-query-params";
import { QuestionProps } from "../../../../@types/store/reducer/plugin.reducer";
import { BorderBtn, PrimaryBtn } from "../../../components/buttons/primaryBtn";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import IconDownload from "../../../components/Icon/IconDownload";
import IconPencil from "../../../components/Icon/IconPencil";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { MultiSelectInput, SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TableComponent from "../../../components/Tables";
import { IRootState } from "../../../store";
import { deleteQuestion, getQuestionsWithoutPaginationReport } from "../../../store/actions/plugin.action";
import { logActivity } from "../../../store/actions/report.action";
import { clearAllCaderTypes, cleartAllCaderTypeList, getAllCaderTypeList, getAllCaderTypes, getCaderBytypesList } from "../../../store/reducer/masterTable.reducer";
import { clearAllQuestionList, getAllQuestionList } from "../../../store/reducer/plugin.reducer";
import { hasSinglePermission } from "../../../utils/functions";
import { ErrorToast, SuccessToast, WarningToast } from "../../../utils/toasts";


const wrapInQuotes = (value: string) => {
    value = value.trim();
    if (/[,";\n\t]/.test(value)) {
        return `"${value.replace(/"/g, "\"\"").replace(/;/g, ";;").replace(/\t/g, " ")}"`;
    }
    return value;
};
const QuestionReportDownload = (reportData: Array<QuestionProps>) => {
    const csvHeaders = [
        "Language",
        "Question",
        "Option1",
        "Option2",
        "Option3",
        "Option4",
        "Correct Answer",
        "Explanation",
        "Question Type",
        "Category",
        "Created At",
    ];
    const csvRows = reportData?.map((question: QuestionProps) => {
        const language = wrapInQuotes(question.language || "-");
        const questionText = wrapInQuotes(question.question || "-");
        const option1 = wrapInQuotes(question.option1 || "-");
        const option2 = wrapInQuotes(question.option2 || "-");
        const option3 = wrapInQuotes(question.option3 || "-");
        const option4 = wrapInQuotes(question.option4 || "-");
        const correctAnswer = wrapInQuotes(question.correctAnswer || "-");
        const explanation = wrapInQuotes(question.explanation || "-");
        const questionType = wrapInQuotes(question.qLevel || "-");
        const category = wrapInQuotes(question.category || "-");
        const createdAt = wrapInQuotes(moment(question.createdAt).format("DD MMM YYYY,hh:mm a") || "-");
        return [
            language,
            questionText,
            option1,
            option2,
            option3,
            option4,
            correctAnswer,
            explanation,
            questionType,
            category,
            createdAt,
        ].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `questions_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const QuestionBank = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "25", search: "", sortOrder: "", sortBy: "", qLevel: "", category: "", language: "", cadreTypes: ArrayParam, cadreId: ArrayParam
    });
    const clearFilters = () => {
        setQuery({
            page: "1",
            limit: "25",
            search: null,
            qLevel: null,
            language: null,
            category: null,
            cadreId: null,
            cadreTypes: null,
            sortBy: null,
            sortOrder: null,
        });
    };
    const { stateList, caderList, allCaderTypes } = useSelector((state: IRootState) => state.master);
    const { reportLoader } = useSelector((state: IRootState) => state.report);
    const { QuestionList, loader } = useSelector((state: IRootState) => state.plugin);
    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "25" });
        } else {
            dispatch(getAllQuestionList(window.location.search));
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
        dispatch(getAllCaderTypeList());
        dispatch(getCaderBytypesList(""));
        dispatch(getAllCaderTypes());
        return () => {
            dispatch(clearAllQuestionList());
            dispatch(clearAllCaderTypes());
            dispatch(cleartAllCaderTypeList());
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
                        <CircleWithNum title='Assessment Questions'
                            number={QuestionList?.totalItems} />
                        <PrimaryTextInput
                            id={"search"}
                            type="text"
                            placeholder="Search Question..."
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
                        <PrimaryBtn
                            title="Questions List"
                            leftIcon={!reportLoader && <IconDownload />}
                            isLoading={reportLoader}
                            onClick={() => {
                                const searchParams = new URLSearchParams(window.location.search);
                                searchParams.delete("page");
                                searchParams.delete("limit");
                                dispatch(getQuestionsWithoutPaginationReport(`?${searchParams}`
                                    , (res) => {
                                        if (res?.status) {
                                            const questionData = res.data;
                                            if (Array.isArray(questionData)) {
                                                QuestionReportDownload(questionData);
                                            } else {
                                                ErrorToast("Unexpected data format received.");
                                            }
                                        } else {
                                            ErrorToast(res.message);
                                        }
                                    }
                                ));
                            }}
                        />
                        <AuthLayout actions={["admin.assessment-question.create"]}>
                            <PrimaryBtn
                                title="Add New"
                                leftIcon={<IconPlus />}
                                onClick={() => {
                                    navigate(`/assessment/question_bank/add?${window.location.search}`);
                                }}
                            />
                        </AuthLayout>
                    </div>
                </div>
                <TableComponent
                    idAccessor={({ _id }: any) => _id}
                    columns={[{ accessor: "_id", hidden: true },
                    {
                        accessor: "sr", title: "Sr. no", render(rec, index) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "25");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    }, {
                        accessor: "question",
                        title: "Question",
                        sortable: true,
                    },
                    {
                        accessor: "language",
                        title: "Language",
                        sortable: true,
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
                        sortable: true,
                        render(record: any) {
                            if (record?.isAllCadre) {
                                return <span>All Cadre Selected</span>;
                            }
                            if (record?.cadreId?.length > 5) {
                                return <span>Multiple Cadres Selected</span>;
                            }
                            return record?.cadreId?.map((cadre: any) => cadre?.title).join(", ");
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
                    },
                    {
                        accessor: "correctAnswer",
                        title: "Correct Answer",
                        sortable: true,
                        render(record) {
                            const correctAnswerKey: string = record?.correctAnswer;
                            const correctAnswerValue = record?.[correctAnswerKey];
                            return correctAnswerValue || "No correct answer";
                        }
                    },
                    {
                        accessor: "category",
                        title: "Category",
                        sortable: true,
                        filtering: query?.category ? true : false,
                        render(record) {
                            return record?.category ? record?.category : "-";
                        },
                        filter(params) {
                            return (
                                <SelectInput
                                    className="min-w-48"
                                    id="Category"
                                    value={query?.category}
                                    onChange={(e) => {
                                        setQuery({ page: "1", category: e });

                                    }}
                                    options={[
                                        { value: "Adverse Drug Reaction Management", label: "Adverse Drug Reaction Management" },
                                        { value: "Case Findings and Diagnostic Strategy", label: "Case Findings and Diagnostic Strategy" },
                                        { value: "Infection Control Measures", label: "Infection Control Measures" },
                                        { value: "Public Health Actions (PHA)", label: "Public Health Actions (PHA)" },
                                        { value: "Recordings and Reporting", label: "Recordings and Reporting" },
                                        { value: "Treatment of TB", label: "Treatment of TB" },
                                        { value: "New PMDT", label: "New PMDT" },
                                        { value: "Programmatic Management of TB preventive Treatment (PMTPT)", label: "Programmatic Management of TB preventive Treatment (PMTPT)" },
                                        { value: "Supply Chain Management", label: "Supply Chain Management" },
                                        { value: "Diagnostic QA Mechanism", label: "Diagnostic QA Mechanism" },
                                        { value: "Surveillance", label: "Surveillance" },
                                        { value: "Supervision and M&E", label: "Supervision and M&E" },
                                        { value: "NPY - Incentive", label: "NPY - Incentive" },
                                        { value: "Programmatic Knowledge on NTEP", label: "Programmatic Knowledge on NTEP" },
                                        { value: "ACSM", label: "ACSM" },
                                        { value: "Program Implementation Plan - NHM", label: "Program Implementation Plan - NHM" },
                                        { value: "TB Comorbidities", label: "TB Comorbidities" },
                                        { value: "No Category", label: "No Category" }
                                    ]}

                                />
                            );
                        }
                    }, {
                        accessor: "qLevel",
                        title: "Type",
                        sortable: true,
                        render(record) {
                            return record?.qLevel ? record?.qLevel.toUpperCase() : "-";
                        },
                        filtering: query?.qLevel ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    className="min-w-48"
                                    id="qLevel"
                                    value={query?.qLevel as string}
                                    onChange={(e) => {
                                        setQuery({ page: "1", qLevel: e });

                                    }}
                                    options={
                                        ["Easy", "Moderate", "Hard"].map((e) => ({
                                            label: e,
                                            value: e
                                        }))}
                                />
                            );
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
                            <AuthLayout actions={["admin.assessment-question.edit", "admin.assessment-question.delete"]}
                                showDash>
                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                    <AuthLayout actions={["admin.assessment-question.edit"]}>
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    navigate(`/assessment/question_bank/add${window.location.search}&id=${item._id}`);
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    </AuthLayout>
                                    <AuthLayout actions={["admin.assessment-question.delete"]}>
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteQuestion(
                                                                item._id,
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        SuccessToast(res?.message);
                                                                        dispatch(getAllQuestionList(window.location.search));
                                                                    } else {
                                                                        ErrorToast(res?.message);
                                                                    }
                                                                }));
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
                    records={QuestionList?.list}
                    totalRecords={QuestionList?.totalItems}
                    page={QuestionList?.currentPage || undefined}
                    onSortStatusChange={(item) => {
                        setQuery({ page: "1", sortOrder: item?.direction, sortBy: item?.columnAccessor?.toLocaleString() });
                    }}
                    sortStatus={{
                        columnAccessor: query?.sortBy || "_id",
                        direction: query?.sortOrder === "desc" ? "desc" : "asc"
                    }}
                    onRowClick={({ record }) => {
                        if (hasSinglePermission("admin.assessment-question.edit"))
                            navigate(`/assessment/question_bank/add${window.location.search}&id=${record._id}`);
                    }}
                    onPageChange={(page) => {
                        setQuery({ page: page.toString() });
                    }}
                    recordsPerPage={parseInt(query?.limit || "25")}
                    recordsPerPageOptions={[25, 35, 55, 100]}
                    onRecordsPerPageChange={(e) => {
                        setQuery({ page: "1", limit: e.toString() });
                    }}
                />
            </BoxCard>
        </>
    );
};

export default QuestionBank;
