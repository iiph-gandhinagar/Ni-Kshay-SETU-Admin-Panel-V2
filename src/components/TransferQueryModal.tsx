import { Dialog, Transition } from "@headlessui/react";
import Tippy from "@tippyjs/react";
import { useFormik } from "formik";
import moment from "moment";
import { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { StringParam, useQueryParam } from "use-query-params";
import * as Yup from "yup";
import { IRootState } from "../store";
import { transferQuery } from "../store/actions/plugin.action";
import { clearAllQueryListById, clearInstituteList, getAllInstituteList, getAllQueryListById } from "../store/reducer/plugin.reducer";
import { ErrorToast, SuccessToast } from "../utils/toasts";
import { BorderBtn, PrimaryBtn } from "./buttons/primaryBtn";
import { Checkbox } from "./CheckBox/checkbox";
import IconCross from "./Icon/IconCross";
import IconEye from "./Icon/IconEye";
import { SelectInput } from "./Inputs/SelectInput";
import TableComponent from "./Tables";
interface popupProps {
    onClose: () => void;
    isOpen?: boolean;
}
const validationSchema = Yup.object().shape({
    instituteId: Yup.string().required("Required"),
    queries: Yup.array().of(Yup.string()).min(1, "Required"),
});
export const TransferQueryModal: FC<popupProps> = ({ isOpen, onClose, }) => {
    const dispatch = useDispatch();
    const { instituteList } = useSelector((state: IRootState) => state.plugin);
    const { QueryListById } = useSelector((state: IRootState) => state.plugin);
    const [isChecked, setIsChecked] = useState(false);
    const [id] = useQueryParam("id", StringParam);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            instituteId: "",
            questions: [] as Array<string>,
        },
        onSubmit: (values) => {
            dispatch(transferQuery(values,
                (res) => {
                    if (res.status) {
                        onClose();
                        SuccessToast(res.message);
                    } else {
                        ErrorToast(res.message);
                        if (res?.data?.errors) {
                            res?.data?.errors?.forEach((error: any) => {
                                const fieldName = Object.keys(error)[0];
                                const errorMessage = error[fieldName];
                                setFieldError(fieldName, errorMessage);
                            });
                        }
                    }
                }));
        },
        validationSchema: validationSchema
    });
    const { errors, values, setFieldValue, setFieldError, touched, handleSubmit, resetForm, isSubmitting } = formik;
    useEffect(() => {
        if (isOpen) {
            dispatch(getAllQueryListById(id));
            dispatch(getAllInstituteList());
        }
        return () => {
            resetForm();
            dispatch(clearAllQueryListById());
            dispatch(clearInstituteList());
        };
    }, [isOpen]);
    const [checkedItems, setCheckedItems] = useState(new Set());

    useEffect(() => {
        if (isChecked) {
            const allIds = new Set(QueryListById?.openQueries.map(item => item._id));
            setCheckedItems(allIds);
            setFieldValue("questions", Array.from(allIds));
        } else {
            setCheckedItems(new Set());
            setFieldValue("questions", []);
        }
    }, [isChecked, QueryListById, setFieldValue]);

    const handleRowCheckboxChange = (itemId: string) => {
        const updatedCheckedItems = new Set(checkedItems);
        if (updatedCheckedItems.has(itemId)) {
            updatedCheckedItems.delete(itemId);
        } else {
            updatedCheckedItems.add(itemId);
        }
        setCheckedItems(updatedCheckedItems);
        setFieldValue("questions", Array.from(updatedCheckedItems));
    };
    return (
        <div>
            <Transition appear
                show={isOpen}
                as={Fragment}>
                <Dialog as="div"
                    open={isOpen}
                    onClose={() => onClose()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div"
                                    className="panel border-0 p-0 rounded-lg  w-full max-w-[55%] my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-semibold text-xl mt-3">{"Transfer Query"}</h5>
                                        <button type="button"
                                            className="text-white-dark hover:text-dark"
                                            onClick={() => onClose()}>
                                            <IconCross />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div className="px-4">
                                            <div className='mb-3'>Transfer Queries in any instiute(s) simultaneously. Use the swap function below.</div>
                                            <div className='flex-col gap-5'>
                                                <div>
                                                    <span className='font-bold text-lg'>1. Select Institute</span>
                                                    <div className="mt-4">
                                                        <SelectInput
                                                            id='instituteId'
                                                            placeholder={"Select Institute"}
                                                            label='Transfer To'
                                                            className='w-72 z-10'
                                                            options={instituteList?.filter(v => v?._id !== id).map((v) => {
                                                                return {
                                                                    label: v?.title,
                                                                    value: v?._id
                                                                };
                                                            })}
                                                            menuPortalTarget={null}
                                                            value={values?.instituteId}
                                                            errors={errors?.instituteId}
                                                            touched={touched?.instituteId}
                                                            onChange={(e) => setFieldValue("instituteId", e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='panel mt-6'>
                                                    <span className='font-bold text-lg'>2. Select Queries</span>
                                                    <div className="flex flex-col gap-4">
                                                        <TableComponent
                                                            height="380.55px"
                                                            columns={[
                                                                {
                                                                    accessor: "_id",
                                                                    title: "id",
                                                                    hidden: true
                                                                }, {
                                                                    accessor: "checkbox",
                                                                    title: <Checkbox
                                                                        id="mainCheckbox"
                                                                        checked={isChecked}
                                                                        onChange={(e) => setIsChecked(e)}
                                                                    />,
                                                                    render: (item: any) => (
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={checkedItems.has(item._id)}
                                                                            onChange={() => handleRowCheckboxChange(item._id)}
                                                                            className="form-checkbox"
                                                                        />
                                                                    )
                                                                }, {
                                                                    accessor: "queryRaisedInstitute.title",
                                                                    title: "Created By",
                                                                    render(record: any) {
                                                                        return `${record.raisedBy?.name} (${record?.queryRaisedInstitute?.title})`;
                                                                    }
                                                                }, {
                                                                    accessor: "createdAt", title: "Created At", sortable: false,
                                                                    render(record: any) {
                                                                        return moment(record?.createdAt).format("DD MMM YYYY, hh:mm a");
                                                                    }
                                                                }, {
                                                                    accessor: "view",
                                                                    title: "View",
                                                                    titleClassName: "!text-right !pr-8",
                                                                    render: (item: any, index) => (
                                                                        <div className="flex items-center justify-end gap-6 mr-3 ">
                                                                            <Tippy
                                                                                content={
                                                                                    <div>
                                                                                        <h3 className="font-bold text-xl">Summary</h3>
                                                                                        <div>
                                                                                            <div>
                                                                                                <span className="font-bold">Age</span>: <span>{item?.age}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Gender</span>: <span>{item?.sex}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Diagnosis</span>: <span>{item?.diagnosis}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Date of Admission</span>: <span>{new Date(item?.dateOfAdmission).toLocaleString()}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Chief Complaint</span>: <span>{item?.chiefComplaint}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Illness</span>: <span>{item?.illness}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Past History</span>: <span>{item?.pastHistory}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Pre-Treatment Evaluation</span>: <span>{item?.preTreatmentEvaluation}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Assessment and Differential Diagnosis</span>: <span>{item?.assessmentAndDiffDiagnosis}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Current Treatment Plan</span>: <span>{item?.currentTreatmentPlan}</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-bold">Query</span>: <span>{item?.query}</span>
                                                                                            </div>

                                                                                            <div>
                                                                                                <span className="font-bold">Status</span>: <span>{item?.status}</span>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>}>
                                                                                <NavLink
                                                                                    to={""}
                                                                                    type="button">
                                                                                    <IconEye />
                                                                                </NavLink>
                                                                            </Tippy>
                                                                        </div>
                                                                    )
                                                                }
                                                            ]}
                                                            idAccessor={({ _id }) => _id}
                                                            records={QueryListById?.openRespondedQueries}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            {values?.questions?.length > 0 &&
                                                <PrimaryBtn
                                                    title='Transfer'
                                                    onClick={() => { handleSubmit(); }}
                                                />}
                                            <BorderBtn
                                                className='ml-4 '
                                                title='Close'
                                                borderColor='border-primary'
                                                textColor='text-primary'
                                                onClick={() => onClose()}
                                            />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};
