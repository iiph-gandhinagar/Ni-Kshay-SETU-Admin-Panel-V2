

import { useFormik } from "formik";
import { AbbreviationEditFormProps } from "master-table-action";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { createAbbreviationByID, updateAbbreviationByID } from "../store/actions/chatModule.action";
import { logActivity } from "../store/actions/report.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
export const AbbreviationEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { abbreviationById } = useSelector((status: IRootState) => status.chatModule);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        patterns: Yup.array().of(Yup.string()).required("Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: abbreviationById?.title || "",
            patterns: abbreviationById?.patterns || [],
        } as AbbreviationEditFormProps,
        onSubmit: (values, actions) => {
            if (abbreviationById?._id) {
                dispatch(
                    updateAbbreviationByID(
                        abbreviationById?._id,
                        getUpdatedFields({
                            title: abbreviationById?.title,
                            patterns: abbreviationById?.patterns,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: abbreviationById,
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
                    createAbbreviationByID(
                        values,
                        (res) => {
                            if (res?.status) {
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
                                close();
                            }
                        },
                    )
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
                <span className="text-xl font-bold mb-4">Abbreviation Data</span>
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
                            label="Full Form*"
                            placeholder="Full Form"
                            id="id"
                            type="text"
                            onChange={(e) => setFieldValue("patterns", [e])}
                            value={values.patterns}
                            errors={errors.patterns}
                            touched={touched.patterns}
                        />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                title={abbreviationById?._id ? "Update" : "Save"}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
