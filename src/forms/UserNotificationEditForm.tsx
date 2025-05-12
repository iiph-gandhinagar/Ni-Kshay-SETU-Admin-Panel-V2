import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import { MultiSelectInput, SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import { IRootState } from "../store";
import { createUserNotification } from "../store/actions/config.action";
import { logActivity } from "../store/actions/report.action";
import { getMasterDropdown } from "../store/reducer/config.reducer";
import { clearCaderBytypesList, cleartAllCountryList, cleartAllDistrictList, cleartAllStateList, getAllCaderTypeList, getAllCountryList, getAllDistrictList, getAllStateList, getCaderBytypesList } from "../store/reducer/masterTable.reducer";
import { getAllSubscribersSearch } from "../store/reducer/plugin.reducer";
import { handleAllSelection } from "../utils/functions";
import { ErrorToast } from "../utils/toasts";

export const UserNotificationEditForm = ({ close }: { close: () => void }) => {
    const dispatch = useDispatch();
    const { caderList, stateList, cadreTypeList, countryList, districtList, loader } = useSelector((status: IRootState) => status.master);
    const { membersList } = useSelector((status: IRootState) => status.plugin);
    const { masterDropdown } = useSelector((status: IRootState) => status.config);
    const [subType, setSubType] = useState("");

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        type: Yup.string().required("Type is required"),
        userId: Yup.array().when("type", {
            is: "user-specific",
            then: Yup.array().min(1, "At least one user must be selected").required("User selection is required"),
            otherwise: Yup.array().notRequired(),
        }),
        stateId: Yup.array().when("type", {
            is: "multiple-filters",
            then: Yup.array().of(Yup.string()).min(1, "At least one state must be selected").required("State selection is required"),
            otherwise: Yup.array().notRequired(),
        }),
        districtId: Yup.array().when("type", {
            is: "multiple-filters",
            then: Yup.array().of(Yup.string()).min(1, "At least one district must be selected").required("District selection is required"),
            otherwise: Yup.array().notRequired(),
        }),
        cadreId: Yup.array().when("type", {
            is: "multiple-filters",
            then: Yup.array().of(Yup.string()).min(1, "At least one cadre must be selected").required("Cadre selection is required"),
            otherwise: Yup.array().notRequired(),
        }),
        isAllState: Yup.boolean().notRequired(),
        isAllDistrict: Yup.boolean().notRequired(),
        isAllCadre: Yup.boolean().notRequired(),
        isDeepLink: Yup.boolean().required("Deep Link selection is required"),
        automaticNotificationType: Yup.string().when("isDeepLink", {
            is: true,
            then: Yup.string().required("Automatic Notification Type is required"),
            otherwise: Yup.string().notRequired(),
        }),
    });
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            type: "",
            userId: [],
            stateId: [],
            isAllState: false,
            districtId: [],
            isAllDistrict: false,
            cadreType: "",
            cadreId: [],
            isAllCadre: false,
            isDeepLink: false,
            automaticNotificationType: "",
            typeTitle: {
                title: "",
                _id: ""
            },
        } as {
            title: string;
            description: string;
            type: string;
            userId: string[];
            stateId: string[];
            isAllState: boolean;
            districtId: string[];
            isAllDistrict: boolean;
            cadreType: string;
            cadreId: string[];
            isAllCadre: boolean;
            isDeepLink: boolean;
            automaticNotificationType: string | null;
            typeTitle?: {
                title?: string;
                _id?: string;
            } | null;
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            if (!values?.isDeepLink) {
                values.automaticNotificationType = null;
                values.typeTitle = null;
            }
            if (districtList?.length == values?.districtId?.length) {
                values.isAllDistrict = true;
            }
            if (stateList?.length == values?.stateId?.length) {
                values.isAllState = true;
            }
            if (caderList?.length == values?.cadreId?.length) {
                values.isAllCadre = true;
            }
            if (values.isAllCadre) {
                values.cadreId = [];
            }
            if (values.isAllDistrict) {
                values.districtId = [];
            }
            if (values.isAllState) {
                values.stateId = [];
            }
            dispatch(
                createUserNotification(values, (res) => {
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
                                const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                formik.setFieldError(fieldName, errorMessage);
                            });
                        }
                    }
                })
            );
        },
    });

    const { errors, values, setFieldValue, touched, handleSubmit, dirty, isSubmitting } = formik;
    const [inputValue, setInput] = useState("");
    const [localMembersList, setLocalMembersList] = useState<any[]>([]);

    useEffect(() => {
        setLocalMembersList((prevState) => {
            const newMembers = membersList?.filter(member =>
                !prevState.some(existingMember => existingMember._id === member._id)
            );
            return [...prevState, ...newMembers || []];
        });
    }, [membersList]);
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    useEffect(() => {
        if (debouncedValue.length > 2) {
            dispatch(getAllSubscribersSearch(`?search=${debouncedValue}`));
        }
    }, [debouncedValue, dispatch]);
    useEffect(() => {
        dispatch(getAllCaderTypeList());
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        dispatch(getMasterDropdown());
        return () => {
            dispatch(clearCaderBytypesList());
            dispatch(cleartAllDistrictList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
        };
    }, []);
    useEffect(() => {
        if (formik?.values?.stateId?.length > 0 && !formik?.values?.isAllState) {
            const selectedStates = formik.values?.stateId.join("&stateId=");
            dispatch(getAllDistrictList(`?stateId=${selectedStates}`));
        } else if (formik?.values?.stateId?.length < 1) {
            dispatch(cleartAllDistrictList());
        }
        else {
            dispatch(getAllDistrictList(""));
        }
    }, [JSON.stringify(formik?.values?.stateId)]);
    useEffect(() => {
        if (formik?.values?.isAllState) {
            setFieldValue("stateId", stateList?.map((e: any) => e._id));
        }
    }, [stateList]);
    useEffect(() => {
        if (formik?.values?.isAllDistrict) {
            setFieldValue("districtId", districtList?.map((e: any) => e._id));
        }
    }, [districtList]);
    useEffect(() => {
        if (formik?.values?.isAllCadre) {
            setFieldValue("cadreId", caderList?.map((e: any) => e._id));
        }
    }, [caderList]);

    useEffect(() => {
        if (formik.values?.cadreType !== "") {
            dispatch(getCaderBytypesList(`?cadreTypes=${values?.cadreType}`));
        }
    }, [formik.values?.cadreType]);

    useEffect(() => {
        setFieldValue("stateId", []);
        setFieldValue("districtId", []);
        setFieldValue("cadreId", []);
        setFieldValue("isAllState", false);
        setFieldValue("isAllDistrict", false);
        setFieldValue("isAllCadre", false);
    }, [values.type]);
    return (
        <div className="space-y-3"
            style={{ minHeight: "80vh" }}>
            <div className="panel">
                <div className="flex justify-between">
                    <span className="text-xl font-bold mb-4">Add User Notification</span>
                </div>
                <div className="space-y-3 dark:text-white mt-4">
                    <PrimaryTextInput
                        label="Title*"
                        placeholder="Title"
                        id="title"
                        type="text"
                        onChange={(e) => setFieldValue("title", e)}
                        value={values.title}
                        errors={errors.title as string}
                        touched={touched.title as boolean}
                    />
                    <PrimaryTextInput
                        label="Description*"
                        placeholder="Description"
                        id="description"
                        type="text-area"
                        onChange={(e) => setFieldValue("description", e)}
                        value={values.description}
                        errors={errors.description as string}
                        touched={touched.description as boolean}
                    />
                    <SelectInput
                        label="Type*"
                        menuPortalTarget={null}
                        id="type"
                        placeholder="Type"
                        errors={errors.type as string}
                        touched={touched.type as boolean}
                        value={values.type}
                        options={[
                            { label: "Plublic", value: "public" },
                            { label: "Multiple Filters", value: "multiple-filters" },
                            { label: "User Specific", value: "user-specific" },
                        ]}
                        onChange={(e) => setFieldValue("type", e)}
                    />
                    {values?.type == "user-specific" &&
                        <MultiSelectInput
                            menuPortalTarget={null}
                            placeholder="Search by Name or Number..."
                            className="w-500 mb-3"
                            label="Manager Name*"
                            id="userId"
                            onInputChange={(e) => setInput(e)}
                            inputValue={inputValue}
                            options={localMembersList?.map((member) => ({
                                label: `${member?.name} [${member?.phoneNo}]`,
                                value: member?._id,
                            }))}
                            onChange={(selectedOptions: any[]) => {
                                setInput("");
                                setFieldValue(
                                    "userId",
                                    selectedOptions
                                );
                            }}
                            value={
                                values.userId || []
                            }
                            errors={errors.userId as string}
                            touched={touched.userId ? true : false}
                        />}
                    {values?.type == "multiple-filters" &&
                        <>
                            <MultiSelectInput
                                menuPortalTarget={null}
                                isSelectAll
                                label="State*"
                                placeholder="Select State"
                                id="date"
                                options={stateList?.map((e: any) => ({
                                    label: e?.title,
                                    value: e?._id
                                }))}
                                onChange={(e) => {
                                    setFieldValue("districtId", []);
                                    handleAllSelection(e, setFieldValue, stateList || [], "isAllState", "stateId");
                                }}
                                value={values.stateId}
                                errors={errors.stateId as string}
                                touched={touched.stateId ? true : false}
                            />
                            <MultiSelectInput
                                isSelectAll
                                label="District*"
                                id="districtId"
                                value={values.districtId as string[]}
                                placeholder={"Select Option"}
                                options={districtList?.map((e: any) => ({
                                    label: e?.title,
                                    value: e?._id
                                }))}
                                onChange={(e) => handleAllSelection(e, setFieldValue, districtList || [], "isAllDistrict", "districtId")}
                                errors={errors.districtId as string}
                                touched={touched.districtId ? true : false}
                            />
                            <SelectInput
                                menuPortalTarget={null}
                                className="w-500"
                                label="Cadre Type*"
                                id="cadreType"
                                placeholder="Select Option"
                                onChange={(e) => setFieldValue("cadreType", e)}
                                value={values.cadreType}
                                errors={errors.cadreType}
                                touched={touched.cadreType}
                                options={cadreTypeList?.map((e: any) => ({
                                    label: e,
                                    value: e
                                }))}
                            />
                            <MultiSelectInput
                                menuPortalTarget={null}
                                isSelectAll
                                label="Cadre*"
                                placeholder="Select Cadre"
                                id="date"
                                options={caderList?.map((e: any) => ({
                                    label: e?.title,
                                    value: e?._id
                                }))}
                                onChange={(e) => handleAllSelection(e, setFieldValue, caderList || [], "isAllCadre", "cadreId")}
                                value={values.cadreId}
                                errors={errors.cadreId as string}
                                touched={touched.cadreId ? true : false}
                            />
                        </>
                    }

                    <Checkbox
                        id="isDeepLink"
                        label="Is Deep Link"
                        checked={values.isDeepLink}
                        onChange={(e) => setFieldValue("isDeepLink", e)}
                    />

                    {values?.isDeepLink &&
                        <>
                            <SelectInput
                                menuPortalTarget={null}
                                className="w-500"
                                label="Automatic Notification Type*"
                                id="automaticNotificationType"
                                placeholder="Select Option"
                                onChange={(e) => {
                                    switch (e) {
                                        case "Miscellaneous":
                                            setSubType("Miscellaneous");
                                            break;
                                        case "Assessment":
                                            setSubType("assessments");
                                            break;
                                        case "Resource Material":
                                            setSubType("resourceMaterial");
                                            break;
                                        case "Diagnosis Algorithms":
                                            setSubType("diagnosisAlgo");
                                            break;
                                        case "Treatment Algorithms":
                                            setSubType("treatmentAlgo");
                                            break;
                                        case "Guidance On Adverse Drug Reactions":
                                            setSubType("guidanceAlgo");
                                            break;
                                        case "PMTPT":
                                            setSubType("PMTPT");
                                            break;
                                        case "Differential Care Algorithms":
                                            setSubType("differentialAlgo");
                                            break;
                                        case "NTEP Interventions Algorithms":
                                            setSubType("cgcAlgo");
                                            break;
                                        case "Dynamic Algorithm":
                                            setSubType("dynamicAlgo");
                                            break;

                                    }
                                    setFieldValue("automaticNotificationType", e);
                                }}
                                value={values.automaticNotificationType}
                                errors={errors.automaticNotificationType}
                                touched={touched.automaticNotificationType}
                                options={[
                                    { value: "Miscellaneous", label: "Miscellaneous" },
                                    { value: "Assessment", label: "Assessment" },
                                    { value: "Resource Material", label: "Resource Material" },
                                    { value: "Diagnosis Algorithms", label: "Diagnosis Algorithms" },
                                    { value: "Treatment Algorithms", label: "Treatment Algorithms" },
                                    { value: "Guidance On Adverse Drug Reactions", label: "Guidance On Adverse Drug Reactions" },
                                    { value: "PMTPT", label: "PMTPT" },
                                    { value: "Differential Care Algorithms", label: "Differential Care Algorithms" },
                                    { value: "NTEP Interventions Algorithms", label: "NTEP Interventions Algorithms" },
                                    { value: "Dynamic Algorithm", label: "Dynamic Algorithm" },
                                ]} />
                            <SelectInput
                                menuPortalTarget={null}
                                className="w-500"
                                label="Type Title*"
                                id="typeTitle"
                                placeholder="Select Option"
                                onChange={(e) => {
                                    const typeTitle = masterDropdown?.[subType]?.find((v: any) => {
                                        return v._id == e;
                                    });
                                    setFieldValue("typeTitle", { "title": typeTitle?.title?.en, "_id": typeTitle?._id });
                                }}
                                value={values.typeTitle?._id}
                                options={masterDropdown?.[subType]?.map((e: any) => ({
                                    label: e?.title?.en,
                                    value: e?._id
                                }))}
                            />
                        </>
                    }
                </div>
            </div>

            <PrimaryBtn
                title="Save"
                isLoading={isSubmitting}
                disabled={!dirty || isSubmitting}
                isFullWidth
                isUpper
                onClick={() => handleSubmit()}
            />
        </div>
    );
};
