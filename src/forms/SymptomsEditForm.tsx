import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { SymptomsEditFormProps } from "master-table-action";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { createSymptom, updateSymptom } from "../store/actions/masterTable.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
import { logActivity } from "../store/actions/report.action";

const SymptomsEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { symptomById } = useSelector((state: IRootState) => state.master);
    const validationSchema = Yup.object().shape({
        category: Yup.string().required("Required"),
        icon: Yup.string().required("Required")
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: symptomById?.title,
            category: symptomById?.category || "",
            icon: symptomById?.icon || "",
        } as SymptomsEditFormProps,
        onSubmit: (values, actions) => {
            if (symptomById?._id) {
                dispatch(
                    updateSymptom(
                        symptomById?._id,
                        getUpdatedFields({
                            title: symptomById?.title,
                            category: symptomById?.category,
                            icon: symptomById?.icon,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: symptomById,
                                        new: res?.data
                                    }
                                }));
                                close();
                            }
                            else {
                                ErrorToast(res?.message);
                            }
                        },
                    ),
                );
            } else {
                dispatch(
                    createSymptom(
                        getUpdatedFields({
                            title: symptomById?.title,
                            category: symptomById?.category,
                            icon: symptomById?.icon,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
                                close();
                            }
                            else {
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
    const { translationLang } = useSelector((state: IRootState) => state.app);
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <div className="flex  justify-between">
                    <span className="text-xl font-bold mb-4">Symptom Data</span>
                    <TranslationsManagement />
                </div>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            label="Title*"
                            placeholder="Title"
                            id="Title"
                            type="text"
                            onChange={(e) => setFieldValue("title.en", e)}
                            value={values.title?.en}
                            errors={errors.title}
                            touched={touched.title}
                        />
                        {translationLang &&
                            <PrimaryTextInput
                                className="w-500"
                                label={"Title" + " " + `(${translationLang})`}
                                id="Title"
                                placeholder="Optional"
                                type="text"
                                onChange={(e) => setFieldValue(`title.${translationLang}`, e)}
                                value={values?.title?.[translationLang]}
                                errors={errors.title}
                                touched={touched.title}
                            />
                        }
                        <SelectInput
                            menuPortalTarget={null}
                            label="Category*"
                            id="Category"
                            placeholder="Category"
                            errors={errors.category}
                            touched={touched.category}
                            value={values.category}
                            options={[{
                                label: "Category 1",
                                value: "1"
                            },
                            {
                                label: "Category 2",
                                value: "2"
                            }]}
                            onChange={(e) => setFieldValue("category", e)}
                        />
                        <PrimaryTextInput
                            className="w-500"
                            label="Icon*"
                            placeholder="Icon"
                            id="Icon"
                            type="text"
                            onChange={(e) => setFieldValue("icon", e)}
                            value={values.icon}
                            errors={errors.icon}
                            touched={touched.icon}
                        />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn title={symptomById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};

export default SymptomsEditForm;
