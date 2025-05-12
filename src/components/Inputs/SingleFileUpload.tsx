import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop"; // Import the Cropper component
import { useDispatch } from "react-redux";
import { getCroppedImg } from "../../utils/functions";
import { ErrorToast } from "../../utils/toasts";
import IconMenuDocumentation from "../Icon/Menu/IconMenuDocumentation";
import { PrimaryBtn } from "../buttons/primaryBtn";

interface FileUploadProps {
    acceptedFileTypes?: string;
    field: string;
    errors?: string | Array<string>;
    touched?: boolean;
    action?: any;
    setFieldValue: any;
    label: string;
    initialFile?: string;
    slug?: string;
    cropWidth?: number; // Accept dynamic crop width
    cropHeight?: number; // Accept dynamic crop height
}

const SingleFileUpload: React.FC<FileUploadProps> = ({
    acceptedFileTypes,
    action,
    field,
    errors,
    touched,
    setFieldValue,
    label,
    initialFile = "",
    slug,
    cropWidth,
    cropHeight,
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialFile || null);
    const [flagTitle, setFlagTitle] = useState<string>("Upload");
    const [cropData, setCropData] = useState({ x: 0, y: 0, width: cropWidth, height: cropHeight });
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setPreviewUrl(initialFile ? process.env.MEDIA_URL + `${initialFile}` : null);
    }, [initialFile]);

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFlagTitle("Upload");
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        setPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreviewUrl(null);
        setFlagTitle("Upload");
    };
    const isImageFile = (fileUrl: string) => /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|tif|ico|heic|heif|avif)$/.test(fileUrl);
    const handleUpload = () => {
        const fileToUpload = croppedImage
            ? new File([convertBase64ToBinary(croppedImage)], "cropped-image.jpg", { type: "image/jpeg" })
            : file;

        if (fileToUpload) {
            if (action) {
                const callback = (response: any) => {
                    if (response?.status) {
                        setFieldValue(field, response.data[0]);
                        setFile(null);
                        setFlagTitle("Uploaded Successfully");
                    } else {
                        ErrorToast("Failed to upload");
                    }
                };
                if (slug) {
                    dispatch(action(fileToUpload, slug, callback));
                } else {
                    dispatch(action(fileToUpload, true, callback));
                }
            } else {
                setFieldValue(field, fileToUpload);
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
        <div className="w-full py-5 rounded-lg">
            <h1 className="text-sm text-gray-700 mb-2">{label}</h1>
            <div
                onClick={handleDivClick}
                className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
                <input
                    type="file"
                    accept={acceptedFileTypes}
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
                <p className="text-gray-500">Drag and drop a file here, or click to select</p>
            </div>
            <div className="grid grid-cols-1 gap-5 mt-10">
                {previewUrl && (
                    <div className="relative w-full bg-center bg-no-repeat bg-cover shadow-md rounded-md overflow-hidden">
                        {isImageFile(previewUrl) || isImageFile(file?.name as string) ? (
                            <>
                                {cropHeight && cropWidth && file ?
                                    <div className="w-full h-[300px]">
                                        <Cropper
                                            style={{
                                                containerStyle: {
                                                    backgroundColor: "white",
                                                    opacity: 1
                                                }
                                            }}
                                            image={previewUrl}
                                            crop={cropData}
                                            zoom={1}
                                            aspect={cropWidth / cropHeight}
                                            onCropChange={onCropChange}
                                            onCropComplete={onCropComplete}
                                        />
                                    </div> : <div className="flex flex-col items-center justify-center w-[40%] text-center">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                }
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full text-center">
                                <IconMenuDocumentation className="scale-[300%]" />
                                <p className="truncate w-[70%] mt-7">{file?.name || "Uploaded File"}</p>
                            </div>
                        )}
                        <button
                            onClick={handleRemoveFile}
                            className="absolute top-1 right-1 p-1 bg-gray-300 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-sm"
                        >
                            x
                        </button>
                    </div>
                )}
            </div>
            {file &&
                <PrimaryBtn
                    title={flagTitle}
                    disabled={flagTitle === "Uploaded Successfully"}
                    className="mt-5 px-4 py-2 bg-primary text-white font-medium rounded-md transition-colors"
                    onClick={handleUpload}
                />
            }
            {errors && touched ? (
                <span className="text-[#E7515A] mt-1 inline-block">{errors}</span>
            ) : null}
        </div>
    );
};

export default SingleFileUpload;
