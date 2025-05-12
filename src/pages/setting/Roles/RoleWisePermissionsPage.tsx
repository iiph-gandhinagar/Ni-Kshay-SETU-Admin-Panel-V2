import { useFormik } from "formik";
import { RoleEditFormProps } from "master-table-action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";
import { BorderBtn, PrimaryBtn } from "../../../components/buttons/primaryBtn";
import { Checkbox } from "../../../components/CheckBox/checkbox";
import CustomSwitch from "../../../components/CheckBox/Switch";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import { PrimaryTextInput } from "../../../components/Inputs/TextInput";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import { IRootState } from "../../../store";
import { createRole, updateRoleByID } from "../../../store/actions/auth.action";
import { logActivity } from "../../../store/actions/report.action";
import { cleanMasterPermissions, cleanPermissions, getMasterPermissions, getRoleByID } from "../../../store/reducer/auth.reducer";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { getUpdatedFields } from "../../../utils/functions";
import { ErrorToast } from "../../../utils/toasts";

const roleValidation = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    permission: Yup.array().of(Yup.string()).nullable(),
});

const RoleWisePermissionsPage = () => {
    const [query, setQuery] = useQueryParam("id", StringParam);
    const navigation = useNavigate();
    const [permissionList, setPermissionList] = useState<string[]>([]);
    const dispatch = useDispatch();
    const { allPermissions, loader, roleByID } = useSelector((state: IRootState) => state.auth);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            "name": roleByID?.name || "",
            "description": roleByID?.description || "",
            "permission": roleByID?.permission || []
        } as RoleEditFormProps,
        onSubmit(values, actions) {
            if (roleByID?._id) {
                dispatch(
                    updateRoleByID(
                        roleByID?._id,
                        getUpdatedFields({
                            name: roleByID?.name,
                            permission: roleByID?.permission,
                            description: roleByID?.description,
                        }, values),
                        (res) => {
                            actions.setSubmitting(false);
                            if (res.status) {
                                dispatch(logActivity({
                                    "action": "update",
                                    "moduleName": window.location.pathname,
                                    "payload": {
                                        old: roleByID,
                                        new: res?.data
                                    }
                                }));
                                navigation("/roles?page=1&limit=10");
                            } else {
                                ErrorToast(res.message);
                            }
                        },
                    ));
            } else {
                dispatch(
                    createRole(
                        values,
                        (res) => {
                            if (res?.status) {
                                dispatch(logActivity({
                                    "action": "create",
                                    "moduleName": window.location.pathname,
                                    "payload": res?.data
                                }));
                                navigation("/roles?page=1&limit=10");
                            }

                        },

                    )
                );
            }
        },
        validationSchema: roleValidation
    });
    const { values, submitForm, setFieldValue, isSubmitting, dirty, errors, touched } = formik;
    useEffect(() => {
        if (query) {
            dispatch(getRoleByID(query));
        }
        dispatch(setPageTitle("Role Edit"));
    }, [query]);
    useEffect(() => {
        dispatch(getMasterPermissions());
        return () => {
            dispatch(cleanPermissions());
            dispatch(cleanMasterPermissions());
        };
    }, []);
    useEffect(() => {
        setPermissionList([...new Set(allPermissions?.map((e) => e.name.split(".")?.[2] ? e.moduleName : "").filter((e) => e !== ""))]);
    }, [allPermissions]);
    return (
        <div>
            <div className="mb-3">
                <BorderBtn
                    title={"Back"}
                    borderColor='border-primary'
                    textColor='text-primary'
                    leftIcon={<IconCaretDown className="rotate-90" />}
                    onClick={() => {
                        navigation("/roles?page=1&limit=15");
                    }} />
            </div>
            <div className="space-y-3">
                <div className="panel">
                    <span className="text-xl font-bold mb-4">Role Data</span>
                    <div className="space-y-3 dark:text-white mt-4">
                        <PrimaryTextInput
                            className="w-500"
                            label="Name*"
                            placeholder="Name"
                            id="name"
                            type="text"
                            onChange={(e) => setFieldValue("name", e)}
                            value={values.name}
                            errors={errors.name}
                            touched={touched.name}
                        />
                        <PrimaryTextInput
                            className="w-500"
                            label="Description*"
                            placeholder="Description"
                            id="description"
                            type="text"
                            onChange={(e) => setFieldValue("description", e)}
                            value={values.description}
                            errors={errors.description}
                            touched={touched.description}
                        />
                    </div>
                </div>
            </div>
            <div className='text-xl mt-8 font-bold mb-4'>Permissions</div>
            {permissionList?.map((header, index) => {
                const AllList: any = allPermissions?.filter((e) => e.moduleName == header && e.name?.split(".")?.[2]).map((e) => e.name) || [];
                const AllActions = [...new Set(allPermissions?.map((e) => e.name?.split(".")?.[2])?.filter(action => action !== undefined))];
                const subModules = AllList?.reduce((acc: any, permission: any) => {
                    const parts = permission.split(".");
                    const subModule = parts[1];
                    const action = parts[2];
                    if (!acc[subModule]) {
                        acc[subModule] = [];
                    }
                    acc[subModule].push(action);
                    return acc;
                }, {});
                const isAllChecked = AllList?.every((e: any) => values.permission?.includes(e));
                return (
                    <BoxCard key={header + index}
                        className="!p-5 mt-4 mb-4">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold mb-4 capitalize">{header?.replaceAll("-", " ")}</h2>
                            <CustomSwitch
                                id="active"
                                checked={isAllChecked}
                                onChange={(e) => {
                                    if (isAllChecked) {
                                        setFieldValue("permission", values?.permission?.filter((e) => !AllList.includes(e)));
                                    } else {
                                        setFieldValue("permission", [...new Set([...values.permission || [], ...AllList])]);
                                    }
                                }} />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table-auto min-w-full mb-3">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 whitespace-nowrap w-[45%]">Module Name</th>
                                        {AllActions.map((action) => {
                                            const title = action === "index" ? "list" : action;
                                            return (
                                                <th key={action}
                                                    className="px-4 py-2 whitespace-nowrap text-center">
                                                    {title?.charAt(0).toUpperCase() + title.slice(1)}
                                                </th>
                                            );
                                        })}
                                        <th className="px-4 py-2 whitespace-nowrap text-center">Select All</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(subModules).map((subModule) => {
                                        const actionsForSubModule: any = subModules[subModule];
                                        return (
                                            <tr key={subModule}>
                                                <td className="px-4 py-2 capitalize">{subModule?.replaceAll("-", " ")}</td>
                                                {AllActions.map((action, index) => {
                                                    const name = allPermissions?.find(
                                                        (e) => e.moduleName === header && e.name.split(".")?.[1] == subModule && e.name.split(".")?.[2]?.toLowerCase() === action.toLowerCase()
                                                    )?.name || "";

                                                    const isChecked = values?.permission?.includes(name);
                                                    if (name !== "") {
                                                        return (
                                                            <td key={`${subModule}-${action}-${index}`}
                                                                className="px-4 py-2">
                                                                <div className="flex justify-center">
                                                                    <Checkbox
                                                                        id={`checkbox-${subModule}-${action}`}
                                                                        checked={isChecked}
                                                                        onChange={() => {
                                                                            if (isChecked) {
                                                                                setFieldValue("permission", values?.permission?.filter((e) => e !== name));
                                                                            } else {
                                                                                setFieldValue("permission", [...values?.permission || [], name]);
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </td>
                                                        );
                                                    } else {
                                                        return (<td key={header + action + index} />);
                                                    }
                                                })}
                                                <td className="px-4 py-2">
                                                    <div className="flex justify-center">
                                                        <Checkbox
                                                            id={`select-all-${subModule}`}
                                                            checked={actionsForSubModule?.every((action: any) =>
                                                                values?.permission?.includes(`admin.${subModule}.${action}`)
                                                            )}
                                                            onChange={() => {
                                                                const isAllCheck = actionsForSubModule?.every((action: any) =>
                                                                    values?.permission?.includes(`admin.${subModule}.${action}`)
                                                                );
                                                                if (isAllCheck) {
                                                                    setFieldValue(
                                                                        "permission",
                                                                        values?.permission?.filter(
                                                                            (permission) => !actionsForSubModule?.includes(permission.split(".")[2]) || !permission.startsWith(`admin.${subModule}.`)
                                                                        )
                                                                    );
                                                                } else {
                                                                    const newPermissions = actionsForSubModule?.map(
                                                                        (action: any) => `admin.${subModule}.${action}`
                                                                    );
                                                                    setFieldValue(
                                                                        "permission",
                                                                        [...new Set([...(values.permission || []), ...newPermissions])]
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </BoxCard>
                );
            })}

            <div className="grid justify-end mt-4">
                <PrimaryBtn title="Submit"
                    isLoading={isSubmitting}
                    disabled={!dirty || isSubmitting}
                    onClick={submitForm} />
            </div>
        </div>
    );
};

export default RoleWisePermissionsPage;
