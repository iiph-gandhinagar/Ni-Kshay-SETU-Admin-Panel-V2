import { primaryCheckboxProps } from "inputs-props";
export const Checkbox: React.FC<primaryCheckboxProps> = ({
    id, label, checked = false, onChange, title, disabled = false, titleStyle, onClick
}) => {
    return (
        <div className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
            {label ? <label className="text-sm font-normal text-gray-700 mb-3"
                htmlFor={id}>{label}</label> : null}
            <label id={id}
                className="inline-flex"
                onClick={() => !disabled && onChange ? onChange(!checked) : null}>
                <input
                    disabled={disabled}
                    onClick={onClick}
                    type="checkbox"
                    className="form-checkbox outline-primary"
                    checked={checked}
                    onChange={() => !disabled && onChange ? onChange(!checked) : null}
                />
                {title ? <span className={`text-sm font-medium text-[#6B7280] ${disabled ? "opacity-40" : "opacity-100"} `}
                    style={titleStyle}>{title}</span> : null}
            </label>
        </div>
    );
};
