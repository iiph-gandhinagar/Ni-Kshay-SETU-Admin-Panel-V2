import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import EditorInput from "../components/Inputs/EditorInput";
import SingleFileUpload from "../components/Inputs/SingleFileUpload";
import { CreatableSelectInput, PrimaryTextInput } from "../components/Inputs/TextInput";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { createStaticBlog, updateStaticBlogById, uploadStaticBlogImage } from "../store/actions/static.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    title: Yup.object().shape({
        en: Yup.string().trim().required("Required"),
    }),
    description: Yup.object().shape({
        en: Yup.string().trim().required("Required"),
    }),
    orderIndex: Yup.number().required("Required").integer("Must be an integer"),
    author: Yup.string().trim().required("Required"),
    image1: Yup.string().trim().required("Required"),
    image3: Yup.string().trim(),
    active: Yup.boolean().required("Required"),
    keywords: Yup.array().of(Yup.string().trim()).required("Required"),
});

const StaticBlogEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { staticBlogById } = useSelector((state: IRootState) => state.static);
    const { translationLang } = useSelector((state: IRootState) => state.app);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: staticBlogById?.title || { en: "" },
            description: staticBlogById?.description || { en: "" },
            orderIndex: staticBlogById?.orderIndex || 0,
            source: staticBlogById?.source || "",
            author: staticBlogById?.author || "",
            image1: staticBlogById?.image1 || "",
            image3: staticBlogById?.image3 || "",
            active: staticBlogById?.active || false,
            keywords: staticBlogById?.keywords || [],
        },
        onSubmit: (values, actions) => {
            if (staticBlogById?._id) {
                dispatch(
                    updateStaticBlogById(staticBlogById._id,
                        getUpdatedFields({
                            title: staticBlogById?.title,
                            description: staticBlogById?.description,
                            orderIndex: staticBlogById?.orderIndex,
                            source: staticBlogById?.source,
                            author: staticBlogById?.author,
                            image1: staticBlogById?.image1,
                            image3: staticBlogById?.image3,
                            active: staticBlogById?.active,
                            keywords: staticBlogById?.keywords,
                        }, values), (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                close();
                            } else {
                                ErrorToast(res?.message);
                                if (res?.data?.errors) {
                                    res?.data?.errors?.forEach((error: any) => {
                                        const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                        setFieldError(fieldName, errorMessage);
                                    });
                                }
                            }
                        })
                );
            } else {
                dispatch(
                    createStaticBlog(values, (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            close();
                        } else {
                            ErrorToast(res?.message);
                            if (res?.data?.errors) {
                                res?.data?.errors?.forEach((error: any) => {
                                    const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                    setFieldError(fieldName, errorMessage);
                                });
                            }
                        }
                    })
                );
            }
        },
        validationSchema: validationSchema,
    });
    const { errors, values, setFieldValue, touched, handleSubmit, dirty, setFieldError, isSubmitting } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <div className="flex justify-end">
                    <TranslationsManagement />
                </div>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            label="Title*"
                            id="title"
                            onChange={(e) => setFieldValue("title.en", e)}
                            placeholder="Enter blog title"
                            value={values.title?.en}
                            errors={errors.title?.en}
                            touched={touched.title?.en}
                        />
                        {translationLang !== undefined && (
                            <PrimaryTextInput
                                label={"Title*" + " " + "(" + translationLang + ")"}
                                id={"title" + translationLang}
                                placeholder={`Enter title in ${translationLang}`}
                                onChange={(e) => setFieldValue("title." + translationLang, e)}
                                value={values.title?.[translationLang]}
                                errors={errors.title?.[translationLang]}
                                touched={touched.title?.[translationLang]}
                            />
                        )}
                        <EditorInput
                            label="Description*"
                            id="description"
                            onChange={(e) => setFieldValue("description.en", e)}
                            value={values.description?.en}
                            errors={errors.description?.en}
                            touched={touched.description?.en}
                        />
                        {
                            translationLang !== undefined && (
                                <EditorInput
                                    label={"Description*" + " " + "(" + translationLang + ")"}
                                    id={"description" + translationLang}
                                    value={values.description?.[translationLang]}
                                    onChange={(e) => setFieldValue("description." + translationLang, e)}
                                />
                            )
                        }
                        <PrimaryTextInput
                            type="number"
                            label="Order Index*"
                            placeholder="Enter order index"
                            id="orderIndex"
                            onChange={(e) => setFieldValue("orderIndex", parseInt(e))}
                            value={values.orderIndex}
                            errors={errors.orderIndex}
                            touched={touched.orderIndex}
                        />
                        <PrimaryTextInput
                            label="Source"
                            id="source"
                            placeholder="Enter source URL or name"
                            onChange={(e) => setFieldValue("source", e)}
                            value={values.source}
                            errors={errors.source}
                            touched={touched.source}
                        />
                        <PrimaryTextInput
                            label="Author*"
                            id="author"
                            placeholder="Enter author name"
                            onChange={(e) => setFieldValue("author", e)}
                            value={values.author}
                            errors={errors.author}
                            touched={touched.author}
                        />
                        <SingleFileUpload field="image1"
                            label="Image* (1241*443)"
                            cropHeight={433}
                            cropWidth={1241}
                            setFieldValue={setFieldValue}
                            acceptedFileTypes="image/*"
                            initialFile={values?.image1}
                            errors={errors.image1}
                            touched={touched.image1}
                            action={uploadStaticBlogImage}
                        />
                        <SingleFileUpload field="image3"
                            label="Image* (731 *445)"
                            cropHeight={445}
                            cropWidth={731}
                            setFieldValue={setFieldValue}
                            acceptedFileTypes="image/*"
                            initialFile={values?.image3}
                            errors={errors.image3}
                            touched={touched.image3}
                            action={uploadStaticBlogImage}
                        />
                        <Checkbox
                            label="Active"
                            id="active"
                            onChange={(e) => setFieldValue("active", e)}
                            checked={values.active}
                        />
                        <CreatableSelectInput
                            id="keywords"
                            placeholder="Add keywords"
                            isMulti
                            label="Keywords"
                            onCreateOption={(e) => setFieldValue("keywords", [...values.keywords, e])}
                            value={values.keywords.map((keyword) => ({ value: keyword, label: keyword }))}
                            options={values.keywords.map((keyword) => ({ value: keyword, label: keyword }))}
                            onChange={(e) => setFieldValue("keywords", e.map((item: any) => item.value))}
                            errors={errors.keywords}
                            touched={touched.keywords}
                        />
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn
                title={staticBlogById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()}
            />
        </div>
    );
};

export default StaticBlogEditForm;
