import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch } from "react-redux";
import { getCroppedImg } from "../../utils/functions";
import { ErrorToast } from "../../utils/toasts";
import IconPlusCircle from "../Icon/IconPlusCircle";
import { PrimaryBtn } from "../buttons/primaryBtn";

interface CircularImageUploadProps {
    acceptedFileTypes?: string;
    field: string;
    errors?: string | Array<string>;
    touched?: boolean;
    action?: any;
    setFieldValue: any;
    label: string;
    initialFile?: string;
    slug?: string;
    cropWidth?: number;
    cropHeight?: number;
}

const CircularImageUpload: React.FC<CircularImageUploadProps> = ({
    acceptedFileTypes,
    action,
    field,
    setFieldValue,
    initialFile = "",
    slug,
    cropWidth = 200,
    cropHeight = 200,
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(process.env.MEDIA_URL + initialFile || null);
    const [flagTitle, setFlagTitle] = useState<string>("Upload");
    const [cropData, setCropData] = useState({ x: 0, y: 0, width: cropWidth, height: cropHeight });
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [showCropper, setShowCropper] = useState(false); // State to control cropper visibility
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFlagTitle("Upload");
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        setPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
        setShowCropper(true); // Show cropper when a file is selected
    };
    useEffect(() => {
        setPreviewUrl(process.env.MEDIA_URL + initialFile);
    }, [initialFile]);
    const handleUpload = () => {
        const fileToUpload = croppedImage
            ? new File([convertBase64ToBinary(croppedImage)], `${file?.name}_${Date.now()}.jpg`, { type: "image/jpeg" })
            : file;
        if (fileToUpload) {
            if (action) {
                const callback = (response: any) => {
                    if (response?.status) {
                        setFieldValue(field, response.data[0]);
                        setFile(null);
                        setFlagTitle("Uploaded Successfully");
                        setShowCropper(false); // Close cropper after successful upload
                    } else {
                        ErrorToast("Failed to upload");
                    }
                };
                if (slug) {
                    action(fileToUpload, slug, callback);
                } else {
                    dispatch(action(fileToUpload, true, callback));
                }
            } else {
                setFieldValue(field, fileToUpload);
                setShowCropper(false); // Close cropper after setting the field value
            }
        }
    };

    const convertBase64ToBinary = (base64: string) => {
        const binaryString = window.atob(base64.split(",")[1]);
        const binaryArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            binaryArray[i] = binaryString.charCodeAt(i);
        }
        return binaryArray;
    };

    const onCropChange = (crop: { x: number, y: number }) => {
        setCropData((prev) => ({ ...prev, ...crop }));
    };

    const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
        const croppedImg = await getCroppedImg(previewUrl!, croppedAreaPixels);
        setCroppedImage(croppedImg);
    };

    return (
        <div className="flex justify-center">
            <div className="relative">
                {/* Circular Upload Area */}
                <div
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer"
                    onClick={handleDivClick}
                >
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <IconPlusCircle className="w-8 h-8 text-white/80" />
                    )}
                </div>

                {/* Upload Button */}
                <div className="absolute bottom-0 right-0">
                    <button
                        type="button"
                        className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-200"
                        onClick={handleDivClick}
                    >
                        <IconPlusCircle className="w-4 h-4 text-gray-500" />
                    </button>
                </div>

                {/* File Input */}
                <input
                    type="file"
                    accept={acceptedFileTypes}
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {/* Cropper Modal (if needed) */}
            {showCropper && previewUrl && cropWidth && cropHeight && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <Cropper
                            image={previewUrl}
                            crop={cropData}
                            zoom={1}
                            aspect={cropWidth / cropHeight}
                            onCropChange={onCropChange}
                            onCropComplete={onCropComplete}
                        />
                        <div className="flex justify-end mt-4 gap-2">
                            <PrimaryBtn
                                title="Cancel"
                                type="button"
                                onClick={() => setShowCropper(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            />
                            <PrimaryBtn
                                title="Crop"
                                type="button"
                                onClick={handleUpload}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CircularImageUpload;
