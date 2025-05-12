import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import SingleFileUpload from "../components/Inputs/SingleFileUpload";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { createAssessmentCertificate, updateAssessmentCertificate, uploadImage } from "../store/actions/masterTable.action";
import { logActivity } from "../store/actions/report.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    top: Yup.number().required("Required").min(1),
    left: Yup.number().required("Required").min(1),
});
const AssessmentCertificateEditForm = ({ close }: masterEditFormProps) => {
    const { assessmentCertificateById } = useSelector((state: IRootState) => state.master);
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: assessmentCertificateById?.title || "",
            image: assessmentCertificateById?.image || "",
            top: assessmentCertificateById?.top || 0,
            left: assessmentCertificateById?.left || 0,
        },
        onSubmit: (values, actions) => {
            if (assessmentCertificateById?._id) {
                dispatch(
                    updateAssessmentCertificate(
                        assessmentCertificateById?._id,
                        getUpdatedFields({
                            title: assessmentCertificateById?.title,
                            image: assessmentCertificateById?.image,
                            top: assessmentCertificateById?.top,
                            left: assessmentCertificateById?.left,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: assessmentCertificateById,
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
                    createAssessmentCertificate(
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
            <div className="panel">
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            label="Title*"
                            placeholder="Title"
                            id="Title"
                            type="text"
                            onChange={(e) => setFieldValue("title", e)}
                            value={values.title}
                            errors={errors.title}
                            touched={touched.title}
                        />

                        <SingleFileUpload
                            label="Upload Certificate*"
                            action={uploadImage}
                            acceptedFileTypes="image/*"
                            field="image"
                            setFieldValue={setFieldValue}
                            errors={errors?.image}
                            initialFile={values?.image}
                            touched={touched?.image}
                        />

                        <PrimaryTextInput
                            className="w-500"
                            label="Top*"
                            placeholder="Top"
                            id="Top"
                            type="number"
                            onChange={(e) => setFieldValue("top", parseFloat(e))}
                            value={values.top}
                            errors={errors.top}
                            touched={touched.top}
                        />
                        <PrimaryTextInput
                            className="w-500"
                            label="Left*"
                            placeholder="Left"
                            id="Left"
                            type="number"
                            onChange={(e) => setFieldValue("left", parseFloat(e))}
                            value={values.left}
                            errors={errors.left}
                            touched={touched.left}
                        />


                    </Fragment>
                </div>
            </div>

            <PrimaryBtn title={assessmentCertificateById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
export default AssessmentCertificateEditForm;
