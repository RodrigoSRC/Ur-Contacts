import { ReactNode, ButtonHTMLAttributes } from "react";

export interface IStyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tp?: "login" | "register";
  children?: ReactNode;
}
