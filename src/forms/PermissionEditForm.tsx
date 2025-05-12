import { useFormik } from "formik";
import { PermissionEditFormProps } from "master-table-action";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { updatePermissionByID } from "../store/actions/auth.action";
import { logActivity } from "../store/actions/report.action";
import { createPermission } from "../store/reducer/auth.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
export const PermissionEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { permissionByID, } = useSelector((status: IRootState) => status.auth);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required").trim(),
        moduleName: Yup.string().required("Required").trim(),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: permissionByID?.name || "",
            moduleName: permissionByID?.moduleName || "",
            description: permissionByID?.description || "",
        } as PermissionEditFormProps,
        onSubmit: (values, actions) => {
            if (permissionByID?._id) {
                dispatch(
                    updatePermissionByID(
                        permissionByID?._id,
                        getUpdatedFields({
                            name: permissionByID?.name,
                            description: permissionByID?.description,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: permissionByID,
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
                    createPermission({
                        obj: values,
                        callBack: () => {
                            close();
                        },
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
                <span className="text-xl font-bold mb-4">Permission Data</span>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            label="Name*"
                            id="Name"
                            placeholder="Name"
                            type="text"
                            onChange={(e) => setFieldValue("name", e)}
                            value={values.name}
                            errors={errors.name}
                            touched={touched.name}
                        />
                        <PrimaryTextInput
                            className="w-500"
                            label="Description"
                            placeholder="Description"
                            id="description"
                            type="text"
                            onChange={(e) => setFieldValue("description", e)}
                            value={values.description}
                            errors={errors.description}
                            touched={touched.description}
                        />
                        <PrimaryTextInput
                            className="w-500"
                            label="Module Name*"
                            placeholder="Module Name"
                            id="ModuleName"
                            type="text"
                            onChange={(e) => setFieldValue("moduleName", e)}
                            value={values.moduleName}
                            errors={errors.moduleName}
                            touched={touched.moduleName}
                        />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                title={permissionByID?._id ? "Update" : "Save"}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
