import { ChangeEvent } from "react";

export interface InputProps {
    inputId?: string;
    inputTestId?: string;
    label?: string;
    type?: string;
    isInvalid?: boolean;
    children?: any;
    inputChange?: (e: ChangeEvent<HTMLInputElement>) => {}
}