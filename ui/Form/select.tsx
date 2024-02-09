import React from "react";
import styled from "styled-components";
import { isEmpty } from "ramda";
import { Select, TSelectProps } from "../Select";
import { TFromItemProps } from "./form.type";
import { clsx } from "clsx";

type props = {} & TFromItemProps & TSelectProps;

const FormSelectStyled = styled(Select)`
  padding: 5px;

  &.isRequired {
    label::before {
      content: "＊";
      color: red;
      margin: 0 5px;
    }
  }
`;

const FormSelect = React.forwardRef<any, props>((props, ref) => {
  const { name, type, register, errors, isRequired, validationSchema, className, ...otherProps } = props;

  const _validationSchema = {
    required: isRequired,
    ...validationSchema,
  };

  return (
    <FormSelectStyled
      ref={ref as any}
      type={type}
      className={clsx(isRequired && "isRequired", className)}
      {...register(name, _validationSchema)}
      isInvalid={!isEmpty(errors)}
      errorMessage={errors && errors[name]?.type === "required" && (errors[name]?.message || "欄位為必填")}
      {...otherProps}
    />
  );
});

export default FormSelect;
