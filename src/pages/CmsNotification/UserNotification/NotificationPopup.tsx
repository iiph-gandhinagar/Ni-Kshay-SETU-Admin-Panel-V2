import React, { useRef } from "react";
import IconCross from "../../../components/Icon/IconCross";

interface User {
    _id: string;
    name: string;
    phoneNo: string;
    email?: string;
}

interface NotificationData {
    _id: string;
    title: string;
    description: string;
    type: string;
    userId?: User[];
    createdBy: {
        firstName: string;
        lastName: string;
        email: string;
    };
    status: string;
    link?: string;
    createdAt: string;
    isAllUser?: boolean;
    successfulCount?: number;
    failedCount?: number;
    automaticNotificationType?: string;
}

interface NotificationPopupProps {
    data: NotificationData;
    onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ data, onClose }) => {
    const { title, description, type, userId, createdBy, status, link, createdAt } = data;

    const MAX_USERS_DISPLAY = 30;
    const popupRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            onClose();
        }
    };
    return (
        <div onClick={handleOutsideClick}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center animate-fadeIn z-50">
            <div ref={popupRef}
                className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-2xl max-h-[85vh] overflow-y-auto relative animate-slideInUp scrollbar-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all duration-300"
                >
                    <IconCross />
                </button>
                <h2 className="text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2">
                    {title || "Notification"}
                </h2>
                {description && (
                    <p className="text-gray-700 mb-2">
                        <span className="font-semibold text-gray-900">Description:</span>{" "}
                        {description}
                    </p>
                )}
                {type && (
                    <p className="mb-2">
                        <span className="font-semibold text-gray-900">Type:</span>{" "}
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                            {type}
                        </span>
                    </p>
                )}
                {status && (
                    <p className="mb-2">
                        <span className="font-semibold text-gray-900">Status:</span>{" "}
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                            {status}
                        </span>
                    </p>
                )}
                {link && (
                    <p className="mb-2">
                        <span className="font-semibold text-gray-900">Link:</span>{" "}
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800 transition-all duration-300"
                        >
                            Visit Link
                        </a>
                    </p>
                )}
                {data.automaticNotificationType && (
                    <p className="mb-2">
                        <span className="font-semibold text-gray-900">
                            Automatic Notification Type:
                        </span>{" "}
                        {data.automaticNotificationType}
                    </p>
                )}
                {createdBy && (
                    <p className="mb-2">
                        <span className="font-semibold text-gray-900">Created By:</span>{" "}
                        {createdBy.firstName} {createdBy.lastName}{" "}
                        <span className="text-sm text-gray-500">({createdBy.email})</span>
                    </p>
                )}
                {userId && userId.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Users:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {userId.slice(0, MAX_USERS_DISPLAY).map((user) => (
                                <div
                                    key={user._id}
                                    className="border rounded-lg p-3 bg-gray-50 hover:bg-white shadow-sm transition-all duration-300"
                                >
                                    <p className="font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Phone:</span> {user.phoneNo}
                                    </p>
                                    {user.email && (
                                        <p className="text-gray-600">
                                            <span className="font-medium">Email:</span> {user.email}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        {userId.length > MAX_USERS_DISPLAY && (
                            <p className="mt-4 text-gray-700 text-sm italic text-center">
                                + {userId.length - MAX_USERS_DISPLAY} more users...
                            </p>
                        )}
                    </div>
                )}
                {data?.isAllUser && (
                    <p className="mt-4 text-gray-700">
                        <span className="font-semibold text-gray-900">Target:</span> All Users
                    </p>
                )}
                {(data?.successfulCount !== undefined || data?.failedCount !== undefined) && (
                    <div className="mt-4">
                        <p className="text-gray-700">
                            <span className="font-semibold text-gray-900">Successful Count:</span>{" "}
                            {data.successfulCount || 0}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold text-gray-900">Failed Count:</span>{" "}
                            {data.failedCount || 0}
                        </p>
                    </div>
                )}
                {createdAt && (
                    <p className="mt-4 text-gray-700">
                        <span className="font-semibold text-gray-900">Created At:</span>{" "}
                        {new Date(createdAt).toLocaleString()}
                    </p>
                )}
            </div>
        </div>
    );
};

export default NotificationPopup;
