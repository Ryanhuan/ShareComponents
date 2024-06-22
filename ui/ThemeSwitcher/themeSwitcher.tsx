"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { IconSun, IconMoon } from "@share/icon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect(() => {
  //   console.log("theme", theme);

  //   const _theme = theme === "light";
  //   console.log("_theme", _theme);

  //   setMounted(_theme);
  // }, [theme]);

  return (
    <Switch
      size="lg"
      color="primary"
      defaultSelected
      onValueChange={(isSelected) => {
        isSelected ? setTheme("dark") : setTheme("light");
      }}
      thumbIcon={({ isSelected, className }) => (isSelected ? <IconMoon className={className} /> : <IconSun className={className} />)}
    ></Switch>
  );
}
