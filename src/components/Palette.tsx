"use client";
import React from "react";
import { useFlow } from "../hooks/useFlow";

export const Palette: React.FC = () => {
  const { PALETTE } = useFlow();
  return (
    <div className="palette" id="palette">
      {PALETTE.map((p) => (
        <div
          key={p.type}
          className="item"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("application/json", JSON.stringify(p));
          }}
        >
          <span className="dot" style={{ background: p.color }} /> {p.type}
        </div>
      ))}
    </div>
  );
};
