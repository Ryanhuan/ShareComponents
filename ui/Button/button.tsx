import React from "react";
import styled from "styled-components";
import { Button, ButtonGroup, ButtonProps } from "@nextui-org/react";
import clsx from "clsx";

const ButtonStyled = styled(Button)``;

type props = { children?: React.ReactNode; className?: string } & ButtonProps;

const CustomButtonStyled = React.forwardRef<any, props>((props, ref) => {
  const { children, className, ...otherProps } = props;

  return (
    <ButtonStyled className={clsx(className)} ref={ref as any} {...otherProps}>
      {children}
    </ButtonStyled>
  );
});

const ButtonGroupStyled = styled(ButtonGroup)``;

export { CustomButtonStyled as Button, ButtonGroupStyled as ButtonGroup };
