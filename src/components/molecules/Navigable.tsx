import styled, { css } from "styled-components";
import { Row } from "antd";
import colors from "../../utils/colors";

const getStyles = ($selected: boolean) => css`
  background-color: ${$selected ? colors.secondaryColor : colors.white};
`;

export const Navigable = styled(Row)<{
  $selected?: boolean;
}>`
  border-radius: 5px;
  padding: 6px;
  ${(props) => props.$selected && getStyles(props.$selected)}
`;
