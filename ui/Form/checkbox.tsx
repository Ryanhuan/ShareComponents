import React from "react";
import styled from "styled-components";
import { clsx } from "clsx";
import { TFromItemProps } from "./form.type";
import { rulesMsg } from "@/lib/utils/form";
import { Checkbox, CheckboxProps } from "@nextui-org/react";
import { Controller } from "react-hook-form";

type checkboxProps = { control: any; label?: string } & TFromItemProps & CheckboxProps;

const CheckboxStyled = styled(Checkbox)`
  margin: 5px;
`;

const FormCheckbox = React.forwardRef<any, checkboxProps>((props, _) => {
  const { name, label = " ", value, register, errors, isRequired, validationSchema, control, className, ...otherProps } = props;

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
        <CheckboxStyled {...field} className={clsx(isRequired && "isRequired", className)} {...otherProps}>
          {label}
        </CheckboxStyled>
      )}
    />
  );
});

export default FormCheckbox;
