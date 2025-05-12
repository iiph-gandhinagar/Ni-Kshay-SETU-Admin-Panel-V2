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
import { cleartAllCaderTypeList, getAllCaderTypeList, getRedirectNode } from "../store/reducer/masterTable.reducer";
import { getUpdatedFields, handleAllSelection } from "../utils/functions";
import { ErrorToast, SuccessToast } from "../utils/toasts";
export const AlgorithmForm = ({ close, id }: { close: () => void, id: string }) => {
    const { NodeById } = useSelector((state: IRootState) => state.patient);
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
            "nodeType": NodeById?.nodeType || "" as string,
            "isExpandable": NodeById?.isExpandable || false,
            "hasOptions": NodeById?.hasOptions || false,
            "masterNodeId": NodeById?.masterNodeId || Params?.id as string,
            "timeSpent": NodeById?.timeSpent || "",
            "index": NodeById?.index || 0,
            "isAllState": NodeById?.isAllState || false,
            "isAllCadre": NodeById?.isAllCadre || false,
            "stateIds": NodeById?.isAllState ? stateList?.map((e) => e._id) : NodeById?.stateIds || [],
            "cadreIds": NodeById?.isAllCadre ? caderList?.map((e) => e._id) : NodeById?.cadreIds || [],
            "title": NodeById?.title || {
                en: ""
            },
            "cadreType": NodeById?.cadreType || [],
            "description": NodeById?.description || {},
            "parentId": NodeById?.parentId || id,
            "redirectAlgoType": NodeById?.redirectAlgoType || "",
            "redirectNodeId": NodeById?.redirectNodeId,
            "activated": NodeById?.activated || false,
            "sendInitialNotification": NodeById?.sendInitialNotification || false,
            "icon": NodeById?.icon || "",
        },
        onSubmit: (values, actions) => {
            if (values.isAllCadre) {
                values.cadreIds = [];
            }
            if (values.isAllState) {
                values.stateIds = [];
            }
            if (NodeById?._id) {
                dispatch(editNodeById(Params?.slug,
                    NodeById?._id,
                    getUpdatedFields({
                        "nodeType": NodeById?.nodeType,
                        "isExpandable": NodeById?.isExpandable,
                        "hasOptions": NodeById?.hasOptions,
                        "masterNodeId": NodeById?.masterNodeId || "",
                        "timeSpent": NodeById?.timeSpent,
                        "index": NodeById?.index,
                        "isAllState": NodeById?.isAllState,
                        "isAllCadre": NodeById?.isAllCadre,
                        "stateIds": NodeById?.stateIds,
                        "cadreIds": NodeById?.cadreIds,
                        "title": NodeById?.title,
                        "description": NodeById?.description,
                        "header": NodeById?.header,
                        "subHeader": NodeById?.subHeader,
                        "parentId": NodeById?.parentId || "",
                        "redirectAlgoType": NodeById?.redirectAlgoType || "",
                        "redirectNodeId": NodeById?.redirectNodeId,
                        "activated": NodeById?.activated,
                        "sendInitialNotification": NodeById?.sendInitialNotification,
                        "cadreType": NodeById?.cadreType
                    }, values)
                    , (res) => {
                        actions.setSubmitting(false);
                        if (res.status) {
                            dispatch(logActivity({
                                "action": "update",
                                "moduleName": window.location.pathname,
                                "payload": {
                                    old: NodeById,
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
                    "nodeType": NodeById?.nodeType,
                    "isExpandable": NodeById?.isExpandable,
                    "hasOptions": NodeById?.hasOptions,
                    "masterNodeId": NodeById?.masterNodeId || "",
                    "timeSpent": NodeById?.timeSpent,
                    "index": NodeById?.index,
                    "isAllState": NodeById?.isAllState,
                    "isAllCadre": NodeById?.isAllCadre,
                    "stateIds": NodeById?.stateIds,
                    "cadreIds": NodeById?.cadreIds,
                    "title": NodeById?.title,
                    "description": NodeById?.description,
                    "header": NodeById?.header,
                    "subHeader": NodeById?.subHeader,
                    "parentId": NodeById?.parentId || "",
                    "redirectAlgoType": NodeById?.redirectAlgoType || "",
                    "redirectNodeId": NodeById?.redirectNodeId,
                    "activated": NodeById?.activated,
                    "sendInitialNotification": NodeById?.sendInitialNotification,
                    "cadreType": NodeById?.cadreType
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
                            placeholder="Title"
                            label="Title"
                            value={values?.title?.en}
                            onChange={(e) => {
                                setFieldValue("title.en", e);
                            }}
                            errors={errors?.title?.en}
                            touched={touched?.title?.en}
                        />
                        {translationLang &&
                            <PrimaryTextInput
                                placeholder={"Title (" + translationLang + ")"}
                                containerClassName="mt-3"
                                id="algorithm-title"
                                label={"Title (" + translationLang + ")"}
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
                                isVideo={true}
                                mediaFlag={getMediaFlag(Params?.slug as string)}
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
                    <SelectInput
                        menuPortalTarget={null}
                        id="algorithm-Redirect-type"
                        label="Redirect Algorithm Type"
                        placeholder={"Select Algorithm"}
                        options={[
                            { label: "Differential Care Algorithm", value: "Differential Care Algorithm" },
                            { label: "Diagnosis Algorithm", value: "Diagnosis Algorithm" },
                            { label: "Guidance on ADR", value: "Guidance on ADR" },
                            { label: "Latent TB Infection", value: "Latent TB Infection" },
                            { label: "Treatment Module", value: "Treatment Algorithm" },
                            { label: "CGC Algorithm", value: "CGC Algorithm" }]}
                        value={values?.redirectAlgoType}
                        onChange={(e) => {
                            setFieldValue("redirectAlgoType", e);
                            setFieldValue("redirectNodeId", "");
                            dispatch(getRedirectNode(e));
                        }}
                        errors={errors?.redirectAlgoType}
                        touched={touched?.redirectAlgoType}
                    />
                    <SelectInput
                        disabled={!values?.redirectAlgoType}
                        menuPortalTarget={null}
                        id="algorithm-Redirect-Node"
                        label="Redirect Node"
                        placeholder={"Select Node"}
                        options={redirectNodes?.map((e) => {
                            return { label: e?.title?.en as string, value: e._id };
                        })}
                        value={values?.redirectNodeId}
                        onChange={(e) => {
                            setFieldValue("redirectNodeId", e);
                        }}
                        errors={errors?.redirectNodeId}
                        touched={touched?.redirectNodeId}
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
                    <div className="col-span-1 md:col-span-3 gap-3 flex">
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
