
import { useFormik } from "formik";
import { CaderEditFormProps } from "master-table-action";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { updateCader } from "../store/actions/masterTable.action";
import { createCader } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
import { masterEditFormProps } from "master-table";
import { logActivity } from "../store/actions/report.action";
export const CaderEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { caderById, cadreTypeList, primaryCaderList } = useSelector((status: IRootState) => status.master);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        cadreType: Yup.string().required("Required"),
        cadreGroup: Yup.string().required("Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: caderById?.title || "",
            cadreType: caderById?.cadreType || "",
            cadreGroup: caderById?.cadreGroup || "",
        } as CaderEditFormProps,
        onSubmit: (values, actions) => {
            if (caderById?._id) {
                dispatch(
                    updateCader(
                        caderById?._id,
                        getUpdatedFields({
                            title: caderById?.title,
                            cadreType: caderById?.cadreType,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: caderById,
                                        new: res?.data
                                    }
                                }));
                                close();
                            } else {
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const fieldName = Object.keys(error)[0];
                                        const errorMessage = error[fieldName];
                                        ErrorToast(errorMessage);
                                        setFieldError(fieldName, errorMessage);
                                    });
                                }
                            }
                        },
                    ));
            } else {
                dispatch(
                    createCader({
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
    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting, setFieldError } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <span className="text-xl font-bold mb-4">Cadre Data</span>
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
                            placeholder={"Select Options"}
                            label="Cadre Type*"
                            id="date"
                            options={cadreTypeList?.map((e: any) => ({
                                label: e,
                                value: e
                            }))}
                            onChange={(e) => setFieldValue("cadreType", e)}
                            value={values.cadreType}
                            errors={errors.cadreType}
                            touched={touched.cadreType} />

                        <SelectInput
                            menuPortalTarget={null}
                            placeholder={"Select Options"}
                            label="Primary Cadre*"
                            id="cadreGroup"
                            options={primaryCaderList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                            onChange={(e) => setFieldValue("cadreGroup", e)}
                            value={values.cadreGroup}
                            errors={errors.cadreGroup}
                            touched={touched.cadreGroup} />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn title={caderById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
