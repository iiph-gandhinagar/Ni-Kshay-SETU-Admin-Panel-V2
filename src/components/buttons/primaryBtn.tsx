import { BorderBtnProps, PrimaryBtnProps } from "../../../@types/components/buttons";
import IconLoader from "../Icon/IconLoader";
export const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
    title,
    disabled,
    className = "",
    style,
    onClick,
    isUpper = false,
    isFullWidth = false,
    leftIcon,
    rightIcon,
    type,
    isLoading
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`btn btn-primary gap-2 ${isUpper ? "uppercase" : ""} ${isFullWidth ? "w-full" : ""} ${isLoading ? "cursor-progress" : ""} border-0  shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] ` + className}
            style={style}
            onClick={isLoading ? undefined : onClick}>
            {isLoading ? <IconLoader
                className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0"
            /> : null}
            {leftIcon}
            {title}
            {rightIcon}
        </button>
    );
};

export const BorderBtn: React.FC<BorderBtnProps> = ({
    title,
    disabled,
    className = "",
    style,
    onClick,
    isUpper = false,
    isFullWidth = false,
    leftIcon,
    rightIcon,
    type,
    isLoading,
    textColor = "text-[#6B7280]",
    borderColor = "border-[#6B7280]"
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`btn btn-outline gap-2 ${isUpper ? "uppercase" : ""} ${isFullWidth ? "w-full" : ""} ${isLoading ? "cursor-progress" : ""} ${borderColor} ${textColor}  shadow-none font-normal ` + className}
            style={style}
            onClick={isLoading ? undefined : onClick}>
            {isLoading ? <IconLoader
                className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0"
            /> : null}
            {leftIcon}
            {title}
            {rightIcon}
        </button>
    );
};
