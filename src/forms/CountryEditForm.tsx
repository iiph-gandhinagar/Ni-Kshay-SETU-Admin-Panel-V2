
import { useFormik } from "formik";
import { CountryEditFormProps } from "master-table-action";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { updateCountry } from "../store/actions/masterTable.action";
import { createCountry } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
import { masterEditFormProps } from "master-table";
import { logActivity } from "../store/actions/report.action";
export const CountryEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { countryById } = useSelector((status: IRootState) => status.master);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: countryById?.title || "",
        } as CountryEditFormProps,
        onSubmit: (values, actions) => {
            if (countryById?._id) {
                dispatch(
                    updateCountry(
                        countryById?._id,
                        getUpdatedFields({
                            title: countryById?.title,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: countryById,
                                        new: res?.data
                                    }
                                }));
                                close();
                            } else {
                                ErrorToast(res.message);
                            }
                        },
                    )
                );
            } else {
                dispatch(
                    createCountry({
                        obj: values,
                        callBack: (res: any) => {
                            if (res.status) {
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
    const { errors, values,setFieldError ,setFieldValue, touched, handleSubmit } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <span className="text-xl font-bold mb-4">Country Data</span>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            placeholder="Title"
                            className="w-500"
                            label="Title*"
                            id="title"
                            type="text"
                            onChange={(e) => setFieldValue("title", e)}
                            value={values.title}
                            errors={errors.title}
                            touched={touched.title}
                        />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn title={countryById?._id ? "Update" : "Save"}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
