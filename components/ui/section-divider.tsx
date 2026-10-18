import * as React from "react";

export function SectionCurtainDivider() {
  return (
    <div className="w-full">
      {/* Specular Horizon Line (Top Highlight) */}
      <div className="h-px w-full bg-gradient-to-r from-black/5 via-black/40 to-black/5 dark:from-white/5 dark:via-white/60 dark:to-white/5" />

      {/* Micro-Hatched Bezel Strip with Grid Rail Anchors */}
      <div className="h-6 w-full border-b border-black/10 dark:border-white/10 bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(0,0,0,0.04)_6px,rgba(0,0,0,0.04)_7px)] dark:bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(255,255,255,0.04)_6px,rgba(255,255,255,0.04)_7px)]">
        <div className="max-w-7xl mx-auto h-full px-6 border-x border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="w-1.5 h-1.5 bg-black/30 dark:bg-white/30" />
          <div className="w-10 h-[2px] bg-black/20 dark:bg-white/20" />
          <div className="w-1.5 h-1.5 bg-black/30 dark:bg-white/30" />
        </div>
      </div>
    </div>
  );
}
