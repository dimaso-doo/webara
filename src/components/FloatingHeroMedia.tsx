"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";

export function FloatingHeroMedia() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      className="hero-media floating-hero"
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: x * 10, y: y * -10 });
      }}
      style={
        {
          "--float-x": `${tilt.x}px`,
          "--float-y": `${tilt.y}px`,
          "--rotate-x": `${tilt.y * 0.28}deg`,
          "--rotate-y": `${tilt.x * -0.28}deg`
        } as CSSProperties & Record<string, string>
      }
    >
      <Image
        src="/assets/hero-ai-workflow.png"
        alt="AI workflow for creating a modern website on a laptop and phone"
        fill
        priority
        sizes="(max-width: 900px) 100vw, 48vw"
      />
    </div>
  );
}
