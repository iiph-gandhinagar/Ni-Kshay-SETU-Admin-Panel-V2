import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { BorderBtn } from "./buttons/primaryBtn";
import IconCross from "./Icon/IconCross";

interface popupProps {
    onClose: () => void;
    isOpen?: boolean;
    data?: any
}

export const ActivityLogModal: FC<popupProps> = ({ isOpen, onClose, data }) => {
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
                                        <h5 className="font-semibold text-xl mt-3">{"Activity Log"}</h5>
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
                                                        <span className="font-bold">Name</span>: <span className="text-blue-800 font-medium">{data?.causerId.firstName}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Action</span>: <span className="font-medium">{data?.action}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Module Name</span>: <span className="font-medium">{data?.moduleName}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">Payload</span>: <span className="text-wrap font-medium"
                                                            style={{ whiteSpace: "pre-wrap" }}>
                                                            {JSON.stringify(data?.payload, null, 5)}
                                                        </span>
                                                    </div>
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
