import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorToast } from "../../utils/toasts";
import { PrimaryBtn } from "../buttons/primaryBtn";
import IconLoader from "../Icon/IconLoader";
import IconMenuDocumentation from "../Icon/Menu/IconMenuDocumentation";

interface FileUploadProps {
    acceptedFileTypes?: string;
    field: string;
    errors?: string | Array<string>;
    touched?: boolean;
    action?: any;
    setFieldValue: any;
    label: string;
    typeOfMaterial: string;
    initialFiles?: string[];
}
const MultipleFileUpload: React.FC<FileUploadProps> = ({
    acceptedFileTypes,
    action,
    field,
    errors,
    touched,
    setFieldValue,
    label,
    typeOfMaterial,
    initialFiles = []
}) => {
    const [Files, setFiles] = useState<any[]>([]);
    const [flagTitle, setFlagTitle] = useState<string>("Upload");
    const [preloadedFiles, setPreloadedFiles] = useState<string[]>(initialFiles);
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setPreloadedFiles(initialFiles);
    }, [initialFiles]);
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const selectedFiles = e.dataTransfer.files;
        if (selectedFiles) {
            handleFileArray(Array.from(selectedFiles));
        }
    };
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFlagTitle("Upload");
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            handleFileArray(Array.from(selectedFiles));
        }
    };
    const handleFileArray = (fileArray: File[]) => {
        setFiles((prevFiles) => [
            ...prevFiles,
            ...fileArray.filter(newFile => !prevFiles.some(file => file.name === newFile.name))
        ]);
    };
    const handleRemoveFile = (fileToRemove: File | string) => {
        setFlagTitle("Upload");
        if (typeof fileToRemove === "string") {
            setPreloadedFiles((prev) => prev.filter(file => file !== fileToRemove));
            setFieldValue(field, initialFiles.filter((file) => file !== fileToRemove));
        } else {
            setFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove));
        }
    };
    const isImageFile = (file: File | string) => {
        return typeof file === "string" || (file as File).type.startsWith("image/");
    };
    const isInitialImageFile = (fileUrl: string) => {
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
        return imageExtensions.some(extension => fileUrl.toLowerCase().endsWith(extension));
    };
    const handleUpload = () => {
        setLoader(true);
        if (Files.length > 0) {
            const callBack = (response: any) => {
                if (response?.status) {
                    const uniqueFiles = response.data.filter(
                        (file: string) => !preloadedFiles.includes(file)
                    );
                    const updatedFiles = [...preloadedFiles, ...uniqueFiles];
                    setFieldValue(field, updatedFiles);
                    setFiles([]);
                    setFlagTitle("Uploaded Successfully");
                } else {
                    ErrorToast("Failed to upload");
                }
                setLoader(false);
            };
            dispatch(action(Files, typeOfMaterial, true, callBack));
        } else {
            if (preloadedFiles.length > 0) {
                setFieldValue(field, preloadedFiles);
                setFlagTitle("Uploaded Successfully");
            } else {
                alert("Please select a file to upload.");
            }
        }
    };
    return (
        <div className="w-full py-5 rounded-lg">
            <h1 className="text-sm text-gray-700 mb-2">{label}</h1>
            <div
                onClick={handleDivClick}
                className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    accept={acceptedFileTypes}
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
                <p className="text-gray-500">Drag and drop files here, or click to select</p>
            </div>
            <div className="flex flex-wrap gap-5 mt-10">
                {preloadedFiles.map((fileUrl, index) => (
                    <div key={`preloaded-${index}`}
                        className="relative w-[30%] h-[180px] bg-center bg-no-repeat bg-cover shadow-md rounded-md overflow-hidden">
                        {isInitialImageFile(fileUrl) ? (
                            <img
                                src={process.env.MEDIA_URL + fileUrl}
                                alt={`Preloaded File ${index + 1}`}
                                className="object-cover w-full h-full rounded-md"
                            />) :
                            <div className="flex flex-col items-center justify-center w-full h-full text-center">
                                <IconMenuDocumentation className="scale-[300%]" />
                                <p className="truncate w-[70%] mt-7">{fileUrl.split("/").pop()}</p>
                            </div>
                        }
                        <button
                            onClick={() => handleRemoveFile(fileUrl)}
                            className="absolute top-1 right-1 p-1 bg-gray-300 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-sm"
                        >
                            x
                        </button>
                    </div>
                ))}
                {Files.map((file, index) => (
                    <div key={`new-${index}`}
                        className="relative w-[30%] h-[180px] bg-center bg-no-repeat bg-cover shadow-md rounded-md overflow-hidden">
                        {isImageFile(file) ? (
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="object-cover w-full h-full rounded-md"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full text-center">
                                {loader ? <IconLoader className="scale-[300%]" /> : <IconMenuDocumentation className="scale-[300%]" />}
                                <p className="truncate w-[70%] mt-7">{file.name}</p>
                            </div>
                        )}
                        <button
                            onClick={() => handleRemoveFile(file)}
                            className="absolute top-1 right-1 p-1 bg-gray-300 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-sm"
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
            {Files.length > 0 &&
                <PrimaryBtn
                    title={flagTitle}
                    disabled={flagTitle === "Uploaded Successfully"}
                    className="mt-5 px-4 py-2 bg-primary text-white font-medium rounded-md transition-colors"
                    onClick={handleUpload}
                />}
            {errors && touched ? (
                <span className="text-[#E7515A] mt-1 inline-block">Required</span>
            ) : null}
        </div>
    );
};

export default MultipleFileUpload;
