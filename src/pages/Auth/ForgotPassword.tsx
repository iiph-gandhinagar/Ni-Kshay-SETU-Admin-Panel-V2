import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import IconMail from "../../components/Icon/IconMail";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import { forgotpassword } from "../../store/reducer/auth.reducer";
import { setPageTitle } from "../../store/themeConfigSlice";
import { ErrorToast, SuccessToast } from "../../utils/toasts";
const validationSchema = yup.object().shape({
    email: yup.string().required("Required"),
});
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: (values, actions) => {
            dispatch(forgotpassword(values, (res) => {
                actions.setSubmitting(false);
                if (res?.status) {
                    SuccessToast(res?.message);
                } else {
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
    const { errors, values, setFieldValue, touched, setFieldError, handleSubmit, isSubmitting, dirty } = formik;
    useEffect(() => {
        dispatch(setPageTitle("ForgotPassword"));
    }), [];
    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center bg-[#5584ac]">
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Forgot Password</h1>
                                <p className="text-base font-bold leading-normal text-white-dark"> Enter your email to reset your password</p>
                            </div>
                            <div className="space-y-5 dark:text-white">
                                <PrimaryTextInput
                                    label="Email"
                                    type='email'
                                    id='Email'
                                    placeholder='Enter Email'
                                    errors={errors.email}
                                    touched={touched.email}
                                    value={values.email}
                                    onChange={(value) => setFieldValue("email", value)}
                                    icon={<IconMail fill={true} />}
                                />
                                <PrimaryBtn
                                    isUpper
                                    isLoading={isSubmitting}
                                    disabled={!dirty || isSubmitting}
                                    title='Send Reset Link'
                                    isFullWidth
                                    className='mt-6'
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

export default ForgotPassword;
