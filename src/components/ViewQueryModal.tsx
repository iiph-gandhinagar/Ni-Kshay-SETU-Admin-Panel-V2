import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import * as Yup from "yup";
import { BorderBtn } from "./buttons/primaryBtn";
import IconCross from "./Icon/IconCross";
interface popupProps {
    onClose: () => void;
    title: string;
    isOpen?: boolean;
    data?: any
}
const validationSchema = Yup.object().shape({
    instituteId: Yup.string().required("Required"),
    queries: Yup.array().of(Yup.string()).min(1, "Required"),
});

export const ViewQueryModal: FC<popupProps> = ({ isOpen, onClose, data, title }) => {
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
                                        <h5 className="font-semibold text-xl mt-3">{"Summary"}</h5>
                                        <button type="button"
                                            className="text-white-dark hover:text-dark"
                                            onClick={() => onClose()}>
                                            <IconCross />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div className="px-4">
                                            <div className='flex-col gap-5'>
                                                <div>
                                                    <div>
                                                        <span className="font-bold">Raised By</span>: <span className="text-blue-800">{data?.raisedBy?.name}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Age</span>: <span>{data?.age}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Gender</span>: <span>{data?.sex}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Diagnosis</span>: <span>{data?.diagnosis}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Date of Admission</span>: <span>{new Date(data?.dateOfAdmission).toLocaleString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Chief Complaint</span>: <span>{data?.chiefComplaint}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">History Of Present Illness And Duration (In Case Of ADR Or
                                                            CDST, Comorbidities Please Mention Here)</span>: <span>{data?.illness}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Past History / Follow- up History</span>: <span>{data?.pastHistory}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Pre-Treatment Evaluation</span>: <span>{data?.preTreatmentEvaluation}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Assessment and Differential Diagnosis</span>: <span>{data?.assessmentAndDiffDiagnosis}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Current Treatment Plan</span>: <span>{data?.currentTreatmentPlan}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Query</span>: <span>{data?.query}</span>
                                                    </div>
                                                    <div className="mt-1 pt-5 pb-5 border-t-2">
                                                        <span className="font-bold">Status</span>: <span>{data?.status}</span>
                                                    </div>
                                                    {data?.response ? <div className=" border-t-2">
                                                        <span className="font-bold">Response</span>: <span>{data?.response}</span>
                                                        <div>
                                                            <span className="font-bold">Responded By </span>: <span className="text-green-500">{data?.respondedBy?.name}</span>
                                                        </div>
                                                    </div> : <></>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
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
