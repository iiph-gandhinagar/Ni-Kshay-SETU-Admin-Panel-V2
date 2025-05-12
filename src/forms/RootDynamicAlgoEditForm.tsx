import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import SingleFileUpload from "../components/Inputs/SingleFileUpload";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { createRootDynamicAlgo, updateRootDynamicAlgo, uploadDynamicAlgoImage } from "../store/actions/dynamicAlgo.action";
import { logActivity } from "../store/actions/report.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast, SuccessToast } from "../utils/toasts";

export const RootDynamicAlgoEditForm = ({ close, node }: { close: () => void, node?: any }) => {
    const dispatch = useDispatch();
    const { RootDynamicAlgoById, loader } = useSelector((state: IRootState) => state.dynamicAlgo);
    const { translationLang } = useSelector((state: IRootState) => state.app);


    const validationSchema = Yup.object().shape({
        title: Yup.object().shape({
            "en": Yup.string().trim().required("Required"),
        }), active: Yup.boolean().required("Active status is required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: RootDynamicAlgoById?.title || { en: "" },
            active: RootDynamicAlgoById?.active || false,
            icon: RootDynamicAlgoById?.icon || "", // Initialize icon field
        },
        onSubmit: (values, actions) => {
            if (RootDynamicAlgoById?._id) {
                dispatch(updateRootDynamicAlgo(
                    RootDynamicAlgoById?._id,
                    getUpdatedFields({
                        "title": RootDynamicAlgoById?.title,
                        "active": RootDynamicAlgoById?.active,
                        "icon": RootDynamicAlgoById?.icon || "",
                    }, values)
                    , (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            dispatch(logActivity({
                                "action": "update",
                                "moduleName": window.location.pathname,
                                "payload": {
                                    old: RootDynamicAlgoById,
                                    new: res?.data
                                }
                            }));
                            close();
                            SuccessToast(res.message);
                        } else {
                            ErrorToast(res.message);
                            if (res?.data?.errors) {
                                res?.data?.errors?.forEach((error: any) => {
                                    const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                    setFieldError(fieldName, errorMessage);
                                });
                            }
                        }
                    }));
            } else {
                dispatch(createRootDynamicAlgo(values
                    , (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            dispatch(logActivity({
                                "action": "create",
                                "moduleName": window.location.pathname,
                                "payload": res?.data
                            }));
                            close();
                            SuccessToast(res?.message);
                        } else {
                            ErrorToast(res?.message);
                            if (res?.data?.errors) {
                                res?.data?.errors?.forEach((error: any) => {
                                    const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                    setFieldError(fieldName, errorMessage);
                                });
                            }
                        }
                    }));
            }
        },
        validationSchema: validationSchema,
    });

    const { errors, values, setFieldValue, setFieldError, touched, handleSubmit, isSubmitting } = formik;
    return (
        <div>
            <BoxCard headerName={RootDynamicAlgoById?._id ? "Edit Dynamic Algorithm" : "Add Dynamic Algorithm"}
                rightComponent={<TranslationsManagement />}>
                <div className="grid grid-cols-1 gap-3">
                    <PrimaryTextInput
                        id="dynamic-algo-title"
                        label="Title"
                        placeholder="Title"
                        value={values.title?.en}
                        onChange={(e) => setFieldValue("title.en", e)}
                        errors={errors.title?.en}
                        touched={touched.title?.en}
                    />
                    {translationLang &&
                        <PrimaryTextInput
                            id="dynamic-algo-title"
                            placeholder={`Title (${translationLang})`}
                            label={`Title (${translationLang})`}
                            value={values.title?.[translationLang]}
                            onChange={(e) => setFieldValue("title." + translationLang, e)}
                        />
                    }
                    <SingleFileUpload
                        label="Icon"
                        initialFile={values.icon}
                        setFieldValue={setFieldValue}
                        field="icon"
                        acceptedFileTypes="image/*"
                        action={uploadDynamicAlgoImage}
                        errors={errors.icon}
                        touched={touched.icon}
                    />
                    <Checkbox
                        id="dynamic-algo-active"
                        title="Active"
                        checked={values.active}
                        onChange={(e) => setFieldValue("active", e)}
                    />
                </div>
            </BoxCard>
            <PrimaryBtn
                className="mt-5 mb-4 float-end"
                title="Submit"
                onClick={() => handleSubmit()}
                isLoading={isSubmitting}
            />
        </div>
    );
};
