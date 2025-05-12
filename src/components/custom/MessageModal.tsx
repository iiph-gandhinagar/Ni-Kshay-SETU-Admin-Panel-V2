import moment from "moment";
import { useEffect, useRef } from "react";
import IconCross from "../Icon/IconCross";

const MessageModal = ({ isModalVisible, onClose, selectedMessage = [] }: any) => {
    if (!isModalVisible) return null;

    const formatDate = (dateString: any) => {
        return moment(dateString).format("DD MMM YYYY, hh:mm a");
    };

    const renderAnswer = (answer: any) => {
        if (!answer || !answer.en) return answer?.title || "-";

        if (Array.isArray(answer.en)) {
            return answer.en?.map((item: any, i: number) => (
                <p key={i}
                    className="text-gray-600">{item}</p>
            ));
        } else if (typeof answer.en === "object" && answer.en !== null) {
            return (
                <div className="space-y-2">
                    <p className="font-medium">Category: {answer.en.Category}</p>
                    {answer.en.result && (
                        <div>
                            <p className="font-medium">Result:</p>
                            {answer.en.result?.map((item: any, i: number) => (
                                <p key={i}
                                    className="text-gray-600">{item}</p>
                            ))}
                        </div>
                    )}
                    {answer.en.link && (
                        <div>
                            <p className="font-medium">Links:</p>
                            {answer.en.link?.map((link: any, i: number) => (
                                <p key={i}
                                    className="text-blue-600">{link}</p>
                            ))}
                        </div>
                    )}
                </div>
            );
        } else {
            return <p className="text-gray-600">{answer.en}</p>;
        }
    };
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
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div ref={popupRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-semibold text-gray-800">Message Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <IconCross />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                    <div className="space-y-6">
                        {selectedMessage?.map((msg: any, index: number) => (
                            <div key={index}
                                className="bg-gray-50 rounded-lg p-6">
                                <div className="space-y-4">
                                    <div className="text-sm font-medium text-gray-800">
                                        Message {index + 1}
                                    </div>
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p>Type: {msg.type}</p>
                                        <p>Category: {msg.category}</p>
                                        <p>Platform: {msg.platform}</p>
                                        {msg.createdAt && <p>Created: {formatDate(msg.createdAt)}</p>}
                                    </div>
                                    {msg.question && msg.question.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                                Questions
                                            </h3>
                                            <div className="space-y-2">
                                                {msg.question?.map((q: any, i: number) => (
                                                    <div key={i}
                                                        className="bg-white p-4 rounded-lg shadow-sm">
                                                        {q.en || q}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {msg.answer && msg.answer.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                                Answers
                                            </h3>
                                            <div className="space-y-2">
                                                {msg.answer?.map((a: any, i: number) => (
                                                    <div key={i}
                                                        className="bg-white p-4 rounded-lg shadow-sm">
                                                        {renderAnswer(a)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;
