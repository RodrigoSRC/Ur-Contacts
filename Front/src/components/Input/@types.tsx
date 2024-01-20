import { HTMLProps} from "react"

export interface IInputProps extends HTMLProps<HTMLInputElement> {
    error?: { message: string } | undefined;
    type: string;
    placeholder: string;
    title: string;
  }