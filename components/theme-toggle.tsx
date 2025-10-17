"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (mounted ? resolvedTheme ?? theme : "system") === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Alternar tema"
      aria-pressed={isDark}
      className="relative"
    >
      <span className="sr-only">Alternar tema</span>
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -10, scale: 0.85 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 10, scale: 0.85 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex"
        >
          {isDark ? (
            <Moon aria-hidden className="h-5 w-5" />
          ) : (
            <Sun aria-hidden className="h-5 w-5" />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
