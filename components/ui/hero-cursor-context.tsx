"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";

export interface ElementAbsorptionBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  shape?: "pill" | "circle";
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
