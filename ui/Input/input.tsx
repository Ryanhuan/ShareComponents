import React from "react";
import styled from "styled-components";
import { Input } from "@nextui-org/react";
import { TInputProps } from "./input.type";

const InputStyled = styled(Input)`
  min-width: 100px;
`;

const CustomInputStyled = React.forwardRef<any, TInputProps>((props, ref) => {
  const { isRequired, labelPlacement = "inside", placeholder = " ", children, ...otherProps } = props;
  return (
    <InputStyled ref={ref as any} isRequired={isRequired} labelPlacement={labelPlacement} placeholder={placeholder} {...otherProps}>
    </InputStyled>
  );
});

export { CustomInputStyled as Input };
