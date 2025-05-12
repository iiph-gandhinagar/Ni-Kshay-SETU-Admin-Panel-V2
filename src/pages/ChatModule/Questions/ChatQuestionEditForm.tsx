import Tippy from "@tippyjs/react";
import { useFormik } from "formik";
import { SystemQuestionEditFormProps } from "master-table-action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";
import { Checkbox } from "../../../components/CheckBox/checkbox";
import IconPlus from "../../../components/Icon/IconPlus";
import IconTrashLines from "../../../components/Icon/IconTrashLines";
import { SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TranslationsManagement from "../../../components/Layouts/Translations";
import { PrimaryBtn } from "../../../components/buttons/primaryBtn";
import { IRootState } from "../../../store";
import { updateSystemQuestionByID } from "../../../store/actions/chatModule.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanAllSystemQuestions, cleanSystemQuestionByID, createSystemQuestion, getSystemQuestionByID } from "../../../store/reducer/chatModule.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { getUpdatedFields } from "../../../utils/functions";
import { language } from "../../../utils/globle";
import { SuccessToast } from "../../../utils/toasts";
const questionValidation = Yup.object().shape({
    category: Yup.string().required("Required"),
});
const ChatQuestionEditForm = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useQueryParam("id", StringParam);
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const { systemQuestionById, loader } = useSelector((state: IRootState) => state.chatModule);
    const [addAnother, setAddAnother] = useState(false);
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            _id: systemQuestionById?._id,
            category: systemQuestionById?.category || "",
            title: systemQuestionById?.title || "",
            questions: systemQuestionById?.questions || [] as Array<{ [key: string]: string }>,
            answers: systemQuestionById?.answers || [] as Array<{ [key: string]: string }>,
            NTEPId: systemQuestionById?.NTEPId || undefined,
            active: systemQuestionById?.active || false
        } as SystemQuestionEditFormProps,
        onSubmit(values, formikHelpers) {
            if (systemQuestionById?._id) {
                dispatch(
                    updateSystemQuestionByID(
                        systemQuestionById?._id,
                        getUpdatedFields({
                            category: systemQuestionById?.category,
                            title: systemQuestionById?.title,
                            questions: systemQuestionById?.questions,
                            answers: systemQuestionById?.answers,
                            NTEPId: systemQuestionById?.category == "System-tools" ? undefined : systemQuestionById?.NTEPId,
                            active: systemQuestionById?.active
                        }, values),
                        (res) => {
                            formikHelpers.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: systemQuestionById,
                                        new: res?.data
                                    }
                                }));
                                formikHelpers.resetForm();
                                SuccessToast("Successfully Saved!");
                                dispatch(cleanSystemQuestionByID());
                                if (addAnother) {
                                    setQuery(undefined);
                                    setAddAnother(false);
                                } else {
                                    const searchParams = new URLSearchParams(window.location.search);
                                    searchParams.delete("id");
                                    navigate(`/chat/questions?${searchParams}`);
                                }
                            } else {
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                        setFieldError(fieldName, errorMessage);
                                    });
                                }
                            }
                        },
                    ));
            } else {
                dispatch(
                    createSystemQuestion({
                        obj: values,
                        callBack: (res: any) => {
                            formikHelpers.setSubmitting(false);
                            if (res?.status) {
                                if (addAnother) {
                                    SuccessToast("Successfully Saved!");
                                    setQuery(undefined);
                                    dispatch(cleanSystemQuestionByID());
                                    formikHelpers.resetForm();
                                    setAddAnother(false);
                                } else {
                                    dispatch(logActivity({
                                        "action": "create",
                                        "moduleName": window.location.pathname,
                                        "payload": res?.data
                                    }));
                                    SuccessToast("Successfully created!");
                                    const searchParams = new URLSearchParams(window.location.search);
                                    searchParams.delete("id");
                                    navigate(`/chat/questions?${searchParams}`);                                }
                            } else {
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                        setFieldError(fieldName, errorMessage);
                                    });
                                }
                            }
                        },
                    })
                );
            }
        },
        validationSchema: questionValidation
    });
    const { values, setFieldValue, errors, touched, handleSubmit, isSubmitting, dirty, setFieldError } = formik;
    useEffect(() => {
        if (query) {
            dispatch(getSystemQuestionByID(query));
        }
        dispatch(setPageTitle("Question Edit"));
    }, [query]);
    useEffect(() => {
        return () => {
            dispatch(cleanAllSystemQuestions());
            dispatch(cleanSystemQuestionByID());
        };
    }, []);
    return (
        <div>
            <BoxCard headerName={systemQuestionById?._id ? "Edit Chat Question" : "New Chat Question"}
                className="mb-4"
                rightComponent={values?.category && values?.category == "System-tools" ? <TranslationsManagement /> : null}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <SelectInput
                        label="Category*"
                        id="category"
                        options={[
                            { label: "NTEP-Kbase", value: "NTEP" },
                            { label: "System-tools", value: "System-tools" }]}
                        onChange={(e) => {
                            setFieldValue("category", e);
                            if (e == "NTEP") {
                                setFieldValue("questions", []);
                                setFieldValue("answers", []);
                            } else {
                                setFieldValue("NTEPId", undefined);
                            }
                        }}
                        value={values.category}
                        errors={errors.category}
                        touched={touched.category} />

                    {values.category &&
                        <PrimaryTextInput
                            className="w-500"
                            label="Title"
                            id="title"
                            type="text"
                            onChange={(e) => setFieldValue("title", e)}
                            value={values.title}
                            errors={errors.title}
                            touched={touched.title}
                        />}
                    {values.category && values.category == "NTEP" ?
                        <PrimaryTextInput
                            id="ntep"
                            label="NTEP ID"
                            type="number"
                            onChange={(e) => setFieldValue("NTEPId", parseFloat(e || "0"))}
                            value={values?.NTEPId}
                            errors={errors.NTEPId}
                            touched={touched.NTEPId}
                        /> : null}
                </div>
            </BoxCard>
            {values?.category && values?.category == "System-tools" ? <div>
                <div className="mt-4">
                    <BoxCard className="p-4"
                        headerName={"Questions"}
                        rightComponent={
                            <div className='flex gap-3'>
                                <PrimaryBtn
                                    title='Add New Question'
                                    leftIcon={<IconPlus />}
                                    onClick={() => {
                                        const obj = Object.assign([], values?.questions);
                                        obj.push({
                                            "en": "",
                                            "gu": "",
                                            "hi": ""
                                        });
                                        setFieldValue("questions", obj);
                                    }}
                                />
                            </div>}>
                        <div className="mt-3">
                            <PrimaryTextInput
                                className="font-bold"
                                id={"display"}
                                containerClassName="mt-4"
                                label={"Display Question (English)*"}
                                value={values?.questions?.[0]?.en}
                                errors={errors.questions}
                                touched={touched.questions}
                                onChange={(val) => {
                                    setFieldValue("questions[0].en", val);
                                }}
                                labelStyle={{ fontWeight: 600, fontSize: 16 }}
                            />
                            {translationLang &&
                                <PrimaryTextInput
                                    className={`${translationLang && translationLang === "gu" ? "border-[#008E97]" : "border-[#004bc9]"}`}
                                    containerClassName="mt-4"
                                    id={"display" + translationLang}
                                    label={"Display Question  " + "(" + language?.find((e) => e.value === translationLang)?.label + ")"}
                                    value={values.questions?.[0]?.[translationLang] || ""}
                                    onChange={(val) => {
                                        setFieldValue(`questions[0][${translationLang}]`, val);
                                    }}
                                    errors={errors.questions}
                                    touched={touched.questions}
                                    labelStyle={{ color: translationLang === "gu" ? "#008E97" : "#004bc9", fontSize: 16 }}
                                />
                            }
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                            {values?.questions?.slice(1)?.map((item, index) => {
                                return (
                                    <div key={index + 1}
                                        className="grid grid-cols-[auto_40px] items-start gap-4 mb-6 cursor-grab">
                                        <PrimaryTextInput
                                            className=""
                                            id={index + 1 + "en"}
                                            label={`${index + 2}. Associated Prompt (English)`}
                                            value={item?.en}
                                            onChange={(val) => {
                                                setFieldValue(`questions[${index + 1}].en`, val);
                                            }}
                                        />
                                        <div className="mt-9">
                                            <Tippy content="Delete">
                                                <button type="button"
                                                    onClick={() => {
                                                        const arry: any = Object.assign([], values?.questions);
                                                        arry.splice(index + 1, 1);
                                                        setFieldValue("questions", arry, true);
                                                    }}
                                                >
                                                    <IconTrashLines />
                                                </button>
                                            </Tippy>
                                        </div>

                                        {translationLang &&
                                            <PrimaryTextInput
                                                className={`mt-1 mb-3 ${translationLang && translationLang === "gu" ? "border-[#008E97]" : "border-[#004bc9]"}`}
                                                id={index + 1 + translationLang}
                                                label={"Associated Prompt " + "(" + language?.find((e) => e.value === translationLang)?.label + ")"}
                                                value={item?.[translationLang] || ""}
                                                onChange={(val) => {
                                                    setFieldValue(`questions[${index + 1}][${translationLang}]`, val);
                                                }}
                                                labelStyle={{ color: translationLang === "gu" ? "#008E97" : "#004bc9" }}
                                            />
                                        }
                                    </div>);
                            })}
                        </div>
                    </BoxCard>
                </div>
                <div className="mt-4">
                    <BoxCard headerName="Answers"
                        rightComponent={<div className='grid justify-end mt-4'>
                            <PrimaryBtn
                                title='Add New Answer'
                                isFullWidth
                                leftIcon={<IconPlus />}
                                onClick={() => {
                                    const obj = Object.assign([], values?.answers);
                                    obj.push({
                                        "en": "",
                                        "gu": "",
                                        "hi": ""
                                    });
                                    setFieldValue("answers", obj);
                                }}
                            />
                        </div>}>
                        <div className="flex flex-row items-center">
                        </div>
                        <div className="items-start gap-4 mb-6 px-3">
                            <PrimaryTextInput
                                height={250}
                                type="text-area"
                                id={"editor-0"}
                                label={"1. Answer (English)*"}
                                value={values?.answers?.[0]?.en}
                                onChange={(val) => {
                                    setFieldValue("answers[0].en", val);
                                }}
                                errors={errors.answers}
                                touched={touched.answers}
                            />
                            {translationLang &&
                                <div className="mt-3">
                                    <PrimaryTextInput
                                        type="text-area"
                                        height={250}
                                        className={`${translationLang && translationLang === "gu" ? "border-[#008E97]" : "border-[#004bc9]"}`}
                                        id={`editor-0 ${translationLang}`}
                                        label={"Answer " + "(" + language?.find((e) => e.value === translationLang)?.label + ")"}
                                        value={values?.answers?.[0]?.[translationLang] || ""}
                                        onChange={(val) => {
                                            setFieldValue(`answers[0][${translationLang}]`, val);
                                        }}
                                        labelStyle={{ color: translationLang === "gu" ? "#008E97" : "#004bc9" }}
                                    />
                                </div>
                            }
                        </div>
                        {values?.answers?.slice(1).map((item, index) => {
                            return (
                                <div key={index}
                                    className="grid grid-cols-[auto_40px] items-start gap-4 mb-6 cursor-grab px-3">
                                    <PrimaryTextInput
                                        type="text-area"
                                        height={250}
                                        id={`editor-${index + 1}`}
                                        label={`${index + 2}. Answer (English)`}
                                        value={item?.en}
                                        onChange={(val) => {
                                            setFieldValue(`answers[${index + 1}].en`, val);
                                        }}
                                    />
                                    <div className="mt-9">
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={() => {
                                                    const arry: any = Object.assign([], values?.answers);
                                                    arry.splice(index + 1, 1);
                                                    setFieldValue("answers", arry, true);
                                                }}
                                            >
                                                <IconTrashLines />
                                            </button>
                                        </Tippy>
                                    </div>

                                    {translationLang &&
                                        <PrimaryTextInput
                                            type="text-area"
                                            height={250}
                                            className={`${translationLang && translationLang === "gu" ? "border-[#008E97]" : "border-[#004bc9]"}`}
                                            id={index + translationLang}
                                            label={"Answer " + "(" + language?.find((e) => e.value === translationLang)?.label + ")"}
                                            value={item?.[translationLang] || ""}
                                            onChange={(val) => {
                                                setFieldValue(`answers[${index}][${translationLang}]`, val);
                                            }}
                                            labelStyle={{ color: translationLang === "gu" ? "#008E97" : "#004bc9" }}
                                        />
                                    }
                                </div>);
                        })}
                    </BoxCard>
                </div>
            </div> : null
            }
            <div className='flex justify-end mt-4 gap-3'>
                {values?.category &&
                    <div className="mt-6 mr-3">
                        <Checkbox
                            id="active"
                            title="Is Active"
                            checked={values?.active}
                            onChange={(e) => {
                                setFieldValue("active", e);
                            }}
                        />
                    </div>}
                <PrimaryBtn
                    title={"Add Another"}
                    className="mt-4 w-40"
                    isUpper
                    onClick={() => {
                        setAddAnother(true);
                        handleSubmit();
                    }} />
                <PrimaryBtn
                    isLoading={isSubmitting}
                    disabled={!dirty || isSubmitting}
                    title={"Submit"}
                    className="mt-4 w-40"
                    isUpper
                    onClick={() => handleSubmit()} />
            </div>
        </div>
    );
};

export default ChatQuestionEditForm;
