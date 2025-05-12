import { FC } from "react";

interface IconCrossProps {
    className?: string;
}

const IconCross: FC<IconCrossProps> = ({ className = "", }) => {
    return (
        <svg width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}>
            <path d="M18 6L6 18"
                stroke="#0E1726"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round" />
            <path d="M6 6L18 18"
                stroke="#0E1726"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>

    );
};

export default IconCross;
