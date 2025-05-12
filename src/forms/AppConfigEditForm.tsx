import { useFormik } from "formik";
import { AppConfigEditFormProps } from "master-table-action";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { updateConfigByID } from "../store/actions/config.action";
import { logActivity } from "../store/actions/report.action";
import { createConfig } from "../store/reducer/config.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
export const AppConfigEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { configById } = useSelector((status: IRootState) => status.config);
    const { translationLang } = useSelector((status: IRootState) => status.app);
    const validationSchema = Yup.object().shape({
        key: Yup.string().trim().required("Required"),
        value: Yup.object().shape({
            "en": Yup.string().trim().required("Required"),
        })
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            key: configById?.key || "",
            value: configById?.value || {
                "en": "",
            }
        } as AppConfigEditFormProps,
        onSubmit: (values, actions) => {
            if (configById?._id) {
                dispatch(
                    updateConfigByID(
                        configById?._id,
                        getUpdatedFields({
                            key: configById?.key,
                            value: configById?.value,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: configById,
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
                    createConfig({
                        obj: values,
                        callBack: (res: any) => {
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
                    })
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
                <div className="flex justify-between">
                    <span className="text-xl font-bold mb-4">App Config Data</span>
                    <TranslationsManagement />
                </div>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            disabled={configById?._id ? true : false}
                            label="Key*"
                            placeholder="Key"
                            id="key"
                            type="text"
                            onChange={(e) => setFieldValue("key", e)}
                            value={values.key}
                            errors={errors.key}
                            touched={touched.key}
                        />
                        <PrimaryTextInput
                            className="w-500"
                            label="Value (English)*"
                            id="Value"
                            placeholder="Value"
                            type="text"
                            onChange={(e) => setFieldValue("value.en", e)}
                            value={values.value?.en}
                            errors={errors.value?.en}
                            touched={touched.value?.en}
                        />
                        {translationLang &&
                            <PrimaryTextInput
                                className="w-500"
                                label={`Value (${translationLang})`}
                                id="value.en"
                                placeholder="Value"
                                type="text"
                                onChange={(e) => setFieldValue(`value.${translationLang}`, e)}
                                value={values.value?.[translationLang]}
                            />
                        }
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                title={configById?._id ? "Update" : "Save"}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
