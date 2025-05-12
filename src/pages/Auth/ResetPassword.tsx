import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import IconEye from "../../components/Icon/IconEye";
import IconEyeClose from "../../components/Icon/IconEyeClose";
import IconLockDots from "../../components/Icon/IconLockDots";
import IconMail from "../../components/Icon/IconMail";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import { resetPassword } from "../../store/reducer/auth.reducer";
import { setPageTitle } from "../../store/themeConfigSlice";
import { ErrorToast, SuccessToast } from "../../utils/toasts";

const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    temppassword: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    password: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("temppassword")], "Passwords must match"),
});

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            temppassword: "",
            token: params?.token || "",
            password: "",
        },
        onSubmit: (values, actions) => {
            dispatch(resetPassword({
                email: values.email,
                token: values.token,
                password: values.password,
            }, (res:any) => {
                actions.setSubmitting(false);
                if (res?.status) {
                    SuccessToast(res?.message);
                    navigate("/login");
                } else {
                    if(res?.statusCode === 500){
                        ErrorToast("Something went wrong!");
                    }
                    if (res?.data?.errors) {
                        res?.data?.errors?.forEach((error: any) => {
                            const fieldName = Object.keys(error)[0].toLowerCase();;
                            const errorMessage = error[fieldName];
                            setFieldError(fieldName?.toLowerCase(), errorMessage);
                        });
                    }
                }
            }));
        },
        validationSchema: validationSchema,
    });

    const { errors, values, setFieldValue, touched, handleSubmit, setFieldError, isSubmitting } = formik;

    useEffect(() => {
        dispatch(setPageTitle("Reset Password"));
    }, [dispatch]);

    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center bg-[#5584ac]">
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Reset Password</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your new temppassword below</p>
                            </div>
                            <div className="space-y-5 dark:text-white">
                                <PrimaryTextInput
                                    // disabled
                                    label="Email"
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    errors={errors.email}
                                    touched={touched.email}
                                    value={values.email}
                                    onChange={(value) => setFieldValue("email", value)}
                                    icon={<IconMail fill={true} />}
                                />
                                <PrimaryTextInput
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    id="temppassword"
                                    placeholder="New Password"
                                    errors={errors.temppassword}
                                    touched={touched.temppassword}
                                    onChange={(value) => setFieldValue("temppassword", value)}
                                    value={values.temppassword}
                                    iconRight={
                                        <button className="mt-2 mr-2"
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <IconEye /> : <IconEyeClose />}
                                        </button>
                                    }
                                    icon={<IconLockDots fill={true} />}
                                />
                                <PrimaryTextInput
                                    label="Confirm Password"
                                    type="password"
                                    id="password"
                                    placeholder="Confirm Password"
                                    errors={errors.password}
                                    touched={touched.password}
                                    onChange={(value) => setFieldValue("password", value)}
                                    value={values.password}
                                    icon={<IconLockDots fill={true} />}
                                />
                                <PrimaryBtn
                                    isUpper
                                    isLoading={isSubmitting}
                                    title="Reset Password"
                                    isFullWidth
                                    className="mt-6"
                                    onClick={() => handleSubmit()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
