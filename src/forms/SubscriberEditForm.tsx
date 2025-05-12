import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import { IRootState } from "../store";
import { logActivity, updateSubscriberById } from "../store/actions/report.action";
import { clearAllBlockList, clearAllHealthFacilityList, clearCaderBytypesList, cleartAllCaderTypeList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllBlockList, getAllCaderTypeList, getAllCountryList, getAllDistrictList, getAllHealthFacilityList, getAllStateList, getCaderBytypesList } from "../store/reducer/masterTable.reducer";
import { clearSubscriberById } from "../store/reducer/report.reducer";
import { ErrorToast, SuccessToast } from "../utils/toasts";

export const SubscriberEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { subscriberById } = useSelector((state: IRootState) => state.report);
    const { cadreTypeList, caderList, stateList, countryList, districtList, blockList, healthFacilityList, loader } = useSelector((status: IRootState) => status.master);
    const validationSchema = Yup.object().shape({
        cadreType: Yup.string()
            .required("Required"),
        name: Yup.string().trim()
            .required("Required"),
        cadreId: Yup.string()
            .nullable()
            .required("Required"),
        stateId: Yup.string()
            .nullable()
            .when("cadreType", {
                is: (cadreType: string) =>
                    cadreType &&
                    ["District_Level", "Block_Level", "Health-facility_Level", "State_Level"].includes(cadreType),
                then: Yup.string().required("Required"),
            }),
        districtId: Yup.string()
            .nullable()
            .when("cadreType", {
                is: (cadreType: string) =>
                    cadreType &&
                    ["District_Level", "Block_Level", "Health-facility_Level"].includes(cadreType),
                then: Yup.string().required("Required"),
            }),
        blockId: Yup.string()
            .nullable()
            .when("cadreType", {
                is: (cadreType: string) =>
                    cadreType &&
                    ["Block_Level", "Health-facility_Level"].includes(cadreType),
                then: Yup.string().required("Required"),
            }),
        healthFacilityId: Yup.string()
            .nullable()
            .when("cadreType", {
                is: (cadreType: string) =>
                    cadreType &&
                    ["Health-facility_Level"].includes(cadreType),
                then: Yup.string().required("Required"),
            }),
        countryId: Yup.string().required("Required")
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: subscriberById?.email || null,
            isVerified: subscriberById?.isVerified || false,
            name: subscriberById?.name || null,
            phoneNo: subscriberById?.phoneNo || null,
            cadreId: subscriberById?.cadreId || null,
            cadreType: subscriberById?.cadreType || null,
            countryCode: subscriberById?.countryCode || null,
            countryId: subscriberById?.countryId || null,
            stateId: subscriberById?.stateId || null,
            districtId: subscriberById?.districtId || null,
            blockId: subscriberById?.blockId || null,
            healthFacilityId: subscriberById?.healthFacilityId || null,
        },
        onSubmit: (values, actions) => {
            if (subscriberById?._id) {
                dispatch(updateSubscriberById(subscriberById._id, values, (res) => {
                    actions.setSubmitting(false);
                    if (res.status) {
                        dispatch(logActivity({
                            action: "update",
                            moduleName: window.location.pathname,
                            payload: {
                                old: subscriberById,
                                new: res.data
                            }
                        }));
                        close();
                        SuccessToast(res.message);
                    } else {
                        ErrorToast(res.message);
                    }
                }));
            }
        },
        validationSchema: validationSchema,
    });
    useEffect(() => {
        dispatch(getAllCaderTypeList());
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        return () => {
            dispatch(cleartAllCaderTypeList());
            dispatch(cleartAllDistrictList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
            dispatch(clearCaderBytypesList());
            dispatch(clearSubscriberById());
        };
    }, []);
    useEffect(() => {
        if (formik.values?.cadreType) {
            dispatch(getCaderBytypesList(`?cadreTypes=${values?.cadreType}`));
        }
        return () => {
            dispatch(clearCaderBytypesList());
        };
    }, [formik.values?.cadreType]);

    useEffect(() => {
        if (formik.values?.blockId) {
            dispatch(getAllHealthFacilityList(`?blockId=${values?.blockId}`));
        }
        return () => {
            dispatch(clearAllHealthFacilityList());
        };
    }, [JSON.stringify(formik?.values?.blockId)]);
    useEffect(() => {
        if (formik.values?.districtId) {
            dispatch(getAllBlockList(`?districtId=${values?.districtId}`));
        }
        return () => {
            dispatch(clearAllBlockList());
        };
    }, [JSON.stringify(formik?.values?.districtId)]);

    useEffect(() => {
        if (formik.values?.stateId) {
            dispatch(getAllDistrictList(`?stateId=${values?.stateId}`));
        }
        return () => {
            dispatch(cleartAllDistrictList());
        };
    }, [JSON.stringify(formik?.values?.stateId)]);
    const { errors, values, setFieldValue, touched, handleSubmit, isSubmitting } = formik;
    return (
        <BoxCard>
            <div className="grid grid-cols-1 gap-3 mb-3">
                <PrimaryTextInput
                    id="email"
                    label="Email*"
                    placeholder="Email"
                    value={values.email as string}
                    onChange={(e) => setFieldValue("email", e)}
                    errors={errors.email}
                    touched={touched.email}
                />
                <PrimaryTextInput
                    id="name"
                    label="Name*"
                    placeholder="Name"
                    value={values.name as string}
                    onChange={(e) => setFieldValue("name", e)}
                    errors={errors.name}
                    touched={touched.name}
                />
                <PrimaryTextInput
                    disabled
                    id="phoneNo"
                    label="Phone Number*"
                    placeholder="Phone Number"
                    value={values.phoneNo as string}
                    onChange={(e) => setFieldValue("phoneNo", e)}
                    errors={errors.phoneNo}
                    touched={touched.phoneNo}
                />
                <SelectInput
                    menuPortalTarget={null}
                    label="Cadre Type*"
                    id="cadreType"
                    options={cadreTypeList?.map((e: string) => ({
                        label: e.replace("_", " "),
                        value: e,
                    }))}
                    onChange={(e: string) => {
                        setFieldValue("cadreId", "");
                        setFieldValue("cadreType", e);

                        switch (e) {
                            case "National_Level":
                                setFieldValue("stateId", null);
                                setFieldValue("districtId", null);
                                setFieldValue("blockId", null);
                                setFieldValue("healthFacilityId", null);
                                break;
                            case "State_Level":
                                setFieldValue("districtId", null);
                                setFieldValue("blockId", null);
                                setFieldValue("healthFacilityId", null);
                                break;
                            case "District_Level":
                                setFieldValue("blockId", null);
                                setFieldValue("healthFacilityId", null);
                                break;
                            case "Block_Level":
                                setFieldValue("healthFacilityId", null);
                                break;
                        }
                    }}
                    value={values.cadreType}
                    errors={errors.cadreType as string}
                    touched={touched.cadreType as boolean}
                    placeholder="Select Option"
                />
                <SelectInput
                    menuPortalTarget={null}
                    label="Cadre*"
                    id="cadre"
                    value={values.cadreId as string}
                    placeholder="Select Option"
                    options={caderList?.map((e: any) => ({
                        label: e.title,
                        value: e._id,
                    }))}
                    onChange={(e: string) => setFieldValue("cadreId", e)}
                />
                <SelectInput
                    menuPortalTarget={null}
                    label="Country*"
                    id="country"
                    options={countryList?.map((e: any) => ({
                        label: e.title,
                        value: e._id,
                    }))}
                    onChange={(e: string) => setFieldValue("countryId", e)}
                    value={values.countryId}
                    errors={errors.countryId as string}
                    touched={touched.countryId as boolean}
                    placeholder="Select Option"
                />
                {["District_Level", "Block_Level", "Health-facility_Level", "State_Level"].includes(values.cadreType as string) && (
                    <SelectInput
                        menuPortalTarget={null}
                        label="State*"
                        id="state"
                        value={values.stateId as string}
                        placeholder="Select Option"
                        options={stateList?.map((e: any) => ({
                            label: e.title,
                            value: e._id,
                        }))}
                        onChange={(e: string) => {
                            setFieldValue("districtId", null);
                            setFieldValue("stateId", e);
                        }}
                        errors={errors.stateId as string}
                        touched={touched.stateId as boolean}
                    />
                )}
                {["District_Level", "Block_Level", "Health-facility_Level"].includes(values.cadreType as string) && (
                    <SelectInput
                        menuPortalTarget={null}
                        label="District*"
                        id="district"
                        value={values.districtId as string}
                        placeholder="Select Option"
                        options={districtList?.map((e: any) => ({
                            label: e.title,
                            value: e._id,
                        }))}
                        onChange={(e: string) => {
                            setFieldValue("blockId", null);
                            setFieldValue("districtId", e);
                        }}
                        errors={errors.districtId as string}
                        touched={touched.districtId as boolean}
                    />
                )}
                {["Block_Level", "Health-facility_Level"].includes(values.cadreType as string) && (
                    <SelectInput
                        menuPortalTarget={null}
                        className="w-500"
                        label="Block*"
                        id="blockId"
                        value={values.blockId}
                        placeholder="Select Option"
                        options={blockList?.map((e: any) => ({
                            label: e.title,
                            value: e._id,
                        }))}
                        onChange={(e: string) => {
                            setFieldValue("healthFacilityId", null);
                            setFieldValue("blockId", e);
                        }}
                        errors={errors.blockId as string}
                        touched={touched.blockId as boolean}
                    />
                )}
                {["Health-facility_Level"].includes(values.cadreType as string) && (
                    <SelectInput
                        menuPortalTarget={null}
                        className="w-500"
                        label="Health Facility*"
                        id="healthFacilityId"
                        value={values.healthFacilityId}
                        placeholder="Select Option"
                        options={healthFacilityList?.map((e: any) => ({
                            label: e.healthFacilityCode,
                            value: e._id,
                        }))}
                        onChange={(e: string) => setFieldValue("healthFacilityId", e)}
                        errors={errors.healthFacilityId as string}
                        touched={touched.healthFacilityId as boolean}
                    />
                )}
                <PrimaryBtn
                    className="w-40 float-end"
                    title={"Update"}
                    onClick={() => handleSubmit()}
                    isLoading={isSubmitting}
                />
            </div>
        </BoxCard>
    );
};
