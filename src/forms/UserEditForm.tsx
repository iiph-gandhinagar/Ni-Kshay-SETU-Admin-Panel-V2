import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";
import { BorderBtn, PrimaryBtn } from "../components/buttons/primaryBtn";
import IconCaretDown from "../components/Icon/IconCaretDown";
import IconCircleCheck from "../components/Icon/IconCircleCheck";
import { MultiSelectInput, SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import { IRootState } from "../store";
import { createUser, updateUserDetailByID } from "../store/actions/auth.action";
import { logActivity } from "../store/actions/report.action";
import { cleanAllRolesWithoutPagination, cleanUserDetailByID, getAllRolesWithoutPagination, getUserDetailByID } from "../store/reducer/auth.reducer";
import { clearCaderBytypesList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllCadreList, getAllCountryList, getAllDistrictList, getAllStateList } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields, handleAllSelection } from "../utils/functions";


const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .trim()
        .required("Required"),
    lastName: Yup.string()
        .trim()
        .required("Required"),
    email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Required"),
    password: Yup.string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    role: Yup.string().trim()
        .required("Required"),
    roleType: Yup.string()
        .required("Required"),
    countryId: Yup.string()
        .required("Required"),
    state: Yup.array()
        .min(1, "Required")
        .nullable(),
    district: Yup.array()
        .min(1, "Required")
        .nullable(),
    cadre: Yup.array()
        .min(1, "Required")
        .nullable(),
});
const UserEditForm = () => {
    const navigate = useNavigate();
    const { caderList, stateList, countryList, districtList, loader } = useSelector((status: IRootState) => status.master);
    const { rolesWithoutPagination, userDetailById } = useSelector((state: IRootState) => state.auth);
    const [id] = useQueryParam("id", StringParam);
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: userDetailById?.firstName || "",
            lastName: userDetailById?.lastName || "",
            email: userDetailById?.email || "",
            password: "",
            role: userDetailById?.role || "",
            roleType: userDetailById?.roleType || "",
            isAllState: userDetailById?.isAllState || false,
            isAllCadre: userDetailById?.isAllCadre || false,
            isAllDistrict: userDetailById?.isAllDistrict || false,
            countryId: userDetailById?.countryId || "",
            state: userDetailById?.state || [],
            district: userDetailById?.district || [],
            cadre: userDetailById?.cadre || [],
        },
        onSubmit(values: any, actions: any) {
            if (districtList?.length == values?.district?.length) {
                values.isAllDistrict = true;
            }
            if (stateList?.length == values?.state?.length) {
                values.isAllState = true;
            }
            if (caderList?.length == values?.cadre?.length) {
                values.isAllcadre = true;
            }
            if (values.isAllCadre) {
                values.cadre = [];
            }
            if (values.isAllDistrict) {
                values.district = [];
            }
            if (values.isAllState) {
                values.state = [];
            }
            if (userDetailById?._id) {
                dispatch(
                    updateUserDetailByID(
                        userDetailById?._id,
                        getUpdatedFields({
                            firstName: userDetailById?.firstName,
                            lastName: userDetailById?.lastName,
                            email: userDetailById?.email,
                            password: userDetailById?.password,
                            role: userDetailById?.role,
                            roleType: userDetailById?.roleType,
                            countryId: userDetailById?.countryId,
                            state: userDetailById?.state,
                            district: userDetailById?.district,
                            cadre: userDetailById?.cadre,
                            isAllState: userDetailById?.isAllState,
                            isAllCadre: userDetailById?.isAllCadre,
                            isAllDistrict: userDetailById?.isAllDistrict,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res?.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: userDetailById,
                                        new: res?.data
                                    }
                                }));
                                const searchParams = new URLSearchParams(window.location.search);
                                searchParams.delete("id");
                                navigate(`/userlist?${searchParams}`);
                            }
                            else {
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                        setFieldError(fieldName, errorMessage);
                                    });
                                }
                            }
                        }
                    ));
            } else {
                dispatch(createUser(
                    values,
                    (res) => {
                        actions.setSubmitting(false);
                        if (res?.status) {
                            dispatch(logActivity({
                                "action": "create",
                                "moduleName": window.location.pathname,
                                "payload": res?.data
                            }));
                            const searchParams = new URLSearchParams(window.location.search);
                            searchParams.delete("id");
                            navigate(`/userlist?${searchParams}`);
                        }
                        else {
                            if (res?.data?.errors) {
                                res?.data?.errors?.forEach((error: any) => {
                                    const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                    setFieldError(fieldName, errorMessage);
                                });
                            }
                        }
                    }
                ));
            }
        },
        validationSchema,
    });
    const { values, setFieldValue, errors, touched, handleSubmit, isSubmitting, dirty, setFieldError, setTouched } = formik;
    useEffect(() => {
        if (id)
            dispatch(getUserDetailByID(id));
        dispatch(getAllCadreList());
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        dispatch(getAllRolesWithoutPagination());
        return () => {
            dispatch(cleanUserDetailByID());
            dispatch(clearCaderBytypesList());
            dispatch(cleanAllRolesWithoutPagination());
            dispatch(cleartAllDistrictList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
        };
    }, []);
    useEffect(() => {
        if (formik?.values?.state?.length > 0 && !formik?.values?.isAllState) {
            const selectedStates = formik.values?.state.join("&stateId=");
            dispatch(getAllDistrictList(`?stateId=${selectedStates}`));
        } else if (formik?.values?.state?.length < 1) {
            dispatch(cleartAllDistrictList());
        }
        else {
            dispatch(getAllDistrictList(""));
        }
    }, [JSON.stringify(formik?.values?.state)]);
    useEffect(() => {
        if (formik?.values?.isAllState) {
            setFieldValue("state", stateList?.map((e: any) => e._id));
        }
    }, [stateList]);
    useEffect(() => {
        if (formik?.values?.isAllDistrict) {
            setFieldValue("district", districtList?.map((e: any) => e._id));
        }
        if (formik?.values?.roleType === "state_level") {
            setFieldValue("district", districtList?.map((e: any) => e._id));
        }
    }, [districtList]);
    useEffect(() => {
        if (formik?.values?.isAllCadre) {
            setFieldValue("cadre", caderList?.map((e: any) => e._id));
        }
    }, [caderList]);
    useEffect(() => {
        if (formik?.values?.roleType && formik?.values?.roleType === "country_level") {
            setFieldValue("state", stateList?.map((e: any) => e._id));
            setFieldValue("district", districtList?.map((e: any) => e._id));
        }
    }, [formik?.values?.roleType, districtList, stateList]);
    return (
        <React.Fragment>
            <div className="mb-3">
                <BorderBtn
                    title={"Back"}
                    borderColor='border-primary'
                    textColor='text-primary'
                    leftIcon={<IconCaretDown className="rotate-90" />}
                    onClick={() => {
                        const searchParams = new URLSearchParams(window.location.search);
                        searchParams.delete("id");
                        navigate(`/userlist?${searchParams}`);
                    }} />
            </div>
            <BoxCard headerName={id ? "Edit User" : "New User"}
                className="mb-4 border-2 border-primary"
                rightComponent={
                    loader && <PrimaryBtn
                        title={!loader ? "Saved" : "Loading"}
                        className="bg-[#00AB55]"
                        leftIcon={!loader && <IconCircleCheck />}
                        isLoading={loader}
                        onClick={() => { }} />}
            >
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <PrimaryTextInput
                            type="text"
                            id="firstname"
                            label="First Name*"
                            placeholder="First Name"
                            value={values?.firstName}
                            onChange={(e) => setFieldValue("firstName", e)}
                            errors={errors.firstName as string}
                            touched={touched.firstName as boolean}
                        />
                        <PrimaryTextInput
                            type="text"
                            id="lastName"
                            label="Last Name*"
                            placeholder="Last Name"
                            value={values?.lastName}
                            onChange={(e) => setFieldValue("lastName", e)}
                            errors={errors.lastName as string}
                            touched={touched.lastName as boolean}
                        />
                    </div>
                    <PrimaryTextInput
                        type="email"
                        id="email"
                        label="Email*"
                        placeholder="Email"
                        value={values?.email}
                        onChange={(e) => setFieldValue("email", e)}
                        errors={errors.email as string}
                        touched={touched.email as boolean}
                    />
                    <PrimaryTextInput
                        type="password"
                        id="password"
                        label="Password*"
                        placeholder="Password"
                        value={values?.password}
                        onChange={(e) => setFieldValue("password", e)}
                        errors={errors.password as string}
                        touched={touched.password as boolean}
                    />
                    <SelectInput
                        menuPortalTarget={null}
                        label="Role*"
                        placeholder="Select Role"
                        id="role"
                        value={values.role}
                        options={rolesWithoutPagination?.map((e: any) => ({
                            label: e?.name,
                            value: e?._id
                        }))}
                        onChange={(e) => {
                            setFieldValue("role", e);
                        }}
                        errors={errors.role as string}
                        touched={touched.role as boolean}
                    />
                    <SelectInput
                        menuPortalTarget={null}
                        label="Role Type*"
                        placeholder="Select Option"
                        id="roleType*"
                        options={[{
                            label: "Country Type",
                            value: "country_level"
                        }, {
                            label: "State Type",
                            value: "state_level"
                        }, {
                            label: "District Type",
                            value: "district_level"
                        }]}
                        onChange={(e) => {
                            setFieldValue("district", []);
                            setFieldValue("state", []);
                            setFieldValue("roleType", e);
                        }}
                        value={values.roleType}
                        errors={errors.roleType as string}
                        touched={touched.roleType as boolean}
                    />
                    {values?.roleType &&
                        <>
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
                                errors={errors.countryId as string}
                                touched={touched.countryId as boolean}
                            />
                            {values.roleType !== "district_level" ?
                                <MultiSelectInput
                                    menuPortalTarget={null}
                                    label="State*"
                                    placeholder="Select State"
                                    id="date"
                                    options={stateList?.map((e: any) => ({
                                        label: e?.title,
                                        value: e?._id
                                    }))}
                                    disabled={values?.roleType === "country_level"}
                                    onChange={(e) => {
                                        handleAllSelection(e, setFieldValue, stateList || [], "isAllState", "state");
                                    }}
                                    value={values.state}
                                    errors={errors.state as string}
                                    touched={touched.state as boolean}
                                /> :
                                <SelectInput
                                    menuPortalTarget={null}
                                    label="State*"
                                    placeholder="Select State"
                                    id="date"
                                    options={stateList?.map((e: any) => ({
                                        label: e?.title,
                                        value: e?._id
                                    }))}
                                    onChange={(e) => setFieldValue("state", [e])}
                                    value={values.state[0]}
                                    errors={errors.state as string}
                                    touched={touched.state as boolean}
                                />
                            }
                            <MultiSelectInput
                                label="District*"
                                id="district"
                                value={values.district as string[]}
                                placeholder={"Select Option"}
                                disabled={values?.roleType !== "district_level"}
                                options={districtList?.map((e: any) => ({
                                    label: e?.title,
                                    value: e?._id
                                }))}
                                onChange={(e) => handleAllSelection(e, setFieldValue, districtList || [], "isAllDistrict", "district")}
                                errors={errors.district as string}
                                touched={touched.district as boolean}
                            />
                            <MultiSelectInput
                                menuPortalTarget={null}
                                isSelectAll
                                label="Cadre*"
                                placeholder="Select Cadre"
                                id="date"
                                options={caderList?.map((e: any) => ({
                                    label: e?.title,
                                    value: e?._id
                                }))}
                                onChange={(e) => handleAllSelection(e, setFieldValue, caderList || [], "isAllCadre", "cadre")}
                                value={values.cadre}
                                errors={errors.cadre as string}
                                touched={touched.cadre as boolean}
                            />
                        </>}
                </div>
            </BoxCard>
            <div className="flex justify-end mt-3">
                <PrimaryBtn
                    isUpper
                    isLoading={isSubmitting}
                    disabled={!dirty || isSubmitting}
                    className="w-40"
                    title={userDetailById ? "Update" : "Save"}
                    onClick={() => {
                        handleSubmit();
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default UserEditForm;
