import { EditorInputProps } from "inputs-props";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImageApi } from "../../utils/api";

const BlockEmbed = Quill.import("blots/block/embed");
class VideoBlot extends BlockEmbed {
    static create(value: string) {
        const node = document.createElement("iframe");
        node.setAttribute("src", value);
        node.setAttribute("allowfullscreen", "true");
        node.setAttribute("style", "width: 100%; align-self:center;");
        return node;
    }

    static value(node: HTMLElement) {
        return node.getAttribute("src");
    }
}
VideoBlot.blotName = "video";
VideoBlot.tagName = "iframe";
Quill.register(VideoBlot);

export const EditorInput: React.FC<EditorInputProps> = ({
    id,
    label,
    placeholder = "",
    errors,
    height,
    touched,
    className = "",
    onChange,
    value,
    labelStyle,
    mediaFlag = "",
    isVideo = false
}) => {
    const quillRef = useRef<ReactQuill | null>(null);
    const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const [isLoading, setIsLoading] = useState(false);

    const handleVideoUpload = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "video/*");
        input.click();

        input.onchange = async () => {
            if (input.files) {
                const file = input.files[0];
                const formData = new FormData();
                formData.append("video", file);
                formData.append(mediaFlag, "true");
                setIsLoading(true);
                try {
                    const response = await uploadImageApi(formData);

                    const data = await response.data;
                    const videoUrl = process.env.MEDIA_URL + data?.data?.[0];

                    const quill = quillRef?.current?.getEditor();
                    if (quill) {
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, "video", videoUrl);
                        quill.setSelection(range.index + 1 as any);
                    }
                } catch (error) {
                    console.error("Video upload failed", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
    }, [mediaFlag]);

    const openHtmlModal = useCallback(() => {
        setTempValue(value || "");
        setIsHtmlModalOpen(true);
    }, [value]);

    const handleApply = useCallback(() => {
        onChange?.(tempValue);
        setIsHtmlModalOpen(false);
    }, [onChange, tempValue]);

    const handleCancel = useCallback(() => {
        setIsHtmlModalOpen(false);
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ align: [] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                [{ direction: "rtl" }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                ["blockquote", "code-block"],
                ["link", "image", isVideo ? "video" : ""],
                ["clean"],
            ],
            handlers: {
                video: handleVideoUpload,
                "code-block": openHtmlModal,
            },
        },
        clipboard: {
            matchVisual: false,
        },
    }), [handleVideoUpload]);

    useEffect(() => {
        if (isHtmlModalOpen) {
            setTempValue(value);
        }
    }, [value, isHtmlModalOpen]);

    return (
        <div className="mt-4 mb-3">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm text-gray-700"
                    style={{ fontWeight: 400, ...labelStyle }}
                >
                    {label}
                </label>
            )}
            <ReactQuill
                ref={quillRef}
                id={id}
                className={`rounded-md font-normal border-2 ${errors && touched ? "border-[#E7515A]" : ""} ${className}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ height: height || "auto" }}
                modules={modules}
            />
            {errors && touched && (
                <span className="text-[#E7515A] mt-1 inline-block">{errors}</span>
            )}

            {isHtmlModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl">
                        <h3 className="text-lg font-semibold mb-4">Edit HTML Content</h3>
                        <textarea
                            value={tempValue || ""}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-full h-64 p-2 border rounded-md font-mono text-sm"
                            placeholder="Enter HTML here..."
                        />
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApply}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <div className="flex items-center justify-center">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                        </div>
                        <p className="text-center mt-4">Uploading video...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditorInput;
