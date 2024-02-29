import React from "react";
import styled from "styled-components";
import { isEmpty, isNil } from "ramda";
import { Input, TInputProps } from "../Input";
import { TFromItemProps } from "./form.type";
import { clsx } from "clsx";
import { rulesMsg } from "@/lib/utils/form";

type props = {} & TFromItemProps & TInputProps;

const FormInputStyled = styled.div`
  padding: 5px;

  > .isRequired {
    label {
      white-space: nowrap;

      &::before {
        content: "＊";
        color: red;
        margin: 0 5px;
      }
    }
  }
`;

const FormInput = React.forwardRef<any, props>((props, ref) => {
  const { name, label, type, register, errors, isRequired, validationSchema, className, ...otherProps } = props;

  const _validationSchema = {
    ...validationSchema,
    required: isRequired,
  };

  return (
    <FormInputStyled>
      <Input
        ref={ref as any}
        type={type}
        name={name}
        label={label}
        className={clsx(isRequired && "isRequired", className)}
        {...register(name, _validationSchema)}
        isInvalid={isEmpty(errors[name]) || !isNil(errors[name])}
        errorMessage={errors && errors[name]?.type === "required" && (errors[name]?.message || rulesMsg.isRequired)}
        {...otherProps}
      />
    </FormInputStyled>
  );
});

export default FormInput;
