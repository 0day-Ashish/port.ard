"use client";

import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-wrapper"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        display: "block",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{
          fill: "#71717a",
        }}
      >
        <rect x="0" y="0" width="3" height="15" />
        <rect x="0" y="0" width="15" height="3" />
        <rect x="3" y="3" width="3" height="3" />
        <rect x="6" y="6" width="3" height="3" />
        <rect x="9" y="9" width="3" height="3" />
        <rect x="12" y="12" width="3" height="3" />
      </svg>
    </div>
  );
};

export default CustomCursor;
