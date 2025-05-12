import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { leaderboardLevelByIdProps } from "../../@types/store/reducer/leaderboard.reducer";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { createLeaderboardLevelByID, updateLeaderboardLevelByID } from "../store/actions/leaderboard.action";
import { cleanLeaderboardLevelById } from "../store/reducer/leaderboard.reducer";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";
import { logActivity } from "../store/actions/report.action";

const validationSchema = Yup.object().shape({
    level: Yup.string().required("Required"),
    content: Yup.string().required("Required"),
});
const LbLevelEditForm = ({ close }: masterEditFormProps) => {
    const { leaderboardLevelById } = useSelector((state: IRootState) => state.leaderboard);
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            level: leaderboardLevelById?.level || "",
            content: leaderboardLevelById?.content || "",

        } as leaderboardLevelByIdProps,
        onSubmit: (values, actions) => {
            if (leaderboardLevelById?._id) {
                dispatch(
                    updateLeaderboardLevelByID(
                        leaderboardLevelById?._id,
                        getUpdatedFields({
                            level: leaderboardLevelById?.level,
                            content: leaderboardLevelById?.content,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: leaderboardLevelById,
                                        new: res?.data
                                    }
                                }));
                                close();
                            }
                            else {
                                ErrorToast(res?.message);
                            }
                        },
                    ),
                );
            } else {
                dispatch(
                    createLeaderboardLevelByID(
                        values,
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
                                close();
                            }
                            else {
                                ErrorToast(res?.message);
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const fieldName = Object.keys(error)[0];
                                        const errorMessage = error[fieldName];
                                        setFieldError(fieldName.toLowerCase(), errorMessage);
                                    });
                                }
                            }
                        },
                    ),
                );
            }

        },
        validationSchema: validationSchema,
    });
    useEffect(() => {
        return () => {
            dispatch(cleanLeaderboardLevelById());
        };
    }, []);
    const { errors, values, setFieldError, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            className="w-500"
                            label="Level*"
                            placeholder="level"
                            id="level"
                            type="text"
                            onChange={(e) => setFieldValue("level", e)}
                            value={values.level}
                            errors={errors.level}
                            touched={touched.level}
                        />
                        <PrimaryTextInput
                            className="w-500"
                            label="Content*"
                            placeholder="content"
                            id="content"
                            type="text"
                            onChange={(e) => setFieldValue("content", e)}
                            value={values.content}
                            errors={errors.content}
                            touched={touched.content}
                        />
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn title={leaderboardLevelById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
export default LbLevelEditForm;
