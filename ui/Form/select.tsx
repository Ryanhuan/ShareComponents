import React from "react";
import styled from "styled-components";
import { isEmpty, isNil } from "ramda";
import { Select, TSelectProps } from "../Select";
import { TFromItemProps } from "./form.type";
import { clsx } from "clsx";
import { rulesMsg } from "@/lib/utils/form";

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
    ...validationSchema,
    required: isRequired,
  };

  return (
    <FormSelectStyled
      ref={ref as any}
      className={clsx(isRequired && "isRequired", className)}
      {...register(name, _validationSchema)}
      isInvalid={isEmpty(errors[name]) || !isNil(errors[name])}
      errorMessage={(errors && errors[name]?.type === "required" && (errors[name]?.message || rulesMsg.isRequired))}
      {...otherProps}
    />
  );
});

export default FormSelect;
