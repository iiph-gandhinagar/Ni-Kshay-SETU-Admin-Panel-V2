import { ConversionTextInputProps, CreatableSelectInputProps, PrepTextInputProps, PrimaryTextInputProps, TextSelectInputProps } from "inputs-props";
import { useEffect, useRef, useState } from "react";
import { CSSObjectWithLabel } from "react-select";
import CreatableSelect from "react-select/creatable";
export const PrimaryTextInput: React.FC<PrimaryTextInputProps> = ({
    label,
    id,
    type,
    placeholder,
    icon,
    className = "",
    errors,
    touched,
    value = "",
    height,
    iconRight,
    onChange,
    disabled,
    autoFocus,
    containerClassName,
    labelStyle,
    rightIconClick,
    onBlur,
    onEnterPress,
}) => {
    const refSufix = useRef<any>(null);
    const [pr, setPr] = useState<any>(undefined);
    useEffect(() => {
        if (refSufix?.current?.clientWidth) {
            setPr(refSufix?.current?.clientWidth + 15);
        }
    }, [pr, refSufix?.current?.clientWidth]);
    return (
        <div className={containerClassName}>
            {label ? (
                <label htmlFor={id}
                    className="text-sm text-gray-700"
                    style={{ fontWeight: 400, ...labelStyle }}>
                    {label}
                </label>
            ) : null}
            <div className="relative ">
                {type === "text-area" ? (
                    <textarea
                        id={id}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        style={{ height }}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => (onChange ? onChange(e.target.value) : null)}
                        className={`font-normal text-base ${disabled ? "disabled:cursor-not-allowed" : ""} form-input ${icon ? "ps-10" : ""}  ${errors && touched ? "border-[#E7515A]" : ""} ` + className} />
                ) : (
                    <input
                        id={id}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        type={type}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        value={value}
                        style={{
                            paddingRight: pr
                        }}
                        onKeyDown={(e) => {
                            if ((e.code === "ArrowDown" || e.code === "ArrowUp") && type === "number") {
                                e.preventDefault();
                            }
                            if (e.code === "Enter") {
                                e.stopPropagation();
                                onEnterPress && onEnterPress();
                            }
                        }}
                        onChange={(e) => (onChange ? onChange(e.target.value) : null)}
                        className={`font-normal text-base ${disabled ? "disabled:cursor-not-allowed" : ""} form-input ${icon ? "ps-10" : ""}  ${errors && touched ? "border-[#E7515A]" : ""} ` + className}
                    />
                )}
                {icon ? (
                    <span className="absolute start-4 top-1/2 -translate-y-1/2 font-normal">
                        {icon}
                    </span>
                ) : null}
                {iconRight ? (
                    <span
                        onClick={rightIconClick}
                        className="absolute end-2 top-1/2 -translate-y-1/2 font-normal">
                        {iconRight}
                    </span>
                ) : null}
            </div>
            {errors && touched ? (
                <span className="text-[#E7515A] mt-1 inline-block">{errors}</span>
            ) : null}
        </div>
    );
};

