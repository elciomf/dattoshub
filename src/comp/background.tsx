"use client";

import dynamic from "next/dynamic";

const PixelBlast = dynamic(() => import("@/comp/ui/blast"), { ssr: false });

export function PixelBlastBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <PixelBlast
        variant="square"
        pixelSize={4}
        color="#94a3b8"
        patternScale={2}
        patternDensity={0.6}
        enableRipples
        rippleSpeed={0.3}
        rippleThickness={0.1}
        rippleIntensityScale={1}
        speed={0.5}
        transparent
        edgeFade={0.5}
      />
    </div>
  );
}
