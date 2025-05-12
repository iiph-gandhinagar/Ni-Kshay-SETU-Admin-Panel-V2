import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import { EditorInput } from "../components/Inputs/EditorInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { logActivity } from "../store/actions/report.action";
import { createStaticTestimonial, updateStaticTestimonialById } from "../store/actions/static.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    name: Yup.object().shape({
        "en": Yup.string().trim().required("Required"),
    }),
    description: Yup.object().shape({
        "en": Yup.string().trim().required("Required"),
    }),
    orderIndex: Yup.number().required("Required").min(0, "Order index cannot be negative"),
});

const StaticTestimonialEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { staticTestimonialById } = useSelector((state: IRootState) => state.static);
    const { translationLang } = useSelector((state: IRootState) => state.app);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: staticTestimonialById?.name || { en: "" },
            description: staticTestimonialById?.description || { en: "" },
            orderIndex: staticTestimonialById?.orderIndex || 1,
            active: staticTestimonialById?.active || false,
        },
        onSubmit: (values, actions) => {
            if (staticTestimonialById?._id) {
                dispatch(
                    updateStaticTestimonialById(
                        staticTestimonialById?._id,
                        getUpdatedFields({
                            name: staticTestimonialById?.name,
                            description: staticTestimonialById?.description,
                            orderIndex: staticTestimonialById?.orderIndex,
                            active: staticTestimonialById?.active,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: staticTestimonialById,
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
                    createStaticTestimonial(
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
            <BoxCard headerName="Static Testimonial"
                rightComponent={<TranslationsManagement />}>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            label="Name*"
                            id="name"
                            placeholder="Testimonial name"
                            value={values?.name.en}
                            onChange={(e) => setFieldValue("name.en", e)}
                            errors={typeof errors?.name == "object" ? "Required" : "" as string}
                            touched={touched?.name?.en}
                        />
                        {
                            translationLang !== undefined && (
                                <PrimaryTextInput
                                    type="text"
                                    id={"name" + translationLang}
                                    label={"name" + " " + "(" + translationLang + ")"}
                                    placeholder={`Testimonial name In ${translationLang}`}
                                    value={values?.name?.[translationLang]}
                                    onChange={(e) => setFieldValue("name." + translationLang, e)}
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
                        <PrimaryTextInput
                            label="Order Index*"
                            id="orderIndex"
                            type="number"
                            placeholder="Order index"
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
                title={staticTestimonialById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()}
            />
        </div>
    );
};

export default StaticTestimonialEditForm;
