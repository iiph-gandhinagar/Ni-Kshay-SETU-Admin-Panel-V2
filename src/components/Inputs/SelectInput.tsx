import { MultiSelectInputProps, SelectInputProps } from "inputs-props";
import React, { useMemo, useState } from "react";
import Select, { components, CSSObjectWithLabel } from "react-select";
import { FixedSizeList as List } from "react-window";
import { manageArray } from "../../utils/functions";
import IconCaretDown from "../Icon/IconCaretDown";
import { PrimaryBtn } from "../buttons/primaryBtn";

const CustomMenuList: React.FC<any> = ({
    options,
    children,
    getValue,
    height = 35,
    maxHeight = 300,
    emptyStateMessage = "No options available"
}) => {
    const [value] = getValue();
    if (!options || options.length === 0 || !children || children.length === 0) {
        return (
            <div className="text-center text-gray-500 p-3 bg-gray-50 border rounded-md">
                {emptyStateMessage}
            </div>
        );
    }
    const renderItem = React.useCallback(({ index, style }: {
        index: number,
        style: React.CSSProperties
    }) => {
        const child = children[index];
        const option = child?.props?.data;

        return (
            <div
                style={style}
                className={`
            truncate
            cursor-pointer
            hover:bg-gray-100
            transition-colors
            duration-200
            ${option?.disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${value === option ? "bg-blue-100 font-medium" : ""}
          `}
                title={option.label}
            >
                {child}
            </div>
        );
    }, [children, options, value]);

    return (
        <div className="overflow-hidden rounded-md border shadow-sm">
            <List
                height={Math.min(maxHeight, children.length * height)}
                itemCount={children.length}
                itemSize={height}
                width="100%"
                overscanCount={3}
            >
                {renderItem}
            </List>
        </div>
    );
};

export const SelectInput: React.FC<SelectInputProps> = ({
    id,
    label,
    autoFocus,
    isClearable,
    disabled,
    placeholder = "Select Option",
    errors,
    touched,
    openMenuOnClick,
    onInputChange,
    className = "",
    options,
    onChange,
    value,
    menuPortalTarget = document.body,
    menuPosition,
}) => {
    const sortedOptions = useMemo(() => {
        if (!options) return [];
        return [...options].sort((a, b) => a?.label?.localeCompare(b?.label));
    }, [options]);
    const DropdownIndicator = (props: any) => {
        return (
            <components.DropdownIndicator {...props}>
                <div className={props.selectProps.menuIsOpen ? "rtl:rotate-180 -rotate-180" : ""}>
                    <IconCaretDown />
                </div>
            </components.DropdownIndicator>
        );
    };
    return (
        <div>
            {label ? (
                <label htmlFor={id}
                    className='text-sm text-gray-700'
                    style={{ fontWeight: 400 }}>
                    {label}
                </label>
            ) : null}
            <Select
                autoFocus={autoFocus}
                id={id}
                openMenuOnClick={openMenuOnClick}
                isClearable={isClearable}
                isDisabled={disabled}
                onInputChange={onInputChange}
                className={`custom-select rounded-md font-normal ${errors && touched ? "border-[#E7515A]" : ""} ` + className}
                placeholder={placeholder}
                options={sortedOptions}
                menuPosition={menuPosition}
                isMulti={false}
                closeMenuOnSelect
                components={{
                    DropdownIndicator, IndicatorSeparator: null, MenuList: CustomMenuList, ClearIndicator: (props) => {
                        const {
                            children = "✖",
                            innerProps,
                        } = props;
                        return (
                            <div
                                {...innerProps}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    innerProps.onMouseDown && innerProps.onMouseDown(e);
                                }}
                                style={{ cursor: "pointer", padding: "0 8px", color: "#6B7280" }}
                            >
                                {children}
                            </div>
                        );
                    },
                }}
                isSearchable
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.stopPropagation();
                    }
                }}
                onChange={(newValue: any) => {
                    if (onChange) {
                        onChange(newValue?.value);
                    }
                }}
                value={options?.filter((e) => value === e.value)}
                menuPortalTarget={menuPortalTarget}
                styles={{
                    menuPortal: (provided, state) => ({
                        ...provided,
                        left: menuPosition == "fixed" ? undefined : provided.left
                    }) as CSSObjectWithLabel,
                    control: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isDisabled ? "white" : provided.backgroundColor,
                        boxShadow: state.isFocused ? "none" : provided.boxShadow,
                        border: errors && touched ? "1px solid #E7515A" : state.isFocused ? "1px solid #ced4da" : state.isDisabled ? "1px solid #f2f2f2" : "1px solid #E5E7EB",
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
            />
            {errors && touched ? (
                <span className="text-[#E7515A] mt-1 inline-block">{errors}</span>
            ) : null}
        </div>
    );
};

