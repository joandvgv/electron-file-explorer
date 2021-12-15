import React, { FunctionComponent } from "react";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};

const TextStyle = styled.span`
  font-size: 1.5em;
  text-overflow: ellipsis;
`;

export const Text: FunctionComponent<Props> = ({ children }) => (
  <TextStyle>{children}</TextStyle>
);
