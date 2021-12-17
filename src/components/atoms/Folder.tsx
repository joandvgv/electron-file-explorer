import styled from "styled-components";
import { FolderFilled } from "@ant-design/icons";
import React from "react";
import { getFontSize, sizesMap } from "../../utils/constants";

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
