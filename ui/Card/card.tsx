import React from "react";
import styled from "styled-components";
import { clsx } from "clsx";
import { Card, CardBody, CardProps } from "@nextui-org/react";

type props = {} & CardProps;

const CardStyled = styled(Card)`
  margin: 10px;
  padding: 10px;
`;

const CustomCardStyled = React.forwardRef<any, props>((props, ref) => {
  const { children, ...otherProps } = props;

  return (
    <CardStyled className={clsx("frostedGlass")} ref={ref as any} {...otherProps}>
      <CardBody>{children}</CardBody>
    </CardStyled>
  );
});

export { CustomCardStyled as Card };
