import { useFormik } from "formik";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { MultiSelectInput, SelectInput } from "../components/Inputs/SelectInput";
import { IRootState } from "../store";
import { createPluginManagement, updatePluginManagement } from "../store/actions/masterTable.action";
import { logActivity } from "../store/actions/report.action";
import { cleartAllCaderTypeList, getAllCaderTypeList } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields, handleAllSelection } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

export const PluginManagementEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { pluginManagementById, caderList, cadreTypeList } = useSelector((status: IRootState) => status.master);
    const validationSchema = Yup.object().shape({
        title: Yup.string().trim().required("Required"),
        cadreId: Yup.array().of(Yup.string()).when("isAllCadre", {
            is: false,
            then: Yup.array().min(1, "Required"),
            otherwise: Yup.array().notRequired(),
        }),
        cadreType: Yup.string().required("Required")
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: pluginManagementById?.title || "",
            cadreId: pluginManagementById?.isAllCadre ? caderList?.map((e: any) => e._id) : pluginManagementById?.cadreId || [],
            isAllCadre: pluginManagementById?.isAllCadre,
            cadreType: pluginManagementById?.cadreType || "",
        },
        onSubmit: (values, actions) => {
            if (values.isAllCadre) {
                values.cadreId = [];
            }
            if (pluginManagementById?._id) {
                dispatch(
                    updatePluginManagement(
                        pluginManagementById?._id,
                        getUpdatedFields({
                            title: pluginManagementById?.title,
                            cadreId: pluginManagementById?.cadreId,
                            isAllCadre: pluginManagementById?.isAllCadre,
                            cadreType: pluginManagementById?.cadreType,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: pluginManagementById,
                                        new: res?.data
                                    }
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
                    ));
            } else {
                dispatch(
                    createPluginManagement(
                        values,
                        (res: any) => {
                            actions.setSubmitting(false);
                            if (res?.status) {
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
                        })
                );
            }
        },
        validationSchema: validationSchema,
    }
    );
    useEffect(() => {
        dispatch(getAllCaderTypeList());
        return () => {
            dispatch(cleartAllCaderTypeList());
        };
    }, []);
    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting, setFieldError } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <div className="space-y-3 dark:text-white mt-1">
                    <Fragment>
                        <SelectInput
                            className="w-500"
                            label="Title*"
                            placeholder="Select Title"
                            id="title"
                            menuPortalTarget={null}
                            options={[
                                { label: "Knowledge Connect", value: "Knowledge Connect" },
                                { label: "ManageTB India", value: "ManageTB India" },
                                { label: "Query2COE", value: "Query2COE" },
                                { label: "Knowledge Quiz", value: "Knowledge Quiz" },
                                { label: "Screening Tool", value: "Screening Tool" },
                                { label: "Diagnostic Cascade", value: "Diagnostic Cascade" },
                                { label: "Treatment Cascade", value: "Treatment Cascade" },
                                { label: "Differentiated Care", value: "Differentiated Care" },
                                { label: "Referral Health Facilities", value: "Referral Health Facilities" },
                            ]}
                            onChange={(e) => setFieldValue("title", e)}
                            value={values.title}
                            errors={errors.title}
                            touched={touched.title}
                        />
                        <SelectInput
                            label="Cadre Type*"
                            id="cadreType"
                            menuPortalTarget={null}
                            options={
                                [{ label: "All", value: "All" }, ...(Array.isArray(cadreTypeList) ? cadreTypeList.map((e: any) => ({
                                    label: e?.replace("_", " "),
                                    value: e
                                })) : [])]}
                            onChange={(e) => {
                                setFieldValue("cadreType", e);
                            }}
                            value={values.cadreType}
                            errors={errors.cadreType as string}
                            touched={touched.cadreType as boolean}
                            placeholder={"Select Option"}
                        />
                        <MultiSelectInput
                            isSelectAll
                            menuPortalTarget={null}
                            className="w-500"
                            label="Cadre Id*"
                            id="cadreId"
                            placeholder="Select Cadre"
                            options={[
                                ...(Array.isArray(caderList) ? caderList.map((e: any) => ({
                                    label: e.title,
                                    value: e._id
                                })) : [])
                            ]}
                            onChange={(e) => handleAllSelection(e, setFieldValue, caderList || [], "isAllCadre", "cadreId")}
                            value={values.cadreId}
                            errors={errors.cadreId}
                            touched={touched.cadreId}
                        />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                title={pluginManagementById?._id ? "Update" : "Save"}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