export const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
    id,
    label,
    autoFocus,
    onInputChange,
    inputValue,
    isClearable,
    disabled,
    placeholder = "Select Option",
    errors,
    touched,
    className = "",
    options,
    onChange,
    value,
    menuPortalTarget = document.body,
    maxValues,
    menuPosition = undefined,
    isSelectAll,
}) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const memoizedOptions = useMemo(() => {
        if (!options) return [];
        return [...options]
            ?.sort((a, b) => a?.label?.localeCompare(b?.label))
            .slice(0, 2000);
    }, [options]);
    const DropdownIndicator = (props: any) => (
        <components.DropdownIndicator {...props}>
            <div className={menuIsOpen ? "rtl:rotate-180 -rotate-180" : ""}>
                <IconCaretDown />
            </div>
        </components.DropdownIndicator>
    );
    return (
        <div className="relative w-full min-w-[200px] max-w-[400px]">
            {label ? (
                <label htmlFor={id}
                    className="text-sm text-gray-700"
                    style={{ fontWeight: 400 }}>
                    {label}
                </label>
            ) : null}
            <Select
                autoFocus={autoFocus}
                id={id}
                onInputChange={onInputChange}
                inputValue={inputValue}
                isClearable={isClearable}
                isDisabled={disabled}
                className={`flex-1 custom-select rounded-md font-normal ${errors && touched ? "border-[#E7515A]" : ""
                    } ${className}`}
                placeholder={
                    value && value?.length > 0 ? `${value?.length} Option${value?.length > 1 ? "s" : ""} Selected`
                        : placeholder
                }
                options={memoizedOptions}
                menuIsOpen={menuIsOpen}
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => setMenuIsOpen(false)}
                isMulti
                closeMenuOnSelect={false}
                isSearchable
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.stopPropagation();
                    }
                }}
                components={{
                    DropdownIndicator,
                    MultiValue: components.MultiValue,
                    MenuList: CustomMenuList,
                }}
                onChange={(newValue) => {
                    if (onChange) {
                        if (maxValues && newValue.length > 0) {
                            const temp: any[] = manageArray(
                                value || [],
                                newValue[newValue.length - 1].value,
                                maxValues
                            );
                            onChange(temp.filter((e) => e) || []);
                        } else {
                            onChange(newValue?.map((e: any) => e.value) || []);
                        }
                    }
                }}
                value={menuIsOpen ? options?.filter((e) => value?.find((v) => v === e.value)) : []}
                menuPortalTarget={menuPortalTarget}
                styles={{
                    menuPortal: (provided: any) => ({
                        ...provided,
                        left: menuPosition === "fixed" ? undefined : provided.left,
                    }),
                    control: (provided: any, state) => ({
                        ...provided,
                        backgroundColor: state.isDisabled ? "white" : provided.backgroundColor,
                        boxShadow: state.isFocused ? "none" : provided.boxShadow,
                        border: state.isFocused ? "1px solid #ced4da" : "1px solid #E5E7EB",
                        "&:hover": {
                            border: "1px solid #ced4da",
                        },
                    }),
                    indicatorSeparator: () => ({
                        display: "none",
                    }),
                    clearIndicator(base: any) {
                        return {
                            ...base,
                            cursor: "pointer",
                        };
                    },
                    option: (provided: any, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                            ? "#F6F7FA"
                            : state.isFocused
                                ? "#F6F7FA"
                                : "white",
                        color: "black",
                        fontFamily: "Maison, sans-serif",
                        fontSize: "15px",
                        "&:hover": {
                            backgroundColor: "#F6F7FA",
                            color: "black",
                        },
                    }),
                    placeholder: (provided: any, state) => ({
                        ...provided,
                        color: value && value?.length > 0 ? "#333" : "#6B7280",
                    }),
                }}
            />
            {errors && touched ? (
                <span className="text-[#E7515A] mt-1 inline-block">{errors}</span>
            ) : null}
            {isSelectAll ? (
                <PrimaryBtn
                    className="mt-3"
                    disabled={disabled}
                    onClick={() => {
                        if (onChange && typeof options === "object") {
                            if (options?.length === value?.length) {
                                onChange([]);
                            } else {
                                onChange(options?.map((e: any) => e.value));
                            }
                        }
                    }}
                    title={options?.length === value?.length ? "Clear" : "All"}
                />
            ) : null}
        </div>
    );
};
