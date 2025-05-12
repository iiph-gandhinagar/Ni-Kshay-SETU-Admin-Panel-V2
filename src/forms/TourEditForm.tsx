import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tourListProps } from "tour";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";
import { BorderBtn, PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import IconCaretDown from "../components/Icon/IconCaretDown";
import IconPlus from "../components/Icon/IconPlus";
import SingleFileUpload from "../components/Inputs/SingleFileUpload";
import { CreatableSelectInput, PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { logActivity } from "../store/actions/report.action";
import { createTour, updateTourByID, uploadTourImage } from "../store/actions/tours.action";
import { getTourById } from "../store/reducer/tour.reducer";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    title: Yup.object().shape({
        "en": Yup.string().trim().required("Required"),
    }),
    tourSlides: Yup.array().of(Yup.object({
        title: Yup.object().shape({
            en: Yup.string().trim().required("Required"),
        }),
        shortDescription: Yup.object().shape({
            en: Yup.string().trim().required("Required"),
        }),
        description: Yup.object().shape({
            en: Yup.string().trim().required("Required"),
        }),
        icon: Yup.string().trim().required("Required"),
        colorGradient: Yup.array()
            .of(Yup.string().trim().required("Required"))
            .min(1, "At least one color is required in the gradient"),
        textColor: Yup.array()
            .of(Yup.string().trim().required("Required"))
            .min(1, "At least one text color is required"),
        orderIndex: Yup.number()
            .required("Required")
            .min(1, "Order index must be at least 1"),
    })),
});
export const TourEditForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const { tourById } = useSelector((state: IRootState) => state.tour);
    const [id] = useQueryParam("id", StringParam);
    const initialValues: tourListProps = {
        title: tourById?.title || {
            en: ""
        },
        tourSlides: tourById?.tourSlides || [{
            title: {
                en: ""
            },
            shortDescription: {
                en: ""
            },
            description: {
                en: ""
            },
            icon: "",
            colorGradient: [],
            textColor: [],
            orderIndex: 1,
            createdAt: "",
        }] as Array<{
            title: {
                en: ""
            },
            shortDescription: {
                en: ""
            },
            description: {
                en: ""
            },
            icon: "",
            colorGradient: [],
            textColor: [],
            orderIndex: 1,
            createdAt: "",
        }>,
        active: tourById?.active || false,
        default: tourById?.default || false,
    };
    const formik = useFormik<tourListProps>({
        enableReinitialize: true,
        validateOnBlur: true,
        validateOnMount: true,
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            if (tourById?._id) {
                dispatch(
                    updateTourByID(
                        tourById?._id,
                        values,
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                navigate("/tour");
                                actions.setSubmitting(false);
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: tourById,
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
                    createTour(
                        values,
                        (res) => {
                            if (res.status) {
                                navigate("/tour");
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
        validationSchema: validationSchema,
    });
    useEffect(() => {
        if (id) {
            dispatch(getTourById(id));
        }
    }, []);
    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting, setFieldError } = formik;
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
                        navigate(`/tour?${searchParams}`);
                    }} />
            </div>
            <BoxCard headerName={tourById?._id ? "Edit Tour" : "Add New Tour"}
                className="mb-4"
                rightComponent={<TranslationsManagement />}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                    <PrimaryTextInput
                        className="w-500"
                        label="Title*"
                        placeholder="Title"
                        id="title"
                        type="text"
                        onChange={(e) => setFieldValue("title.en", e)}
                        value={values.title?.en}
                        errors={errors?.title?.en}
                        touched={touched?.title?.en}
                    />
                    {translationLang &&
                        <PrimaryTextInput
                            className="w-500"
                            label={"Title (" + translationLang + ")"}
                            placeholder="Title"
                            id="title"
                            type="text"
                            onChange={(e) => setFieldValue(`title.[${translationLang}]`, e)}
                            value={values.title?.[translationLang]}
                        />}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-4">
                        <Checkbox
                            id="active"
                            label="Active*"
                            checked={values.active}
                            onChange={(value) => setFieldValue("active", value)}
                        />
                        <Checkbox
                            id="default"
                            label="Default*"
                            checked={values.default}
                            onChange={(value) => setFieldValue("default", value)}
                        />
                    </div>
                </div>
                {values?.tourSlides?.map((slide, index: number) => {
                    const getErrorForField = (errors: any, index: number, field: string, nestedField: string | null = null) => {
                        const error = errors?.tourSlides?.[index];
                        if (typeof error === "object" && !Array.isArray(error) && error !== null && typeof error !== "string") {
                            if (nestedField) {
                                return error[field]?.[nestedField];
                            }
                            return error[field];
                        }
                        return undefined;
                    };
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mb-4"
                            key={slide?._id}>
                            <div className="flex justify-between">
                                <h4 className="text-lg uppercase font-medium">Tour Slide {index + 1}</h4>
                                <PrimaryBtn
                                    title="remove"
                                    onClick={() => {
                                        setFieldValue("tourSlides", values.tourSlides?.filter((_: any, i: number) => i !== index));
                                    }}
                                />
                            </div>
                            <PrimaryTextInput
                                className="w-500"
                                label="Title*"
                                placeholder="Title"
                                id="title"
                                type="text"
                                onChange={(e) => setFieldValue(`tourSlides[${index}].title.en`, e)}
                                value={values?.tourSlides?.[index].title?.en}
                                errors={getErrorForField(errors, index, "title", "en")}
                                touched={touched.tourSlides?.[index]?.title?.en}
                            />
                            {translationLang &&
                                <PrimaryTextInput
                                    className="w-500"
                                    label={"Title (" + translationLang + ")"}
                                    placeholder="Title"
                                    id="title"
                                    type="text"
                                    onChange={(e) => setFieldValue(`tourSlides[${index}].title.[${translationLang}]`, e)}
                                    value={values?.tourSlides?.[index].title?.[translationLang]}
                                />
                            }
                            <PrimaryTextInput
                                className="w-500"
                                label="Short Description*"
                                placeholder="Short Description"
                                id="shortDescription"
                                type="text"
                                onChange={(e) => setFieldValue(`tourSlides[${index}].shortDescription.en`, e)}
                                value={values?.tourSlides?.[index].shortDescription?.en}
                                errors={getErrorForField(errors, index, "shortDescription", "en")}

                                touched={touched.tourSlides?.[index]?.shortDescription?.en}
                            />
                            {translationLang &&
                                <PrimaryTextInput
                                    className="w-500"
                                    label={"Short Description (" + translationLang + ")"}
                                    placeholder="Short Description"
                                    id="shortDescription"
                                    type="text"
                                    onChange={(e) => setFieldValue(`tourSlides[${index}].shortDescription.[${translationLang}]`, e)}
                                    value={values?.tourSlides?.[index].shortDescription?.[translationLang]}
                                />}
                            <PrimaryTextInput
                                className="w-500"
                                label="Description*"
                                placeholder="Description"
                                id=""
                                type="text-area"
                                onChange={(e) => setFieldValue(`tourSlides[${index}].description.en`, e)}
                                value={values?.tourSlides?.[index].description?.en}
                                errors={getErrorForField(errors, index, "description", "en")}

                                touched={touched.tourSlides?.[index]?.description?.en as boolean}
                            />
                            {translationLang &&
                                <PrimaryTextInput
                                    className="w-500"
                                    label={"Description (" + translationLang + ")"}
                                    placeholder="Description"
                                    id=""
                                    type="text-area"
                                    onChange={(e) => setFieldValue(`tourSlides[${index}].description.[${translationLang}]`, e)}
                                    value={values?.tourSlides?.[index].description?.[translationLang]}
                                />}
                            <SingleFileUpload
                                label="Icon*"
                                acceptedFileTypes="image/*"
                                field={`tourSlides[${index}].icon`}
                                action={uploadTourImage}
                                setFieldValue={setFieldValue}
                                initialFile={values?.tourSlides[index].icon}
                                errors={getErrorForField(errors, index, "icon")}
                                touched={touched.tourSlides?.[index]?.icon}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                                <CreatableSelectInput
                                    id="colorGradient"
                                    placeholder="i.e #FFFFFF - #FFF000"
                                    isMulti
                                    onCreateOption={(e) => setFieldValue(`tourSlides[${index}].colorGradient`, [...values?.tourSlides?.[index]?.colorGradient || [], ...[e]])}
                                    options={values?.tourSlides?.[index].colorGradient?.map((color) => ({ value: color, label: color }))}
                                    label="Color Gradient*"
                                    value={values?.tourSlides?.[index]?.colorGradient?.map((color) => ({ value: color, label: color }))}
                                    onChange={(e) => setFieldValue(`tourSlides[${index}].colorGradient`, e?.map((e: any) => e.value))}
                                    errors={getErrorForField(errors, index, "colorGradient")}

                                    touched={touched.tourSlides?.[index]?.colorGradient}
                                />
                                <CreatableSelectInput
                                    id="textColor"
                                    placeholder="i.e #FFFFFF - #FFF000"
                                    isMulti
                                    label="Text Color*"
                                    onCreateOption={(e) => setFieldValue(`tourSlides[${index}].textColor`, [...values?.tourSlides?.[index]?.textColor || [], ...[e]])}
                                    value={values?.tourSlides?.[index]?.textColor?.map((color) => ({ value: color, label: color }))}
                                    options={values?.tourSlides?.[index].textColor?.map((color) => ({ value: color, label: color }))}
                                    onChange={(e) => setFieldValue(`tourSlides[${index}].textColor`, e?.map((e: any) => e.value))}
                                    errors={getErrorForField(errors, index, "textColor")}

                                    touched={touched.tourSlides?.[index]?.textColor}
                                />
                                <PrimaryTextInput
                                    className="w-500"
                                    label="Order Index*"
                                    placeholder="Order Index"
                                    id="orderIndex"
                                    type="number"
                                    onChange={(e) => setFieldValue(`tourSlides[${index}].orderIndex`, parseFloat(e))}
                                    value={values?.tourSlides?.[index]?.orderIndex}
                                    errors={getErrorForField(errors, index, "orderIndex")}
                                    touched={touched.tourSlides?.[index]?.orderIndex}
                                />
                            </div>

                            <div className="w-[full] border-b-4"></div>
                        </div>);
                })}
                <div className="flex gap-5 justify-end">
                    <PrimaryBtn
                        isUpper
                        leftIcon={<IconPlus />}
                        title={values.tourSlides?.length == 0 ? " New Tour Slide" : " Another Tour Slide"}
                        onClick={() => {
                            const obj = Object.assign([], values.tourSlides);
                            obj.push({
                                title: { en: "" },
                                shortDescription: { en: "" },
                                description: { en: "" },
                                icon: "",
                                colorGradient: [],
                                textColor: [],
                                orderIndex: values?.tourSlides?.length + 1,
                                createdAt: new Date(),
                            });
                            setFieldValue("tourSlides", obj);
                        }}
                    />
                    <PrimaryBtn
                        isLoading={isSubmitting}
                        disabled={!dirty || isSubmitting}
                        title={tourById ? "Update" : "Save"}
                        isUpper
                        onClick={() => handleSubmit()} />
                </div>
            </BoxCard>
        </>
    );
};

export default TourEditForm;
