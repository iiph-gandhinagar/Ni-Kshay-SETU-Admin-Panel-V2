import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { surveyListProps } from "survey";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";
import { Checkbox } from "../../../components/CheckBox/checkbox";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import IconCircleCheck from "../../../components/Icon/IconCircleCheck";
import IconPlus from "../../../components/Icon/IconPlus";
import { MultiSelectInput, SelectInput } from "../../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import TranslationsManagement from "../../../components/Layouts/Translations";
import { BorderBtn, PrimaryBtn } from "../../../components/buttons/primaryBtn";
import { IRootState } from "../../../store";
import { logActivity } from "../../../store/actions/report.action";
import { createSurvey, updateSurveyByID } from "../../../store/actions/survey.actions";
import { clearAllBlockList, clearAllHealthFacilityList, clearCaderBytypesList, cleartAllCaderTypeList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllBlockList, getAllCaderTypeList, getAllCountryList, getAllDistrictList, getAllHealthFacilityList, getAllStateList, getCaderBytypesList } from "../../../store/reducer/masterTable.reducer";
import { cleanSurveyById, getSurveyById } from "../../../store/reducer/survey.reducer";
import { handleAllSelection } from "../../../utils/functions";
import { ErrorToast } from "../../../utils/toasts";




const validationSchema = Yup.object().shape({
    title: Yup.object().shape({
        "en": Yup.string().trim().required("Required"),
    }),
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
    questions: Yup.array().of(Yup.object({
        title: Yup.object().shape({
            en: Yup.string().trim().required("Required"),
        }),
        type: Yup.string()
            .oneOf(["options", "text"])
            .required("Required"),

        option1: Yup.object().test(
            "Required",
            "Required",
            function (option: any) {
                const { type } = this.parent;
                if (type === "text") {
                    return true;
                }
                return (type === "options" && option?.en !== undefined && option?.en.trim() !== "");
            }
        ),
        option2: Yup.object().test(
            "Required",
            "Required",
            function (option: any) {
                const { type } = this.parent;
                if (type === "text") {
                    return true;
                }
                return (type === "options" && option?.en !== undefined && option?.en.trim() !== "");
            }
        ),
    }))
});



