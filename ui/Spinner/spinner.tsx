import React from "react";
import styled from "styled-components";
import { Spinner, SpinnerProps } from "@nextui-org/react";
import clsx from "clsx";

type TSpinnerProps = {
  isLoading: boolean;
} & SpinnerProps;

const SpinnerStyled = styled(Spinner)``;

const CustomSpinnerStyled = React.forwardRef<any, TSpinnerProps>((props, ref) => {
  const { size = "lg", className, isLoading = false, ...otherProps } = props;

  return (
    <>
      {isLoading && (
        <SpinnerStyled size={size} className={clsx("absolute w-[100%] h-[100%] z-10 bg-gray-700 bg-opacity-80", className)} {...otherProps} />
      )}
    </>
  );
});

export { CustomSpinnerStyled as Spinner };
