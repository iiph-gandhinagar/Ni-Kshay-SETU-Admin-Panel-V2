import { useFormik } from "formik";
import { materialByid } from "materials-Props";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import MultipleFileUpload from "../components/Inputs/MultipleFileUpload";
import { MultiSelectInput, SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { createMaterial, editMaterialByID, uploadResourceFile } from "../store/actions/materials.action";
import { logActivity } from "../store/actions/report.action";
import { getUpdatedFields, handleAllSelection } from "../utils/functions";
import { typeOfMaterials } from "../utils/globle";
import { ErrorToast, SuccessToast } from "../utils/toasts";
export const MaterialForm = ({ close, id, isRoot, rootMaterial }: { close: () => void, id?: string, isRoot?: boolean, rootMaterial?: any }) => {
    const {
        master: { stateList, caderList, countryList },
        auth: { authUser },
        materials: { materialByID },
        app: { translationLang }
    } = useSelector((state: IRootState) => state);
    const material = isRoot ? rootMaterial : materialByID;
    const dispatch = useDispatch();
    const getValidationSchema = (isRoot: boolean | undefined) => {
        return Yup.object().shape({
            title: Yup.object().shape({
                en: Yup.string().trim().required("Required"),
            }),
            typeOfMaterials: Yup.string().required("Required"),
            countryId: Yup.string().when([], {
                is: () => !isRoot,
                then: Yup.string().when("isAllCountry", {
                    is: false,
                    then: Yup.string().required("Required"),
                    otherwise: Yup.string(),
                }),
                otherwise: Yup.string(),
            }),
            stateId: Yup.array().when([], {
                is: () => !isRoot,
                then: Yup.array().when("isAllState", {
                    is: false,
                    then: Yup.array().of(Yup.string()).min(1, "Required"),
                    otherwise: Yup.array(),
                }),
                otherwise: Yup.array(),
            }),
            cadreId: Yup.array().when([], {
                is: () => !isRoot,
                then: Yup.array().when("isAllCadre", {
                    is: false,
                    then: Yup.array().of(Yup.string()).min(1, "Required"),
                    otherwise: Yup.array(),
                }),
                otherwise: Yup.array(),
            }),
            index: Yup.number().required("Index is required").min(0, "Index must be a non-negative number"),
            relatedMaterials: Yup.array().when("typeOfMaterials", {
                is: (type: any) => type !== "folder" && type !== "",
                then: Yup.array().min(1, "Required"),
                otherwise: Yup.array(),
            }),
        });
    };

    const formik = useFormik<materialByid>({
        enableReinitialize: true,
        initialValues: {
            "countryId": material?.countryId || "",
            "isAllCadre": material?.isAllCadre || false,
            "isAllState": material?.isAllState || false,
            "stateId": material?.isAllState ? stateList?.map((e) => e._id) : material?.stateId || [],
            "cadreId": material?.isAllCadre ? caderList?.map((e) => e._id) : material?.cadreId || [],
            "title": material?.title || {
                en: "",
            },
            "typeOfMaterials": material?.typeOfMaterials || "",
            "parentId": isRoot ? null : material?.parentId || id,
            "iconType": material?.iconType || "",
            "relatedMaterials": material?.relatedMaterials || [],
            "createdBy": authUser?._id || "",
            "index": material?.index || 0,
        },
        onSubmit: (values, actions) => {
            if (values.isAllCadre) {
                values.cadreId = [];
            }
            if (values.isAllState) {
                values.stateId = [];
            }
            if (material?._id) {
                dispatch(editMaterialByID(material?._id,
                    getUpdatedFields({
                        "countryId": material?.countryId,
                        "stateId": material?.stateId,
                        "isAllState": material?.isAllState,
                        "cadreId": material?.cadreId,
                        "isAllCadre": material?.isAllCadre,
                        "title": material?.title,
                        "typeOfMaterials": material?.typeOfMaterials,
                        "iconType": material?.iconType,
                        "relatedMaterials": material?.relatedMaterials,
                        "createdBy": authUser?._id || "",
                        "index": material?.index,
                        "parentId": material?.parentId,
                    }, values)
                    , (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            dispatch(logActivity({
                                "action": "update",
                                "moduleName": window.location.pathname,
                                "payload": {
                                    old: material,
                                    new: res?.data
                                }
                            }));
                            close();
                            SuccessToast(res.message);
                        } else {
                            ErrorToast(res.message);
                        }
                    }));
            } else {
                dispatch(createMaterial(values, (res) => {
                    actions.setSubmitting(false);
                    if (res.status) {
                        dispatch(logActivity({
                            "action": "create",
                            "moduleName": window.location.pathname,
                            "payload": res?.data
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
            }
        },
        validationSchema: getValidationSchema(isRoot),
    });
    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting, setFieldError } = formik;
    return (
        <BoxCard headerName="Algorithm"
            className=" overflow-x-auto"
            rightComponent={<TranslationsManagement />}>
            <div className=" grid-cols-1 md:grid-cols-1 gap-3 mb-3">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mb-3">
                    <PrimaryTextInput
                        id="algorithm-title"
                        label="Title*"
                        placeholder="Title"
                        value={values?.title?.en}
                        onChange={(e) => {
                            setFieldValue("title.en", e);
                        }}
                        errors={errors?.title?.en || ""}
                        touched={touched?.title?.en as boolean}
                    />
                    {translationLang &&
                        <PrimaryTextInput
                            containerClassName="mt-3"
                            id="algorithm-title"
                            label={"Title (" + translationLang + ")"}
                            value={values?.title?.[translationLang]}
                            onChange={(e) => {
                                setFieldValue(`title[${translationLang}]`, e);
                            }}
                        />
                    }
                    <PrimaryTextInput
                        id="index"
                        type="number"
                        label="Index"
                        placeholder="Index"
                        value={values?.index}
                        onChange={(e) => {
                            setFieldValue("index", parseInt(e));
                        }}
                        errors={errors.index as string}
                        touched={touched.index as boolean}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 mb-3">
                    <SelectInput
                        menuPosition="fixed"
                        menuPortalTarget={null}
                        label="Country*"
                        id="country"
                        options={countryList?.map((e: any) => ({
                            label: e?.title,
                            value: e?._id
                        }))}
                        onChange={(e) => setFieldValue("countryId", e)}
                        value={values.countryId}
                        errors={errors.countryId as string}
                        touched={touched.countryId as boolean}
                        placeholder={"Select Option"}
                    />
                    <MultiSelectInput
                        isSelectAll
                        menuPosition="fixed"
                        menuPortalTarget={null}
                        id="algorithm-State"
                        label="State"
                        placeholder={"Select State"}
                        options={stateList?.map((e) => {
                            return {
                                label: e.title,
                                value: e._id
                            };
                        })}
                        value={values?.stateId}
                        showSelectedCount
                        onChange={(e) => handleAllSelection(e, setFieldValue, stateList || [], "isAllState", "stateId")}
                        errors={errors.stateId as string}
                        touched={touched.stateId as boolean}
                    />
                    <MultiSelectInput
                        isSelectAll
                        showSelectedCount
                        menuPosition="fixed"
                        menuPortalTarget={null}
                        id="algorithm-Cader"
                        label="Cader"
                        placeholder={"Select Cader"}
                        options={caderList?.map((e) => {
                            return {
                                label: e.title,
                                value: e._id
                            };
                        })}
                        value={values?.cadreId}
                        onChange={(e) => handleAllSelection(e, setFieldValue, caderList || [], "isAllCadre", "cadreId")}
                        errors={errors.cadreId as string}
                        touched={touched.cadreId as boolean}
                    />
                </div>
                <div className="col-span-1 md:col-span-3 gap-3 ">
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
                            setFieldValue("relatedMaterials", []);
                            setFieldValue("typeOfMaterials", e);
                        }}
                        value={values.typeOfMaterials}
                        errors={errors.typeOfMaterials as string}
                        touched={touched.typeOfMaterials as boolean}
                        placeholder={"Select Option"}
                    />
                    {values.typeOfMaterials !== "folder" && values.typeOfMaterials !== "" &&
                        <MultipleFileUpload acceptedFileTypes={
                            values.typeOfMaterials === "pdf_office_orders" ? ".pdf" :
                                values.typeOfMaterials === "pdfs" ? ".pdf" :
                                    values.typeOfMaterials === "images" ? ".jpg, .jpeg, .png, .gif, .bmp, .tiff, .svg, .webp" :
                                        values.typeOfMaterials === "videos" ? ".mp4, .avi, .mov, .wmv, .mkv, .webm," :
                                            values.typeOfMaterials === "document" ? ".doc,.docx,.pdf,.txt,.rtf,.odt,.csv" :
                                                values.typeOfMaterials === "ppt" ? ".ppt,.pptx,.odp" :
                                                    ""
                        }
                            label="Related Materials*"
                            field="relatedMaterials"
                            initialFiles={values?.relatedMaterials}
                            typeOfMaterial={values?.typeOfMaterials}
                            action={uploadResourceFile}
                            setFieldValue={setFieldValue}
                            errors={errors.relatedMaterials as string}
                            touched={touched.relatedMaterials as boolean}
                        />}
                </div>
            </div>
            <PrimaryBtn
                className="w-40 float-end"
                title={materialByID?._id ? "Update" : "Submit"}
                onClick={() => handleSubmit()}
                isLoading={isSubmitting}
            />
        </BoxCard>
    );
};
