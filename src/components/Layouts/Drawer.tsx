import { Drawer, ScrollArea } from "@mantine/core";
import { CSSProperties, ReactNode, useState } from "react";
import IconCross from "../Icon/IconCross";

export interface DrawerProps {
    opened: boolean;
    onClose: () => void;
    title?: ReactNode;
    children?: ReactNode;
    position?: "bottom" | "left" | "right" | "top";
    contentStyle?: CSSProperties | undefined;
    headerStyle?: CSSProperties;
    hideClose?: boolean;
    confirmOnClose?: boolean; // Enable confirmation
    confirmMessage?: string; // Custom message for confirmation popup
}

const DrawerModal: React.FC<DrawerProps> = ({
    opened,
    onClose,
    title = undefined,
    children,
    position = "right",
    contentStyle,
    headerStyle,
    hideClose = false,
    confirmOnClose = true,
    confirmMessage = "Are you sure you want to close? Any unsaved changes will be lost."
}) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleClose = () => {
        if (confirmOnClose) {
            setShowConfirm(true);
        } else {
            onClose();
        }
    };

    const handleConfirmClose = (confirmed: boolean) => {
        setShowConfirm(false);
        if (confirmed) {
            onClose();
        }
    };

    return (
        <>
            <Drawer
                position={position}
                opened={opened}
                onClose={handleClose}
                title={title}
                scrollAreaComponent={ScrollArea.Autosize}
                closeButtonProps={{
                    icon: <IconCross />,
                }}
                withCloseButton={!hideClose}
                styles={{
                    content: contentStyle,
                    header: headerStyle,
                }}
            >
                {children}
            </Drawer>

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] animate-fadeIn">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl text-center w-[90%] max-w-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmation</h2>
                        <p className="text-gray-700 mb-6">{confirmMessage}</p>
                        <div className="flex justify-center gap-6">
                            <button
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg"
                                onClick={() => handleConfirmClose(true)}
                            >
                                Yes, Close
                            </button>
                            <button
                                className="bg-gray-300 text-gray-800 px-5 py-2.5 rounded-full hover:bg-gray-400 transition-all duration-300 shadow-lg"
                                onClick={() => handleConfirmClose(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default DrawerModal;
