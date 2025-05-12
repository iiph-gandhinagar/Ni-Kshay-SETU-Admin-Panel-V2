import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import CustomSwitch from "../components/CheckBox/Switch";
import { SelectInput } from "../components/Inputs/SelectInput";
import SingleFileUpload from "../components/Inputs/SingleFileUpload";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { createFeedback, updateFeedbackByID, uploadFeedbackImage } from "../store/actions/feedback.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast, SuccessToast } from "../utils/toasts";

interface FeedbackFormProps {
    close: () => void;
}

interface FeedbackFormValues {
    question: { [key: string]: string };
    description: { [key: string]: string };
    feedbackValue: number;
    feedbackTime: number;
    feedbackType: string;
    feedbackDays: number;
    feedbackIcon: string;
    active: boolean;
}

const validationSchema = Yup.object().shape({
    question: Yup.object().shape({
        en: Yup.string().trim().required("Question is required"),
    }),
    description: Yup.object().shape({
        en: Yup.string().trim().required("Description is required"),
    }),
    feedbackValue: Yup.number().min(0, "Feedback Value cannot be negative").required("Feedback Value is required"),
    feedbackTime: Yup.number().min(0, "Feedback Time cannot be negative").required("Feedback Time is required"),
    feedbackType: Yup.string().trim().required("Feedback Type is required"),
    feedbackDays: Yup.number().min(0, "Feedback Days cannot be negative").required("Feedback Days is required"),
    feedbackIcon: Yup.string().trim().required("Feedback Icon is required"),
});

