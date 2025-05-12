import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import IconMinusCircle from "../components/Icon/IconMinusCircle";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { logActivity } from "../store/actions/report.action";
import { createStaticRelease, updateStaticReleaseById } from "../store/actions/static.action";
import { getUpdatedFields } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

interface FeatureItem {
    en: string;
    [key: string]: string;
}

interface BugFixItem {
    en: string;
    [key: string]: string;
}

interface FormValues {
    feature: FeatureItem[];
    bugFix: BugFixItem[];
    date: string;
    orderIndex: number;
    active: boolean;
}
const StaticReleaseEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { staticReleaseById } = useSelector((state: IRootState) => state.static);
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const itemSchema = Yup.object().shape({
        en: Yup.string().trim().required("Required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            feature: staticReleaseById?.feature || [],
            bugFix: staticReleaseById?.bugFix || [],
            date: staticReleaseById?.date ? moment(staticReleaseById?.date, "YYYY-MM-DD").format("YYYY-MM-DD") : "",
            orderIndex: staticReleaseById?.orderIndex || 1,
            active: staticReleaseById?.active || false,
        } as FormValues,
        validationSchema: Yup.object().shape({
            feature: Yup.array()
                .of(itemSchema)
                .test("required-if-empty", "Feature is required when bugFix is empty", function (value) {
                    const { bugFix } = this.parent;
                    return (bugFix?.length > 0 || (value && value.length > 0)) ? true : false;
                }),
            bugFix: Yup.array()
                .of(itemSchema)
                .test("required-if-empty", "Feature is required when bugFix is empty", function (value) {
                    const { feature } = this.parent;
                    return (feature?.length > 0 || (value && value.length > 0)) ? true : false;
                }),
            date: Yup.string().required("Date is required"),
            orderIndex: Yup.number()
                .required("Order index is required")
                .min(0, "Order index cannot be negative"),
        }),
        onSubmit: (values, actions) => {
            if (staticReleaseById?._id) {
                dispatch(
                    updateStaticReleaseById(staticReleaseById?._id, getUpdatedFields({
                        feature: staticReleaseById.feature as any,
                        bugFix: staticReleaseById.bugFix as any,
                        date: staticReleaseById.date,
                        active: staticReleaseById.active,
                        orderIndex: staticReleaseById.orderIndex,
                    }, values), (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            dispatch(logActivity({
                                action: "update",
                                moduleName: window.location.pathname,
                                payload: {
                                    old: staticReleaseById,
                                    new: res?.data,
                                },
                            }));
                            close();
                        } else {
                            ErrorToast(res?.message);
                        }
                    })
                );
            } else {
                dispatch(
                    createStaticRelease(values, (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            dispatch(logActivity({
                                action: "create",
                                moduleName: window.location.pathname,
                                payload: res?.data,
                            }));
                            close();
                        } else {
                            ErrorToast(res?.message);
                        }
                    })
                );
            }
        },
    });
    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;
    const isFeatureAdded = Array.isArray(values.feature) && values.feature.length > 0;
    const isBugFixAdded = Array.isArray(values.bugFix) && values.bugFix.length > 0;
    const isFeatureEmpty = values?.feature?.length === 0;
    const isBugFixEmpty = values?.bugFix?.length === 0;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <BoxCard headerName="Static Release"
                rightComponent={<TranslationsManagement />}>
                <div className="space-y-3 dark:text-white mt-4">
                    <Fragment>
                        <PrimaryTextInput
                            label="Date*"
                            id="date"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            value={values.date}
                            onChange={(e) => setFieldValue("date", e)}
                            errors={errors.date}
                            touched={touched.date}
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
                        {Array.isArray(values.feature) && values.feature?.map((featureItem: any, index: number) => {
                            const getErrorForField = (
                                errors: any,
                                index: number,
                                field: string,
                                nestedField: string | null = null
                            ) => {
                                if (Array.isArray(errors?.[field])) {
                                    const error = errors[field]?.[index];
                                    if (error && typeof error === "object" && !Array.isArray(error)) {
                                        if (nestedField && error[nestedField] !== undefined) {
                                            return error[nestedField];
                                        }
                                        return error[field];
                                    }
                                } else if (errors?.[field]) {
                                    return errors[field];
                                }
                                return undefined;
                            };
                            return (
                                <div key={index}
                                    className="flex items-start space-x-4">
                                    <PrimaryTextInput
                                        label={`Feature ${index + 1}*`}
                                        id={`feature[${index}].en`}
                                        placeholder={`Feature ${index + 1}`}
                                        iconRight={<IconMinusCircle />}
                                        rightIconClick={() => {
                                            const updatedFeatures = values.feature.filter((_, i) => i !== index);
                                            setFieldValue("feature", updatedFeatures);
                                        }}
                                        value={featureItem.en}
                                        onChange={(e) => setFieldValue(`feature[${index}].en`, e)}
                                        errors={getErrorForField(errors, 0, "feature", "en")}
                                        touched={touched?.feature && touched.feature[index]?.en}
                                    />
                                    {translationLang &&
                                        <PrimaryTextInput
                                            label={`Translation (${translationLang})`}
                                            id={`translation[${index}].en`}
                                            placeholder={`Translation (${translationLang})`}
                                            value={featureItem?.[translationLang]}
                                            onChange={(e) => setFieldValue(`feature[${index}].${translationLang}`, e)}
                                        />
                                    }
                                </div>
                            );
                        }
                        )}
                        {Array.isArray(values.bugFix) && values.bugFix?.map((bugFixItem: any, index: number) => {
                            const getErrorForField = (
                                errors: any,
                                index: number,
                                field: string,
                                nestedField: string | null = null
                            ) => {
                                if (Array.isArray(errors?.[field])) {
                                    const error = errors[field]?.[index];
                                    if (error && typeof error === "object" && !Array.isArray(error)) {
                                        if (nestedField && error[nestedField] !== undefined) {
                                            return error[nestedField];
                                        }
                                        return error[field];
                                    }
                                } else if (errors?.[field]) {
                                    return errors[field];
                                }
                                return undefined;
                            };
                            return (
                                <div key={index}
                                    className="flex items-center relative space-x-4">
                                    <PrimaryTextInput
                                        iconRight={<IconMinusCircle />}
                                        rightIconClick={() => {
                                            const updatedBugFixes = values.bugFix.filter((_, i) => i !== index);
                                            setFieldValue("bugFix", updatedBugFixes);
                                        }}
                                        label={`Bug Fix ${index + 1}*`}
                                        id={`bugFix[${index}].en`}
                                        placeholder={`Bug Fix ${index + 1}`}
                                        value={bugFixItem.en}
                                        onChange={(e) => setFieldValue(`bugFix[${index}].en`, e)}
                                        errors={getErrorForField(errors, 0, "bugFix", "en")}
                                        touched={touched.bugFix?.[index]?.en}
                                    />
                                    {translationLang &&
                                        <PrimaryTextInput
                                            label={`Translation (${translationLang})`}
                                            id={`translation[${index}].en`}
                                            placeholder={`Translation (${translationLang})`}
                                            value={bugFixItem?.[translationLang]}
                                            onChange={(e) => setFieldValue(`bugFix[${index}].${translationLang}`, e)}
                                        />
                                    }
                                </div>
                            );
                        })}
                    </Fragment>
                    <div className="flex space-x-4 mt-4">
                        {(isFeatureAdded || isBugFixEmpty) &&
                            <PrimaryBtn
                                title="Add Feature"
                                type="button"
                                className="px-4 py-2 text-white rounded-md"
                                onClick={() => {
                                    if (isFeatureAdded || isBugFixEmpty) {
                                        const obj: FeatureItem[] = [...values.feature];
                                        obj.push({ en: "" });
                                        setFieldValue("feature", obj);
                                    }
                                }}
                            />}
                        {(isBugFixAdded || isFeatureEmpty) &&
                            <PrimaryBtn
                                title="Add Bug"
                                type="button"
                                className="px-4 py-2 text-white rounded-md"
                                onClick={() => {
                                    if (isBugFixAdded || isFeatureEmpty) {
                                        const obj: BugFixItem[] = [...values.bugFix];
                                        obj.push({ en: "" });
                                        setFieldValue("bugFix", obj);
                                    }
                                }}
                            />
                        }
                    </div>
                </div>
            </BoxCard>

            <PrimaryBtn
                title={staticReleaseById?._id ? "Update" : "Save"}
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => {
                    if (isBugFixEmpty && isFeatureEmpty) {
                        ErrorToast("Please add at least one feature or bug.");
                    }
                    handleSubmit();
                }}
            />
        </div>
    );
};

export default StaticReleaseEditForm;
