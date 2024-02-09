import { SelectProps } from "@nextui-org/react";

export type TSelectProps = Omit<SelectProps, "children"> & {
  Options: { label: any; value: any }[];
  children?: any;
};
