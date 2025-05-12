import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import { EditorInput } from "../components/Inputs/EditorInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { createStaticFaq, updateStaticFaqById } from "../store/actions/static.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    question: Yup.object().shape({
        en: Yup.string().trim().required("Required"),
    }),
    description: Yup.object().shape({
        en: Yup.string().trim().required("Required"),
    }),
    orderIndex: Yup.number().required("Required").integer("Must be an integer"),
    active: Yup.boolean().required("Required"),
});

const StaticFaqEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { staticFaqById } = useSelector((state: IRootState) => state.static);
    const { translationLang } = useSelector((state: IRootState) => state.app);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            question: staticFaqById?.question || { en: "" },
            description: staticFaqById?.description || { en: "" },
            orderIndex: staticFaqById?.orderIndex || 0,
            active: staticFaqById?.active || false,
        },
        onSubmit: (values, actions) => {
            if (staticFaqById?._id) {
                dispatch(
                    updateStaticFaqById(staticFaqById._id, getUpdatedFields({
                        question: staticFaqById?.question,
                        description: staticFaqById?.description,
                        orderIndex: staticFaqById?.orderIndex,
                        active: staticFaqById?.active,
                    }, values), (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            close();
                        } else {
                            ErrorToast(res?.message);
                        }
                    })
                );
            } else {
                dispatch(
                    createStaticFaq(values, (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            close();
                        } else {
                            ErrorToast(res?.message);
                        }
                    })
                );
            }
        },
        validationSchema: validationSchema,
    });

    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;

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
                            label="Question*"
                            id="question"
                            placeholder="Enter your FAQ question here"
                            onChange={(e) => setFieldValue("question.en", e)}
                            value={values.question.en}
                            errors={errors?.question?.en}
                            touched={touched?.question?.en}
                        />
                        {
                            translationLang !== undefined && (
                                <PrimaryTextInput
                                    type="text"
                                    id={"title" + translationLang}
                                    placeholder={`Enter question in ${translationLang}`}
                                    label={"Question" + " " + "(" + translationLang + ")"}
                                    value={values?.question?.[translationLang]}
                                    onChange={(e) => setFieldValue("question." + translationLang, e)}
                                />
                            )
                        }
                        <EditorInput
                            label="Description*"
                            id="description"
                            onChange={(e) => setFieldValue("description.en", e)}
                            value={values?.description?.en}
                            errors={errors?.description?.en}
                            touched={touched?.description?.en}
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
                            placeholder="Order Index"
                            id="orderIndex"
                            onChange={(e) => setFieldValue("orderIndex", parseInt(e))}
                            value={values.orderIndex}
                            errors={errors.orderIndex}
                            touched={touched.orderIndex}
                        />
                        <Checkbox
                            label="Active"
                            id="active"
                            onChange={(e) => setFieldValue("active", e)}
                            checked={values.active}
                        />
                    </Fragment>
                </div>
            </div>
            <PrimaryBtn
                title={staticFaqById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()}
            />
        </div>
    );
};

export default StaticFaqEditForm;
