"use client";

import dynamic from "next/dynamic";

const MapWithoutSSR = dynamic(() => import("../comps/map"), {
  ssr: false,
  loading: () => <p className="text-center">Loading map...</p>,
});

export default function Home() {
  return (
    <div className="flex-1 relative">
      <MapWithoutSSR />
    </div>
  );
}
