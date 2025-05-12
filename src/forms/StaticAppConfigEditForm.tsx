import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { createStaticAppConfig, updateStaticAppConfigById } from "../store/actions/static.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    key: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    value: Yup.object().shape({
        "en": Yup.string().trim().required("Required"),
    }),
});

const StaticAppConfigEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { staticAppConfigById } = useSelector((state: IRootState) => state.static);
    const { translationLang } = useSelector((status: IRootState) => status.app);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            key: staticAppConfigById?.key || "",
            value: staticAppConfigById?.value || { en: "" },
            type: staticAppConfigById?.type || "",
        },
        onSubmit: (values, actions) => {
            if (staticAppConfigById?._id) {
                dispatch(
                    updateStaticAppConfigById(staticAppConfigById._id, getUpdatedFields({
                        key: staticAppConfigById.key,
                        value: staticAppConfigById.value,
                        type: staticAppConfigById.type,
                    }, values), (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            close();
                        } else {
                            ErrorToast(res?.message);
                        }
                    })
                );
            } else {
                dispatch(
                    createStaticAppConfig(values, (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            close();
                        } else {
                            ErrorToast(res?.message);
                        }
                    })
                );
            }
        },
        validationSchema: validationSchema,
    });
    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;
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
                            label="Key*"
                            id="key"
                            placeholder="key"
                            onChange={(e) => setFieldValue("key", e)}
                            value={values.key}
                            errors={errors.key}
                            touched={touched.key}
                        />
                        <PrimaryTextInput
                            label="Type*"
                            id="type"
                            placeholder="type"
                            onChange={(e) => setFieldValue("type", e)}
                            value={values.type}
                            errors={errors.type}
                            touched={touched.type}
                        />
                        <PrimaryTextInput
                            label="Value*"
                            id="value"
                            placeholder="value (en)"
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
                                placeholder={`Value (${translationLang})`}
                                type="text"
                                onChange={(e) => setFieldValue(`value.${translationLang}`, e)}
                                value={values.value?.[translationLang]}
                            />
                        }
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn
                title={staticAppConfigById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()}
            />
        </div>
    );
};

export default StaticAppConfigEditForm;
