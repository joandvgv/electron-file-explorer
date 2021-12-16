import { Col } from "antd";
import styled from "styled-components";

export const WrappedCol = styled(Col)`
  text-overflow: ellipsis;
  display: inline-flex;
  overflow: hidden;
  max-height: 2rem;
  padding-right: 0.5rem;
`;
