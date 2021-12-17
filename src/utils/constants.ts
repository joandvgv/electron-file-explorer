import { css, FlattenSimpleInterpolation } from "styled-components";

export const sizesMap = {
  sm: "1rem",
  md: "1.5rem",
  lg: "1.8rem",
  xl: "2rem",
};

export type Size = keyof typeof sizesMap;

export const getFontSize = (size: Size): FlattenSimpleInterpolation => css`
  font-size: ${sizesMap[size] || "sm"};
`;
