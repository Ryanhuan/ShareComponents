import React from "react";
import styled from "styled-components";
import { isEmpty } from "ramda";
import { TimePickerRange, TTimePickerRangeProps } from "@components/ui/TimePickerRange";
import { TFromItemProps } from "./form.type";
import { clsx } from "clsx";

type props = { className?: string } & TFromItemProps & TTimePickerRangeProps;

const FormTimePickerRangeStyled = styled(TimePickerRange)`
  padding: 5px;

  &.isRequired {
    label::before {
      content: "＊";
      color: red;
      margin: 0 5px;
    }
  }

  // error style
  &:has(.ant-picker-status-error) .pickerBack {
    background-color: hsl(340 85% 10%) !important;
  }

  &:has(.ant-picker-status-error) label {
    color: #f31260 !important;
  }

  :where(.css-dev-only-do-not-override-1b0bdye).ant-picker:not(.ant-picker-disabled):not([disabled]).ant-picker-status-error {
    .ant-picker-active-bar {
      background: rgba(220, 53, 69, 1);
    }
  }
`;

const FormTimePickerRange = React.forwardRef<any, props>((props, ref) => {
  const { name, type, register, errors, isRequired, validationSchema, className, ...otherProps } = props;

  const _validationSchema = {
    required: isRequired,
    ...validationSchema,
  };

  return (
    <FormTimePickerRangeStyled
      ref={ref as any}
      type={type}
      name={name}
      className={clsx(isRequired && "isRequired", className)}
      {...register(name, _validationSchema)}
      status={!isEmpty(errors) && "error"}
      errorMessage={errors && errors[name]?.type === "required" && (errors[name]?.message || "欄位為必填")}
      isRequired={isRequired}
      {...otherProps}
    />
  );
});

export default FormTimePickerRange;
