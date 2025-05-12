import { useFormik } from "formik";
import { AlgorithmsFormProps } from "formTypes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import { Checkbox } from "../../components/CheckBox/checkbox";
import { EditorInput } from "../../components/Inputs/EditorInput";
import { MultiSelectInput, SelectInput } from "../../components/Inputs/SelectInput";
import SingleFileUpload from "../../components/Inputs/SingleFileUpload";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import { BoxCard } from "../../components/Layouts/BoxCard";
import TranslationsManagement from "../../components/Layouts/Translations";
import { IRootState } from "../../store";
import { createDynamicAlgo, editDynamicAlgoByID, uploadDynamicAlgoImage } from "../../store/actions/dynamicAlgo.action";
import { logActivity } from "../../store/actions/report.action";
import { cleartAllCaderTypeList, getAllCaderTypeList, getRedirectNode } from "../../store/reducer/masterTable.reducer";
import { getUpdatedFields, handleAllSelection } from "../../utils/functions";
import { ErrorToast, SuccessToast } from "../../utils/toasts";
export const DecendentEditForm = ({ close, id }: { close: () => void, id: string }) => {
    const { dynamicAlgoByID } = useSelector((state: IRootState) => state.dynamicAlgo);
    const { stateList, caderList, redirectNodes, cadreTypeList } = useSelector((state: IRootState) => state.master);
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const dispatch = useDispatch();
    const location = useLocation();
    const algoId = location?.state;
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
            nodeType: dynamicAlgoByID?.nodeType || "" as string,
            isExpandable: dynamicAlgoByID?.isExpandable || false,
            hasOptions: dynamicAlgoByID?.hasOptions || false,
            masterNodeId: dynamicAlgoByID?.masterNodeId || Params?.id as string,
            timeSpent: dynamicAlgoByID?.timeSpent || "",
            index: dynamicAlgoByID?.index || 0,
            isAllState: dynamicAlgoByID?.isAllState || false,
            isAllCadre: dynamicAlgoByID?.isAllCadre || false,
            stateIds: dynamicAlgoByID?.isAllState ? stateList?.map((e) => e._id) : dynamicAlgoByID?.stateIds || [],
            cadreIds: dynamicAlgoByID?.isAllCadre ? caderList?.map((e) => e._id) : dynamicAlgoByID?.cadreIds || [],
            title: dynamicAlgoByID?.title || { en: "" },
            cadreType: dynamicAlgoByID?.cadreType || [],
            description: dynamicAlgoByID?.description || {},
            parentId: dynamicAlgoByID?.parentId || id,
            redirectAlgoType: dynamicAlgoByID?.redirectAlgoType || "",
            redirectNodeId: dynamicAlgoByID?.redirectNodeId,
            activated: dynamicAlgoByID?.activated || false,
            sendInitialNotification: dynamicAlgoByID?.sendInitialNotification || false,
            icon: dynamicAlgoByID?.icon || "",
        },
        onSubmit: (values, actions) => {
            if (values.isAllCadre) {
                values.cadreIds = [];
            }
            if (values.isAllState) {
                values.stateIds = [];
            }
            const payload = getUpdatedFields({
                nodeType: dynamicAlgoByID?.nodeType,
                isExpandable: dynamicAlgoByID?.isExpandable,
                hasOptions: dynamicAlgoByID?.hasOptions,
                masterNodeId: dynamicAlgoByID?.masterNodeId || "",
                timeSpent: dynamicAlgoByID?.timeSpent,
                index: dynamicAlgoByID?.index,
                isAllState: dynamicAlgoByID?.isAllState,
                isAllCadre: dynamicAlgoByID?.isAllCadre,
                stateIds: dynamicAlgoByID?.stateIds,
                cadreIds: dynamicAlgoByID?.cadreIds,
                title: dynamicAlgoByID?.title,
                description: dynamicAlgoByID?.description,
                header: dynamicAlgoByID?.header,
                subHeader: dynamicAlgoByID?.subHeader,
                parentId: dynamicAlgoByID?.parentId || "",
                redirectAlgoType: dynamicAlgoByID?.redirectAlgoType || "",
                redirectNodeId: dynamicAlgoByID?.redirectNodeId,
                activated: dynamicAlgoByID?.activated,
                sendInitialNotification: dynamicAlgoByID?.sendInitialNotification,
                cadreType: dynamicAlgoByID?.cadreType
            }, values);
            if (!dynamicAlgoByID?._id) {
                payload.algoId = algoId;
            }
            if (dynamicAlgoByID?._id) {
                dispatch(editDynamicAlgoByID(dynamicAlgoByID?._id, payload, (res) => {
                    actions.setSubmitting(false);
                    if (res.status) {
                        dispatch(logActivity({
                            action: "update",
                            moduleName: window.location.pathname,
                            payload: {
                                old: dynamicAlgoByID,
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
                dispatch(createDynamicAlgo(payload, (res) => {
                    actions.setSubmitting(false);
                    if (res.status) {
                        dispatch(logActivity({
                            action: "create",
                            moduleName: window.location.pathname,
                            payload: res?.data
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
                            mediaFlag="isDynamicAlgo"
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
                                mediaFlag="isDynamicAlgo"
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
                    action={uploadDynamicAlgoImage}
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
