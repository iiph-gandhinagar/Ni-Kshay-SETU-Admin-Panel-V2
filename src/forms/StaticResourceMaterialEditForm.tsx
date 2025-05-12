import { useFormik } from "formik";
import { masterEditFormProps } from "master-table";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import MultipleFileUpload from "../components/Inputs/MultipleFileUpload";
import { SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { logActivity } from "../store/actions/report.action";
import { createStaticResourceMaterial, updateStaticResourceMaterialById, uploadStaticResourceMaterialFile } from "../store/actions/static.action";
import { getUpdatedFields } from "../utils/functions";
import { typeOfMaterials } from "../utils/globle";
import { ErrorToast } from "../utils/toasts";

export const StaticResourceMaterialEditForm = ({ close }: masterEditFormProps) => {
    const dispatch = useDispatch();
    const { staticResourceMaterialById } = useSelector((state: IRootState) => state.static);
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const validationSchema = Yup.object().shape({
        title: Yup.object().shape({
            en: Yup.string().trim().required("Required"),
        }),
        typeOfMaterials: Yup.string().required("Required"),
        orderIndex: Yup.number().required("Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: staticResourceMaterialById?.title || { en: "" },
            material: staticResourceMaterialById?.material || [],
            typeOfMaterials: staticResourceMaterialById?.typeOfMaterials || "",
            orderIndex: staticResourceMaterialById?.orderIndex || 0,
            active: staticResourceMaterialById?.active || false,
        },
        onSubmit: (values, actions) => {
            if (staticResourceMaterialById?._id) {
                dispatch(
                    updateStaticResourceMaterialById(
                        staticResourceMaterialById?._id,
                        getUpdatedFields({
                            title: staticResourceMaterialById.title,
                            material: staticResourceMaterialById.material,
                            typeOfMaterials: staticResourceMaterialById.typeOfMaterials,
                            active: staticResourceMaterialById.active,
                            orderIndex: staticResourceMaterialById.orderIndex,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: staticResourceMaterialById,
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
                    createStaticResourceMaterial(
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
    const { errors, touched, values, setFieldValue, setFieldError, handleSubmit, isSubmitting } = formik;
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <BoxCard headerName="Edit Static Resource Material"
                rightComponent={<TranslationsManagement />}>
                <div className="grid grid-cols-1 gap-3 mb-3">
                    <PrimaryTextInput
                        id="title-en"
                        label="Title"
                        placeholder="Title"
                        value={values.title.en}
                        onChange={(e) => setFieldValue("title.en", e)}
                        errors={errors.title?.en}
                        touched={touched.title?.en}
                    />
                    {
                        translationLang !== undefined && (
                            <PrimaryTextInput
                                type="text"
                                id={"title" + translationLang}
                                label={"Title" + " " + "(" + translationLang + ")"}
                                placeholder={`Title In ${translationLang}`}
                                value={values?.title?.[translationLang]}
                                onChange={(e) => setFieldValue("title." + translationLang, e)}
                            />
                        )
                    }
                    <PrimaryTextInput
                        id="order-index"
                        placeholder="Order Index"
                        type="number"
                        label="Order Index"
                        value={values.orderIndex}
                        onChange={(e) => setFieldValue("orderIndex", parseInt(e))}
                        errors={errors.orderIndex}
                    />
                    <SelectInput
                        menuPosition="fixed"
                        menuPortalTarget={null}
                        label="Type of materials*"
                        id="Type-of-materials"
                        options={typeOfMaterials?.map((e) => ({
                            label: e?.label,
                            value: e?.value
                        }))}
                        onChange={(e) => {
                            setFieldValue("material", []);
                            setFieldValue("typeOfMaterials", e);
                        }}
                        value={values.typeOfMaterials}
                        errors={errors.typeOfMaterials as string}
                        touched={touched.typeOfMaterials as boolean}
                        placeholder={"Select Option"}
                    />{values?.typeOfMaterials !== "folder" && values?.typeOfMaterials !== "" &&
                        <MultipleFileUpload
                            acceptedFileTypes={
                                values.typeOfMaterials === "pdf_office_orders" ? ".pdf" :
                                    values.typeOfMaterials === "pdfs" ? ".pdf" :
                                        values.typeOfMaterials === "images" ? ".jpg, .jpeg, .png, .gif, .bmp, .tiff, .svg, .webp" :
                                            values.typeOfMaterials === "videos" ? ".mp4, .avi, .mov, .wmv, .flv, .mkv, .webm, .m4v" :
                                                values.typeOfMaterials === "document" ? ".doc,.docx,.pdf,.txt,.rtf,.odt,.csv" :
                                                    values.typeOfMaterials === "ppt" ? ".ppt,.pptx,.odp" :
                                                        ""
                            }
                            label="Materials"
                            field="material"
                            typeOfMaterial={values?.typeOfMaterials}
                            initialFiles={values.material}
                            action={uploadStaticResourceMaterialFile}
                            setFieldValue={setFieldValue}
                            errors={errors?.material}
                            touched={touched?.material}
                        />
                    }
                    <Checkbox
                        id="active"
                        label="Active"
                        checked={values.active}
                        onChange={(e) => setFieldValue("active", e)}
                    />
                </div>
            </BoxCard>
            <PrimaryBtn
                className="w-40 float-end"
                title="Submit"
                onClick={() => handleSubmit()}
                isLoading={isSubmitting}
            />
        </div>
    );
};
