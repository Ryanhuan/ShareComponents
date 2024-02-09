import React from "react";
import styled from "styled-components";
import { Select, SelectItem } from "@nextui-org/react";
import { TSelectProps } from "./select.type";

const SelectStyled = styled(Select)`
  min-width: 100px;
`;

const CustomSelectStyled = React.forwardRef<any, TSelectProps>((props, ref) => {
  const { label = "Select", Options, placeholder = "-Select-", labelPlacement = "outside", className, isRequired, ...otherProps } = props;

  return (
    <SelectStyled
      label={label}
      placeholder={placeholder}
      ref={ref as any}
      isRequired={isRequired}
      className={className}
      labelPlacement={labelPlacement}
      {...otherProps}
    >
      {Options.map((Option: any) => (
        <SelectItem key={Option.value} value={Option.value}>
          {Option.label}
        </SelectItem>
      ))}
    </SelectStyled>
  );
});

export { CustomSelectStyled as Select };
