import React from "react";

interface CustomSwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    onClick?: (value: any) => void;
    id?: string;
    label?: string
    className?: string;
    isLoading?: boolean;
    disabled?: boolean
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked = false, onChange, label, id, disabled, className, isLoading, onClick }) => {
    return (<div className="flex">
        <label className={`w-12 h-6 relative ${className}`}>
            <input
                type="checkbox"
                className={`custom_switch absolute w-full h-full opacity-0 z-10 ${isLoading ? " cursor-wait " : " cursor-pointer "} peer`}
                id={id}
                checked={checked}
                onChange={() => { if (onChange) onChange(!checked); }}
                onClick={onClick}
            />
            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
        </label>
        {label ? <span className={`ml-2 text-sm py-1 font-medium text-[#6B7280] ${disabled ? "opacity-40" : "opacity-100"} `}
        >{label}</span> : null}
    </div>
    );
};

export default CustomSwitch;