export const PrepTextInput: React.FC<PrepTextInputProps> = ({
    label,
    id,
    type = undefined,
    placeholder,
    icon,
    errors,
    touched,
    value = undefined,
    onChange = undefined,
    inputSufix,
    inputPrefix,
    disabled,
    autoFocus,
    west = 0
}) => {
    const refSufix = useRef<any>(null);
    const [pr, setPr] = useState<any>(undefined);
    useEffect(() => {
        if (refSufix?.current?.clientWidth) {
            setPr(refSufix?.current?.clientWidth + 15);
        };
    }, [pr, refSufix?.current?.clientWidth]);
    return (
        <div>
            {label ? (
                <label htmlFor={id}
                    className="text-sm text-gray-700"
                    style={{ fontWeight: 400 }}>
                    {label}
                </label>
            ) : null}
            <div className="relative ">
                <div className={`flex flex-row form-input gap-3 ${errors && touched ? "border-[#E7515A]" : ""} relative`}>
                    <span className='font-normal text-base text-gray-400 text-nowrap'>
                        {west} %
                    </span>
                    <div className='border-r-1 -my-2.5' />
                    <input
                        id={id}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        style={{
                            paddingRight: pr,
                            boxShadow: "none"
                        }}
                        onKeyDown={(e) => {
                            if ((e.code === "ArrowDown" || e.code === "ArrowUp") && type === "number") {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => (onChange ? onChange(e.target.value) : null)}
                        className={`font-normal text-base
                             py-0 w-20 border-none
                             ${disabled ? "disabled:cursor-not-allowed" : ""}

                               ${inputSufix ? "text-end " : ""}
                                `}
                    />

                </div>
                {inputSufix ? (
                    <span ref={refSufix}
                        className="absolute end-3 top-1/2 -translate-y-1/2 font-normal">
                        {inputSufix}
                    </span>
                ) : null}
                {inputPrefix ? (
                    <span className="absolute start-3 top-4 -translate-y-1/2 font-normal">
                        {inputPrefix}
                    </span>
                ) : null}
                {icon ? (
                    <span className="absolute start-4 top-1/2 -translate-y-1/2 font-normal">
                        {icon}
                    </span>
                ) : null}
            </div>
            {errors && touched ? (
                <span className="text-[#E7515A] mt-1 inline-block">{errors}</span>
            ) : null}
        </div>
    );
};
export const TextSelectInput: React.FC<TextSelectInputProps> = ({
    label,
    id,
    options,
    placeholder,
    errors,
    touched,
    textvalue,
    onChangeText,
    selectvalue,
    onChangeSelect,
    type,
    className,
    disabled
}) => {
    return (
        <div className={className}>
            {label ? (
                <label htmlFor={id}
                    className="text-sm text-gray-700"
                    style={{ fontWeight: 400 }}>
                    {label}
                </label>
            ) : null}
            <div className="relative">
                <input
                    type={type}
                    disabled={disabled}
                    id={id}
                    placeholder={placeholder}
                    value={textvalue}
                    onKeyDown={(e) => {
                        if ((e.code === "ArrowDown" || e.code === "ArrowUp") && type === "number") {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => (onChangeText ? onChangeText(e.target.value) : null)}
                    className={`min-h-[38px] form-input font-normal text-base block w-full rounded border-0 py-1.5 pl-2 pr-20 text-gray-900  ring-1 ring-inset ${errors && touched ? "ring-[#E7515A]" : "ring-gray-300"} placeholder:text-gray-400 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center border-l">
                    <select
                        disabled={disabled}
                        id="currency"
                        name="currency"
                        value={selectvalue || ""}
                        onChange={(e) => (onChangeSelect ? onChangeSelect(e.target.value) : null)}
                        className="h-full rounded border-0 bg-transparent py-0 pl-2  font-normal focus:ring-inset focus:ring-primary sm:text-sm">
                        <option value={""}
                            disabled>select</option>
                        {options?.map((item) => {
                            return (
                                <option value={item}
                                    key={item}>{item}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
            {errors && touched ? (
                <span className="text-[#E7515A] mt-1 inline-block">{errors}</span>
            ) : null}
        </div>
    );
};
export const ConversionTextInput: React.FC<ConversionTextInputProps> = ({
    label,
    id,
    type,
    placeholder,
    className = "",
    errors,
    touched,
    value,
    onChange,
    inputSufix,
}) => {
    const refSufix = useRef<any>(null);
    const [pr, setPr] = useState<any>(undefined);
    useEffect(() => {
        if (refSufix?.current?.clientWidth && inputSufix) {
            setPr(refSufix?.current?.clientWidth + 10 || (inputSufix?.length || 1) * 10);
        }
    }, [pr, refSufix?.current?.clientWidth]);
    return (
        <div>
            {label ? (
                <label htmlFor={id}
                    className="text-sm text-gray-700"
                    style={{ fontWeight: 400 }}>
                    {label}
                </label>
            ) : null}
            <div className="relative text-white-dark">
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    style={{
                        paddingRight: pr
                    }}
                    onKeyDown={(e) => {
                        if ((e.code === "ArrowDown" || e.code === "ArrowUp") && type === "number") {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => (onChange ? onChange(e.target.value) : null)}
                    className={`font-normal text-base form-input ps-20 ${inputSufix ? "text-end" : ""} ${errors && touched ? "border-[#E7515A]" : ""
                        } ` + className}
                />
                {inputSufix ? (
                    <span ref={refSufix}
                        className="absolute end-2 top-1/2 -translate-y-1/2">
                        {inputSufix}
                    </span>
                ) : null}
                <span className="absolute start-4 top-1/2 -translate-y-1/2 border-r-1 pr-2 min-h-9 flex items-center">
                    {"1 Kg ="}
                </span>
            </div>
            {errors && touched ? (
                <span className="text-[#E7515A] mt-1 inline-block">{errors}</span>
            ) : null}
        </div>
    );
};


export const CreatableSelectInput: React.FC<CreatableSelectInputProps> = ({
    isLoading,
    label,
    id,
    type = undefined,
    placeholder = "",
    options = [],
    isClearable,
    onInputChange,
    className = "",
    errors,
    disabled,
    onCreateOption = undefined,
    touched,
    value = undefined,
    height,
    onChange = undefined,
    autoFocus,
    noOptionsMessage,
    isMulti = false,
}) => {
    const DropdownIndicator = (props: any) => {
        return null;
    };
    const Option = (props: any, p1: any) => {
        if (props?.data?.supplier) {
            return (
                <div {...props.innerProps}
                    className={props.isFocused ? "custom-option focused" : "custom-option"}>
                    <div className="option-label">{props?.data?.label}</div>
                    <div className="option-supplier text-gray-400">{props?.data?.supplier}</div>
                </div>
            );
        } else {
            return <div {...props.innerProps}
                className={props.isFocused ? "custom-option focused" : "custom-option"}>{props?.label}</div>;
        }
    };
    const hasSupplier = options?.some(option => option.supplier);
    return (
        <div>
            {label ? (
                <label htmlFor={id}
                    className="text-sm text-gray-700"
                    style={{ fontWeight: 400 }}>
                    {label}
                </label>
            ) : null}
            <div className="relative ">
                <CreatableSelect
                    isMulti={isMulti}
                    isLoading={isLoading}
                    id={id}
                    autoFocus={autoFocus}
                    isClearable={isClearable}
                    isDisabled={disabled}
                    placeholder={placeholder}
                    openMenuOnFocus={false}
                    openMenuOnClick={false}
                    formatCreateLabel={noOptionsMessage}
                    onChange={(value) => { if (onChange) onChange(value); }}
                    options={options}
                    value={value}
                    components={hasSupplier ? { DropdownIndicator, Option: Option } : { DropdownIndicator }}
                    classNamePrefix="react-select"
                    onCreateOption={onCreateOption}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            boxShadow: state.isFocused ? "none" : provided.boxShadow,
                            border: errors && touched ? "1px solid #E7515A" : state.isFocused ? "1px solid #ced4da" : "1px solid #E5E7EB",
                            "&:hover": {
                                border: "1px solid #ced4da",
                            },
                        }) as CSSObjectWithLabel,
                        indicatorSeparator: () => ({
                            display: "none",
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? "#F6F7FA" : state.isFocused ? "#F6F7FA" : "white",
                            color: "black",
                            fontFamily: "Maison, sans-serif",
                            fontSize: "15px",
                            "&:hover": {
                                backgroundColor: "#F6F7FA",
                                color: "black"
                            },
                        }) as CSSObjectWithLabel,
                    }}
                    menuPortalTarget={document.body}
                    className={`custom-select rounded-md font-normal ${errors && touched ? "border-[#E7515A]" : ""} ` + className} />
            </div>
            {errors && touched ? (
                <span className="text-[#E7515A] mt-1 inline-block">{errors}</span>
            ) : null}
        </div>
    );
};
