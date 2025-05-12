import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateConfigByID } from "../../store/actions/config.action";
import { PrimaryBtn } from "../buttons/primaryBtn";

interface SimpleFileUploadProps {
    action: any;
    label: string;
    acceptedFileTypes?: string;
}

const SimpleFileUploadButton: React.FC<SimpleFileUploadProps> = ({
    action,
    label,
    acceptedFileTypes,
}) => {
    const [flagTitle, setFlagTitle] = useState<string>(label);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setShowPopup(true);
        }
    };

    const handleUpload = () => {
        if (selectedFile && action) {
            setFlagTitle("Uploading...");
            setShowPopup(false);

            const callback = (response: any) => {
                if (response?.status) {
                    const path = response?.data?.[0];
                    dispatch(updateConfigByID("67dc0a9c61bb4d1eeaa31590", {
                        "value": {
                            en: path,
                            hi: path,
                            gu: path,
                            mr: path,
                            te: path,
                            ta: path,
                            pa: path,
                            kn: path,
                        }
                    }, (res) => {
                        if (res?.status) {
                            setFlagTitle("Uploaded Successfully");
                            setSelectedFile(null);
                            setPreviewUrl(null);
                        } else {
                            setFlagTitle("Upload Failed");
                        }
                    }));
                } else {
                    setFlagTitle("Upload Failed");
                }
            };

            dispatch(action(selectedFile, true, callback));
        }
    };

    const handleCancel = () => {
        setShowPopup(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        setFlagTitle(label);
    };

    return (
        <div className="flex">
            <PrimaryBtn
                title={flagTitle}
                disabled={flagTitle === "Uploading..." || flagTitle === "Uploaded Successfully"}
                className="px-4 py-2 bg-primary text-white font-medium rounded-md transition-colors"
                onClick={handleButtonClick}
            />
            <input
                type="file"
                accept={acceptedFileTypes}
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            {showPopup && previewUrl && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Image Preview</h2>
                            <button
                                onClick={handleCancel}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <div className="flex justify-center mb-4">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-w-full max-h-[400px] object-contain"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <PrimaryBtn
                                title="Upload"
                                onClick={handleUpload}
                                className="px-4 py-2 bg-primary text-white font-medium rounded-md transition-colors"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SimpleFileUploadButton;
