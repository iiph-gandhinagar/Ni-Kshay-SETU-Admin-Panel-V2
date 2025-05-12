import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import { EditorInput } from "../components/Inputs/EditorInput";
import MultipleFileUpload from "../components/Inputs/MultipleFileUpload";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { logActivity } from "../store/actions/report.action";
import { createStaticKeyFeature, updateStaticKeyFeatureById, uploadStaticKeyFeatureFile } from "../store/actions/static.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    title: Yup.object().shape({
        "en": Yup.string().trim().required("Required"),
    }),
    description: Yup.object().shape({
        "en": Yup.string().trim().required("Required"),
    }),
    icon: Yup.array().of(Yup.string().trim().required("Required")),
    backgroundIcon: Yup.array().of(Yup.string().trim().required("Required")),
    orderIndex: Yup.number().required("Required").min(0, "Order index cannot be negative"),
});

const StaticKeyFeatureEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { staticKeyFeatureById } = useSelector((state: IRootState) => state.static);
    const { translationLang } = useSelector((state: IRootState) => state.app);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: staticKeyFeatureById?.title || { en: "" },
            description: staticKeyFeatureById?.description || { en: "" },
            icon: staticKeyFeatureById?.icon || [],
            backgroundIcon: staticKeyFeatureById?.backgroundIcon || [],
            orderIndex: staticKeyFeatureById?.orderIndex || 1,
            active: staticKeyFeatureById?.active || false,
        },
        onSubmit: (values, actions) => {
            if (staticKeyFeatureById?._id) {
                dispatch(
                    updateStaticKeyFeatureById(
                        staticKeyFeatureById?._id,
                        getUpdatedFields({
                            title: staticKeyFeatureById.title,
                            description: staticKeyFeatureById.description,
                            icon: staticKeyFeatureById.icon,
                            backgroundIcon: staticKeyFeatureById.backgroundIcon,
                            orderIndex: staticKeyFeatureById.orderIndex,
                            active: staticKeyFeatureById.active,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: staticKeyFeatureById,
                                        new: res?.data
                                    }
                                }));
                                close();
                            } else {
                                ErrorToast(res?.message);
                            }
                        },
                    ),
                );
            } else {
                dispatch(
                    createStaticKeyFeature(
                        values,
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
                                close();
                            } else {
                                ErrorToast(res?.message);
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const fieldName = Object.keys(error)[0];
                                        const errorMessage = error[fieldName];
                                        setFieldError(fieldName.toLowerCase(), errorMessage);
                                    });
                                }
                            }
                        },
                    ),
                );
            }
        },
        validationSchema: validationSchema,
    });

    const { errors, values, setFieldError, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;

    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <BoxCard headerName="Static Key Feature"
                rightComponent={<TranslationsManagement />}>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            label="Title*"
                            id="title"
                            placeholder="Feature Title"
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
                                    label={"Title" + " " + "(" + translationLang + ")"}
                                    placeholder={`Feature Title in ${translationLang}`}
                                    value={values?.title?.[translationLang]}
                                    onChange={(e) => setFieldValue("title." + translationLang, e)}
                                />
                            )
                        }
                        <EditorInput
                            label="Description*"
                            id="description"
                            value={values.description.en}
                            onChange={(e) => setFieldValue("description.en", e)}
                            errors={errors.description?.en}
                            touched={touched.description?.en}
                        />
                        {
                            translationLang !== undefined && (
                                <EditorInput
                                    label={"Description*" + " " + "(" + translationLang + ")"}
                                    id={"description" + translationLang}
                                    value={values.description?.[translationLang]}
                                    onChange={(e) => setFieldValue("description." + translationLang, e)}
                                />
                            )
                        }
                        <MultipleFileUpload
                            acceptedFileTypes={"image/*"}
                            label="Icon*"
                            field="icon"
                            initialFiles={formik.values.icon}
                            typeOfMaterial={"images"}
                            action={uploadStaticKeyFeatureFile}
                            setFieldValue={formik.setFieldValue}
                        />
                        <MultipleFileUpload
                            acceptedFileTypes={"image/*"}
                            label="Background Icon*"
                            field="backgroundIcon"
                            initialFiles={formik.values.backgroundIcon}
                            typeOfMaterial={"images"}
                            action={uploadStaticKeyFeatureFile}
                            setFieldValue={formik.setFieldValue}
                        />
                        <PrimaryTextInput
                            label="Order Index*"
                            id="orderIndex"
                            type="number"
                            value={values.orderIndex}
                            onChange={(e) => setFieldValue("orderIndex", Number(e))}
                            errors={errors.orderIndex}
                            touched={touched.orderIndex}
                        />
                        <Checkbox
                            label="Active*"
                            id="active"
                            checked={values?.active as boolean}
                            onChange={(e) => setFieldValue("active", e)}
                        />
                    </Fragment>
                </div>
            </BoxCard>
            <PrimaryBtn
                title={staticKeyFeatureById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()}
            />
        </div>
    );
};

export default StaticKeyFeatureEditForm;
