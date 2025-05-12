import { useEffect, useRef } from "react";
import IconCross from "../Icon/IconCross";

const FeedbackModal = ({ isModalVisible, onClose, feedback = [] }: any) => {
    if (!isModalVisible) return null;

    const popupRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div ref={popupRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-semibold text-gray-800">Feedback Details</h2>
                    <button onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors">
                        <IconCross />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                    <div className="space-y-6">
                        {feedback.map((fb: any, index: number) => (
                            <div key={index}
                                className="bg-gray-50 rounded-lg p-6">
                                <div className="space-y-4">
                                    <div className="text-sm font-medium text-gray-800">
                                        Feedback {index + 1}
                                    </div>
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p>Active: {fb.active ? "Yes" : "No"}</p>
                                        <p>Question: {fb.question.en || "-"}</p>
                                        <p>Description: {fb.description.en || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