const FeedbackEditForm: React.FC<FeedbackFormProps> = ({ close }) => {
    const dispatch = useDispatch();
    const { feedbackById } = useSelector((state: IRootState) => state.feedback);
    const { translationLang } = useSelector((state: IRootState) => state.app);

    const formik = useFormik<FeedbackFormValues>({
        initialValues: {
            question: feedbackById?.question || { en: "" },
            description: feedbackById?.description || { en: "" },
            feedbackValue: feedbackById?.feedbackValue || 0,
            feedbackTime: feedbackById?.feedbackTime || 0,
            feedbackType: feedbackById?.feedbackType || "",
            feedbackDays: feedbackById?.feedbackDays || 0,
            feedbackIcon: feedbackById?.feedbackIcon || "",
            active: feedbackById?.active || true,
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            if (feedbackById?._id) {
                dispatch(updateFeedbackByID(feedbackById._id, getUpdatedFields({
                    question: feedbackById?.question,
                    description: feedbackById?.description,
                    feedbackValue: feedbackById?.feedbackValue,
                    feedbackTime: feedbackById?.feedbackTime,
                    feedbackType: feedbackById?.feedbackType,
                    feedbackDays: feedbackById?.feedbackDays,
                    feedbackIcon: feedbackById?.feedbackIcon,
                    active: feedbackById?.active,
                }, values), (res) => {
                    actions.setSubmitting(false);
                    if (res.status) {
                        SuccessToast("Feedback updated successfully!");
                        close();
                    } else {
                        ErrorToast(res.message);
                    }
                }));
            } else {
                dispatch(createFeedback(values, (res) => {
                    actions.setSubmitting(false);
                    if (res.status) {
                        SuccessToast("Feedback created successfully!");
                        close();
                    } else {
                        ErrorToast(res.message);
                    }
                }));
            }
        },
    });
    useEffect(() => {
        if (feedbackById) {
            formik.setValues({
                question: feedbackById.question || { en: "" },
                description: feedbackById.description || { en: "" },
                feedbackValue: feedbackById.feedbackValue || 0,
                feedbackTime: feedbackById.feedbackTime || 0,
                feedbackType: feedbackById.feedbackType || "",
                feedbackDays: feedbackById.feedbackDays || 0,
                feedbackIcon: feedbackById.feedbackIcon || "",
                active: feedbackById.active || true,
            });
        }
    }, [feedbackById]);

    const { errors, values, setFieldValue, touched, handleSubmit, isSubmitting } = formik;

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-end">
                <TranslationsManagement />
            </div>
            <div className="mb-4">
                <PrimaryTextInput
                    label="Question"
                    placeholder="Enter question"
                    id="question.en"
                    type="text"
                    onChange={(e) => setFieldValue("question.en", e)}
                    value={values.question.en}
                    errors={errors.question?.en as string}
                    touched={touched.question?.en as boolean}
                />
            </div>
            {translationLang &&
                <div className="mb-4">
                    <PrimaryTextInput
                        label={`Question (${translationLang})`}
                        placeholder={`Question (${translationLang})`}
                        id="question.${translationLang}"
                        type="text"
                        onChange={(e) => setFieldValue(`question.${translationLang}`, e)}
                        value={values?.question?.[translationLang]}
                    />
                </div>
            }
            <div className="mb-4">
                <PrimaryTextInput
                    label="Description"
                    placeholder="Enter description"
                    id="description.en"
                    type="text-area"
                    onChange={(e) => setFieldValue("description.en", e)}
                    value={values.description.en}
                    errors={errors.description?.en as string}
                    touched={touched.description?.en as boolean}
                />
            </div>
            {translationLang &&
                <div className="mb-4">
                    <PrimaryTextInput
                        label={`Description (${translationLang})`}
                        placeholder={`Description (${translationLang})`}
                        id="description.${translationLang}"
                        type="text-area"
                        onChange={(e) => setFieldValue(`description.${translationLang}`, e)}
                        value={values?.description?.[translationLang]}
                    />
                </div>
            }
            <div className="mb-4">
                <PrimaryTextInput
                    label="Feedback Value"
                    placeholder="Enter feedback value"
                    id="feedbackValue"
                    type="number"
                    onChange={(e) => setFieldValue("feedbackValue", parseInt(e))}
                    value={values.feedbackValue}
                    errors={errors.feedbackValue as string}
                    touched={touched.feedbackValue as boolean}
                />
            </div>
            <div className="mb-4">
                <PrimaryTextInput
                    label="Feedback Time"
                    placeholder="Enter feedback time"
                    id="feedbackTime"
                    type="number"
                    onChange={(e) => setFieldValue("feedbackTime", parseInt(e))}
                    value={values.feedbackTime}
                    errors={errors.feedbackTime as string}
                    touched={touched.feedbackTime as boolean}
                />
            </div>
            <div className="mb-4">
                <SelectInput
                    menuPortalTarget={null}
                    label="Feedback Type"
                    placeholder="Enter feedback type"
                    id="feedbackType"
                    options={[{
                        value: "repeat",
                        label: "Repeat"
                    },
                    {
                        value: "no_repeat",
                        label: "No Repeat"
                    }]}
                    onChange={(e) => setFieldValue("feedbackType", e)}
                    value={values.feedbackType}
                    errors={errors.feedbackType as string}
                    touched={touched.feedbackType as boolean}
                />
            </div>
            <div className="mb-4">
                <PrimaryTextInput
                    label="Feedback Days"
                    placeholder="Enter feedback days"
                    id="feedbackDays"
                    type="number"
                    onChange={(e) => setFieldValue("feedbackDays", parseInt(e))}
                    value={values.feedbackDays}
                    errors={errors.feedbackDays as string}
                    touched={touched.feedbackDays as boolean}
                />
            </div>
            <div className="mb-4">
                <SingleFileUpload
                    label="Feedback Icon"
                    field="feedbackIcon"
                    action={uploadFeedbackImage}
                    setFieldValue={setFieldValue}
                    acceptedFileTypes="image/*"
                    initialFile={values?.feedbackIcon}
                    errors={errors.feedbackIcon as string}
                    touched={touched.feedbackIcon as boolean}
                />
            </div>
            <div className="mb-4">
                <CustomSwitch
                    label="Active"
                    checked={values.active}
                    onChange={(e) => setFieldValue("active", e)}
                />
            </div>
            <div className="flex justify-end">
                <PrimaryBtn type="submit"
                    title={feedbackById?._id ? "Update Feedback" : "Create Feedback"}
                    isLoading={isSubmitting} />
            </div>
        </form>
    );
};

export default FeedbackEditForm;
