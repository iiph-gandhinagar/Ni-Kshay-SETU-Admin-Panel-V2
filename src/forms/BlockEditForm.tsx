import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { BlockEditFormProps } from "master-table-action";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { IRootState } from "../store";
import { updateBlock } from "../store/actions/masterTable.action";
import { logActivity } from "../store/actions/report.action";
import { cleartAllDistrictList, createBlock, getAllDistrictList } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
export const BlockEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { blockById, countryList, stateList, districtList } = useSelector((status: IRootState) => status.master);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        countryId: Yup.string().required("Required"),
        stateId: Yup.string().required("Required"),
        districtId: Yup.string().required("Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blockById?.title || "",
            countryId: blockById?.countryId || "",
            stateId: blockById?.stateId || "",
            districtId: blockById?.districtId || "",
        } as BlockEditFormProps,
        onSubmit: (values, actions) => {
            if (blockById?._id) {
                dispatch(
                    updateBlock(
                        blockById?._id,
                        getUpdatedFields({
                            title: blockById?.title,
                            countryId: blockById?.countryId,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: blockById,
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
                    createBlock({
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
    useEffect(() => {
        if (formik.values.stateId) {
            dispatch(getAllDistrictList(`?stateId=${values?.stateId}`));
            formik.values.districtId = "";
        }
    }, [formik.values.stateId]);
    useEffect(() => {
        return () => {
            dispatch(cleartAllDistrictList());
        };
    }, []);
    const { errors, values, setFieldError, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <span className="text-xl font-bold mb-4">Block Data</span>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            label="Title*"
                            placeholder="Title"
                            id="name"
                            type="text"
                            onChange={(e) => setFieldValue("title", e)}
                            value={values.title}
                            errors={errors.title}
                            touched={touched.title}
                        />
                        <SelectInput
                            menuPortalTarget={null}
                            label="Country*"
                            id="date"
                            placeholder="Select country"
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
                            label="State*"
                            placeholder="Select State"
                            id="date"
                            options={stateList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                            onChange={(e) => setFieldValue("stateId", e)}
                            value={values.stateId}
                            errors={errors.stateId}
                            touched={touched.stateId} />

                        <SelectInput
                            menuPortalTarget={null}
                            label="District*"
                            id="date"
                            placeholder="Select District"
                            options={districtList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                            onChange={(e) => setFieldValue("districtId", e)}
                            value={values.districtId}
                            errors={errors.districtId}
                            touched={touched.districtId} />
                    </Fragment>
                </div>
            </div>

            <PrimaryBtn title={blockById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
