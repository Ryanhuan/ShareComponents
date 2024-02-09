import styled, { css } from "styled-components";

type FlexProps = {
  center?: any;
  middle?: any;
  "justify-end"?: any;
  between?: any;
};

export default styled.div.attrs<FlexProps>((props) => ({
  center: props.center,
  middle: props.middle,
  "justify-end": props["justify-end"],
  between: props.between,
}))`
  display: flex;

  ${(p) =>
    p.middle &&
    css`
      align-items: center;
    `};

  ${(p) =>
    p.center &&
    css`
      justify-content: center;
    `};

  ${(p) =>
    p["justify-end"] &&
    css`
      justify-content: flex-end;
    `};

  ${(p) =>
    p.between &&
    css`
      justify-content: space-between;
    `};
`;
