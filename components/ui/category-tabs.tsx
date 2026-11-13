"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { customSpring } from "@/lib/animation";
import { useHeroCursor } from "@/components/ui/hero-cursor-context";

export interface CategoryItem<T extends string = string> {
  id: T;
  label: string;
}

interface CategoryTabsProps<T extends string> {
  categories: readonly CategoryItem<T>[];
  selectedCategory: T;
  onSelectCategory: (id: T) => void;
  getItemCount: (id: T) => number;
  layoutId: string;
  className?: string;
}

export function CategoryTabs<T extends string>({
  categories,
  selectedCategory,
  onSelectCategory,
  getItemCount,
  layoutId,
  className = "mb-4 sm:mb-5 flex items-center overflow-x-auto overflow-y-hidden no-scrollbar gap-x-6 sm:gap-x-8 border-b border-border/50 pb-0 shrink-0 select-none",
}: CategoryTabsProps<T>) {
  const { setHoveredElementBounds } = useHeroCursor();

  return (
    <div className={className}>
      {categories.map((cat) => {
        const count = getItemCount(cat.id);
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredElementBounds({
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
                shape: "rounded",
                borderRadius: 6,
              });
            }}
            onMouseLeave={() => setHoveredElementBounds(null)}
            className={`relative pb-2.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer shrink-0 ${
              isActive
                ? "font-bold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{cat.label}</span>
            <span className="ml-1.5 opacity-50 text-[10px]">
              ({count < 10 ? `0${count}` : count})
            </span>
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute -bottom-px left-0 right-0 h-[2px] bg-foreground"
                transition={customSpring}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
