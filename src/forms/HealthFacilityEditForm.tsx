import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { HealthFacilityEditFormProps } from "master-table-action";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { updateHealthFacility } from "../store/actions/masterTable.action";
import { logActivity } from "../store/actions/report.action";
import { createHealthFacility, getAllBlockList, getAllDistrictList } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
export const HealthFacilityEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { healthFacilityById, countryList, stateList, districtList, blockList } = useSelector((status: IRootState) => status.master);
    const validationSchema = Yup.object().shape({
        healthFacilityCode: Yup.string().required("Required"),
        stateId: Yup.string().required("Required"),
        districtId: Yup.string().required("Required"),
        blockId: Yup.string().required("Required"),
        countryId: Yup.string().required("Required"),
        latitude: Yup.string().required("Required"),
        longitude: Yup.string().required("Required")
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            healthFacilityCode: healthFacilityById?.healthFacilityCode || "",
            stateId: healthFacilityById?.stateId || "",
            countryId: healthFacilityById?.countryId || "",
            districtId: healthFacilityById?.districtId || "",
            blockId: healthFacilityById?.blockId || "",
            latitude: healthFacilityById?.latitude || "",
            longitude: healthFacilityById?.longitude || "",
            ANCClinic: healthFacilityById?.ANCClinic || false,
            ARTCentre: healthFacilityById?.ARTCentre || false,
            CBNAAT: healthFacilityById?.CBNAAT || false,
            CONFIRMATIONCENTER: healthFacilityById?.CONFIRMATIONCENTER || false,
            DMC: healthFacilityById?.DMC || false,
            DeAddictionCentres: healthFacilityById?.DeAddictionCentres || false,
            DistrictDRTBCentre: healthFacilityById?.DistrictDRTBCentre || false,
            ICTC: healthFacilityById?.ICTC || false,
            IRL: healthFacilityById?.IRL || false,
            LPALab: healthFacilityById?.LPALab || false,
            NODALDRTBCENTER: healthFacilityById?.NODALDRTBCENTER || false,
            NutritionalRehabilitationCentre: healthFacilityById?.NutritionalRehabilitationCentre || false,
            PediatricCareFacility: healthFacilityById?.PediatricCareFacility || false,
            TRUNAT: healthFacilityById?.TRUNAT || false,
            TobaccoCessationClinic: healthFacilityById?.TobaccoCessationClinic || false,
            XRAY: healthFacilityById?.XRAY || false,
        } as HealthFacilityEditFormProps,
        onSubmit: (values, actions) => {
            if (healthFacilityById?._id) {
                dispatch(
                    updateHealthFacility(
                        healthFacilityById?._id,
                        getUpdatedFields({
                            healthFacilityCode: healthFacilityById?.healthFacilityCode,
                            countryId: healthFacilityById?.countryId,
                            districtId: healthFacilityById?.districtId,
                            stateId: healthFacilityById?.stateId,
                            blockId: healthFacilityById?.blockId,
                            latitude: healthFacilityById?.latitude,
                            longitude: healthFacilityById?.longitude,
                            ANCClinic: healthFacilityById?.ANCClinic,
                            ARTCentre: healthFacilityById?.ARTCentre,
                            CBNAAT: healthFacilityById?.CBNAAT,
                            CONFIRMATIONCENTER: healthFacilityById?.CONFIRMATIONCENTER,
                            DMC: healthFacilityById?.DMC,
                            DeAddictionCentres: healthFacilityById?.DeAddictionCentres,
                            DistrictDRTBCentre: healthFacilityById?.DistrictDRTBCentre,
                            ICTC: healthFacilityById?.ICTC,
                            IRL: healthFacilityById?.IRL,
                            LPALab: healthFacilityById?.LPALab,
                            NODALDRTBCENTER: healthFacilityById?.NODALDRTBCENTER,
                            NutritionalRehabilitationCentre: healthFacilityById?.NutritionalRehabilitationCentre,
                            PediatricCareFacility: healthFacilityById?.PediatricCareFacility,
                            TRUNAT: healthFacilityById?.TRUNAT,
                            TobaccoCessationClinic: healthFacilityById?.TobaccoCessationClinic,
                            XRAY: healthFacilityById?.XRAY,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: healthFacilityById,
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
                    createHealthFacility({
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
        if (formik.values.districtId) {
            dispatch(getAllBlockList(`?districtId=${values?.districtId}`));
            formik.values.blockId = "";
        }
    }, [formik.values.districtId]);
    const { errors, values, setFieldError, setFieldValue, touched, handleSubmit } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <span className="text-xl font-bold mb-4">Health Facility Data</span>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            label="Health Facility*"
                            placeholder="Health Facility"
                            id="healthFacilityCode"
                            type="text"
                            onChange={(e) => setFieldValue("healthFacilityCode", e)}
                            value={values.healthFacilityCode}
                            errors={errors.healthFacilityCode}
                            touched={touched.healthFacilityCode}
                        />
                        <SelectInput
                            menuPortalTarget={null}
                            label="Country*"
                            placeholder="Select Country"
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
                            placeholder="Select District"
                            id="date"
                            options={districtList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                            onChange={(e) => setFieldValue("districtId", e)}
                            value={values.districtId}
                            errors={errors.districtId}
                            touched={touched.districtId} />

                        <SelectInput
                            menuPortalTarget={null}
                            label="Block*"
                            placeholder="Select Block"
                            id="date"
                            options={blockList?.map((e: any) => ({
                                label: e?.title,
                                value: e?._id
                            }))}
                            onChange={(e) => setFieldValue("blockId", e)}
                            value={values?.blockId}
                            errors={errors.blockId}
                            touched={touched.blockId} />
                        <PrimaryTextInput
                            className="w-500"
                            label="Latitude*"
                            placeholder="Latitude"
                            id="latitude"
                            type="text"
                            onChange={(e) => setFieldValue("latitude", e)}
                            value={values.latitude}
                            errors={errors.latitude}
                            touched={touched.latitude}
                        />
                        <PrimaryTextInput
                            className="w-500 mb-2"
                            label="Longitude*"
                            placeholder="Longitude"
                            id="longitude"
                            type="text"
                            onChange={(e) => setFieldValue("longitude", e)}
                            value={values.longitude}
                            errors={errors.longitude}
                            touched={touched.longitude}
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <Checkbox
                                id={"ANCClinic"}
                                title={"ANC Clinic"}
                                checked={values.ANCClinic}
                                onChange={(value) => setFieldValue("ANCClinic", value)} />
                            <Checkbox
                                id={"ARTCentre"}
                                title={"ART Centre"}
                                checked={values.ARTCentre}
                                onChange={(value) => setFieldValue("ARTCentre", value)} />
                            <Checkbox
                                id={"CBNAAT"}
                                title={"CBNAAT"}
                                checked={values.CBNAAT}
                                onChange={(value) => setFieldValue("CBNAAT", value)} />
                            <Checkbox
                                id={"CONFIRMATIONCENTER"}
                                title={"CONFIRMATION CENTER"}
                                checked={values.CONFIRMATIONCENTER}
                                onChange={(value) => setFieldValue("CONFIRMATIONCENTER", value)} />
                            <Checkbox
                                id={"DMC"}
                                title={"DMC"}
                                checked={values.DMC}
                                onChange={(value) => setFieldValue("DMC", value)} />
                            <Checkbox
                                id={"DeAddictionCentres"}
                                title={"DeAddiction Centres"}
                                checked={values.DeAddictionCentres}
                                onChange={(value) => setFieldValue("DeAddictionCentres", value)} />
                            <Checkbox
                                id={"DistrictDRTBCentre"}
                                title={"District DRTB Centre"}
                                checked={values.DistrictDRTBCentre}
                                onChange={(value) => setFieldValue("DistrictDRTBCentre", value)} />

                            <Checkbox
                                id={"ICTC"}
                                title={"ICTC"}
                                checked={values.ICTC}
                                onChange={(value) => setFieldValue("ICTC", value)} />

                            <Checkbox
                                id={"IRL"}
                                title={"IRL"}
                                checked={values.IRL}
                                onChange={(value) => setFieldValue("IRL", value)} />
                            <Checkbox
                                id={"LPALab"}
                                title={"LPA Lab"}
                                checked={values.LPALab}
                                onChange={(value) => setFieldValue("LPALab", value)} />
                            <Checkbox
                                id={"NODALDRTBCENTER"}
                                title={"NODALDRTB CENTER"}
                                checked={values.NODALDRTBCENTER}
                                onChange={(value) => setFieldValue("NODALDRTBCENTER", value)} />

                            <Checkbox
                                id={"PediatricCareFacility"}
                                title={"Pediatric Care Facility"}
                                checked={values.PediatricCareFacility}
                                onChange={(value) => setFieldValue("PediatricCareFacility", value)} />
                            <Checkbox
                                id={"NutritionalRehabilitationCentre"}
                                title={"Nutritional Rehabilitation Centre"}
                                checked={values.NutritionalRehabilitationCentre}
                                onChange={(value) => setFieldValue("NutritionalRehabilitationCentre", value)} />
                            <Checkbox
                                id={"TRUNAT"}
                                title={"TRUNAT"}
                                checked={values.TRUNAT}
                                onChange={(value) => setFieldValue("TRUNAT", value)} />
                            <Checkbox
                                id={"XRAY"}
                                title={"XRAY"}
                                checked={values.XRAY}
                                onChange={(value) => setFieldValue("XRAY", value)} />
                            <Checkbox
                                id={"TobaccoCessationClinic"}
                                title={"Tobacco Cessation Clinic"}
                                checked={values.TobaccoCessationClinic}
                                onChange={(value) => setFieldValue("TobaccoCessationClinic", value)} />
                        </div>
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn title={healthFacilityById?._id ? "Update" : "Save"}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
