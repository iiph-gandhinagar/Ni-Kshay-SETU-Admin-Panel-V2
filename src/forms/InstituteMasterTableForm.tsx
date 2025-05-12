import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { InstituteMasterDataFormProps } from "master-table-action";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { IRootState } from "../store";
import { createMasterInstitute, updateMasterinstituteById } from "../store/actions/plugin.action";
import { logActivity } from "../store/actions/report.action";
import { cleartAllDistrictList, getAllDistrictList } from "../store/reducer/masterTable.reducer";
import { clearMasterInstituteId, getParentInstituteByType } from "../store/reducer/plugin.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
export const InstituteMasterDataForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { countryList, stateList, districtList } = useSelector((status: IRootState) => status.master);
    const { masterInstituteById, parentByType } = useSelector((status: IRootState) => status.plugin);
    const { rolesDetails } = useSelector((status: IRootState) => status.auth);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        role: Yup.string().required("Required"),
        countryId: Yup.string().required("Required"),
        parentId: Yup.string().when("role", {
            is: (role: any) => rolesDetails?.list?.find((e) => e._id == role)?.name !== "COE",
            then: Yup.string().required("Required"),
            otherwise: Yup.string().nullable()
        }),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: masterInstituteById?.title || "",
            parentId: masterInstituteById?.parentId || "",
            countryId: masterInstituteById?.countryId || "",
            role: masterInstituteById?.role || "",
            stateId: masterInstituteById?.stateId || "",
            districtId: masterInstituteById?.districtId || "",
        } as InstituteMasterDataFormProps,
        onSubmit: (values, actions) => {
            if (masterInstituteById?._id) {
                dispatch(
                    updateMasterinstituteById(
                        masterInstituteById?._id,
                        getUpdatedFields({
                            title: masterInstituteById?.title,
                            parentId: masterInstituteById?.parentId,
                            countryId: masterInstituteById?.countryId,
                            role: masterInstituteById?.role,
                            stateId: masterInstituteById?.stateId,
                            districtId: masterInstituteById?.districtId,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: masterInstituteById,
                                        new: res?.data
                                    }
                                }));
                                dispatch(clearMasterInstituteId());
                                close();
                            } else {
                                ErrorToast(res.message);
                            }
                        },
                    ));
            } else {
                dispatch(
                    createMasterInstitute(
                        values,
                        (res) => {
                            actions.setSubmitting(false);
                            if (res?.status) {
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
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
                    )
                );
            }
        },
        validationSchema: validationSchema,
    });
    const { errors, values, setFieldValue, touched, setFieldError, handleSubmit, isSubmitting, dirty } = formik;
    useEffect(() => {
        return () => {
            dispatch(cleartAllDistrictList());
        };
    }, []);
    useEffect(() => {
        if (values?.role) {
            dispatch(getParentInstituteByType(values?.role));
        }
    }, [values?.role]);
    useEffect(() => {
        if (formik.values.stateId) {
            dispatch(getAllDistrictList(`?stateId=${values?.stateId}`));
            formik.values.districtId = "";
        }
    }, [formik.values.stateId]);
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <span className="text-xl font-bold mb-4">Institute Master Data</span>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <SelectInput
                            menuPortalTarget={null}
                            label="Type*"
                            placeholder="Select Option"
                            id="date"
                            options={rolesDetails?.list?.map((e) => {
                                return {
                                    label: e.name,
                                    value: e._id
                                };
                            })}
                            onChange={(e) => {
                                setFieldValue("role", e);
                                setFieldValue("parentId", null);
                                dispatch(getParentInstituteByType(e));
                            }}
                            value={values.role}
                            errors={errors.role}
                            touched={touched.role} />

                        {values.role &&
                            <PrimaryTextInput
                                className="w-500"
                                label="Institute Name*"
                                placeholder="Institute Name"
                                id="instituteName"
                                type="text"
                                onChange={(e) => setFieldValue("title", e)}
                                value={values.title}
                                errors={errors.title}
                                touched={touched.title}
                            />}
                        {values?.role && rolesDetails?.list?.find((e) => e._id == values.role)?.name !== "COE" ?
                            <SelectInput
                                menuPortalTarget={null}
                                className="w-500"
                                label={rolesDetails?.list?.find((e) => e._id == values.role)?.name == "DRTB" ? "Parent Institute (NODAL)*" : "Parent Institute (COE)*"}
                                placeholder="Select Option"
                                id="parentId"
                                options={parentByType?.map((e) => {
                                    return {
                                        label: e?.title,
                                        value: e?._id
                                    };
                                })}
                                onChange={(e) => setFieldValue("parentId", e)}
                                value={values.parentId}
                                errors={errors.parentId}
                                touched={touched.parentId}
                            /> : null}

                        {values.role &&
                            <SelectInput
                                menuPortalTarget={null}
                                label="Country"
                                placeholder="Select Option"
                                id="date"
                                options={countryList?.map((e: any) => ({
                                    label: e?.title,
                                    value: e?._id
                                }))}
                                onChange={(e) => setFieldValue("countryId", e)}
                                value={values.countryId}
                                errors={errors.countryId}
                                touched={touched.countryId} />}

                        {values.role && <SelectInput
                            menuPortalTarget={null}
                            label="State"
                            placeholder="Select Option"
                            id="date"
                            options={stateList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                            onChange={(e) => {
                                dispatch(getAllDistrictList(`?stateId=${e}`));
                                setFieldValue("stateId", e);
                                setFieldValue("districtId", "");
                            }}
                            value={values.stateId}
                            errors={errors.stateId}
                            touched={touched.stateId} />}

                        {values.role && <SelectInput
                            menuPortalTarget={null}
                            label="District"
                            placeholder="Select Option"
                            id="date"
                            options={districtList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                            onChange={(e) => setFieldValue("districtId", e)}
                            value={values.districtId}
                            errors={errors.districtId}
                            touched={touched.districtId} />}
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn title={masterInstituteById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
