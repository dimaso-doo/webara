"use client";

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
      <div className="ai-graphic" aria-label="Animated AI website workflow graphic" role="img">
        <div className="ai-brain-core">
          <div className="brain-left" />
          <div className="brain-right" />
          <div className="brain-stem" />
        </div>
        <div className="orbit orbit-one">
          <span />
        </div>
        <div className="orbit orbit-two">
          <span />
        </div>
        <div className="orbit orbit-three">
          <span />
        </div>
        <div className="ai-card ai-card-one">
          <span />
          <strong>Structure</strong>
        </div>
        <div className="ai-card ai-card-two">
          <span />
          <strong>Copy</strong>
        </div>
        <div className="ai-card ai-card-three">
          <span />
          <strong>Launch</strong>
        </div>
        <div className="signal-line signal-one" />
        <div className="signal-line signal-two" />
      </div>
    </div>
  );
}
