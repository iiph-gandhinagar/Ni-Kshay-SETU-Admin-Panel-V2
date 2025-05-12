import { useFormik } from "formik";
import { debounce } from "lodash";
import { masterEditFormProps } from "master-table";
import { AddInstituteFormProps } from "master-table-action";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import { IRootState } from "../../store";
import { createChildInstitute, updateChildInstituteById } from "../../store/actions/plugin.action";
import { logActivity } from "../../store/actions/report.action";
import { clearChildInstituteId, getAllSubscribersSearch, getChildInstituteByType } from "../../store/reducer/plugin.reducer";
import { getUpdatedFields } from "../../utils/functions";
import { ErrorToast } from "../../utils/toasts";
export const AddChildInstituteForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { childInstituteById, childByType, membersList } = useSelector((status: IRootState) => status.plugin);
    const validationSchema = Yup.object().shape({
        instituteId: Yup.string().required("Required"),
        subscriber: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        phoneNo: Yup.string().required("Required"),
        cadreId: Yup.string().required("Required"),
        role: Yup.string().required("Required"),
    });
    const { rolesDetails } = useSelector((status: IRootState) => status.auth);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            instituteId: childInstituteById?.instituteId || "",
            subscriber: childInstituteById?.subscriber?._id || "",
            role: childInstituteById?.role || "",
            email: childInstituteById?.email || "",
            phoneNo: childInstituteById?.subscriber?.phoneNo || "",
            cadreId: childInstituteById?.subscriber?.cadreId?.title || "",
        } as AddInstituteFormProps,
        onSubmit: (values, actions) => {
            if (childInstituteById?._id) {
                dispatch(
                    updateChildInstituteById(
                        childInstituteById?._id,
                        getUpdatedFields({
                            instituteId: childInstituteById?.instituteId,
                            subscriber: childInstituteById?.subscriber?._id,
                            role: childInstituteById?.role,
                            phoneNo: childInstituteById?.subscriber?.phoneNo,
                            email: childInstituteById?.email,
                            cadreId: childInstituteById?.subscriber?.cadreId?.title,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: childInstituteById,
                                        new: res?.data
                                    }
                                }));
                                dispatch(clearChildInstituteId());
                                close();
                            } else {
                                ErrorToast(res.message);
                            }
                        },
                    ));
            } else {
                dispatch(
                    createChildInstitute(
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
    const { errors, values, setFieldValue, touched, handleSubmit, setFieldError, isSubmitting, dirty } = formik;
    const handleInputChange = debounce((inputValue) => {
        if (inputValue?.length > 2) {
            dispatch(getAllSubscribersSearch(`?search=${inputValue}`));
        }
    }, 100);
    useEffect(() => {
        if (values?.role) {
            dispatch(getChildInstituteByType(values?.role));
        }
    }, [values?.role]);
    useEffect(() => {
        if (childInstituteById?.subscriber?.name) {
            dispatch(getAllSubscribersSearch(`?search=${childInstituteById?.subscriber?.name}`));
        }
    }, [childInstituteById?.subscriber?.name]);
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <span className="text-xl font-bold mb-4">Institute Data</span>
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
                                setFieldValue("instituteId", null);
                                dispatch(getChildInstituteByType(e));
                            }}
                            value={values.role}
                            errors={errors.role}
                            touched={touched.role} />
                        {values?.role &&
                            (
                                <div>
                                    <SelectInput
                                        menuPortalTarget={null}
                                        className="w-500"
                                        label="Institute Name*"
                                        placeholder="Select Option"
                                        id="name"
                                        options={childByType?.map((e) => {
                                            return {
                                                label: e?.title,
                                                value: e?._id
                                            };
                                        })}
                                        onChange={(e) => {
                                            setFieldValue("instituteId", e);
                                        }
                                        }
                                        value={values.instituteId}
                                        errors={errors.instituteId}
                                        touched={touched.instituteId}
                                    />
                                </div>
                            )
                        }
                        {values?.instituteId &&
                            <SelectInput
                                menuPortalTarget={null}
                                placeholder={"Search by Name or Number..."}
                                className="w-500 mb-3"
                                label="Manager Name*"
                                id="name"
                                onInputChange={handleInputChange}
                                onChange={(e: any) => {
                                    setFieldValue("subscriber", e?._id);
                                    setFieldValue("email", e?.email || "");
                                    setFieldValue("phoneNo", e?.phoneNo);
                                    setFieldValue("cadreId", e?.cadreId?._id);
                                }}
                                options={membersList?.map((e) => {
                                    return {
                                        label: e?.name + " [" + e?.phoneNo + "]",
                                        value: e
                                    };
                                })}
                                value={membersList?.find(e => e?._id === values?.subscriber) || ""}
                                errors={errors.subscriber as string}
                                touched={touched.subscriber as boolean}
                            />}

                        {values?.subscriber && (
                            <div>
                                <PrimaryTextInput
                                    className="w-500 mb-3"
                                    label="Email*"
                                    placeholder="Email"
                                    id="Email"
                                    type="text"
                                    onChange={(e) => setFieldValue("email", e)}
                                    value={values.email}
                                    errors={errors.email}
                                    touched={touched.email}
                                />

                                <PrimaryTextInput
                                    disabled
                                    className="w-500 mb-3"
                                    label="Phone Number*"
                                    placeholder="Phone Number"
                                    id="phoneNumber"
                                    type="text"
                                    onChange={(e) => setFieldValue("phoneNo", e)}
                                    value={values.phoneNo}
                                    errors={errors.phoneNo}
                                    touched={touched.phoneNo}
                                />

                                <PrimaryTextInput
                                    disabled
                                    className="w-500 mb-3"
                                    label="Cadre*"
                                    placeholder="Cadre"
                                    id="cadreId"
                                    type="text"
                                    onChange={(e) => setFieldValue("cadreId", e)}
                                    value={membersList?.find(e => e?.cadreId?._id === values?.cadreId)?.cadreId?.title || values?.cadreId}
                                    errors={errors.cadreId}
                                    touched={touched.cadreId}
                                />
                            </div>
                        )
                        }
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn title={childInstituteById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
