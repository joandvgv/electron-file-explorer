import React, { FunctionComponent } from "react";
import { getFontSize, sizesMap } from "../../utils/constants";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
  size?: keyof typeof sizesMap;
};

const TextStyle = styled.span<{
  $size?: keyof typeof sizesMap;
}>`
  font-size: 1.5rem;
  ${(props) => props.$size && getFontSize(props.$size)}
  text-overflow: ellipsis;
`;

export const Text: FunctionComponent<Props> = ({ children, size }) => (
  <TextStyle $size={size}>{children}</TextStyle>
);
