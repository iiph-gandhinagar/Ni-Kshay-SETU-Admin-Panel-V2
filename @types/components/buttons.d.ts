import { CSSProperties, MouseEventHandler, ReactNode } from "react";

export interface PrimaryBtnProps {
    title: string;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isUpper?: boolean;
    isFullWidth?: boolean;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    isLoading?: boolean;
}
export interface BorderBtnProps {
    title: string;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isUpper?: boolean;
    isFullWidth?: boolean;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    isLoading?: boolean;
    textColor?: string;
    borderColor?: string;
}
