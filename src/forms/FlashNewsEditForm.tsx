
import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import { EditorInput } from "../components/Inputs/EditorInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import { IRootState } from "../store";
import { createFlashNews, updateFlashNews } from "../store/actions/flashNews.action";
import { logActivity } from "../store/actions/report.action";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required("Required"),
    source: Yup.string().trim().required("Required"),
    href: Yup.string().trim().required("Required"),
    orderIndex: Yup.number().required("Required").min(0, "Order index cannot be negative"),
});
const FlashNewsEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { flashNewsById } = useSelector((state: IRootState) => state.flashNews);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: flashNewsById?.title || "",
            description: flashNewsById?.description || "",
            source: flashNewsById?.source || "",
            href: flashNewsById?.href || "",
            orderIndex: flashNewsById?.orderIndex || 1,
            active: flashNewsById?.active || false,
        },
        onSubmit: (values, actions) => {
            if (flashNewsById?._id) {
                dispatch(
                    updateFlashNews(
                        flashNewsById?._id,
                        values,
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: flashNewsById,
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
                    createFlashNews(
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
    const { errors, values, setFieldError, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <BoxCard headerName="Flash News">
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            label="Title*"
                            id="title"
                            placeholder="Title"
                            value={values?.title}
                            onChange={(e) => setFieldValue("title", e)}
                            errors={errors?.title as string}
                            touched={touched?.title}
                        />
                        <EditorInput
                            label="Description*"
                            placeholder="Description"
                            id="description"
                            value={values.description}
                            onChange={(e) => setFieldValue("description", e)}
                        />
                        <PrimaryTextInput
                            label="Source*"
                            id="source"
                            placeholder="Source"
                            value={values.source}
                            onChange={(e) => setFieldValue("source", e)}
                            errors={errors.source}
                            touched={touched.source}
                        />
                        <PrimaryTextInput
                            label="Href*"
                            placeholder="Href"
                            id="href"
                            value={values.href}
                            onChange={(e) => setFieldValue("href", e)}
                            errors={errors.href}
                            touched={touched.href}
                        />
                        <PrimaryTextInput
                            label="Order Index*"
                            id="orderIndex"
                            placeholder="Order index"
                            type="number"
                            value={values.orderIndex}
                            onChange={(e) => setFieldValue("orderIndex", Number(e))}
                            errors={errors.orderIndex}
                            touched={touched.orderIndex}
                        />
                        <Checkbox
                            label="Active*"
                            id="active"
                            checked={values?.active as boolean}
                            onChange={(e) => setFieldValue("active", e)}
                        />
                    </Fragment>
                </div>
            </BoxCard>
            <PrimaryBtn title={flashNewsById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
export default FlashNewsEditForm;
