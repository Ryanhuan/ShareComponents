import React from "react";
import styled from "styled-components";
import { TimePickerRange, TTimePickerRangeProps } from "../TimePickerRange";
import { TFromItemProps } from "./form.type";
import { clsx } from "clsx";
import { rulesMsg } from "@/lib/utils/form";

import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { useTheme } from "next-themes";

type props = { className?: string; rules?: any; control: any } & TFromItemProps & TTimePickerRangeProps;

const FormTimePickerRangeContentStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormTimePickerRangeStyled = styled(TimePickerRange)<{ $currentTheme: string }>`
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
    background-color: ${(p) => p.theme[p.$currentTheme].input.errorBg} !important;
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

const ErrorMessageStyled = styled.span`
  color: ${(p) => p.theme.form.errorFont};
  font-size: 12px;
  margin: 0 0 0 10px;
`;

const FormTimePickerRange = React.forwardRef<any, props>((props, _) => {
  const { register, type, name, errors, isRequired, validationSchema, className, control, rules, ...otherProps } = props;

  const { theme } = useTheme();
  const _validationSchema = {
    required: isRequired ? rulesMsg.isRequired : "",
    ...validationSchema,
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={_validationSchema}
      render={({ field, fieldState }) => {
        return (
          <FormTimePickerRangeContentStyled>
            <FormTimePickerRangeStyled
              $currentTheme={theme || "dark"}
              status={fieldState.error ? "error" : undefined}
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={field.value ? [dayjs(field.value[0]), dayjs(field.value[1])] : null}
              onChange={(date) => {
                field.onChange(date ? date.valueOf() : null);
              }}
              className={clsx(isRequired && "isRequired", className)}
              {...otherProps}
            />
            {fieldState.error ? <ErrorMessageStyled>{fieldState.error?.message}</ErrorMessageStyled> : null}
          </FormTimePickerRangeContentStyled>
        );
      }}
    />
  );
});

export default FormTimePickerRange;
