import { IconPropsType } from "./icon.type";

export const IconArrowRight = (props: IconPropsType) => {
  const { fill = "currentColor", filled, size, height, width, label, ...otherProps } = props;

  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
