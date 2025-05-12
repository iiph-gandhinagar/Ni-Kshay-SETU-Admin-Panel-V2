import { useFormik } from "formik";
import { subscriberEditFormProps } from "master-table-action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";
import { BorderBtn, PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconCaretDown from "../../components/Icon/IconCaretDown";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import { IRootState } from "../../store";
import { createSubscriber } from "../../store/actions/subscriber.action";
import { getAllBlockList, getAllCaderTypeList, getAllCountryList, getAllDistrictList, getAllHealthFacilityList, getAllStateList, getCaderBytypesList } from "../../store/reducer/masterTable.reducer";
import { countryCode } from "../../utils/globle";
import { ErrorToast, SuccessToast } from "../../utils/toasts";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string()
        .email("Invalid email format").required("Required"),
    phoneNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Required"),
    cadreType: Yup.string().required("Required"),
    countryCode: Yup.string()
        .nullable()
        .transform(value => (value === "" ? null : value))
        .when("cadreType", {
            is: "International_Level",
            then: (schema) => schema.required("Required"),
            otherwise: (schema) => schema.nullable()
        }),
    countryId: Yup.string()
        .nullable()
        .transform(value => (value === "" ? null : value))
        .when("cadreType", {
            is: (cadreType: string) => [
                "National_Level",
                "State_Level",
                "District_Level",
                "Block_Level",
                "Health-facility_Level"
            ].includes(cadreType),
            then: (schema) => schema.required("Required"),
            otherwise: (schema) => schema.nullable()
        }),
    stateId: Yup.string()
        .nullable()
        .transform(value => (value === "" ? null : value))
        .when("cadreType", {
            is: (cadreType: string) => [
                "State_Level",
                "District_Level",
                "Block_Level",
                "Health-facility_Level"
            ].includes(cadreType),
            then: (schema) => schema.required("Required"),
            otherwise: (schema) => schema.nullable()
        }),
    districtId: Yup.string()
        .nullable()
        .transform(value => (value === "" ? null : value))
        .when("cadreType", {
            is: (cadreType: string) => [
                "District_Level",
                "Block_Level",
                "Health-facility_Level"
            ].includes(cadreType),
            then: (schema) => schema.required("Required"),
            otherwise: (schema) => schema.nullable()
        }),
    blockId: Yup.string()
        .nullable()
        .transform(value => (value === "" ? null : value))
        .when("cadreType", {
            is: (cadreType: string) => [
                "Block_Level",
                "Health-facility_Level"
            ].includes(cadreType),
            then: (schema) => schema.required("Required"),
            otherwise: (schema) => schema.nullable()
        }),
    healthFacilityId: Yup.string()
        .nullable()
        .transform(value => (value === "" ? null : value))
        .when("cadreType", {
            is: "Health-facility_Level",
            then: (schema) => schema.required("Required"),
            otherwise: (schema) => schema.nullable()
        }),
    cadreId: Yup.string().required("Required"),
});

