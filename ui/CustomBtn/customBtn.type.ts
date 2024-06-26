export type T_ItemProps = {
  className?: string;
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  width?: string;
  radius?: string;
  startIcon?: any;
  endIcon?: any;
  variant?: "contained" | "outlined" | "text";
  themeColor?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  spinnerClassName?: string;
  spinnerColor?: string;
  spinnerSize?: string;
  fontSize?: string;
  type?: "button" | "reset" | "submit";
  title?: string | React.ReactNode;
};
