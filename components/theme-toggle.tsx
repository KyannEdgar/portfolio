"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme placeholder"
        className="h-9 w-9 rounded-md border border-card-border bg-card/60 flex items-center justify-center opacity-70 cursor-pointer"
      >
        <span className="h-4 w-4 block" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle color theme"
      className="group relative h-9 w-9 rounded-md border border-card-border bg-card/80 backdrop-blur-md flex items-center justify-center text-foreground transition-all duration-200 hover:border-foreground/30 hover:scale-105 active:scale-95 cursor-pointer"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: [0.8, 1.15, 1],
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-foreground" />
        ) : (
          <Moon className="h-4 w-4 text-foreground" />
        )}
      </motion.div>
    </button>
  );
}
