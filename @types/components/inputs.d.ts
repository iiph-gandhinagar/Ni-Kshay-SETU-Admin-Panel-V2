declare module "inputs-props" {
    import { CSSProperties, ReactNode } from "react";
    import { MenuPosition } from "react-select";
    type HTMLInputTypeAttribute =
        | "button"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "image"
        | "month"
        | "number"
        | "password"
        | "radio"
        | "range"
        | "reset"
        | "search"
        | "submit"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week"
        | (string & {});
    export interface PrepTextInputProps {
        label?: string;
        id: string;
        type?: HTMLInputTypeAttribute
        placeholder?: string;
        icon?: ReactNode;
        errors?: string | Array<string>;
        touched?: boolean;
        value?: string | number | readonly string[]
        onChange?: (value?: string) => void,
        inputSufix?: string;
        inputPrefix?: string;
        disabled?: boolean;
        autoFocus?: boolean;
        west?: number | string;
    }
    export interface PrimaryTextInputProps {
        label?: string;
        id: string;
        type?: HTMLInputTypeAttribute
        placeholder?: string;
        icon?: ReactNode;
        iconRight?: ReactNode;
        containerClassName?: string;
        className?: string;
        errors?: string | Array<string>;
        height?: number;
        touched?: boolean;
        value?: string | number | readonly string[]
        onChange?: (value?: string | number | any) => void,
        disabled?: boolean;
        autoFocus?: boolean;
        labelStyle?: CSSProperties
        rightIconClick?: () => void
        onBlur?: () => void
        onEnterPress?: () => void
    }
    export interface CreatableSelectInputProps {
        isMulti?: boolean;
        isLoading?: boolean;
        label?: string;
        id: string;
        type?: HTMLInputTypeAttribute
        placeholder?: string;
        options?: Array<{ label: string, value: string, supplier?: string }>;
        className?: string;
        errors?: string | Array<string>;
        height?: number;
        isClearable?: boolean;
        touched?: boolean;
        value?: string | number | undefined | PropsValue<Option>;
        onChange?: (value?: string | null | OnChangeValue<Option, IsMulti>) => void,
        onCreateOption?: (value?: string) => void,
        onInputChange?: (value?: string) => void,
        inputSufix?: string;
        inputPrefix?: string;
        disabled?: boolean;
        autoFocus?: boolean;
        noOptionsMessage?: (inputValue: string) => ReactNode;
    }
    interface ComboboxItem { label: string, value: string, disabled?: boolean; }
    interface ComboboxItemGroup<T = ComboboxItem | string> {
        group: string;
        items: T[];
    }
    export interface EditorInputProps {
        label?: string;
        id: string;
        type?: HTMLInputTypeAttribute
        placeholder?: string;
        icon?: ReactNode;
        className?: string;
        errors?: string | Array<stsring>;
        height?: number;
        touched?: boolean;
        value?: string | number | readonly string[] | ReactQuill.Value | undefined
        onChange?: (value?: string) => void,
        labelStyle?: CSSProperties,
        mediaFlag?: string,
        isVideo?: boolean
    }

    export interface SelectInputProps {
        label?: string;
        id: string;
        openMenuOnClick?: boolean;
        autoFocus?: boolean;
        isClearable?: boolean;
        disabled?: boolean;
        placeholder?: ReactNode;
        errors?: string | Array<string>;
        touched?: boolean;
        className?: string;
        onInputChange?: (newValue: string) => void;
        options?: Array<{ label: string, value: String | any }>;
        onChange?: ((newValue: string) => void);
        value?: string | null | undefined | any;
        menuPortalTarget?: HTMLElement | null | undefined;
        menuPosition?: MenuPosition
    }

    export interface MultiSelectInputProps {
        isSelectAll?: boolean,
        onInputChange?: (newValue: string) => void
        inputValue?: string | undefined
        menuPosition?: MenuPosition
        label?: string;
        id: string;
        autoFocus?: boolean;
        isClearable?: boolean;
        disabled?: boolean;
        display?: string;
        placeholder?: ReactNode;
        errors?: string | Array<string>;
        touched?: boolean;
        className?: string;
        options?: Array<{ label: string, value: string }>;
        onChange?: ((value: string[]) => void)
        value?: string[];
        menuPortalTarget?: HTMLElement | null | undefined;
        maxValues?: number
        showSelectedCount?: boolean;
    }

    export interface FileUploadProps {
        disabled?: boolean;
        editable?: boolean;
        values: Array<string>;
        modelName?: string;
        size?: string;
        onUpload: (e: Array<string>) => void;
        wrapperClassName?: string;
        errors?: string | Array<string>;
        touched?: boolean;
    }

    export interface TextSelectInputProps {
        disabled?: boolean;
        label?: string;
        id: string;
        options: Array<string>;
        placeholder?: string;
        errors?: string | Array<string>;
        touched?: boolean;
        textvalue?: string;
        onChangeText: (value?: string) => void;
        selectvalue?: string;
        onChangeSelect: (value?: string) => void;
        type?: HTMLInputTypeAttribute;
        className?: string
    }
    export interface ConversionTextInputProps {
        label?: string;
        id: string;
        type?: HTMLInputTypeAttribute
        placeholder?: string;
        className?: string;
        errors?: string | Array<string>;
        touched?: boolean;
        value?: string | number | readonly string[]
        onChange?: (value?: string) => void,
        inputSufix?: string
    }
    export interface primaryCheckboxProps {
        label?: string;
        id: string;
        checked?: boolean;
        onChange?: (value: boolean) => void;
        title?: string;
        disabled?: boolean
        titleStyle?: CSSProperties,
        onClick?: (value: any) => void
    }
}
