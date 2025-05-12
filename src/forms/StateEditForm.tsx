

import { useFormik } from "formik";
import { StateEditFormProps } from "master-table-action";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { updateState } from "../store/actions/masterTable.action";
import { createState } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
import { logActivity } from "../store/actions/report.action";
export const StateEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { stateById, countryList } = useSelector((status: IRootState) => status.master);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        countryId: Yup.string().required("Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: stateById?.title || "",
            countryId: stateById?.countryId || "",
        } as StateEditFormProps,
        onSubmit: (values, actions) => {
            if (stateById?._id) {
                dispatch(
                    updateState(
                        stateById?._id,
                        getUpdatedFields({
                            title: stateById?.title,
                            countryId: stateById?.countryId,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: stateById,
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
                    createState({
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
    const { errors, values, setFieldError, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;

    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <span className="text-xl font-bold mb-4">State Data</span>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            placeholder="Title"
                            label="Title*"
                            id="title"
                            type="text"
                            onChange={(e) => setFieldValue("title", e)}
                            value={values.title}
                            errors={errors.title}
                            touched={touched.title}
                        />
                        <SelectInput
                            menuPortalTarget={null}
                            placeholder="Country"
                            label="Country*"
                            id="date"
                            options={countryList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                            onChange={(e) => setFieldValue("countryId", e)}
                            value={values.countryId}
                            errors={errors.countryId}
                            touched={touched.countryId} />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                title={stateById?._id ? "Update" : "Save"}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
