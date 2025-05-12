import { useFormik } from "formik";
import { AlgorithmsFormProps } from "formTypes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import { EditorInput } from "../components/Inputs/EditorInput";
import { MultiSelectInput, SelectInput } from "../components/Inputs/SelectInput";
import SingleFileUpload from "../components/Inputs/SingleFileUpload";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { BoxCard } from "../components/Layouts/BoxCard";
import TranslationsManagement from "../components/Layouts/Translations";
import { IRootState } from "../store";
import { addNode, editNodeById, uploadAlgoIcon } from "../store/actions/patientManagement.action";
import { logActivity } from "../store/actions/report.action";
import { cleartAllCaderTypeList, getAllCaderTypeList } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields, handleAllSelection } from "../utils/functions";
import { ErrorToast, SuccessToast } from "../utils/toasts";
export const RootAlgorithmForm = ({ close, node }: { close: () => void, node?: any }) => {
    const { stateList, caderList, redirectNodes, cadreTypeList } = useSelector((state: IRootState) => state.master);
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const dispatch = useDispatch();
    const Params = useParams();
    const validationSchema = Yup.object().shape({
        nodeType: Yup.string().required("Required"),
        index: Yup.number().integer().min(0, "Index must be a non-negative integer").required("Required"),
        title: Yup.object().shape({
            en: Yup.string().required("Required"),
        }),
    });
    const formik = useFormik<AlgorithmsFormProps>({
        enableReinitialize: true,
        initialValues: {
            "nodeType": node?.nodeType || "" as string,
            "isExpandable": node?.isExpandable || false,
            "hasOptions": node?.hasOptions || false,
            "timeSpent": node?.timeSpent || "",
            "index": node?.index || 0,
            "isAllState": node?.isAllState || false,
            "isAllCadre": node?.isAllCadre || false,
            "stateIds": node?.isAllState ? stateList?.map((e) => e._id) : node?.stateIds || [],
            "cadreIds": node?.isAllCadre ? caderList?.map((e) => e._id) : node?.cadreIds || [],
            "title": node?.title || {
                en: ""
            },
            "description": node?.description || {},
            "parentId": null,
            "activated": node?.activated || false,
            "sendInitialNotification": node?.sendInitialNotification || false,
            "icon": node?.icon || "",
            "cadreType": node?.cadreType || []
        },
        onSubmit: (values, actions) => {
            if (values.isAllCadre) {
                values.cadreIds = [];
            }
            if (values.isAllState) {
                values.stateIds = [];
            }
            if (node?._id) {
                dispatch(editNodeById(Params?.slug,
                    node?._id,
                    getUpdatedFields({
                        "nodeType": node?.nodeType,
                        "isExpandable": node?.isExpandable,
                        "hasOptions": node?.hasOptions,
                        "timeSpent": node?.timeSpent,
                        "index": node?.index,
                        "isAllState": node?.isAllState,
                        "isAllCadre": node?.isAllCadre,
                        "stateIds": node?.stateIds,
                        "cadreIds": node?.cadreIds,
                        "title": node?.title,
                        "description": node?.description,
                        "header": node?.header,
                        "subHeader": node?.subHeader,
                        "activated": node?.activated,
                        "sendInitialNotification": node?.sendInitialNotification,
                        "cadreType": node?.cadreType
                    }, values)
                    , (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            dispatch(logActivity({
                                "action": "update",
                                "moduleName": window.location.pathname,
                                "payload": {
                                    old: node,
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
                dispatch(addNode(Params?.slug, getUpdatedFields({
                    "nodeType": node?.nodeType,
                    "isExpandable": node?.isExpandable,
                    "hasOptions": node?.hasOptions,
                    "timeSpent": node?.timeSpent,
                    "index": node?.index,
                    "isAllState": node?.isAllState,
                    "isAllCadre": node?.isAllCadre,
                    "stateIds": node?.stateIds,
                    "cadreIds": node?.cadreIds,
                    "title": node?.title,
                    "description": node?.description,
                    "header": node?.header,
                    "subHeader": node?.subHeader,
                    "activated": node?.activated,
                    "sendInitialNotification": node?.sendInitialNotification,
                    "cadreType": node?.cadreType
                }, values)
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
    useEffect(() => {
        dispatch(getAllCaderTypeList());
        return () => {
            dispatch(cleartAllCaderTypeList());
        };
    }, []);
    const getMediaFlag = (param: string) => {
        switch (param) {
            case "diagnosis":
                return "isDiagnosis";
            case "treatment":
                return "isTreatment";
            case "adr":
                return "isGuidanceOnADR";
            case "differential":
                return "isDifferentialCare";
            default:
                return "";
        }
    };
    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting, setFieldError } = formik;
    return (
        <div>
            <BoxCard headerName="Algorithm"
                className=""
                rightComponent={<TranslationsManagement />}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="col-span-1 md:col-span-3 gap-3 ">
                        <PrimaryTextInput
                            id="algorithm-title"
                            label="Title"
                            placeholder="Title"
                            value={values?.title?.en}
                            onChange={(e) => {
                                setFieldValue("title.en", e);
                            }}
                            errors={errors?.title?.en}
                            touched={touched?.title?.en}
                        />
                        {translationLang &&
                            <PrimaryTextInput
                                containerClassName="mt-3"
                                id="algorithm-title"
                                label={"Title (" + translationLang + ")"}
                                placeholder={"Title (" + translationLang + ")"}
                                value={values?.title?.[translationLang]}
                                onChange={(e) => {
                                    setFieldValue(`title[${translationLang}]`, e);
                                }}
                            />
                        }
                    </div>
                    <div className="col-span-1 md:col-span-3 gap-3 ">
                        <EditorInput
                            isVideo={true}
                            mediaFlag={getMediaFlag(Params?.slug as string)}
                            id="algorithm-Description"
                            label="Description"
                            value={values?.description?.en}
                            onChange={(e) => {
                                setFieldValue("description.en", e);
                            }}
                            errors={errors?.description?.en}
                            touched={touched?.description?.en}
                        />
                        {translationLang &&
                            <EditorInput
                                mediaFlag={getMediaFlag(Params?.slug as string)}
                                isVideo={true}
                                id="algorithm-Description"
                                label={"Description (" + translationLang + ")"}
                                value={values?.description?.[translationLang]}
                                onChange={(e) => {
                                    setFieldValue(`description[${translationLang}]`, e);
                                }}
                            />

                        }
                    </div>
                    <SelectInput
                        menuPortalTarget={null}
                        id="algorithm-node-type"
                        label="Select Node"
                        placeholder={"Select Node type"}
                        options={[{ label: "Linking Node", value: "Linking Node" },
                        { label: "CMS Node", value: "CMS Node" },
                        { label: "CMS Node(New Page)", value: "CMS Node(New Page)" },
                        { label: "App Screen Node", value: "App Screen Node" },
                        { label: "Linking Node Without Options", value: "Linking Node Without Options" }]}
                        value={values?.nodeType}
                        onChange={(e) => {
                            setFieldValue("nodeType", e);
                        }}
                        errors={errors?.nodeType}
                        touched={touched?.nodeType}
                    />
                    <MultiSelectInput
                        isSelectAll
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
                        value={values?.stateIds}
                        onChange={(e) => handleAllSelection(e, setFieldValue, stateList || [], "isAllState", "stateIds")}
                        errors={errors?.stateIds}
                        touched={touched?.stateIds}
                    />
                    <MultiSelectInput
                        isSelectAll
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
                        value={values?.cadreIds}
                        onChange={(e) => handleAllSelection(e, setFieldValue, caderList || [], "isAllCadre", "cadreIds")}
                        errors={errors?.cadreIds}
                        touched={touched?.cadreIds}
                    />
                    <PrimaryTextInput
                        id="algorithm-index"
                        type="number"
                        label="Index"
                        placeholder="Index"
                        value={values?.index}
                        onChange={(e) => {
                            setFieldValue("index", parseInt(e) || 0);
                        }}
                        errors={errors?.index}
                        touched={touched?.index}
                    />
                    <PrimaryTextInput
                        id="algorithm-time-spent"
                        label="Time Spent"
                        placeholder="Time Spent"
                        value={values?.timeSpent}
                        onChange={(e) => {
                            setFieldValue("timeSpent", e);
                        }}
                        errors={errors?.timeSpent}
                        touched={touched?.timeSpent}
                    />
                    <MultiSelectInput
                        label="Cadre Type*"
                        id="cadreType"
                        menuPortalTarget={null}
                        options={
                            [...(Array.isArray(cadreTypeList) ? cadreTypeList.map((e: any) => ({
                                label: e?.replace("_", " "),
                                value: e
                            })) : [])]}
                        onChange={(e) => {
                            setFieldValue("cadreType", e);
                        }}
                        value={values.cadreType}
                        errors={errors.cadreType as string}
                        touched={touched.cadreType as boolean}
                        placeholder={"Select Option"}
                    />
                    <div className="col-span-1 md:col-span-3 mt-3">
                        <Checkbox
                            id="Is expandable"
                            title="Is expandable"
                            checked={values?.isExpandable}
                            onChange={(e) => {
                                setFieldValue("isExpandable", e);
                            }}
                        />
                        <Checkbox
                            id="Has Options"
                            title="Has Options"
                            checked={values?.hasOptions}
                            onChange={(e) => {
                                setFieldValue("hasOptions", e);
                            }}
                        />
                        <Checkbox
                            id="Activated"
                            title="Activated"
                            checked={values?.activated}
                            onChange={(e) => {
                                setFieldValue("activated", e);
                            }}
                        />
                    </div>
                </div>
                <SingleFileUpload
                    label="Icon*"
                    acceptedFileTypes="image/*"
                    field={"icon"}
                    action={uploadAlgoIcon}
                    slug={Params?.slug}
                    setFieldValue={setFieldValue}
                    initialFile={values?.icon}
                    errors={errors?.icon}
                    touched={errors?.icon}
                />
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
