import { Card } from "@mantine/core";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconCaretDown from "../../components/Icon/IconCaretDown";
import IconLock from "../../components/Icon/IconLock";
import IconLogout from "../../components/Icon/IconLogout";
import IconSave from "../../components/Icon/IconSave";
import IconUser from "../../components/Icon/IconUser";
import CircularImageUpload from "../../components/Inputs/CircularImageUpload";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import { IRootState } from "../../store";
import { updateUserDetailByID, uploadAdminImage } from "../../store/actions/auth.action";
import { getAuthUser, getAuthUserSuccess } from "../../store/reducer/auth.reducer";
import { getUpdatedFields } from "../../utils/functions";
import { SuccessToast } from "../../utils/toasts";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});

const passwordValidationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const ProfileEdit = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const { authUser, loader } = useSelector((state: IRootState) => state.auth);
    const [initialValues, setInitialValues] = useState<any>({});
    const dispatch = useDispatch();
    useEffect(() => {
        if (authUser) {
            setInitialValues({
                firstName: authUser?.firstName || "",
                lastName: authUser?.lastName || "",
                email: authUser?.email || "",
                profileImage: authUser?.profileImage || "",
            });
        }
    }, [authUser]);
    const passwordInitialValues = {
        password: "",
        confirmPassword: ""
    };
    const handleSubmit = (values: any, { setSubmitting, setFieldError }: any) => {
        dispatch(updateUserDetailByID(
            authUser?._id as string,
            getUpdatedFields({
                firstName: authUser?.firstName,
                lastName: authUser?.lastName,
                email: authUser?.email,
                profileImage: authUser?.profileImage,
            }, values),
            (res) => {
                setSubmitting(false);
                if (res?.status) {
                    SuccessToast(res?.message);
                    dispatch(getAuthUser());
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
    };
    const handlePasswordSubmit = (values: any, { setSubmitting, setFieldError }: any) => {
        dispatch(updateUserDetailByID(
            authUser?._id as string,
            { password: values?.confirmPassword },
            (res) => {
                setSubmitting(false);
                if (res?.status) {
                    SuccessToast(res?.message);
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
    };
    const popupRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        dispatch(getAuthUser());
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-300 to-white opacity-90"></div>
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/assets/images/bg-gradient.png"
                    alt="background"
                    className="h-full w-full object-cover opacity-60"
                />
            </div>
            <img
                src="/assets/images/coming-soon-object1.png"
                alt="object 1"
                className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2 animate-float"
            />
            <img
                src="/assets/images/coming-soon-object2.png"
                alt="object 2"
                className="absolute left-24 top-0 h-48 md:left-[30%] animate-spin-slow"
            />
            <img
                src="/assets/images/coming-soon-object3.png"
                alt="object 3"
                className="absolute right-0 top-0 h-[320px] animate-pulse"
            />
            <div className="max-w-4xl mx-auto relative">
                {/* Account Menu Dropdown */}
                <div ref={popupRef}
                    className="absolute right-6 top-6 z-10">
                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center gap-3 px-5 py-3 text-base font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 active:bg-gray-100 shadow-lg duration-150"
                        >
                            {/* Avatar Section */}
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                                {authUser?.profileImage ? (
                                    <img
                                        src={process.env.MEDIA_URL + initialValues?.profileImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-medium">
                                        {authUser?.firstName?.charAt(0)}{authUser?.lastName?.charAt(0)}
                                    </span>
                                )}
                            </div>
                            {/* User Info */}
                            <div className="hidden md:block text-left">
                                <div className="text-base font-semibold">{authUser?.firstName} {authUser?.lastName}</div>
                                <div className="text-sm text-gray-500">{authUser?.role?.name}</div>
                            </div>
                            <IconCaretDown className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`} />
                        </button>
                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div
                                className="absolute right-0 mt-3 w-64 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                                <div className="py-2">
                                    <a
                                        className="group flex items-center px-5 py-3 text-base text-gray-700 hover:bg-indigo-50"
                                        onClick={() => setIsEditingPassword(false)}>
                                        <IconUser className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                                        Profile
                                    </a>
                                    <a
                                        className="group flex items-center px-5 py-3 text-base text-gray-700 hover:bg-indigo-50"
                                        onClick={() => setIsEditingPassword(true)}>
                                        <IconLock className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                                        Password
                                    </a>
                                </div>
                                <div className="py-2">
                                    <a href=""
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            dispatch(getAuthUserSuccess(undefined));
                                            window.location.reload();
                                        }}
                                        className="group flex items-center px-5 py-3 text-base text-red-600 hover:bg-red-50">
                                        <IconLogout className="w-5 h-5 mr-3 rotate-90" />
                                        Logout
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Card className="bg-white shadow-2xl border-0 rounded-lg">
                    <div className="p-8 border-b bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {isEditingPassword ? "Change Password" : "Profile Settings"}
                        </h2>
                        <p className="text-base text-gray-500 mt-2">
                            {isEditingPassword ? "Update your password" : "Update your account information"}
                        </p>
                    </div>
                    <div className="p-8">
                        {isEditingPassword ? (
                            <Formik
                                initialValues={passwordInitialValues}
                                validationSchema={passwordValidationSchema}
                                onSubmit={handlePasswordSubmit}
                                enableReinitialize
                            >
                                {({ errors, touched, values, setFieldValue, dirty, isSubmitting }) => (
                                    <Form className="space-y-8">
                                        {/* Password */}
                                        <PrimaryTextInput
                                            type="password"
                                            id="password"
                                            label="Password*"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={(e) => setFieldValue("password", e)}
                                            errors={errors.password as string}
                                            touched={touched.password as boolean}
                                        />
                                        {/* Confirm Password */}
                                        <PrimaryTextInput
                                            type="password"
                                            id="confirmPassword"
                                            label="Confirm Password*"
                                            placeholder="Confirm Password"
                                            value={values.confirmPassword}
                                            onChange={(e) => setFieldValue("confirmPassword", e)}
                                            errors={errors.confirmPassword as string}
                                            touched={touched.confirmPassword as boolean}
                                        />
                                        {/* Submit Button */}
                                        <div className="flex justify-end pt-6">
                                            <PrimaryBtn
                                                title=" Save Changes"
                                                leftIcon={<IconSave className="w-5 h-5 mr-2" />}
                                                type="submit"
                                                disabled={!dirty || isSubmitting}
                                                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white hover:bg-[#446989]"
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        ) : (
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize
                            >
                                {({ errors, touched, values, isSubmitting, dirty, setFieldValue }) => (
                                    <Form className="space-y-8">
                                        {/* Avatar Upload */}
                                        <div className="flex justify-center">
                                            <CircularImageUpload
                                                label="Profile Picture"
                                                acceptedFileTypes="image/*"
                                                field="profileImage"
                                                setFieldValue={setFieldValue}
                                                initialFile={values.profileImage}
                                                cropWidth={200}
                                                cropHeight={200}
                                                action={uploadAdminImage}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* First Name */}
                                            <PrimaryTextInput
                                                type="text"
                                                id="firstName"
                                                label="First Name*"
                                                placeholder="First Name"
                                                value={values?.firstName}
                                                onChange={(e) => setFieldValue("firstName", e)}
                                                errors={errors.firstName as string}
                                                touched={touched.firstName as boolean}
                                            />
                                            {/* Last Name */}
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
                                        {/* Email */}
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
                                        <div>
                                            <label className="block text-base font-medium text-gray-700 mb-3">State</label>
                                            <span className="inline-flex items-center px-5 py-3 rounded-md text-base font-medium bg-indigo-100 text-indigo-800">
                                                {authUser?.isAllState
                                                    ? "All State"
                                                    : authUser?.state?.map((state: any) => state.title).join(", ")}
                                            </span>
                                        </div>
                                        {/* Submit Button */}
                                        <div className="flex justify-end pt-6">
                                            <PrimaryBtn
                                                title=" Save Changes"
                                                leftIcon={<IconSave className="w-5 h-5 mr-2" />}
                                                type="submit"
                                                disabled={!dirty || isSubmitting}
                                                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white hover:bg-[#446989]"
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProfileEdit;
