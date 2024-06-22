import React from "react";
import styled from "styled-components";
import { TimePicker, TimePickerProps } from "antd";
import clsx from "clsx";
import { useTheme } from "next-themes";

export type TTimePickerProps = {
  format?: string;
  label?: string;
  className?: string;

  errorMessage?: string;
  isRequired?: boolean;
} & TimePickerProps;

const TimePickerStyled = styled.div<{ $theme: any }>`
  display: flex;
  flex-direction: column;

  .ant-picker {
    cursor: pointer !important;

    input,
    .ant-picker-suffix {
      color: ${(p) => (p.$theme === "dark" ? "#fff" : "#000")};
    }
  }
`;

const ErrorMessageStyled = styled.span`
  color: rgba(220, 53, 69, 1) !important;
  font-size: 12px;
`;

const CustomTimePickerStyled = React.forwardRef<any, TTimePickerProps>((props, _) => {
  const { format = "HH:mm:ss", label = "", className, errorMessage, isRequired, ...otherProps } = props;
  const { theme } = useTheme();

  return (
    <TimePickerStyled $theme={theme} className={clsx(isRequired && "isRequired", "TimePickerStyled", className)}>
      <label
        data-slot="label"
        className="pointer-events-none origin-top-left subpixel-antialiased block  will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-foreground group-data-[filled-within=true]:pointer-events-auto pb-0 z-20 top-1/2 -translate-y-1/2 group-data-[filled-within=true]:left-0 left-3 text-small group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)] pe-2 max-w-full text-ellipsis overflow-hidden mt-3"
      >
        {label || ""}
      </label>

      <div
        className={clsx(
          "pickerBack relative inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-unit-10 min-h-unit-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background is-filled"
        )}
        style={{ cursor: "text", display: "flex", flexDirection: "column" }}
      >
        <div className="inline-flex w-full items-center h-full ">
          <TimePicker
            format={format}
            variant="borderless"
            className={clsx(
              "w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full is-filled"
            )}
            {...otherProps}
          />
        </div>
      </div>
      <ErrorMessageStyled>{errorMessage && errorMessage}</ErrorMessageStyled>
    </TimePickerStyled>
  );
});

export { CustomTimePickerStyled as TimePicker };
