import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { createManageTb } from "../store/actions/plugin.action";
import { logActivity } from "../store/actions/report.action";
import { SuccessToast } from "../utils/toasts";


const ManageTbEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { authUser } = useSelector((e: IRootState) => e.auth);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
        },
        onSubmit: (values, actions) => {
            dispatch(createManageTb(
                {
                    "title": values?.title,
                    "createdBy": authUser?._id,
                },
                (res) => {
                    actions.setSubmitting(false);
                    if (res.status) {
                        dispatch(logActivity({
                            "action": "create",
                            "moduleName": window.location.pathname,
                            "payload": res?.data,
                        }));
                        SuccessToast(res?.message);
                        close();
                    } else {
                        if (res?.data?.errors) {
                            res?.data?.errors?.forEach((error: any) => {
                                const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                setFieldError(fieldName, errorMessage);
                            });
                        }
                    }
                }
            ));
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
                            id="title"
                            type="text"
                            onChange={(e) => setFieldValue("title", e)}
                            value={values?.title}
                            errors={errors.title}
                            touched={touched.title}
                        />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn title={"Apply changes"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};

export default ManageTbEditForm;
