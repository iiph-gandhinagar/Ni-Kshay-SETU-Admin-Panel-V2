import { useFormik } from "formik";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { EditorInput } from "../components/Inputs/EditorInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { createMasterCms, updateMasterCmsByID } from "../store/actions/config.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
import { logActivity } from "../store/actions/report.action";
export const MasterCmsEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { masterCmsById } = useSelector((status: IRootState) => status.config);
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.object().shape({
            "en": Yup.string().required("Required"),
        }),
    });
    const formik = useFormik({
        enableReinitialize: true,
        validateOnBlur: true,
        validateOnMount: true,
        initialValues: {
            title: masterCmsById?.title || "",
            description: masterCmsById?.description || {}
        },
        onSubmit: (values, actions) => {
            if (masterCmsById?._id) {
                dispatch(
                    updateMasterCmsByID(
                        masterCmsById?._id,
                        getUpdatedFields({
                            title: masterCmsById?.title,
                            description: masterCmsById?.description,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: masterCmsById,
                                        new: res?.data
                                    }
                                }));
                                close();
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
                        },
                    ));
            } else {
                dispatch(
                    createMasterCms(
                        values,
                        (res: any) => {
                            actions.setSubmitting(false);
                            if (res?.status) {
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
                                close();
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
                        },
                    )
                );
            }
        },
        validationSchema: validationSchema,
    });
    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting, setFieldError } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <div className="flex justify-end">
                    <TranslationsManagement />
                </div>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            label="Title*"
                            placeholder="title"
                            id="title"
                            type="text"
                            onChange={(e) => setFieldValue("title", e)}
                            value={values.title}
                            errors={errors.title as string}
                            touched={touched.title as boolean}
                        />
                        <EditorInput
                            id="description"
                            onChange={(e) => setFieldValue("description.en", e)}
                            value={values?.description?.en}
                            label="Description*"
                            errors={errors.description?.en as string}
                            touched={touched.description?.en as boolean}
                        />
                        {translationLang && <EditorInput
                            id="descriptionopt"
                            onChange={(e) => setFieldValue(`description.${translationLang}`, e)}
                            value={values?.description?.[translationLang]}
                            label={`Description (${translationLang})`} />
                        }
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                title={masterCmsById?._id ? "Update" : "Save"}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
