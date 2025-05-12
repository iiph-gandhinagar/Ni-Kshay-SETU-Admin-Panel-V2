import { useDisclosure } from "@mantine/hooks";
import { useFormik } from "formik";
import { AssessmentFormProps } from "formTypes";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";
import { BorderBtn, PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import IconCaretDown from "../components/Icon/IconCaretDown";
import IconCircleCheck from "../components/Icon/IconCircleCheck";
import { MultiSelectInput, SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import DrawerModal from "../components/Layouts/Drawer";
import { IRootState } from "../store";
import { createAssessment, updateAssessment } from "../store/actions/plugin.action";
import { logActivity } from "../store/actions/report.action";
import { clearAllBlockList, clearAllHealthFacilityList, clearAssessmentCertificateListWithoutPagination, clearCaderBytypesList, cleartAllCaderTypeList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllBlockList, getAllCaderTypeList, getAllCountryList, getAllDistrictList, getAllHealthFacilityList, getAllStateList, getAssessmentCertificateListWithoutPagination, getCaderBytypesList } from "../store/reducer/masterTable.reducer";
import { clearAssessmentById, clearQuestionsWithoutPagination, clearSelectedQuestions, getAssessmentById, setSelectedQestions } from "../store/reducer/plugin.reducer";
import { getUpdatedFields, handleAllSelection } from "../utils/functions";
import { ErrorToast, WarningToast } from "../utils/toasts";
import AddFromQuestionBankForm from "./AddFromQuestionBankForm";
import IconMinusCircle from "../components/Icon/IconMinusCircle";
import IconMinus from "../components/Icon/IconMinus";

const validationSchema = Yup.object().shape({
    language: Yup.string()
        .oneOf(["en", "gu", "hi"], "Invalid language selection")
        .required("Required"),
    assessmentType: Yup.string()
        .oneOf(["Planned", "real_time"], "Invalid assessment type")
        .required("Required"),
    fromDate: Yup.date()
        .nullable()
        .when("assessmentType", {
            is: "Planned",
            then: Yup.date()
                .required("Required")
                .min(moment(), "You cannot select a past date or time.")
                .required("Required"),
        }),
    toDate: Yup.date()
        .nullable()
        .when("assessmentType", {
            is: "Planned",
            then: Yup.date()
                .test("is-greater-than-30-mins", "To date must be at least 30 minutes after From date", function (toDate) {
                    const { fromDate } = this.parent;
                    return moment(toDate).isSameOrAfter(moment(fromDate).add(30, "minutes"));
                })
                .required("Required"),
        }),
    title: Yup.object().test(
        "Required",
        "Required",
        function (title: any) {
            const { language } = this.parent;
            return !!title?.[language]?.trim();
        }
    ),
    timeToComplete: Yup.number()
        .typeError("Time to complete must be a number")
        .required("Required")
        .min(1, "Time to complete must be at least 1 minute"),
    cadreType: Yup.array()
        .of(Yup.string())
        .min(1, "Required")
        .required("Required"),
    cadreId: Yup.array()
        .nullable()
        .of(Yup.string())
        .min(1, "Required")
        .required("Required"),
    stateId: Yup.array().nullable().when("cadreType", {
        is: (cadreType: string[]) => cadreType && cadreType.some(ct => ["District_Level", "Block_Level", "Health-facility_Level", "State_Level", "All"].includes(ct)),
        then: Yup.array().min(1, "Required").required("Required"),
    }),
    districtId: Yup.array().nullable().when("cadreType", {
        is: (cadreType: string[]) => cadreType && cadreType.some(ct => ["District_Level", "Block_Level", "Health-facility_Level", "All"].includes(ct)),
        then: Yup.array().min(1, "Required").required("Required"),
    }),
    blockId: Yup.array().nullable().when("cadreType", {
        is: (cadreType: string[]) => cadreType && cadreType.some(ct => ["Block_Level", "Health-facility_Level", "All"].includes(ct)),
        then: Yup.array().min(1, "Required").required("Required"),
    }),
    healthFacilityId: Yup.array().nullable().when("cadreType", {
        is: (cadreType: string[]) => cadreType && cadreType.some(ct => ["Health-facility_Level", "All"].includes(ct)),
        then: Yup.array().min(1, "Required").required("Required"),
    }),
    countryId: Yup.string()
        .required("Required"),
    certificateType: Yup.string()
        .required("Required"),
});
const AssessementForm = () => {
    const navigate = useNavigate();
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const { cadreTypeList, caderList, stateList, countryList, districtList, assessmentCertificatesListWithoutPagination, blockList, healthFacilityList, loader } = useSelector((status: IRootState) => status.master);
    const { AssessmentById, selectedQuestionList } = useSelector((state: IRootState) => state.plugin);
    const { authUser } = useSelector((state: IRootState) => state.auth);
    const [opened, { open, close }] = useDisclosure(false);
    const [id] = useQueryParam("id", StringParam);
    const dispatch = useDispatch();
    const InitialCadreId = AssessmentById?.isAllCadre ? caderList?.map((e) => e?._id) : AssessmentById?.cadreId?.map((Cadre: any) => Cadre);
    const initialDistrictId = AssessmentById?.districtId?.map((district: any) => district._id);
    const initialStateId = AssessmentById?.stateId?.map((state: any) => state._id);
    const initialCountryId = AssessmentById?.countryId?._id;
    const selectedQuestions: string[] = [];
    const initialBlockId = AssessmentById?.blockId?.map((block: any) => block._id);
    const initialHealthId = AssessmentById?.healthFacilityId?.map((hf: any) => hf._id);
    const [language, setLanguage] = useState(translationLang || AssessmentById?.language);
    const defaultParams = { id: null, title: "", start: AssessmentById?.fromDate || "", end: AssessmentById?.toDate || "", description: "", type: "primary" };
    const [params, setParams] = useState<any>(defaultParams);
    const [expanded, setExpanded] = useState<boolean[]>(selectedQuestionList != undefined ? selectedQuestionList.map(() => false) : []);
    const toggleExpand = useCallback((index: number) => {
        setExpanded((prevExpanded) => {
            const newExpanded = [...prevExpanded];
            newExpanded[index] = !newExpanded[index];
            return newExpanded;
        });
    }, []);
    const startDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateStr = event.target.value;
        if (dateStr) {
            setParams({ ...params, start: dateStr });
        }
    };
    const endDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateStr = event.target.value;
        if (dateStr) {
            setParams({ ...params, end: dateStr });
        }
    };
    const initialValues: AssessmentFormProps = {
        title: AssessmentById?.title || { en: "" },
        timeToComplete: AssessmentById?.timeToComplete || 0,
        countryId: initialCountryId || "",
        stateId: initialStateId || [],
        toDate: AssessmentById?.toDate || null,
        fromDate: AssessmentById?.fromDate || null,
        blockId: initialBlockId || [],
        healthFacilityId: initialHealthId || [],
        districtId: initialDistrictId || [],
        cadreId: InitialCadreId || [],
        isAllCadre: AssessmentById?.isAllCadre || true,
        isAllState: AssessmentById?.isAllState || false,
        isAllDistrict: AssessmentById?.isAllDistrict || false,
        isAllBlock: AssessmentById?.isAllBlock || false,
        isAllHealthFacility: AssessmentById?.isAllHealthFacility || false,
        certificateType: AssessmentById?.certificateType || "",
        createdBy: authUser?._id || "",
        cadreType: AssessmentById?.cadreType || [],
        language: AssessmentById?.language || "",
        active: AssessmentById?.active || true,
        assessmentType: AssessmentById?.assessmentType || "",
        questions: AssessmentById?.questions || [],
    };
    const formik = useFormik<AssessmentFormProps>({
        enableReinitialize: true,
        validateOnMount: true,
        validateOnBlur: true,
        validateOnChange: true,
        initialValues: initialValues,
        onSubmit(values: any, actions: any) {
            if (values.isAllCadre) {
                values.cadreId = [];
            }
            if (values.isAllBlock) {
                values.blockId = [];
            }
            if (values.isAllDistrict) {
                values.districtId = [];
            }
            if (values.isAllHealthFacility) {
                values.healthFacilityId = [];
            }
            if (values.isAllState) {
                values.stateId = [];
            }
            if (AssessmentById?._id) {
                dispatch(
                    updateAssessment(
                        AssessmentById?._id,
                        getUpdatedFields({
                            title: AssessmentById?.title,
                            timeToComplete: AssessmentById?.timeToComplete,
                            countryId: AssessmentById?.countryId,
                            stateId: AssessmentById?.stateId,
                            isAllState: AssessmentById?.isAllState,
                            isAllDistrict: AssessmentById?.isAllDistrict,
                            isAllBlock: AssessmentById?.isAllBlock,
                            isAllHealthFacility: AssessmentById?.isAllHealthFacility,
                            language: AssessmentById?.language,
                            blockId: AssessmentById?.blockId,
                            healthFacilityId: AssessmentById?.healthFacilityId,
                            districtId: AssessmentById?.districtId,
                            cadreId: AssessmentById?.cadreId,
                            toDate: AssessmentById?.toDate,
                            fromDate: AssessmentById?.fromDate,
                            cadreType: AssessmentById?.cadreType,
                            certificateType: AssessmentById?.certificateType,
                            active: AssessmentById?.active,
                            assessmentType: AssessmentById?.assessmentType,
                            questions: AssessmentById?.questions,
                            createdBy: ""
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res?.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: AssessmentById,
                                        new: res?.data
                                    }
                                }));
                                const searchParams = new URLSearchParams(window.location.search);
                                searchParams.delete("id");
                                navigate(`/assessment/create?${searchParams}`);
                            }
                            else {
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                        setFieldError(fieldName, errorMessage);
                                    });
                                }
                            }
                        }
                    ));
            } else {
                dispatch(createAssessment(
                    {
                        title: values?.title,
                        timeToComplete: values?.timeToComplete,
                        isAllCadre: values?.isAllCadre,
                        isAllState: values?.isAllState,
                        isAllDistrict: values?.isAllDistrict,
                        isAllBlock: values?.isAllBlock,
                        isAllHealthFacility: values?.isAllHealthFacility,
                        countryId: values?.countryId,
                        stateId: values?.stateId,
                        districtId: values?.districtId,
                        language: values?.language,
                        cadreId: values?.cadreId,
                        toDate: values?.assessmentType == "Planned" ? values?.toDate : null,
                        fromDate: values?.assessmentType == "Planned" ? values?.fromDate : null,
                        cadreType: values?.cadreType,
                        certificateType: values?.certificateType,
                        active: values?.active,
                        assessmentType: values?.assessmentType,
                        questions: selectedQuestions,
                        blockId: values?.blockId,
                        healthFacilityId: values?.healthFacilityId,
                        createdBy: authUser?._id
                    },
                    (res) => {
                        actions.setSubmitting(false);
                        if (res?.status) {
                            dispatch(logActivity({
                                "action": "create",
                                "moduleName": window.location.pathname,
                                "payload": res?.data
                            }));
                            const searchParams = new URLSearchParams(window.location.search);
                            searchParams.delete("id");
                            navigate(`/assessment/create?${searchParams}`);
                        }
                        else {
                            if (res?.data?.errors) {
                                res?.data?.errors?.forEach((error: any) => {
                                    const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                    setFieldError(fieldName, errorMessage);
                                });
                            }
                        }
                    }
                ));
                if (selectedQuestions?.length < 1) {
                    ErrorToast("Please add a question from question bank");
                }
            }
        },
        validationSchema,
    });
    const handleRemoveQuestion = (questionId: string) => {

        const updatedList = selectedQuestionList?.filter((q) => q._id !== questionId);
        dispatch(setSelectedQestions(updatedList));
        setFieldValue("questions", selectedQuestions);
    };

    const { values, setFieldTouched, setFieldValue, errors, touched, handleSubmit, isSubmitting, dirty, setFieldError, setErrors } = formik;
    useEffect(() => {
        if (id)
            dispatch(getAssessmentById(id));
        dispatch(getAllCaderTypeList());
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        dispatch(getAssessmentCertificateListWithoutPagination());
        return () => {
            dispatch(cleartAllCaderTypeList());
            dispatch(cleartAllDistrictList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
            dispatch(clearCaderBytypesList());
            dispatch(clearQuestionsWithoutPagination());
            dispatch(clearAssessmentCertificateListWithoutPagination());
            dispatch(clearSelectedQuestions());
            dispatch(clearAssessmentById());
        };
    }, []);
    useEffect(() => {
        if (AssessmentById?.questions && AssessmentById?.questions.length > 0) {
            if (values?.language !== AssessmentById?.language) {
                dispatch(setSelectedQestions([]));
            } else {
                dispatch(setSelectedQestions(AssessmentById?.questions));
            }
        }
        if (!AssessmentById?._id) {
            dispatch(setSelectedQestions([]));
        }
    }, [AssessmentById?.questions, values?.language, AssessmentById?.language]);

    useEffect(() => {
        if (!formik.values?.cadreType.includes("All") && formik.values?.cadreType?.length > 0) {
            const selectedCadres = formik.values?.cadreType.join("&cadreTypes=");
            dispatch(getCaderBytypesList(`?cadreTypes=${selectedCadres}`));
        } else if (formik.values?.cadreType.includes("All")) {
            dispatch(getCaderBytypesList("?cadreTypes=all"));
        }
        return () => {
            dispatch(clearCaderBytypesList());
        };
    }, [formik.values?.cadreType]);

    useEffect(() => {
        if (formik?.values?.isAllState) {
            setFieldValue("stateId", stateList?.map((e: any) => e._id));
        }
    }, [JSON.stringify(stateList), formik.values.isAllState]);

    useEffect(() => {
        if (formik?.values?.isAllDistrict && formik?.values?.isAllState) {
            setFieldValue("districtId", districtList?.map((e: any) => e._id));
        }
    }, [JSON.stringify(districtList), formik.values.isAllDistrict]);

    useEffect(() => {
        if (formik?.values?.isAllCadre) {
            setFieldValue("cadreId", caderList?.map((e: any) => e._id));
        }
    }, [JSON.stringify(caderList), formik.values.isAllCadre]);

    useEffect(() => {
        if (formik?.values?.isAllBlock && formik.values?.blockId && formik.values?.blockId?.length > 0) {
            dispatch(getAllHealthFacilityList("?allBlock=true"));
        } else if (formik.values?.blockId && formik.values?.blockId?.length > 0) {
            const selectedBlocks = formik.values.blockId?.join("&blockId=");
            dispatch(getAllHealthFacilityList(`?blockId=${selectedBlocks}`));
        }
        return () => {
            dispatch(clearAllHealthFacilityList());
        };
    }, [formik?.values?.isAllBlock, JSON.stringify(formik?.values?.blockId)]);
    useEffect(() => {
        if (formik?.values?.isAllDistrict && formik.values?.districtId && formik.values?.districtId?.length > 0) {
            dispatch(getAllBlockList("?allDistrict=true"));
        } else if (formik.values?.districtId && formik.values?.districtId?.length > 0) {
            const selectedDistricts = formik.values.districtId?.join("&districtId=");
            dispatch(getAllBlockList(`?districtId=${selectedDistricts}`));
        }
        return () => {
            dispatch(clearAllBlockList());
        };
    }, [formik?.values?.isAllDistrict, JSON.stringify(formik?.values?.districtId)]);

    useEffect(() => {
        if (formik?.values?.isAllState) {
            dispatch(getAllDistrictList("?allState=true"));
        } else if (formik.values?.stateId && formik.values?.stateId?.length > 0) {
            const selectedStates = formik.values.stateId?.join("&stateId=");
            dispatch(getAllDistrictList(`?stateId=${selectedStates}`));
        }
        return () => {
            dispatch(cleartAllDistrictList());
        };
    }, [formik?.values?.isAllState, JSON.stringify(formik?.values?.stateId)]);
    useEffect(() => {
        if (AssessmentById?.fromDate || AssessmentById?.toDate) {
            setParams({ ...params, start: AssessmentById?.fromDate, end: AssessmentById?.toDate });
        }
    }, [AssessmentById]);
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
                        navigate(`/assessment/create?${searchParams}`);
                    }} />
            </div>
            <BoxCard headerName={id ? "Edit Assessment" : "New Assessment"}
                className="mb-4 border-2 border-primary"
                rightComponent={
                    loader && <PrimaryBtn
                        title={!loader ? "Saved" : "Loading"}
                        className="bg-[#00AB55]"
                        leftIcon={!loader && <IconCircleCheck />}
                        isLoading={loader}
                        onClick={() => { }} />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <SelectInput
                        label="Assessment Language*"
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
                        label="Assessment Type*"
                        id="assessmentType"
                        value={values?.assessmentType}
                        placeholder={"Select Option"}
                        options={[{
                            label: "Planned",
                            value: "Planned"
                        }, {
                            label: "Real Time",
                            value: "real_time"
                        }]}
                        onChange={(e) => {
                            if (e === "real_time") {
                                setFieldValue("toDate", null);
                                setFieldValue("fromDate", null);
                            }
                            setFieldValue("assessmentType", e);
                            setFieldTouched("title", true);
                        }}
                        errors={errors.assessmentType as string}
                        touched={touched.assessmentType as boolean}
                    />
                    {values?.assessmentType && values?.assessmentType == "Planned" ?
                        <>
                            <div>
                                <label htmlFor="dateStart">From :</label>
                                <input
                                    id="start"
                                    type="datetime-local"
                                    name="start"
                                    className="form-input"
                                    placeholder="Event Start Date"
                                    value={moment(params?.start).format("YYYY-MM-DDTHH:mm") || 0}
                                    onChange={(event: any) => {
                                        startDateChange(event);
                                        setFieldValue("fromDate", moment(event?.target?.value).format("YYYY-MM-DDTHH:mm:ssZ"));
                                    }}
                                />
                                <div className="text-primary mt-2"
                                    id="startDateErr"></div>
                                {errors?.fromDate && touched?.fromDate ? (
                                    <span className="text-[#E7515A] mt-1 inline-block">{errors?.fromDate}</span>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="dateStart">To :</label>
                                <input
                                    id="end"
                                    type="datetime-local"
                                    name="end"
                                    className="form-input"
                                    placeholder="Event End Date"
                                    value={moment(params?.end).format("YYYY-MM-DDTHH:mm") || 0}
                                    onChange={(event: any) => {
                                        setFieldValue("toDate", moment(event?.target?.value).format("YYYY-MM-DDTHH:mm:ssZ"));
                                        endDateChange(event);
                                    }}
                                />
                                <div className="text-primary mt-2"
                                    id="startDateErr"></div>
                                {errors?.toDate && touched?.toDate ? (
                                    <span className="text-[#E7515A] mt-1 inline-block">{errors?.toDate}</span>
                                ) : null}
                            </div>
                        </> : null}

                    {values?.language && <PrimaryTextInput
                        type="text"
                        id="title"
                        label="Assessment Title*"
                        placeholder="Assessment Title"
                        value={values?.title?.[values?.language as keyof typeof values.title]}
                        onChange={(e) => setFieldValue(`title.${values?.language}`, e)}
                        errors={
                            typeof errors.title === "object"
                                ? errors.title?.[values.language as keyof typeof errors.title]
                                : errors.title
                        }
                        touched={true}
                    />}
                    <PrimaryTextInput
                        type="number"
                        id="Time"
                        label="Time to complete (In Minutes)*"
                        placeholder="Time to complete (In Minutes)"
                        value={values?.timeToComplete}
                        onChange={(e) => {
                            const time = parseInt(e);
                            setFieldValue("timeToComplete", time);
                        }}
                        errors={errors.timeToComplete}
                        touched={touched.timeToComplete}
                    />
                    <MultiSelectInput
                        label="Cadre Type*"
                        id="cadreType"
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
                            if (e[0] == "National_Level") {
                                setFieldValue("stateId", null);
                                setFieldValue("districtId", null);
                                setFieldValue("blockId", null);
                                setFieldValue("healthFacilityId", null);
                            } else
                                if (e[0] == "State_Level") {
                                    setFieldValue("blockId", null);
                                    setFieldValue("healthFacilityId", null);
                                    setFieldValue("districtId", null);
                                } else
                                    if (e[0] == "District_Level") {
                                        setFieldValue("blockId", null);
                                        setFieldValue("healthFacilityId", null);
                                    } else
                                        if (e[0] == "Block_Level") {
                                            setFieldValue("healthFacilityId", null);
                                        }

                        }}
                        value={values.cadreType}
                        errors={errors.cadreType as string}
                        touched={touched.cadreType as boolean}
                        placeholder={"Select Option"}
                    />
                    <MultiSelectInput
                        isSelectAll
                        label="Cadre*"
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
                        touched={touched.cadreId as boolean}
                    />
                    <SelectInput
                        label="Country*"
                        id="country"
                        options={countryList?.map((e: any) => ({
                            label: e?.title,
                            value: e?._id
                        }))}
                        onChange={(e) => setFieldValue("countryId", e)}
                        value={values.countryId}
                        errors={errors.countryId as string}
                        touched={touched.countryId as boolean}
                        placeholder={"Select Option"}
                    />
                    {values?.cadreType?.length > 0 && values?.cadreType.some(ct => ["District_Level", "Block_Level", "Health-facility_Level", "State_Level", "All"].includes(ct)) ?
                        <MultiSelectInput
                            isSelectAll
                            label="State*"
                            id="state"
                            value={values.stateId?.map((state: any) => state) as string[]}
                            placeholder={"Select Option"}
                            options={[...(Array.isArray(stateList) ? stateList.map((e: any) => ({
                                label: e.title,
                                value: e._id
                            })) : [])
                            ]}
                            onChange={(e) => {
                                setFieldValue("districtId", []);
                                handleAllSelection(e, setFieldValue, stateList || [], "isAllState", "stateId");
                            }}
                            errors={errors?.stateId}
                            touched={touched.stateId}
                        /> : null}

                    {values?.cadreType?.length > 0 && values?.cadreType.some(ct => ["District_Level", "Block_Level", "Health-facility_Level", "All"].includes(ct)) ?
                        <MultiSelectInput
                            isSelectAll
                            label="District*"
                            id="district"
                            value={values.districtId as string[]}
                            placeholder={"Select Option"}
                            options={[...(Array.isArray(districtList) ? districtList.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            })) : [])]}
                            onChange={(e) => handleAllSelection(e, setFieldValue, districtList || [], "isAllDistrict", "districtId")}
                            errors={errors?.districtId}
                            touched={touched.districtId}
                        /> : null}
                    {values?.cadreType?.length > 0 && values?.cadreType.some(ct => ["Block_Level", "Health-facility_Level", "All"].includes(ct)) ?
                        <MultiSelectInput
                            isSelectAll
                            className="w-500"
                            label="Block*"
                            placeholder="Select Option"
                            id="blockId"
                            onChange={(e: any) => {
                                setFieldValue("healthFacilityId", []);
                                handleAllSelection(e, setFieldValue, blockList, "isAllBlock", "blockId");
                            }}
                            value={values.blockId}
                            errors={errors.blockId}
                            touched={touched.blockId}
                            options={blockList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                        /> : null}
                    {values?.cadreType?.length > 0 && values?.cadreType.some(ct => ["Health-facility_Level", "All"].includes(ct)) ?
                        <MultiSelectInput
                            isSelectAll
                            className="w-500"
                            label="Health Facility*"
                            placeholder="Select Option"
                            id="healthFacilityId"
                            onChange={(e: any) => handleAllSelection(e, setFieldValue, healthFacilityList, "isAllHealthFacility", "healthFacilityId")}
                            value={values.healthFacilityId}
                            errors={errors.healthFacilityId}
                            touched={touched.healthFacilityId}
                            options={healthFacilityList?.map((e: any) => ({
                                label: e?.healthFacilityCode,
                                value: e?._id
                            }))}
                        /> : null}
                    <SelectInput
                        label="Certificate Format*"
                        id="certificateType"
                        value={values.certificateType}
                        placeholder={"Select Option"}
                        options={assessmentCertificatesListWithoutPagination?.map((e: any) => ({
                            label: e.title,
                            value: e._id
                        }))}
                        onChange={(e) => setFieldValue("certificateType", e)}
                        errors={errors.certificateType}
                        touched={touched.certificateType}
                    />
                    <Checkbox
                        id="checkbox"
                        label="Activated*"
                        checked={values?.active}
                        onChange={(e) => { setFieldValue("active", e); }}
                        title="Activated"
                    />
                </div>
            </BoxCard>
            {typeof selectedQuestionList !== "undefined" && selectedQuestionList.length > 0 ? (
                <div className="mt-4">
                    <BoxCard headerName="Added from Question Bank">
                        {selectedQuestionList.map((question, index) => {
                            selectedQuestions?.push(question._id);
                            return (
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-4"
                                    key={question?._id}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">
                                            Question {index + 1}: {question?.question}
                                        </h3>
                                        <div className="flex items-center justify-center gap-2">
                                            <PrimaryBtn
                                                className="rounded-3xl bg-gray-200"
                                                title=""
                                                rightIcon={
                                                    <IconCaretDown className={expanded[index] ? "text-black" : "-rotate-90 text-black"} />
                                                }
                                                onClick={() => toggleExpand(index)}
                                            />
                                            <PrimaryBtn
                                                title=""
                                                rightIcon={
                                                    <IconMinus className="h-[16px]" />
                                                }
                                                className="bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                                onClick={() => {
                                                    WarningToast("Are you sure you want to remove this question?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            handleRemoveQuestion(question._id);
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {expanded[index] && (
                                        <>
                                            <PrimaryTextInput
                                                type="text"
                                                label={`Question ${index + 1}`}
                                                disabled
                                                id="question"
                                                placeholder="Question"
                                                value={question?.question}
                                            />
                                            <div className="grid grid-cols-2 md:grid-cols-2 gap-5 ">
                                                <PrimaryTextInput
                                                    type="text"
                                                    label="Option 1"
                                                    id="option1"
                                                    disabled
                                                    placeholder="Option 1"
                                                    value={question?.option1}
                                                />
                                                <PrimaryTextInput
                                                    type="text"
                                                    label="Option 2"
                                                    id="option2"
                                                    disabled
                                                    placeholder="Option 2"
                                                    value={question?.option2}
                                                />
                                                <PrimaryTextInput
                                                    type="text"
                                                    label="Option 3"
                                                    id="option3"
                                                    disabled
                                                    placeholder="Option 3"
                                                    value={question?.option3}
                                                />
                                                <PrimaryTextInput
                                                    type="text"
                                                    label="Option 4"
                                                    id="option4"
                                                    disabled
                                                    placeholder="Option 4"
                                                    value={question?.option4}
                                                />
                                            </div>
                                            <SelectInput
                                                label="Correct Answer*"
                                                id="correctAnswer"
                                                disabled
                                                placeholder="Correct Answer"
                                                value={question?.correctAnswer}
                                                options={[
                                                    { value: "option1", label: "Option 1" },
                                                    { value: "option2", label: "Option 2" },
                                                    { value: "option3", label: "Option 3" },
                                                    { value: "option4", label: "Option 4" },
                                                ]}
                                            />
                                            {question?.explanation && (
                                                <PrimaryTextInput
                                                    label="Answer Explanation"
                                                    id="explanation"
                                                    placeholder="Answer Explanation"
                                                    disabled
                                                    value={question?.explanation}
                                                />
                                            )}
                                            {question?.category && (
                                                <SelectInput
                                                    label="Category*"
                                                    disabled
                                                    placeholder="Category"
                                                    id="category"
                                                    value={question?.category}
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
                                            )}
                                            {question?.qLevel && (
                                                <SelectInput
                                                    label="Question Level*"
                                                    disabled
                                                    placeholder="Question Level"
                                                    id="qLevel"
                                                    value={question?.qLevel}
                                                    options={["Easy", "Moderate", "Hard"].map((v) => {
                                                        return {
                                                            label: v,
                                                            value: v.toLowerCase(),
                                                        };
                                                    })}
                                                />
                                            )}
                                        </>
                                    )}
                                    <div className="w-full border-b-4 mb-4"></div>
                                </div>
                            );
                        })}
                    </BoxCard>
                </div>
            ) : null}
            <div className="flex gap-5 mt-5 justify-end">
                <PrimaryBtn
                    isUpper
                    title="add from question bank"
                    onClick={() => { open(); }}
                />
                <PrimaryBtn
                    isUpper
                    isLoading={isSubmitting}
                    disabled={!dirty || isSubmitting}
                    className="w-40"
                    title="Submit"
                    onClick={() => {
                        handleSubmit();
                    }}
                />
            </div>
            <DrawerModal
                opened={opened}
                onClose={() => {
                    setFieldValue("questions", selectedQuestions);
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{"Add question from question bank"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 990 ? 990 : "undefined", backgroundColor: "#FAFBFA" }}
            >
                <AddFromQuestionBankForm
                    close={() => {
                        close();
                    }}
                    language={values?.language}
                    isAllCadre={values?.isAllCadre}
                    cadreId={values?.isAllCadre ? [] : values?.cadreId}
                    initialQuestions={AssessmentById?.questions || []} />
            </DrawerModal>
        </>
    );
};

export default AssessementForm;
