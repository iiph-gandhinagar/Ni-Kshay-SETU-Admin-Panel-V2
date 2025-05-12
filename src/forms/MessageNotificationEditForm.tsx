import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { SelectInput } from "../components/Inputs/SelectInput";
import SingleFileUpload from "../components/Inputs/SingleFileUpload";
import { createMessageNotification } from "../store/actions/config.action";
import { logActivity } from "../store/actions/report.action";
import { ErrorToast } from "../utils/toasts";

export const MessageNotificationEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        files: Yup.mixed().required("File is required"),
        message: Yup.string().required("Message is required"),
    });

    const formik = useFormik({
        initialValues: {
            message: "",
            files: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            const formData = new FormData();
            if (values.files) {
                formData.append("files", values.files);
            } else {
                console.warn("No file selected");
            }
            formData.append("message", values.message);
            try {
                dispatch(
                    createMessageNotification(
                        formData,
                        (res: any) => {
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
                                        const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                        formik.setFieldError(fieldName, errorMessage.split(":")[3]?.trim());
                                    });
                                }
                            }
                        }
                    )
                );
            } catch (error) {
                ErrorToast("Failed to send request");
                console.error(error);
            } finally {
                actions.setSubmitting(false);
            }
        },

    });

    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <div className="flex justify-between">
                    <span className="text-xl font-bold mb-4">Add Message Notification</span>
                </div>
                <div className="space-y-3 dark:text-white mt-4">
                    <SingleFileUpload
                        label="Upload your CSV"
                        acceptedFileTypes=".csv"
                        field="files"
                        setFieldValue={setFieldValue}
                        errors={errors.files as string}
                        touched={touched.files as boolean}
                    />
                    <SelectInput
                        label="Message*"
                        placeholder="Enter your message"
                        id="message"
                        menuPortalTarget={null}
                        onChange={(e) => setFieldValue("message", e)}
                        options={[{
                            value: "Hey! Kindly find technical knowledge support app for National TB Program (NTEP). \"Nikshay SETU\". Search on Google Play Store or visit: www.nikshay-setu.in",
                            label: "Hey! Kindly find technical knowledge support app for National TB Program (NTEP). \"Nikshay SETU\". Search on Google Play Store or visit: www.nikshay-setu.in"
                        }, {
                            value: "You are missing the new features and modules of the Nikshay Setu app on the NTEP Program. Download \"Nikshay Setu\" app from Google Play Store powered by Digiflux",
                            label: "You are missing the new features and modules of the Nikshay Setu app on the NTEP Program. Download \"Nikshay Setu\" app from Google Play Store powered by Digiflux"
                        }, {
                            value: "Update Now! You are missing the new features and modules of the NTEP on the Nikshay Setu app. Update \"Nikshay Setu\" app from Google Play Store powered by Digiflux",
                            label: "Update Now! You are missing the new features and modules of the NTEP on the Nikshay Setu app. Update \"Nikshay Setu\" app from Google Play Store powered by Digiflux"
                        }]}
                        value={values.message}
                        errors={errors.message as string}
                        touched={touched.message as boolean}
                    />
                </div>
            </div>

            <PrimaryBtn
                title="Save"
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()}
            />
        </div>
    );
};
