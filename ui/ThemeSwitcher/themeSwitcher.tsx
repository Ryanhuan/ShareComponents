"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { IconSun, IconMoon } from "@share/icon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      size="lg"
      color="primary"
      onValueChange={(isSelected) => {
        isSelected ? setTheme("light") : setTheme("dark");
      }}
      thumbIcon={({ isSelected, className }) => (isSelected ? <IconSun className={className} /> : <IconMoon className={className} />)}
    ></Switch>
  );
}
