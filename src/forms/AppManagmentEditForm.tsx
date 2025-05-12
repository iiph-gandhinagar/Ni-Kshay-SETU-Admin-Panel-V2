import { useFormik } from "formik";
import { AddManagementEditFormProps } from "master-table-action";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { createAppManagmentFlag, updateAppManagmentByID } from "../store/actions/config.action";
import { logActivity } from "../store/actions/report.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

export const AppManagmentEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { getAppFlagById } = useSelector((status: IRootState) => status.config);
    const validationSchema = Yup.object().shape({
        variable: Yup.string().required("Required"),
        type: Yup.string().required("Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            variable: getAppFlagById?.variable || "",
            value: {
                "en": getAppFlagById?.value?.en || "",
            },
            type: "",
        } as AddManagementEditFormProps,
        onSubmit: (values: any, actions) => {
            if (getAppFlagById?._id) {
                dispatch(
                    updateAppManagmentByID(
                        getAppFlagById?._id,
                        getUpdatedFields({
                            variable: getAppFlagById?.variable,
                            type: getAppFlagById?.type,
                            value: getAppFlagById?.value?.en,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: getAppFlagById,
                                        new: res?.data
                                    }
                                }));
                                close();
                            }
                            else {
                                ErrorToast(res?.message);
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                        setFieldError(fieldName, errorMessage);
                                    });
                                }
                            }
                        },
                    ),
                );
            } else {
                dispatch(
                    createAppManagmentFlag(
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
                            }
                            else {
                                ErrorToast(res?.message);
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                        setFieldError(fieldName, errorMessage);
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

    const { errors, values, setFieldValue, setFieldError, touched, handleSubmit, dirty, isSubmitting } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <div className="flex  justify-between">
                    <span className="text-xl font-bold mb-4">{getAppFlagById?._id ? "Edit" : "Add"} App Management Data</span>
                </div>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            label="Variable*"
                            placeholder="Variable"
                            id="variable"
                            type="text"
                            onChange={(e) => setFieldValue("variable", e)}
                            value={values.variable}
                            errors={errors.variable as string}
                            touched={touched.variable as boolean}
                        />
                        <SelectInput
                            menuPortalTarget={null}
                            label="Type*"
                            id="type"
                            placeholder="Type"
                            errors={errors.type as string}
                            touched={touched.type as boolean}
                            value={values.type}
                            options={[{
                                label: "Boolean",
                                value: "boolean"
                            }, {
                                label: "String",
                                value: "string"
                            }, {
                                label: "Float",
                                value: "float",
                            }, {
                                label: "List",
                                value: "list"
                            }]}
                            onChange={(e) => setFieldValue("type", e)}
                        />
                        <PrimaryTextInput
                            className="w-500"
                            label="Value*"
                            placeholder="Value"
                            id="value"
                            type="text"
                            value={values?.value?.en}
                            onChange={(e) => setFieldValue("value.en", e)}
                            errors={errors.value as string}
                            touched={touched.value as boolean}
                        />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn title={getAppFlagById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
