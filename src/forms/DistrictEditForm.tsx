import { useFormik } from "formik";
import { DistrictEditFormProps } from "master-table-action";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { updateDistrict } from "../store/actions/masterTable.action";
import { createDistrict } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
import { masterEditFormProps } from "master-table";
import { logActivity } from "../store/actions/report.action";
export const DistrictEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { districtById, countryList, stateList } = useSelector((status: IRootState) => status.master);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        stateId: Yup.string().required("Required"),
        countryId: Yup.string().required("Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: districtById?.title || "",
            stateId: districtById?.stateId || "",
            countryId: districtById?.countryId || "",
        } as DistrictEditFormProps,
        onSubmit: (values, actions) => {
            if (districtById?._id) {
                dispatch(
                    updateDistrict(
                        districtById?._id,
                        getUpdatedFields({
                            title: districtById?.title,
                            countryId: districtById?.countryId,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: districtById,
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
                    createDistrict({
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
    const { errors, values, setFieldError, setFieldValue, touched, handleSubmit } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <span className="text-xl font-bold mb-4">District Data</span>
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
                        <SelectInput
                            menuPortalTarget={null}
                            placeholder={"Select Country"}
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
                        <SelectInput
                            menuPortalTarget={null}
                            placeholder={"Select State"}
                            label="State*"
                            id="date"
                            options={stateList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                            onChange={(e) => setFieldValue("stateId", e)}
                            value={values.stateId}
                            errors={errors.stateId}
                            touched={touched.stateId} />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn title={districtById?._id ? "Update" : "Save"}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
