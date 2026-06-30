"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const PixelBlast = dynamic(() => import("@/comp/ui/blast"), { ssr: false });

export function PixelBlastBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <div className="absolute inset-0 -z-10">
      <PixelBlast
        key={isDark ? "dark" : "light"}
        color={isDark ? "#1d64c1" : "#1e3a8a"}
        variant="square"
        liquid
        transparent
        enableRipples
        autoPauseOffscreen
        speed={0.5}
        edgeFade={0.5}
        pixelSize={1.5}
        rippleSpeed={0.35}
        patternScale={2.5}
        liquidRadius={2.5}
        patternDensity={1}
        liquidStrength={0.06}
        rippleThickness={0.1}
        rippleIntensityScale={1}
      />

      <div className="absolute inset-0" />
    </div>
  );
}
