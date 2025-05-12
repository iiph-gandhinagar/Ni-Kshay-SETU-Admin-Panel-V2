
import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { createLeaderboardTaskByID, updateLeaderboardTaskByID } from "../store/actions/leaderboard.action";
import { logActivity } from "../store/actions/report.action";
import { cleanLeaderboardBadgeList, cleanLeaderboardLevelList, cleanLeaderboardTaskById, getAllLeaderboardBadgeList, getAllLeaderboardLevelList } from "../store/reducer/leaderboard.reducer";
import { ErrorToast } from "../utils/toasts";
const validationSchema = Yup.object().shape({
    levelId: Yup.string().required("Required"),
    badgeId: Yup.string().required("Required"),
    minSpent: Yup.number()
        .required("Required")
        .min(0, "Must be zero or a positive number")
        .integer("Must be an integer"),
    subModuleUsageCount: Yup.number()
        .required("Required")
        .integer("Must be an integer"),
    appOpenedCount: Yup.number()
        .required("Required")
        .min(0, "Must be zero or a positive number")
        .integer("Must be an integer"),
    chatbotUsageCount: Yup.number()
        .required("Required")
        .min(0, "Must be zero or a positive number")
        .integer("Must be an integer"),
    kbaseCompletion: Yup.number()
        .required("Required")
        .min(0, "Must be at least 0")
        .max(100, "Must be at most 100"),
    totalAssessments: Yup.number()
        .required("Required")
        .min(0, "Must be zero or a positive number")
        .integer("Must be an integer"),
    correctnessOfAnswers: Yup.number()
        .required("Required")
        .min(0, "Must be at least 0")
        .max(100, "Must be at most 100"),
});

const LbTaskListEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { leaderboardTaskById, leaderboardLevelList, leaderboardBadgeList } = useSelector((state: IRootState) => state.leaderboard);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            levelId: leaderboardTaskById?.levelId?._id || "",
            badgeId: leaderboardTaskById?.badgeId?._id || "",
            minSpent: leaderboardTaskById?.minSpent || "",
            subModuleUsageCount: leaderboardTaskById?.subModuleUsageCount || "",
            appOpenedCount: leaderboardTaskById?.appOpenedCount || "",
            chatbotUsageCount: leaderboardTaskById?.chatbotUsageCount || "",
            kbaseCompletion: leaderboardTaskById?.kbaseCompletion || "",
            totalAssessments: leaderboardTaskById?.totalAssessments || "",
            correctnessOfAnswers: leaderboardTaskById?.correctnessOfAnswers || "",
        },
        onSubmit: (values, actions) => {
            if (leaderboardTaskById?._id) {
                dispatch(
                    updateLeaderboardTaskByID(
                        leaderboardTaskById?._id,
                        values,
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: leaderboardTaskById,
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
                    createLeaderboardTaskByID(
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
        dispatch(getAllLeaderboardBadgeList(`?isDrpDwn=true&levelId=${formik?.values?.levelId}`));
    }, [formik?.values?.levelId]);
    useEffect(() => {
        dispatch(getAllLeaderboardLevelList("?isDrpDwn=true"));
        dispatch(getAllLeaderboardBadgeList("?isDrpDwn=true"));
        return () => {
            dispatch(cleanLeaderboardLevelList());
            dispatch(cleanLeaderboardBadgeList());
            dispatch(cleanLeaderboardTaskById());
        };
    }, []);

    const { errors, values, setFieldError, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;

    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <SelectInput
                            label="Level*"
                            id="label"
                            menuPortalTarget={null}
                            onChange={(e) => setFieldValue("levelId", e)}
                            value={values?.levelId}
                            options={leaderboardLevelList?.list?.map((e: any) => {
                                return {
                                    label: e?.level,
                                    value: e?._id
                                };
                            })}
                            errors={errors.levelId}
                            touched={touched.levelId}
                        />
                        {values?.levelId &&
                            <SelectInput
                                className="w-500"
                                label="Badge*"
                                menuPortalTarget={null}
                                id="badge"
                                onChange={(e) => setFieldValue("badgeId", e)}
                                value={values.badgeId}
                                options={leaderboardBadgeList?.map((e: any) => {
                                    return {
                                        label: e?.badge,
                                        value: e?._id
                                    };
                                })}
                                errors={errors.badgeId}
                                touched={touched.badgeId}
                            />
                        }
                        <PrimaryTextInput
                            type="number"
                            label="Mins Spent"
                            id="minSpent"
                            placeholder="Mins Spent"
                            onChange={(e) => setFieldValue("minSpent", parseInt(e))}
                            value={values.minSpent}
                            errors={errors.minSpent}
                            touched={touched.minSpent}
                        />
                        <PrimaryTextInput
                            type="number"
                            label="Sub Module Usage Count"
                            id="subModuleUsageCount"
                            placeholder="Sub Module Usage Count"
                            onChange={(e) => setFieldValue("subModuleUsageCount", parseInt(e))}
                            value={values.subModuleUsageCount}
                            errors={errors.subModuleUsageCount}
                            touched={touched.subModuleUsageCount}
                        />
                        <PrimaryTextInput
                            type="number"
                            label="App Opened Count"
                            id="appOpenedCount"
                            placeholder="App Opened Count"
                            onChange={(e) => setFieldValue("appOpenedCount", parseInt(e))}
                            value={values.appOpenedCount}
                            errors={errors.appOpenedCount}
                            touched={touched.appOpenedCount}
                        />
                        <PrimaryTextInput
                            type="number"
                            label="Chatbot Usage Count"
                            id="chatbotUsageCount"
                            placeholder="Chatbot Usage Count"
                            onChange={(e) => setFieldValue("chatbotUsageCount", parseInt(e))}
                            value={values.chatbotUsageCount}
                            errors={errors.chatbotUsageCount}
                            touched={touched.chatbotUsageCount}
                        />
                        <PrimaryTextInput
                            type="number"
                            label="K-base Completion (%)"
                            id="kbaseCompletion"
                            placeholder="K-base Completion (%)"
                            onChange={(e) => setFieldValue("kbaseCompletion", parseInt(e))}
                            value={values.kbaseCompletion}
                            errors={errors.kbaseCompletion}
                            touched={touched.kbaseCompletion}
                        />
                        <PrimaryTextInput
                            type="number"
                            label="Number Of Assessments"
                            id="totalAssessments"
                            placeholder="Number Of Assessments"
                            onChange={(e) => setFieldValue("totalAssessments", parseInt(e))}
                            value={values.totalAssessments}
                            errors={errors.totalAssessments}
                            touched={touched.totalAssessments}
                        />
                        <PrimaryTextInput
                            type="number"
                            label="Correctness Of Answers (%)"
                            id="correctnessOfAnswers"
                            placeholder="Correctness Of Answers (%)"
                            onChange={(e) => setFieldValue("correctnessOfAnswers", parseInt(e))}
                            value={values.correctnessOfAnswers}
                            errors={errors.correctnessOfAnswers}
                            touched={touched.correctnessOfAnswers}
                        />
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn title={leaderboardTaskById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};

export default LbTaskListEditForm;