const AddSubscriberForm = () => {
    const [query, setQuery] = useQueryParam("id", StringParam);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { countryList, stateList, districtList, caderList, cadreTypeList, blockList, healthFacilityList } = useSelector((status: IRootState) => status.master);
    const navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            phoneNo: "",
            cadreType: "",
            countryCode: "",
            countryId: "",
            stateId: "",
            cadreId: "",
            blockId: "",
            districtId: "",
            healthFacilityId: "",
        } as subscriberEditFormProps,
        onSubmit(values, actions) {
            dispatch(
                createSubscriber(
                    values,
                    (res: any) => {
                        actions.setSubmitting(false);
                        if (res?.status) {
                            SuccessToast(res.message);
                        } else {
                            ErrorToast(res.message);
                            if (res?.data?.errors) {
                                res?.data?.errors?.forEach((error: any) => {
                                    const fieldName = Object.keys(error)[0];
                                    const errorMessage = error[fieldName];
                                    formik.setFieldError(fieldName, errorMessage);
                                });
                            }
                        }
                    },
                )
            );
        },
        validationSchema: validationSchema
    });

    useEffect(() => {
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        dispatch(getAllCaderTypeList());
        if (formik.values?.stateId !== "") {
            dispatch(getAllDistrictList(`?stateId=${formik.values?.stateId}`));
        }
        if (formik.values?.districtId !== "") {
            dispatch(getAllBlockList(`?districtId=${formik.values?.districtId}`));
        }
        if (formik.values?.blockId !== "") {
            dispatch(getAllHealthFacilityList(`?blockId=${formik.values?.blockId}`));
        }
        if (formik.values?.cadreType !== "") {
            dispatch(getCaderBytypesList(`?cadreTypes=${formik.values?.cadreType}`));
        }
    }, [formik.values.stateId, formik.values.districtId, formik.values.blockId, formik.values?.cadreType]);

    useEffect(() => {
        const resetFields = () => {
            const fieldsToReset: Record<string, string[]> = {
                International_Level: ["stateId", "districtId", "blockId", "healthFacilityId"],
                National_Level: ["stateId", "districtId", "blockId", "healthFacilityId"],
                State_Level: ["districtId", "blockId", "healthFacilityId"],
                District_Level: ["blockId", "healthFacilityId"],
                Block_Level: ["healthFacilityId"],
                "Health-facility_Level": [],
            };

            if (formik.values.cadreType) {
                fieldsToReset[formik.values.cadreType]?.forEach((field) => {
                    formik.setFieldValue(field, null);
                });
            }
        };

        resetFields();
    }, [formik.values.cadreType]);
    const { values, handleSubmit, setFieldValue, isSubmitting, dirty, errors, touched } = formik;
    return (
        <>
            <BorderBtn
                className="mb-4"
                borderColor='border-primary'
                textColor='text-primary'
                title="Back"
                leftIcon={<IconCaretDown className="rotate-90" />}
                onClick={() => navigate("/query2coe/landing-page")}
            />
            <div>
                <div className="space-y-3">
                    <div className="panel">
                        <span className="text-xl font-bold">Add Subscriber Data</span>
                        <div className="grid grid-cols-3 mt-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 items-center justify-center">
                            {/* Common Fields */}
                            <PrimaryTextInput
                                label="Name*"
                                placeholder="Name"
                                id="name"
                                type="text"
                                onChange={(e) => setFieldValue("name", e)}
                                value={values.name}
                                errors={errors.name}
                                touched={touched.name}
                            />
                            <PrimaryTextInput
                                label="Email*"
                                placeholder="Email"
                                id="email"
                                type="text"
                                onChange={(e) => setFieldValue("email", e)}
                                value={values.email}
                                errors={errors.email}
                                touched={touched.email}
                            />
                            <PrimaryTextInput
                                label="Phone Number*"
                                placeholder="Phone Number"
                                id="phoneNo"
                                type="number"
                                onChange={(e) => setFieldValue("phoneNo", e)}
                                value={values.phoneNo}
                                errors={errors.phoneNo}
                                touched={touched.phoneNo}
                            />
                            <SelectInput
                                label="Select Cadre Type*"
                                id="cadreType"
                                placeholder="Select Option"
                                onChange={(e) => setFieldValue("cadreType", e)}
                                value={values.cadreType}
                                errors={errors.cadreType}
                                touched={touched.cadreType}
                                options={cadreTypeList?.map((e: any) => ({
                                    label: e,
                                    value: e
                                }))}
                            />
                            <SelectInput
                                label="Select Country Code*"
                                id="countryCode"
                                placeholder="Select Option"
                                onChange={(e) => setFieldValue("countryCode", e)}
                                value={values.countryCode}
                                errors={errors.countryCode}
                                touched={touched.countryCode}
                                options={countryCode?.map((e: any) => ({
                                    label: e.name,
                                    value: e.code
                                }))}
                            />

                            {/* International Level Fields */}
                            {values.cadreType === "International_Level" && (
                                <>
                                    <SelectInput
                                        label="Select Country*"
                                        placeholder="Select Option"
                                        id="countryId"
                                        onChange={(e) => setFieldValue("countryId", e)}
                                        value={values.countryId}
                                        errors={errors.countryId}
                                        touched={touched.countryId}
                                        options={countryList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                </>
                            )}

                            {/* National Level Fields */}
                            {values.cadreType === "National_Level" && (
                                <SelectInput
                                    label="Select Country*"
                                    placeholder="Select Option"
                                    id="countryId"
                                    onChange={(e) => setFieldValue("countryId", e)}
                                    value={values.countryId}
                                    errors={errors.countryId}
                                    touched={touched.countryId}
                                    options={countryList?.map((e: any) => ({
                                        label: e?.title,
                                        value: e?._id
                                    }))}
                                />
                            )}

                            {/* State Level Fields */}
                            {values.cadreType === "State_Level" && (
                                <>
                                    <SelectInput
                                        label="Select Country*"
                                        placeholder="Select Option"
                                        id="countryId"
                                        onChange={(e) => setFieldValue("countryId", e)}
                                        value={values.countryId}
                                        errors={errors.countryId}
                                        touched={touched.countryId}
                                        options={countryList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select State*"
                                        placeholder="Select Option"
                                        id="stateId"
                                        onChange={(e) => setFieldValue("stateId", e)}
                                        value={values.stateId}
                                        errors={errors.stateId}
                                        touched={touched.stateId}
                                        options={stateList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                </>
                            )}

                            {/* District Level Fields */}
                            {values.cadreType === "District_Level" && (
                                <>
                                    <SelectInput
                                        label="Select Country*"
                                        placeholder="Select Option"
                                        id="countryId"
                                        onChange={(e) => setFieldValue("countryId", e)}
                                        value={values.countryId}
                                        errors={errors.countryId}
                                        touched={touched.countryId}
                                        options={countryList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select State*"
                                        placeholder="Select Option"
                                        id="stateId"
                                        onChange={(e) => setFieldValue("stateId", e)}
                                        value={values.stateId}
                                        errors={errors.stateId}
                                        touched={touched.stateId}
                                        options={stateList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select District*"
                                        placeholder="Select Option"
                                        id="districtId"
                                        onChange={(e) => setFieldValue("districtId", e)}
                                        value={values.districtId}
                                        errors={errors.districtId}
                                        touched={touched.districtId}
                                        options={districtList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                </>
                            )}

                            {/* Block Level Fields */}
                            {values.cadreType === "Block_Level" && (
                                <>
                                    <SelectInput
                                        label="Select Country*"
                                        placeholder="Select Option"
                                        id="countryId"
                                        onChange={(e) => setFieldValue("countryId", e)}
                                        value={values.countryId}
                                        errors={errors.countryId}
                                        touched={touched.countryId}
                                        options={countryList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select State*"
                                        placeholder="Select Option"
                                        id="stateId"
                                        onChange={(e) => setFieldValue("stateId", e)}
                                        value={values.stateId}
                                        errors={errors.stateId}
                                        touched={touched.stateId}
                                        options={stateList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select District*"
                                        placeholder="Select Option"
                                        id="districtId"
                                        onChange={(e) => setFieldValue("districtId", e)}
                                        value={values.districtId}
                                        errors={errors.districtId}
                                        touched={touched.districtId}
                                        options={districtList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select Block*"
                                        placeholder="Select Option"
                                        id="blockId"
                                        onChange={(e) => setFieldValue("blockId", e)}
                                        value={values.blockId}
                                        errors={errors.blockId}
                                        touched={touched.blockId}
                                        options={blockList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                </>
                            )}

                            {/* Health Facility Level Fields */}
                            {values.cadreType === "Health-facility_Level" && (
                                <>
                                    <SelectInput
                                        label="Select Country*"
                                        placeholder="Select Option"
                                        id="countryId"
                                        onChange={(e) => setFieldValue("countryId", e)}
                                        value={values.countryId}
                                        errors={errors.countryId}
                                        touched={touched.countryId}
                                        options={countryList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select State*"
                                        placeholder="Select Option"
                                        id="stateId"
                                        onChange={(e) => setFieldValue("stateId", e)}
                                        value={values.stateId}
                                        errors={errors.stateId}
                                        touched={touched.stateId}
                                        options={stateList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select District*"
                                        placeholder="Select Option"
                                        id="districtId"
                                        onChange={(e) => setFieldValue("districtId", e)}
                                        value={values.districtId}
                                        errors={errors.districtId}
                                        touched={touched.districtId}
                                        options={districtList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select Block*"
                                        placeholder="Select Option"
                                        id="blockId"
                                        onChange={(e) => setFieldValue("blockId", e)}
                                        value={values.blockId}
                                        errors={errors.blockId}
                                        touched={touched.blockId}
                                        options={blockList?.map((e: any) => ({
                                            label: e?.title,
                                            value: e?._id
                                        }))}
                                    />
                                    <SelectInput
                                        label="Select Health Facility*"
                                        placeholder="Select Option"
                                        id="healthFacilityId"
                                        onChange={(e) => setFieldValue("healthFacilityId", e)}
                                        value={values.healthFacilityId}
                                        errors={errors.healthFacilityId}
                                        touched={touched.healthFacilityId}
                                        options={healthFacilityList?.map((e: any) => ({
                                            label: e?.healthFacilityCode,
                                            value: e?._id
                                        }))}
                                    />
                                </>
                            )}

                            {/* Always Required */}
                            <SelectInput
                                label="Select Cadre*"
                                placeholder="Select Option"
                                id="cadreId"
                                onChange={(e) => setFieldValue("cadreId", e)}
                                value={values.cadreId}
                                errors={errors.cadreId}
                                touched={touched.cadreId}
                                options={caderList?.map((e: any) => ({
                                    label: e?.title,
                                    value: e?._id
                                }))}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center flex-wrap gap-3 justify-end mt-4">
                    <PrimaryBtn
                        title="Submit"
                        isUpper
                        className="w-40"
                        isLoading={isSubmitting}
                        disabled={!dirty || isSubmitting}
                        onClick={() => handleSubmit()}
                    />
                </div>
            </div>
        </>
    );
};

export default AddSubscriberForm;
