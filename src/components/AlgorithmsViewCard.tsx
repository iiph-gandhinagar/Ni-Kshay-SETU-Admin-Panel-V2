import { AlgorithmsViewCardProps } from "components";
import { useState } from "react";
import IconBellBing from "./Icon/IconBellBing";
import IconDroplet from "./Icon/IconDroplet";
import IconPencil from "./Icon/IconPencil";
import IconTrashLines from "./Icon/IconTrashLines";

const AlgorithmsViewCard: React.FC<AlgorithmsViewCardProps> = ({
    title,
    onClick,
    icon,
    onEdit,
    onDelete,
    onNotify,
    className,
}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onNotify) onNotify();
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 60000);
    };

    return (
        <div
            onClick={onClick}
            className={`relative cursor-pointer max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none group ${className}`}
        >
            <div className="py-7 px-6 overflow-hidden">
                <div
                    className="relative inline-block mb-5 p-[2px] rounded-full bg-gradient-to-r from-transparent to-transparent backdrop-blur-md"
                >
                    <div className="overflow-hidden bg-white/30 dark:bg-[#1b2e4b]/30">
                        {icon ? (
                            <img
                                src={`${process.env.MEDIA_URL}${icon}`}
                                alt="icon"
                                className="w-12 h-12 object-cover"
                            />
                        ) : (
                            <IconDroplet className="w-12 h-12 text-[#3b3f5c]" />
                        )}
                    </div>
                </div>
                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                    {title}
                </h5>
            </div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {onNotify &&
                    <button
                        onClick={handleClick}
                        disabled={isDisabled}
                        className={`p-2 text-white rounded-full ${isDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600"
                            }`}
                    > <IconBellBing />
                    </button>}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onEdit) onEdit();
                    }}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                    <IconPencil />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onDelete) onDelete();
                    }}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                    <IconTrashLines />
                </button>
            </div>
        </div>
    );
};

export default AlgorithmsViewCard;
