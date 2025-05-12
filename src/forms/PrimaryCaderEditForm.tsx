
import { useFormik } from "formik";
import { CaderEditFormProps } from "master-table-action";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { updatePrimaryCader } from "../store/actions/masterTable.action";
import { createPrimaryCader } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
import { masterEditFormProps } from "master-table";
import { logActivity } from "../store/actions/report.action";
import { title } from "process";
export const PrimaryCaderEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { primaryCaderById, loader } = useSelector((status: IRootState) => status.master);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        audienceId: Yup.number().required("Required").min(0, "Audience Id cannot be negative"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: primaryCaderById?.title || "",
            audienceId: primaryCaderById?.audienceId || "",
        } as CaderEditFormProps,
        onSubmit: (values, actions) => {
            if (primaryCaderById?._id) {
                dispatch(
                    updatePrimaryCader(
                        primaryCaderById?._id,
                        getUpdatedFields({
                            title: primaryCaderById?.title,
                            audienceId: primaryCaderById?.audienceId
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: primaryCaderById,
                                        new: res?.data
                                    }
                                }));
                                close();
                            } else {
                                ErrorToast(res.message);
                            }
                        },
                    ));
            } else {
                dispatch(
                    createPrimaryCader({
                        obj: values,
                        callBack: (res: any) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
                                close();
                            } else {
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const fieldName = Object.keys(error)[0];
                                        const errorMessage = error[fieldName];
                                        setFieldError(fieldName, errorMessage);
                                    });
                                }
                            }
                        },
                    }
                    )
                );
            }
        },
        validationSchema: validationSchema,
    });
    const { errors, values, setFieldError, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <span className="text-xl font-bold mb-4">Primary Cadre Data</span>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            label="Title*"
                            placeholder="Title"
                            id="title"
                            type="text"
                            onChange={(e) => setFieldValue("title", e)}
                            value={values.title}
                            errors={errors.title}
                            touched={touched.title}
                        />
                         <PrimaryTextInput
                            className="w-500"
                            label="Audience Id*"
                            placeholder="Audience Id"
                            id="audienceId"
                            type="number"
                            onChange={(e) => setFieldValue("audienceId", e)}
                            value={values.audienceId}
                            errors={errors.audienceId}
                            touched={touched.audienceId}
                        />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn title={primaryCaderById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