const SurveyQuestionEditForm = () => {
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const { surveyById } = useSelector((v: IRootState) => v.survey);
    const [id] = useQueryParam("id", StringParam);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cadreTypeList, caderList, stateList, countryList, districtList, blockList, healthFacilityList, loader } = useSelector((status: IRootState) => status.master);

    const initialValues: surveyListProps = {
        title: surveyById?.title || { en: "" },
        countryId: surveyById?.countryId || "",
        stateId: surveyById?.stateId || [],
        isAllState: surveyById?.isAllState || false,
        districtId: surveyById?.districtId || [],
        isAllDistrict: surveyById?.isAllDistrict || false,
        blockId: surveyById?.blockId || [],
        isAllBlock: surveyById?.isAllBlock || false,
        healthFacilityId: surveyById?.healthFacilityId || [],
        isAllHealthFacility: surveyById?.isAllHealthFacility || false,
        cadreId: surveyById?.cadreId || [],
        isAllCadre: surveyById?.isAllCadre || false,
        cadreType: surveyById?.cadreType || [],
        questions: surveyById?.questions || [] as Array<{
            active: false,
            title: {
                en: ""
            },
            type: "",
            option1: {
            },
            option2: {
            },
            option3: {
            },
            option4: {
            },
            orderIndex: 1,
        }>,
        active: surveyById?.active || false,
        sendInitialNotification: surveyById?.sendInitialNotification || false,
    };
    const formik = useFormik({
        enableReinitialize: true,
        validateOnMount: true,
        validateOnBlur: true,
        validateOnChange: true,
        initialValues: initialValues,
        onSubmit: (values, actions) => {
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
            if (id) {
                dispatch(
                    updateSurveyByID(
                        surveyById?._id as string,
                        values,
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                const searchParams = new URLSearchParams(window.location.search);
                                searchParams.delete("id");
                                navigate(`/survey/master?${searchParams}`);
                                actions.setSubmitting(false);
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: surveyById,
                                        new: res?.data
                                    }
                                }));
                            } else {
                                ErrorToast(res.message);
                            }
                        },
                    )
                );
            } else {
                dispatch(
                    createSurvey(
                        values,
                        (res) => {
                            if (res.status) {
                                const searchParams = new URLSearchParams(window.location.search);
                                searchParams.delete("id");
                                navigate(`/survey/master?${searchParams}`);
                                actions.setSubmitting(false);
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
                            } else {
                                ErrorToast(res.message);
                                actions.setSubmitting(false);
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const fieldName = Object.keys(error)[0];
                                        const errorMessage = error[fieldName];
                                        setFieldError(fieldName.toLowerCase(), errorMessage);
                                    });
                                }
                            }
                        },
                    )
                );
            }
        },
        validationSchema,
    });
    useEffect(() => {
        if (id)
            dispatch(getSurveyById(id));
        dispatch(getAllCaderTypeList());
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        return () => {
            dispatch(cleartAllCaderTypeList());
            dispatch(cleartAllDistrictList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
            dispatch(clearCaderBytypesList());
            dispatch(cleanSurveyById());
        };
    }, []);
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



    const { values, setFieldValue, errors, touched, handleSubmit, isSubmitting, dirty, setFieldError, setFieldTouched } = formik;
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
                        navigate(`/survey/master?${searchParams}`);
                    }} />
            </div>
            <BoxCard headerName={id ? "Edit Survey" : "New Survey"}
                className="mb-4 border-2 border-primary"
                rightComponent={<div className="flex gap-5"> {loader && <PrimaryBtn
                    title={!loader ? "Saved" : "Loading"}
                    className="bg-[#00AB55]"
                    leftIcon={!loader && <IconCircleCheck />}
                    isLoading={loader}
                    onClick={() => { }} />}<TranslationsManagement /></div>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <PrimaryTextInput
                        type="text"
                        id="title"
                        label="Survey Title*"
                        placeholder="Survey Title"
                        value={values?.title.en}
                        onChange={(e) => setFieldValue("title.en", e)}
                        errors={typeof errors?.title == "object" ? "Required" : "" as string}
                        touched={touched?.title?.en}
                    />
                    {
                        translationLang !== undefined && (
                            <PrimaryTextInput
                                type="text"
                                id={"title" + translationLang}
                                label={"Survey Title" + " " + "(" + translationLang + ")"}
                                placeholder="Survey Title"
                                value={values?.title?.[translationLang]}
                                onChange={(e) => setFieldValue("title." + translationLang, e)}
                            />
                        )
                    }
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
                    <MultiSelectInput
                        menuPortalTarget={null}
                        label="Cadre Type*"
                        id="cadreType"
                        options={[
                            { label: "All", value: "All" },
                            ...(Array.isArray(cadreTypeList) ? cadreTypeList.map((e: any) => ({
                                label: e?.replace("_", " "),
                                value: e
                            })) : [])
                        ]}
                        onChange={(e: string[]) => {
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
                        options={caderList?.map((e: any) => ({
                            label: e?.title,
                            value: e?._id
                        }))}
                        onChange={(e: any) => handleAllSelection(e, setFieldValue, caderList, "isAllCadre", "cadreId")}
                    />
                    {values?.cadreType?.length > 0 && values?.cadreType.some((ct: any) => ["District_Level", "Block_Level", "Health-facility_Level", "State_Level", "All"].includes(ct)) ?
                        <MultiSelectInput
                            isSelectAll
                            label="State*"
                            id="state"
                            value={values.stateId?.map((state: any) => state) as string[]}
                            placeholder={"Select Option"}
                            options={[
                                ...(Array.isArray(stateList) ? stateList.map((e: any) => ({
                                    label: e.title,
                                    value: e._id
                                })) : [])
                            ]}
                            onChange={(e: any) => {
                                setFieldValue("districtId", []);
                                handleAllSelection(e, setFieldValue, stateList, "isAllState", "stateId");
                            }}
                            errors={errors?.stateId as string}
                            touched={touched.stateId as boolean}
                        /> : null}

                    {values?.cadreType?.length > 0 && values?.cadreType.some((ct: any) => ["District_Level", "Block_Level", "Health-facility_Level", "All"].includes(ct)) ?
                        <MultiSelectInput
                            isSelectAll
                            label="District*"
                            id="district"
                            value={values.districtId as string[]}
                            placeholder={"Select Option"}
                            options={[
                                ...(Array.isArray(districtList) ? districtList.map((e: any) => ({
                                    label: e?.title,
                                    value: e?._id
                                })) : [])]}
                            onChange={(e: any) => {
                                setFieldValue("blockId", []);
                                handleAllSelection(e, setFieldValue, districtList, "isAllDistrict", "districtId");
                            }}
                            errors={errors?.districtId as string}
                            touched={touched.districtId as boolean}
                        /> : null}
                    {values?.cadreType?.length > 0 && values?.cadreType.some((ct: any) => ["Block_Level", "Health-facility_Level", "All"].includes(ct)) ?
                        <MultiSelectInput
                            className="w-500"
                            isSelectAll
                            label="Block*"
                            placeholder="Select Option"
                            id="blockId"
                            onChange={(e: any) => {
                                setFieldValue("healthFacilityId", []);
                                handleAllSelection(e, setFieldValue, blockList, "isAllBlock", "blockId");
                            }}
                            value={values.blockId}
                            errors={errors.blockId as string}
                            touched={touched.blockId as boolean}
                            options={blockList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                        /> : null}
                    {values?.cadreType?.length > 0 && values?.cadreType.some((ct: any) => ["Health-facility_Level", "All"].includes(ct)) ?
                        <MultiSelectInput
                            isSelectAll
                            className="w-500"
                            label="Health Facility*"
                            placeholder="Select Option"
                            id="healthFacilityId"
                            onChange={(e: any) => handleAllSelection(e, setFieldValue, healthFacilityList, "isAllHealthFacility", "healthFacilityId")}
                            value={values.healthFacilityId}
                            errors={errors.healthFacilityId as string}
                            touched={touched.healthFacilityId as boolean}
                            options={healthFacilityList?.map((e: any) => ({
                                label: e?.healthFacilityCode,
                                value: e?._id
                            }))}
                        /> : null}
                    <Checkbox
                        id="checkbox"
                        label="Active*"
                        checked={values?.active}
                        onChange={(e) => { setFieldValue("active", e); }}
                        title="Active"
                    />
                    <Checkbox
                        id="checkbox"
                        label="Send Initial Notification*"
                        checked={values?.sendInitialNotification}
                        onChange={(e) => { setFieldValue("sendInitialNotification", e); }}
                        title="Send Initial Notification"
                    />
                </div>
            </BoxCard>
            {values?.questions?.map((item: any, index: number) => {
                const getErrorForField = (errors: any, index: number, field: string, nestedField: string | null = null) => {
                    const error = errors?.questions?.[index];
                    if (typeof error === "object" && !Array.isArray(error) && error !== null && typeof error !== "string") {
                        if (nestedField) {
                            return error[field]?.[nestedField];
                        }
                        return error[field];
                    }
                    return undefined;
                };
                return (
                    <div key={index + 1}
                        className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-5 panel pt-6 ">
                        <div className="flex justify-between">
                            <h4 className="text-lg uppercase font-medium">question {index + 1}</h4>
                            <div className="flex gap-3">
                                <PrimaryBtn
                                    title="remove"
                                    onClick={() => {
                                        setFieldValue("questions", values.questions.filter((_: any, i: number) => i !== index));
                                    }}
                                />
                            </div>
                        </div>
                        <PrimaryTextInput
                            type="text"
                            id="Title"
                            label="Title*"
                            placeholder="Title"
                            value={values?.questions?.[index]?.title?.en}
                            onChange={(e) => setFieldValue(`questions.${index}.title.en`, e)}
                            errors={getErrorForField(errors, index, "title", "en")}
                            touched={touched?.questions?.[index]?.title?.en}
                        />
                        {
                            translationLang !== undefined && (
                                <PrimaryTextInput
                                    type="text"
                                    label={"Question" + " " + "(" + translationLang + ")"}
                                    id={"Question" + translationLang}
                                    placeholder="optional"
                                    value={values?.questions?.[index]?.title?.[translationLang] || ""}
                                    onChange={(e) => setFieldValue(`questions.${index}.title.` + translationLang, e)}
                                />
                            )
                        }
                        <SelectInput
                            label="Question Type*"
                            placeholder="Select Option"
                            id="questionType"
                            value={values?.questions?.[index]?.type}
                            options={[
                                { value: "options", label: "Options" },
                                { value: "text", label: "Text" },
                            ]}
                            onChange={(e) => {
                                setFieldValue(`questions.${index}.type`, e);
                            }}
                            errors={getErrorForField(errors, index, "type")}
                            touched={touched?.questions?.[index]?.type}
                        />
                        {values?.questions?.[index]?.type === "options" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">  <PrimaryTextInput
                                type="text"
                                label="Option 1"
                                id="Option1"
                                placeholder="Option 1"
                                value={values?.questions?.[index]?.option1?.en}
                                onChange={(e) => setFieldValue(`questions.${index}.option1.en`, e)}
                                errors={getErrorForField(errors, index, "option1")}
                                touched={touched?.questions?.[index]?.option1?.en}
                            />{
                                    translationLang !== undefined && (
                                        <PrimaryTextInput
                                            type="text"
                                            label={"Option 1" + " " + "(" + translationLang + ")"}
                                            id={"Option1" + translationLang}
                                            placeholder="optional"
                                            value={values?.questions?.[index]?.option1?.[translationLang] || ""}
                                            onChange={(e) => setFieldValue(`questions.${index}.option1.` + translationLang, e)}
                                        />)}
                                <PrimaryTextInput
                                    type="text"
                                    label="Option 2"
                                    id="Option2"
                                    placeholder="Option 2"
                                    value={values?.questions?.[index]?.option2?.en}
                                    onChange={(e) => setFieldValue(`questions.${index}.option2.en`, e)}
                                    errors={getErrorForField(errors, index, "option2")}
                                    touched={touched?.questions?.[index]?.option2?.en}
                                />{
                                    translationLang !== undefined && (
                                        <PrimaryTextInput
                                            type="text"
                                            label={"Option 2" + " " + "(" + translationLang + ")"}
                                            id={"Option2" + translationLang}
                                            placeholder="optional"
                                            value={values?.questions?.[index]?.option2?.[translationLang] || ""}
                                            onChange={(e) => setFieldValue(`questions.${index}.option2.` + translationLang, e)}
                                        />)}
                                <PrimaryTextInput
                                    type="text"
                                    label="Option 3"
                                    id="Option3"
                                    placeholder="Option 3"
                                    value={values?.questions?.[index]?.option3?.en}
                                    onChange={(e) => setFieldValue(`questions.${index}.option3.en`, e)}
                                />
                                {
                                    translationLang !== undefined && (
                                        <PrimaryTextInput
                                            type="text"
                                            label={"Option 3" + " " + "(" + translationLang + ")"}
                                            id={"Option3" + translationLang}
                                            placeholder="optional"
                                            value={values?.questions?.[index]?.option3?.[translationLang] || ""}
                                            onChange={(e) => setFieldValue(`questions.${index}.option3.` + translationLang, e)}
                                        />)}
                                <PrimaryTextInput
                                    type="text"
                                    label="Option 4"
                                    id="Option4"
                                    placeholder="Option 4"
                                    value={values?.questions?.[index]?.option4?.en}
                                    onChange={(e) => setFieldValue(`questions.${index}.option4.en`, e)}
                                />
                                {
                                    translationLang !== undefined && (
                                        <PrimaryTextInput
                                            type="text"
                                            label={"Option 4" + " " + "(" + translationLang + ")"}
                                            id={"Option4" + translationLang}
                                            placeholder="optional"
                                            value={values?.questions?.[index]?.option4?.[translationLang] || ""}
                                            onChange={(e) => setFieldValue(`questions.${index}.option4.` + translationLang, e)}
                                        />)}</div>
                        )}
                        <PrimaryTextInput
                            label="Order Index*"
                            id="orderIndex"
                            type="number"
                            value={values?.questions?.[index]?.orderIndex}
                            onChange={(e) => {
                                setFieldValue(`questions.${index}.orderIndex`, parseInt(e));
                            }}
                            errors={getErrorForField(errors, index, "orderIndex")}
                            touched={touched?.questions?.[index]?.orderIndex}
                        />

                        <Checkbox
                            id="active"
                            checked={values?.questions?.[index]?.active}
                            title="Active"
                            onChange={(e) => setFieldValue(`questions.${index}.active`, e)}
                        />
                    </div>
                );
            })}
            <div className="flex gap-5 justify-end mt-3">
                <PrimaryBtn
                    isUpper
                    leftIcon={<IconPlus />}
                    title={values.questions?.length == 0 ? " New Survey Question" : " Another Survey Question"}
                    onClick={() => {
                        const obj = Object.assign([], values.questions);
                        obj.push({
                            active: false,
                            title: {
                                en: ""
                            },
                            type: "",
                            option1: {

                            },
                            option2: {

                            },
                            option3: {

                            },
                            option4: {

                            },
                            orderIndex: values?.questions?.length + 1,
                        });
                        setFieldValue("questions", obj);
                    }}
                />
                <PrimaryBtn
                    isLoading={isSubmitting}
                    disabled={!dirty || isSubmitting}
                    title={surveyById ? "Update" : "Save"}
                    isUpper
                    onClick={() => handleSubmit()} />
            </div>
        </>
    );
};

export default SurveyQuestionEditForm;
