import { useFormik } from "formik";
import { debounce } from "lodash";
import { MemberEditFormProps } from "master-table-action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useQueryParams } from "use-query-params";
import * as Yup from "yup";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import { Checkbox } from "../../components/CheckBox/checkbox";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import { IRootState } from "../../store";
import { createInstituteMember } from "../../store/actions/plugin.action";
import { clearChildInstituteId, clearSubscribersSearch, getAllSubscribersSearch } from "../../store/reducer/plugin.reducer";
import { SuccessToast } from "../../utils/toasts";

const validationSchema = Yup.object().shape({
    subscriberId: Yup.string().required("Required"),
    phoneNo: Yup.string().required("Required"),
    cadreId: Yup.string().required("Required"),
});

const AddMemberForm = () => {
    const navigate = useNavigate();
    const [query] = useQueryParams({
        id: "",
        role: "",
        title: "",
    });
    const dispatch = useDispatch();
    const { childInstituteById, membersList } = useSelector((status: IRootState) => status.plugin);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            "subscriberId": "",
            "instituteId": query?.id || "",
            "instituteRole": query?.role || "",
            "email": "",
            "phoneNo": "",
            "cadreId": "",
            "isActive": true,
        } as MemberEditFormProps,
        onSubmit(values, actions) {
            dispatch(
                createInstituteMember(
                    values,
                    (res) => {
                        if (res?.status) {
                            SuccessToast(res?.message);
                            actions.setSubmitting(false);
                            navigate("/query2coe/dashboard?id=" + query?.id + "&name=" + query.title + "&role=" + query?.role);
                        } else {
                            if (res?.data?.errors) {
                                res?.data?.errors?.forEach((error: any) => {
                                    const [fieldName, errorMessage]: any = Object.entries(error)[0];
                                    setFieldError(fieldName, errorMessage);
                                });
                            }
                        }
                    },
                )
            );
        },
        validationSchema: validationSchema
    });
    const { values, handleSubmit, setFieldValue, isSubmitting, setFieldError, dirty, errors, touched } = formik;
    const handleInputChange = debounce((inputValue) => {
        if (inputValue?.length > 2) {
            dispatch(getAllSubscribersSearch(`?search=${inputValue}`));
        }
    }, 100);
    useEffect(() => {
        if (childInstituteById?.subscriber?.name) {
            dispatch(getAllSubscribersSearch(`?search=${childInstituteById?.subscriber?.name}`));
        }
        return () => {
            dispatch(clearChildInstituteId());
            dispatch(clearSubscribersSearch());
        };
    }, [childInstituteById?.subscriber?.name]);
    return (
        <div>
            <div className="space-y-3">
                <div className="panel">
                    <span className="text-xl font-bold mb-4">Add Member Data</span>
                    <div className="space-y-3 dark:text-white mt-4">
                        <Fragment>
                            <SelectInput
                                menuPortalTarget={null}
                                placeholder={"Search by Name or Number..."}
                                className="w-500 mb-3"
                                label="Manager Name*"
                                id="subscriberId"
                                onInputChange={handleInputChange}
                                onChange={(e: any) => {
                                    setFieldValue("subscriberId", e?._id);
                                    setFieldValue("email", e?.email || "");
                                    setFieldValue("phoneNo", e?.phoneNo);
                                    setFieldValue("cadreId", e?.cadreId?._id);
                                }}
                                options={membersList?.map((e) => {
                                    return {
                                        label: e?.name + " [" + e?.phoneNo + "]",
                                        value: e
                                    };
                                })}
                                value={membersList?.find(e => e?._id === values?.subscriberId) || ""}
                                errors={errors.subscriberId as string}
                                touched={touched.subscriberId as boolean}
                            />

                            <div>
                                <PrimaryTextInput
                                    className="w-500 mb-3"
                                    label="Email"
                                    placeholder="Email"
                                    id="Email"
                                    type="text"
                                    onChange={(e) => setFieldValue("email", e)}
                                    value={values.email}
                                    errors={errors.email}
                                    touched={touched.email}
                                />
                                <PrimaryTextInput
                                    disabled
                                    className="w-500 mb-3"
                                    label="Phone Number*"
                                    placeholder="Phone Number"
                                    id="phoneNumber"
                                    type="text"
                                    onChange={(e) => setFieldValue("phoneNo", e)}
                                    value={values.phoneNo}
                                    errors={errors.phoneNo}
                                    touched={touched.phoneNo}
                                />
                                <PrimaryTextInput
                                    disabled
                                    className="w-500 mb-3"
                                    label="Cadre*"
                                    placeholder="Cadre"
                                    id="cadreId"
                                    type="text"
                                    onChange={(e) => setFieldValue("cadreId", e)}
                                    value={membersList?.find(e => e?.cadreId?._id === values?.cadreId)?.cadreId?.title || values?.cadreId}
                                    errors={errors.cadreId}
                                    touched={touched.cadreId}
                                />
                            </div>
                            <Checkbox
                                id="isActive"
                                checked={values.isActive}
                                label="Is Active*"
                                onChange={(e) => setFieldValue("isActive", e)}
                            />
                        </Fragment>
                    </div>
                </div>
            </div>
            <div className="flex gap-5 justify-end mt-4">
                <PrimaryBtn
                    title={"Back"}
                    isUpper
                    className="w-40"
                    onClick={() => {
                        navigate("/query2coe/dashboard?id=" + query?.id + "&name=" + query.title + "&role=" + query?.role);
                    }} />
                <PrimaryBtn title="Submit"
                    isLoading={isSubmitting}
                    disabled={!dirty || isSubmitting}
                    className="w-40"
                    isUpper
                    onClick={() => handleSubmit()} />
            </div>
        </div>
    );
};

export default AddMemberForm;
