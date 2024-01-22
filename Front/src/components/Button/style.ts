import styled from "styled-components";
import { IStyledButtonProps } from "./@types";

export const Container = styled.button<IStyledButtonProps>`
  height: 48px;
  width: 100%;
  background-color: ${({ tp }) =>
    tp === "login" ? "var(--color-primary-focus)" : "var(--color-primary-negative)"};
  border-radius: var(--border-radius);
  color: var(--grey-0);

  font-size: 16px;

  &:hover {
    background-color: var(--color-primary-focus);
  }
`;

