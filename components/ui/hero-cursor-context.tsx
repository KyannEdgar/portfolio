"use client";

import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export interface ElementAbsorptionBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  shape?: "pill" | "circle" | "rounded";
  borderRadius?: number | string;
}

interface HeroCursorContextType {
  hoveredElementBounds: ElementAbsorptionBounds | null;
  setHoveredElementBounds: (bounds: ElementAbsorptionBounds | null) => void;
  isHeaderHovered: boolean;
  setIsHeaderHovered: (hovered: boolean) => void;
}

const HeroCursorContext = createContext<HeroCursorContextType>({
  hoveredElementBounds: null,
  setHoveredElementBounds: () => {},
  isHeaderHovered: false,
  setIsHeaderHovered: () => {},
});

export function HeroCursorProvider({ children }: { children: React.ReactNode }) {
  const [hoveredElementBounds, setHoveredElementBounds] = useState<ElementAbsorptionBounds | null>(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHoveredElementBounds(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeroCursorContext.Provider
      value={{
        hoveredElementBounds,
        setHoveredElementBounds,
        isHeaderHovered,
        setIsHeaderHovered,
      }}
    >
      {children}
    </HeroCursorContext.Provider>
  );
}

export const useHeroCursor = () => useContext(HeroCursorContext);

/**
 * Universal hook for magnetic cursor bubble absorption on hoverable bordered badges, pills, and buttons.
 */
export function useMagneticHover(
  defaultRadius: number = 6,
  defaultShape: "rounded" | "pill" | "circle" = "rounded"
) {
  const { setHoveredElementBounds } = useHeroCursor();

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, overrideRadius?: number) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setHoveredElementBounds({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        shape: defaultShape,
        borderRadius: overrideRadius ?? defaultRadius,
      });
    },
    [setHoveredElementBounds, defaultShape, defaultRadius]
  );

  const handleMouseLeave = React.useCallback(() => {
    setHoveredElementBounds(null);
  }, [setHoveredElementBounds]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    bind: (radius?: number) => ({
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
        handleMouseEnter(e, radius),
      onMouseLeave: handleMouseLeave,
    }),
  };
}
