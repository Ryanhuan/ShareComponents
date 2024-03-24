import React from "react";
import styled from "styled-components";
import { TFromItemProps } from "./form.type";
import { rulesMsg } from "@/lib/utils/form";
import { CheckboxGroup, CheckboxGroupProps } from "@nextui-org/react";
import { Controller } from "react-hook-form";

type checkboxGroupProps = { control: any; children?: React.ReactNode } & TFromItemProps & CheckboxGroupProps;

const CheckboxGroupStyled = styled(CheckboxGroup)``;

const FormCheckboxGroup = React.forwardRef<any, checkboxGroupProps>((props, _) => {
  const { label, name, control, register, errors, isRequired, validationSchema, className, children, ...otherProps } = props;

  const _validationSchema = {
    required: isRequired ? rulesMsg.isRequired : "",
    ...validationSchema,
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={_validationSchema}
      render={({ field }) => (
        <CheckboxGroupStyled label={label} {...field} value={undefined} {...otherProps}>
          {children}
        </CheckboxGroupStyled>
      )}
    />
  );
});

export default FormCheckboxGroup;
