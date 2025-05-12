import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import SingleFileUpload from "../components/Inputs/SingleFileUpload";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { logActivity } from "../store/actions/report.action";
import { createStaticWhatWeDo, updateStaticWhatWeDoById, uploadStaticWhatWeDoFile } from "../store/actions/static.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    title: Yup.object().shape({
        "en": Yup.string().trim().required("Required"),
    }),
    location: Yup.object().shape({
        "en": Yup.string().trim().required("Required"),
    }),
    coverImage: Yup.string().trim().required("Required"),
    orderIndex: Yup.number().required("Required").min(0, "Order index cannot be negative"),
    active: Yup.boolean().required("Required"),
});

const StaticWhatWeDoEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { staticWhatWeDoById } = useSelector((state: IRootState) => state.static);
    const { translationLang } = useSelector((state: IRootState) => state.app);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: staticWhatWeDoById?.title || { en: "" },
            location: staticWhatWeDoById?.location || { en: "" },
            coverImage: staticWhatWeDoById?.coverImage || "",
            orderIndex: staticWhatWeDoById?.orderIndex || 1,
            active: staticWhatWeDoById?.active || false,
        },
        onSubmit: (values, actions) => {
            if (staticWhatWeDoById?._id) {
                dispatch(
                    updateStaticWhatWeDoById(
                        staticWhatWeDoById?._id,
                        getUpdatedFields({
                            "title": staticWhatWeDoById.title,
                            "location": staticWhatWeDoById.location,
                            "coverImage": staticWhatWeDoById.coverImage,
                            "orderIndex": staticWhatWeDoById.orderIndex,
                            "active": staticWhatWeDoById.active,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: staticWhatWeDoById,
                                        new: res?.data
                                    }
                                }));
                                close();
                            } else {
                                ErrorToast(res?.message);
                            }
                        },
                    ),
                );
            } else {
                dispatch(
                    createStaticWhatWeDo(
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
                            } else {
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
            <BoxCard headerName="Static What We Do"
                rightComponent={<TranslationsManagement />}>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            label="Title*"
                            id="title"
                            placeholder="What We Do Title"
                            value={values?.title.en}
                            onChange={(e) => setFieldValue("title.en", e)}
                            errors={typeof errors?.title == "object" ? "Required" : "" as string}
                            touched={touched?.title?.en}
                        />
                        {
                            translationLang !== undefined && (
                                <PrimaryTextInput
                                    type="text"
                                    id={"title" + translationLang}
                                    label={"Title" + " " + "(" + translationLang + ")"}
                                    placeholder={`What We Do Title In ${translationLang}`}
                                    value={values?.title?.[translationLang]}
                                    onChange={(e) => setFieldValue("title." + translationLang, e)}
                                />
                            )
                        }
                        <PrimaryTextInput
                            label="Location*"
                            id="location"
                            placeholder="Location"
                            value={values.location?.en}
                            onChange={(e) => setFieldValue("location.en", e)}
                            errors={errors.location?.en}
                            touched={touched.location?.en}
                        />
                        {
                            translationLang !== undefined && (
                                <PrimaryTextInput
                                    type="text"
                                    id={"location" + translationLang}
                                    label={"Location" + " " + "(" + translationLang + ")"}
                                    placeholder="Location"
                                    value={values?.location?.[translationLang]}
                                    onChange={(e) => setFieldValue("location." + translationLang, e)}
                                />
                            )
                        }
                        {/* <MultipleFileUpload
                            acceptedFileTypes={"image/*"}
                            label="Cover Image*"
                            field="coverImage"
                            initialFiles={formik.values.coverImage}
                            typeOfMaterial={"images"}
                            action={uploadStaticWhatWeDoFile}
                            setFieldValue={formik.setFieldValue}
                        /> */}
                        <SingleFileUpload field="coverImage"
                            label="Image* (1280*720)"
                            cropHeight={720}
                            cropWidth={1280}
                            setFieldValue={setFieldValue}
                            acceptedFileTypes="image/*"
                            initialFile={values?.coverImage}
                            errors={errors.coverImage}
                            touched={touched.coverImage}
                            action={uploadStaticWhatWeDoFile}
                        />
                        <PrimaryTextInput
                            label="Order Index*"
                            id="orderIndex"
                            placeholder="Order Index"
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
            <PrimaryBtn
                title={staticWhatWeDoById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()}
            />
        </div>
    );
};

export default StaticWhatWeDoEditForm;
