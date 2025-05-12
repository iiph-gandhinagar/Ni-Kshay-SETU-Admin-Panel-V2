
import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import SingleFileUpload from "../components/Inputs/SingleFileUpload";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { createFlashSimilarAppByID, updateFlashSimilarAppByID, uploadFlashSimilarImage } from "../store/actions/flashNews.action";
import { logActivity } from "../store/actions/report.action";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    subTitle: Yup.string().required("Required"),
    href: Yup.string().required("Required"),
    hrefIos: Yup.string().required("Required"),
    hrefWeb: Yup.string().required("Required"),
    orderIndex: Yup.number()
        .typeError("Required")
        .required("Required"),
    image: Yup.string().required("Required"),
});
const FlashRelatedAppEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { flashSimilarAppById } = useSelector((state: IRootState) => state.flashNews);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: flashSimilarAppById?.title || "",
            subTitle: flashSimilarAppById?.subTitle || "",
            href: flashSimilarAppById?.href || "",
            hrefIos: flashSimilarAppById?.hrefIos || "",
            hrefWeb: flashSimilarAppById?.hrefWeb || "",
            orderIndex: flashSimilarAppById?.orderIndex || 1,
            active: flashSimilarAppById?.active || false,
            image: flashSimilarAppById?.image || "",
        },
        onSubmit: (values, actions) => {
            if (flashSimilarAppById?._id) {
                dispatch(
                    updateFlashSimilarAppByID(
                        flashSimilarAppById?._id,
                        values,
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: flashSimilarAppById,
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
                    createFlashSimilarAppByID(
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
            <div className="panel">
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            type="text"
                            label="Title*"
                            id="title"
                            placeholder="Title"
                            onChange={(value) => setFieldValue("title", value)}
                            value={values?.title}
                            errors={errors.title}
                            touched={touched.title}
                        />
                        <PrimaryTextInput
                            type="text"
                            label="Sub Title*"
                            placeholder="Sub Title"
                            id="subTitle"
                            onChange={(value) => setFieldValue("subTitle", value)}
                            value={values?.subTitle}
                            errors={errors.subTitle}
                            touched={touched.subTitle}
                        />
                        <PrimaryTextInput
                            type="url"
                            label="Href*"
                            id="href"
                            placeholder="Href"
                            onChange={(value) => setFieldValue("href", value)}
                            value={values?.href}
                            errors={errors.href}
                            touched={touched.href}
                        />
                        <PrimaryTextInput
                            type="url"
                            label="Href Web*"
                            id="href"
                            placeholder="Href Web"
                            onChange={(value) => setFieldValue("hrefWeb", value)}
                            value={values?.hrefWeb}
                            errors={errors.hrefWeb}
                            touched={touched.hrefWeb}
                        />
                        <PrimaryTextInput
                            type="url"
                            label="Href iOS*"
                            placeholder="Href iOS"
                            id="href"
                            onChange={(value) => setFieldValue("hrefIos", value)}
                            value={values?.hrefIos}
                            errors={errors.hrefIos}
                            touched={touched.hrefIos}
                        />
                        <PrimaryTextInput
                            type="number"
                            label="Order Index*"
                            id="orderIndex"
                            placeholder="Order Index"
                            onChange={(value) => setFieldValue("orderIndex", value)}
                            value={values?.orderIndex}
                            errors={errors.orderIndex}
                            touched={touched.orderIndex}
                        />
                        <SingleFileUpload field="image"
                            label="Upload Image"
                            setFieldValue={setFieldValue}
                            acceptedFileTypes="image/*"
                            initialFile={values?.image}
                            errors={errors.image}
                            touched={touched.image}
                            action={uploadFlashSimilarImage}
                        />
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn title={flashSimilarAppById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()} />
        </div>
    );
};
export default FlashRelatedAppEditForm;
