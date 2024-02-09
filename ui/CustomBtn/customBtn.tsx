import { useState, useEffect } from "react";
import { clsx } from "clsx";
import styled, { css } from "styled-components";
import { T_ItemProps } from "./customBtn.type";

export const CustomBtn: React.FC<T_ItemProps> = ({
  className,
  spinnerClassName,
  themeColor,
  spinnerColor,
  spinnerSize,
  href,
  isLoading,
  isDisabled,
  variant = "contained",
  radius = "8",
  width,
  startIcon,
  endIcon,
  onClick,
  fontSize = "14",
  type = "button",
  title,
  children,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [finalThemeColor, setFinalThemeColor] = useState("#b3d6dd");
  const [finalSpinnerColor, setFinalSpinnerColor] = useState("#474bff");

  useEffect(() => {
    if (themeColor != undefined) useColor("themeColor", themeColor);
    if (spinnerColor != undefined) useColor("spinnerColor", spinnerColor);
  }, [themeColor, spinnerColor]);

  const containedStyle = {
    backgroundColor: finalThemeColor,
    opacity: isDisabled ? "1" : isHovering ? "0.3" : "1",
  };

  const outlinedStyle = {
    backgroundColor: isDisabled ? "var(--disable)" : isHovering ? finalThemeColor : "#fff",
    border: "1px solid " + finalThemeColor,
  };

  const textStyle = {
    backgroundColor: "#fff",
  };

  const variantMap: { contained: Object; outlined: Object; text: Object } = {
    contained: containedStyle,
    outlined: outlinedStyle,
    text: textStyle,
  };

  const aContainedStyle = {};

  const aOutlinedStyle = {
    color: isHovering || isDisabled ? "#fff" : finalThemeColor,
  };

  const aTextStyle = {
    color: finalThemeColor,
  };

  const aVariantMap: { contained: Object; outlined: Object; text: Object } = {
    contained: aContainedStyle,
    outlined: aOutlinedStyle,
    text: aTextStyle,
  };

  function useColor(type: string, themeColor: string) {
    let isValidColorCode = false;
    if (themeColor.startsWith("#")) {
      const colorRegex = new RegExp(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)/);
      isValidColorCode = colorRegex.test(themeColor?.toLocaleLowerCase());
    }
    if (type == "themeColor") {
      const madeColor = isValidColorCode ? themeColor : "#000";
      setFinalThemeColor(madeColor);
    } else if ((type = "spinnerColor")) {
      const madeColor = isValidColorCode ? themeColor : "#fff";
      setFinalSpinnerColor(madeColor);
    }
  }

  return (
    <BtnStyled
      className={clsx(variant, className, isDisabled && "isDisabledStyle")}
      style={{
        ...variantMap[variant],
        borderRadius: `${radius}px`,
        fontSize: `${fontSize}px`,
        width: width,
      }}
      onMouseOver={() => {
        setIsHovering(true);
      }}
      onMouseOut={() => {
        setIsHovering(false);
      }}
      onClick={
        isDisabled
          ? (e) => {
              e.preventDefault();
            }
          : onClick
      }
      type={type}
    >
      <a href={href || undefined} style={aVariantMap[variant]}>
        {isLoading && <div className={clsx("spinner", spinnerClassName)} style={{ borderColor: finalSpinnerColor, width: spinnerSize }}></div>}
        {startIcon && <div className="startIconStyle">{startIcon}</div>}
        <span>{children || title || "BUTTON"}</span>
        {endIcon && <div className="endIconStyle">{endIcon}</div>}
      </a>
    </BtnStyled>
  );
};

const BtnAnimation = css`
  @keyframes spinner-bulqg1 {
    0% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
    }

    12.5% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
    }

    25% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
    }

    50% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
    }

    62.5% {
      clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
    }

    75% {
      clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
    }

    100% {
      clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
    }
  }

  @keyframes spinner-oaa3wk {
    0% {
      transform: scaleY(1) rotate(0deg);
    }

    49.99% {
      transform: scaleY(1) rotate(135deg);
    }

    50% {
      transform: scaleY(-1) rotate(0deg);
    }

    100% {
      transform: scaleY(-1) rotate(-135deg);
    }
  }
`;

const BtnStyled = styled.button`
  display: flex;
  height: 36px;
  min-width: 120px;
  align-items: center;
  justify-content: space-between;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
  transition: 0.3s;
  background-color: var(--mainColor);
  cursor: pointer;

  &.isDisabledStyle {
    cursor: not-allowed !important;
    filter: grayscale(70%);
    opacity: 0.5;
  }

  &.text:not(.isDisabledStyle):hover {
    -webkit-box-shadow: 3px 3px 3px 2.5px #dddddd;
    -moz-box-shadow: 3px 3px 3px 2.5px #dddddd;
    box-shadow: 3px 3px 3px 2.5px #dddddd;
  }

  a {
    display: flex;
    text-decoration: none;
    font-weight: 500;
    margin: auto;
    color: #fff;
  }

  .spinner {
    margin-right: 8px;
    width: 12px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: 3px solid #474bff;
    animation: spinner-bulqg1 0.8s infinite linear alternate, spinner-oaa3wk 1.6s infinite linear;
  }

  .startIconStyle {
    margin-right: 10px;
  }

  .endIconStyle {
    margin-left: 10px;
  }

  ${BtnAnimation}
`;

export default CustomBtn;
