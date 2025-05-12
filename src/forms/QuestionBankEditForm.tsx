import { useFormik } from "formik";
import { QuestionBankFormProps } from "formTypes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";
import { BorderBtn, PrimaryBtn } from "../components/buttons/primaryBtn";
import IconCaretDown from "../components/Icon/IconCaretDown";
import { MultiSelectInput, SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import { IRootState } from "../store";
import { createQuestion, updateQuestion } from "../store/actions/plugin.action";
import { logActivity } from "../store/actions/report.action";
import { clearCaderBytypesList, cleartAllCaderTypeList, getAllCaderTypeList, getCaderBytypesList } from "../store/reducer/masterTable.reducer";
import { clearQuestionById, getQuestionById } from "../store/reducer/plugin.reducer";
import { getUpdatedFields, handleAllSelection } from "../utils/functions";
import { ErrorToast, SuccessToast } from "../utils/toasts";


const validationSchema = Yup.object().shape({
    question: Yup.string().required("Required").trim().min(1, "Required"),
    option1: Yup.string().required("Required").trim().min(1, "Required"),
    option2: Yup.string().required("Required").trim().min(1, "Required"),
    correctAnswer: Yup.string().oneOf(["option1", "option2", "option3", "option4"], "Correct answer must be one of the options").required("Required"),
    language: Yup.string().required("Required"),
});

const QuestionBankEditForm = () => {
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const { questionById } = useSelector((state: IRootState) => state.plugin);
    const { cadreTypeList, caderList } = useSelector((status: IRootState) => status.master);
    const [id] = useQueryParam("id", StringParam);
    const [language, setLanguage] = useState(translationLang);
    const InitialCadreId = questionById?.isAllCadre ? caderList?.map((e) => e?._id) : questionById?.cadreId?.map((Cadre: any) => Cadre);
    const initialValues: QuestionBankFormProps = {
        question: questionById?.question || "",
        option1: questionById?.option1 || "",
        option2: questionById?.option2 || "",
        option3: questionById?.option3 || "",
        option4: questionById?.option4 || "",
        isAllCadre: questionById?.isAllCadre || false,
        cadreId: InitialCadreId || [],
        cadreType: questionById?.cadreType || [],
        correctAnswer: questionById?.correctAnswer || "",
        explanation: questionById?.explanation || "",
        language: questionById?.language || "",
        category: questionById?.category || "",
        qLevel: questionById?.qLevel || "",
        isVisible: true,
    };


    const formik = useFormik<QuestionBankFormProps>({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit(values: any) {
            if (values.isAllCadre) {
                values.cadreId = [];
            }
            if (questionById) {
                dispatch(
                    updateQuestion(
                        questionById?._id,
                        getUpdatedFields({
                            question: questionById?.question,
                            option1: questionById?.option1,
                            option2: questionById?.option2,
                            option3: questionById?.option3,
                            option4: questionById?.option4,
                            cadreType: questionById?.cadreType,
                            cadreId: questionById?.cadreId,
                            correctAnswer: questionById?.correctAnswer,
                        }, values),
                        (res) => {
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: questionById,
                                        new: res?.data
                                    }
                                }));
                                SuccessToast(res?.message);
                                const searchParams = new URLSearchParams(window.location.search);
                                searchParams.delete("id");
                                navigate(`/assessment/question_bank?${searchParams}`);
                            } else {
                                ErrorToast(res.message);
                            }
                        }
                    ));
            } else {
                dispatch(
                    createQuestion(
                        values,
                        (res) => {
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
                                SuccessToast(res?.message);
                                resetForm();
                                if (redirect) {
                                    const searchParams = new URLSearchParams(window.location.search);
                                    searchParams.delete("id");
                                    navigate(`/assessment/question_bank?${searchParams}`);
                                }
                            } else {
                                ErrorToast(res.message);
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const fieldName = Object.keys(error)[0];
                                        const errorMessage = error[fieldName];
                                        setFieldError(fieldName.toLowerCase(), errorMessage);
                                    });
                                }
                            }
                        }
                    )
                );
            }
        },
        validationSchema,
    });
    const { values, setFieldValue, errors, touched, handleSubmit, resetForm, isSubmitting, dirty, setFieldError, setFieldTouched } = formik;
    useEffect(() => {
        dispatch(getAllCaderTypeList());
        if (id) {
            dispatch(getQuestionById(id));
        }
        return () => {
            dispatch(cleartAllCaderTypeList());
            dispatch(clearCaderBytypesList());
            dispatch(clearQuestionById());
        };
    }, []);
    useEffect(() => {
        if (formik?.values?.isAllCadre) {
            setFieldValue("cadreId", caderList?.map((e: any) => e._id));
        }
    }, [JSON.stringify(caderList), formik.values.isAllCadre]);
    useEffect(() => {
        if (!formik.values?.cadreType.includes("All") && formik.values?.cadreType?.length > 0) {
            const selectedCadres = formik.values?.cadreType?.join("&cadreTypes=");
            dispatch(getCaderBytypesList(`?cadreTypes=${selectedCadres}`));
        } else if (formik.values?.cadreType.includes("All")) {
            dispatch(getCaderBytypesList("?cadreTypes=all"));
        }
        return () => {
            dispatch(clearCaderBytypesList());
        };
    }, [formik.values?.cadreType]);
    return (
        <>
            <div className="mb-3">
                <BorderBtn
                    title={"Back"}
                    borderColor='border-primary'
                    textColor='text-primary'
                    leftIcon={<IconCaretDown className="rotate-90" />}
                    onClick={() => {
                        const searchParams = new URLSearchParams(window.location.search);
                        searchParams.delete("id");
                        navigate(`/assessment/question_bank?${searchParams}`);
                    }} />
            </div>
            <BoxCard headerName={questionById?._id ? "Edit Question" : "Add New Question"}
                className="mb-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">

                    <SelectInput
                        label="Language*"
                        placeholder={"Select Option"}
                        id="cadreType"
                        options={[
                            { label: "English", value: "en" },
                            { label: "Gujarati", value: "gu" },
                            { label: "Hindi", value: "hi" },
                        ]}
                        onChange={(e) => {
                            setFieldValue("language", e);
                            if (e == "gu") {
                                setLanguage("gu");
                            } else
                                if (e == "hi") {
                                    setLanguage("hi");
                                }
                                else {
                                    setLanguage("en");
                                }
                        }}
                        value={values.language}
                        errors={errors.language as string}
                        touched={touched.language as boolean}
                    />
                    <SelectInput
                        label="Category"
                        id="Category"
                        value={values?.category}
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
                        onChange={(e) => setFieldValue("category", e)}
                    />
                    <SelectInput
                        label="Question Level"
                        id="questionLevel"
                        value={values?.qLevel}
                        options={[
                            { value: "easy", label: "Easy" },
                            { value: "moderate", label: "Moderate" },
                            { value: "hard", label: "Hard" },
                        ]}
                        onChange={(e) => {
                            setFieldValue("qLevel", e);
                        }}
                        errors={errors?.qLevel}
                        touched={touched?.qLevel}
                    />
                </div>
                <PrimaryTextInput
                    className="mb-3"
                    type="text"
                    id="Question"
                    label="Question*"
                    placeholder="Question"
                    value={values?.question}
                    onChange={(e) => setFieldValue("question", e)}
                    errors={errors.question}
                    touched={touched.question}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <PrimaryTextInput
                        type="text"
                        label="Option 1*"
                        id="Option1"
                        placeholder="Option 1"
                        value={values?.option1}
                        onChange={(e) => setFieldValue("option1", e)}
                        errors={errors.option1}
                        touched={touched.option1}
                    />
                    <PrimaryTextInput
                        type="text"
                        label="Option 2*"
                        id="Option2"
                        placeholder="Option 2"
                        value={values.option2}
                        onChange={(e) => setFieldValue("option2", e)}
                        errors={errors.option2}
                        touched={touched.option2}
                    />
                    <PrimaryTextInput
                        type="text"
                        label="Option 3"
                        id="Option3"
                        placeholder="Option 3"
                        value={values?.option3}
                        onChange={(e) => setFieldValue("option3", e)}
                        errors={errors.option3}
                        touched={touched.option3}
                    />
                    <PrimaryTextInput
                        type="text"
                        label="Option 4"
                        id="Option4"
                        placeholder="Option 4"
                        value={values?.option4}
                        onChange={(e) => setFieldValue("option4", e)}
                        errors={errors.option4}
                        touched={touched.option4}
                    />
                    <MultiSelectInput
                        className="mb-4"
                        label="Cadre Type"
                        id="cadreType"
                        isSelectAll
                        options={
                            [{ label: "All", value: "All" }, ...(Array.isArray(cadreTypeList) ? cadreTypeList.map((e: any) => ({
                                label: e?.replace("_", " "),
                                value: e
                            })) : [])]}
                        onChange={(e) => {
                            setFieldTouched("cadreId", true);
                            setFieldValue("cadreId", []);
                            setFieldValue("isAllCadre", false);
                            setFieldValue("cadreType", e);
                        }}
                        value={values.cadreType}
                        errors={errors.cadreType as string}
                        touched={touched.cadreType as boolean}
                        placeholder={"Select Option"}
                    />
                    <div className="mb-4">
                        <MultiSelectInput
                            isSelectAll
                            className="mb-4"
                            label="Cadre"
                            id="cadre"
                            value={values.cadreId as string[]}
                            placeholder={"Select Option"}
                            options={
                                [...(Array.isArray(caderList) ? caderList.map((e: any) => ({
                                    label: e?.title,
                                    value: e?._id
                                })) : [])]}
                            onChange={(e) => handleAllSelection(e, setFieldValue, caderList || [], "isAllCadre", "cadreId")}
                            errors={errors?.cadreId as string}
                            touched={touched?.cadreId as boolean}
                        />
                    </div>
                </div>
                <SelectInput
                    className="mb-3"
                    label="Correct Answer*"
                    id="CorrectAnswer"
                    value={values?.correctAnswer}
                    options={[
                        { value: "option1", label: "Option 1" },
                        { value: "option2", label: "Option 2" },
                        { value: "option3", label: "Option 3" },
                        { value: "option4", label: "Option 4" },
                    ]}
                    onChange={(e) => {
                        setFieldValue("correctAnswer", e);
                    }}
                    errors={errors?.correctAnswer}
                    touched={touched?.correctAnswer}
                />

                <PrimaryTextInput
                    className="mb-4"
                    label="Answer Explanation"
                    id="AnswerExplanation"
                    placeholder="Answer Explanation"
                    value={values?.explanation}
                    onChange={(e) => {
                        setFieldValue("explanation", e);
                    }}
                    errors={errors?.explanation}
                    touched={touched?.explanation}
                />

                <div className="flex gap-5 justify-end">
                    {!questionById &&
                        <PrimaryBtn
                            isUpper
                            title="Add Another"
                            onClick={() => {
                                setRedirect(false);
                                handleSubmit();
                            }}
                        />}
                    <PrimaryBtn
                        isUpper
                        isLoading={isSubmitting}
                        disabled={!dirty || isSubmitting}
                        title={questionById?._id ? "update" : "create"}
                        onClick={() => {
                            setRedirect(true);
                            handleSubmit();
                        }}
                    />
                </div>
            </BoxCard>
        </>
    );
};

export default QuestionBankEditForm;
