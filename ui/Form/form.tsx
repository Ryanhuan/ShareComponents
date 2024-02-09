import React from "react";
import styled from "styled-components";

interface props extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const FormStyled = styled.form``;

const CustomFormStyled = React.forwardRef<any, props>((props, ref) => {
  const { children, ...otherProps } = props;
  return (
    <FormStyled ref={ref as any} {...otherProps}>
      {children}
    </FormStyled>
  );
});

export { CustomFormStyled as Form };
