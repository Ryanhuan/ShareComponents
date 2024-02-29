import React from "react";
import { IconPropsType } from "./icon.type";
import clsx from "clsx";

export const IconClose = (props: IconPropsType) => {
  const { fill = "currentColor", filled, size, height, width, label, className, ...otherProps } = props;

  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("iconStyle", className)}
      {...otherProps}
    >
      <path
        d="m12.74 10.997 7.963-7.956a1.226 1.226 0 0 0 0-1.738 1.226 1.226 0 0 0-1.737 0L11 9.256 3.034 1.3a1.226 1.226 0 0 0-1.737 0 1.226 1.226 0 0 0 0 1.738l7.962 7.956-7.962 7.96a1.226 1.226 0 0 0 .869 2.096c.315 0 .628-.119.868-.36L11 12.735l7.966 7.96c.24.24.553.36.868.36.316 0 .629-.12.87-.36a1.226 1.226 0 0 0 0-1.738l-7.963-7.96z"
        fillRule="nonzero"
      />
    </svg>
  );
};
