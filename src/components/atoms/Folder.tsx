import styled, { css } from "styled-components";
import { FolderFilled } from "@ant-design/icons";
import React from "react";

const sizesMap = {
  sm: "1rem",
  md: "1.5rem",
  lg: "1.8rem",
  xl: "2rem",
};

export type Size = keyof typeof sizesMap;

const getFontSize = (size: Size) => css`
  font-size: ${sizesMap[size] || "sm"};
`;

export const Folder = styled(FolderFilled)<{
  $size?: keyof typeof sizesMap;
}>`
  ${(props) => props.$size && getFontSize(props.$size)}
`;

export const Icon = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)<{
  $size?: keyof typeof sizesMap;
}>`
  ${(props) => props.$size && getFontSize(props.$size)}
`;
