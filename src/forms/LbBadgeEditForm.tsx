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
import { createLeaderboardBadgeByID, updateLeaderboardBadgeByID } from "../store/actions/leaderboard.action";
import { logActivity } from "../store/actions/report.action";
import { cleanLeaderboardBadgeById, cleanLeaderboardLevelList, getAllLeaderboardLevelList } from "../store/reducer/leaderboard.reducer";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    levelId: Yup.string().required("Required"),
    badge: Yup.string().required("Required"),
});
const LbBadgeEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { leaderboardBadgeById, leaderboardLevelList } = useSelector((state: IRootState) => state.leaderboard);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            levelId: leaderboardBadgeById?.levelId?._id || "",
            badge: leaderboardBadgeById?.badge || "",
        },
        onSubmit: (values, actions) => {
            if (leaderboardBadgeById?._id) {
                dispatch(
                    updateLeaderboardBadgeByID(
                        leaderboardBadgeById?._id,
                        values,
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: leaderboardBadgeById,
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
                    createLeaderboardBadgeByID(
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
        dispatch(getAllLeaderboardLevelList("?isDrpDwn=true"));
        return () => {
            dispatch(cleanLeaderboardLevelList());
            dispatch(cleanLeaderboardBadgeById());

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
                            menuPortalTarget={null}
                            label="Level*"
                            id="label"
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
                        <PrimaryTextInput
                            className="w-500"
                            label="Badge*"
                            placeholder="badge"
                            id="badge"
                            type="text"
                            onChange={(e) => setFieldValue("badge", e)}
                            value={values.badge}
                            errors={errors.badge}
                            touched={touched.badge}
                        />
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn title={leaderboardBadgeById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
export default LbBadgeEditForm;
