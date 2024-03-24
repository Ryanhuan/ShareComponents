import React from "react";
import styled from "styled-components";
import { clsx } from "clsx";
import { TFromItemProps } from "./form.type";
import { rulesMsg } from "@/lib/utils/form";
import { Controller } from "react-hook-form";
import { Switch, SwitchProps } from "@nextui-org/react";

type switchProps = { control: any; label?: string } & TFromItemProps & SwitchProps;

const SwitchStyled = styled(Switch)`
  margin: 5px 15px;
`;

const FormSwitch = React.forwardRef<any, switchProps>((props, _) => {
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
        <SwitchStyled {...field} className={clsx(isRequired && "isRequired", className)} {...otherProps}>
          {label}
        </SwitchStyled>
      )}
    />
  );
});

export default FormSwitch;
