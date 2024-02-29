import { TimeRangePickerProps } from "antd";
export type TTimePickerRangeProps = {
  format?: string;
  label?: string;
  className?: string;

  errorMessage?: string;
  isRequired?: boolean;
} & TimeRangePickerProps;
