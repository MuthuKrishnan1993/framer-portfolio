"use client";

import React, { useState, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stamp {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface PaintRevealProps {
  baseImage: string;
  revealImage: string;
  brushTexture: string;
  brushSize?: number;
  fadeDuration?: number;
  maxStamps?: number;
  showIndicator?: boolean;
  indicatorText?: string;
  indicatorColor?: string;
  borderRadius?: number;
}

export default function PaintReveal({
  baseImage,
  revealImage,
  brushTexture,
  brushSize = 150,
  fadeDuration = 3,
  maxStamps = 50,
  showIndicator = true,
  indicatorText = "Paint Mode \u2022 Double tap to exit",
  indicatorColor = "rgba(0, 0, 0, 0.7)",
  borderRadius = 0,
}: PaintRevealProps) {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [isPaintMode, setIsPaintMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);
  const lastTapRef = useRef(0);
  const reactId = useId();
  const maskId = "paint-mask" + reactId.replace(/:/g, "-");

  const getResponsiveBrushSize = useCallback(() => {
    if (!containerRef.current) return brushSize;
    const containerWidth = containerRef.current.offsetWidth;
    if (containerWidth < 768) return brushSize * 0.6;
    if (containerWidth < 1024) return brushSize * 0.8;
    return brushSize;
  }, [brushSize]);

  const handleDoubleTap = useCallback((e: React.TouchEvent) => {
    const now = Date.now();
    const timeSince = now - lastTapRef.current;
    if (timeSince < 300 && timeSince > 0) {
      setIsPaintMode((prev) => !prev);
      e.preventDefault();
    }
    lastTapRef.current = now;
  }, []);

  const addStamp = useCallback(
    (e: React.PointerEvent | React.TouchEvent) => {
      if (!containerRef.current) return;

      const isTouchEvent = "touches" in e;

      if (isTouchEvent && !isPaintMode) return;
      if (isTouchEvent && isPaintMode) e.preventDefault();

      const rect = containerRef.current.getBoundingClientRect();
      const responsiveBrushSize = getResponsiveBrushSize();

      let clientX: number, clientY: number;
      if (isTouchEvent && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const x = clientX - rect.left - responsiveBrushSize / 2;
      const y = clientY - rect.top - responsiveBrushSize / 2;

      const newStamp: Stamp = {
        id: idCounter.current++,
        x,
        y,
        size: responsiveBrushSize,
      };

      setStamps((prev) => {
        const next = [...prev, newStamp];
        return next.length > maxStamps
          ? next.slice(next.length - maxStamps)
          : next;
      });
    },
    [isPaintMode, getResponsiveBrushSize, maxStamps]
  );

  const removeStamp = useCallback((id: number) => {
    setStamps((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={(e) => !e.pointerType.includes("touch") && addStamp(e)}
      onTouchStart={(e) => {
        handleDoubleTap(e);
        if (isPaintMode) addStamp(e);
      }}
      onTouchMove={(e) => isPaintMode && addStamp(e)}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        touchAction: isPaintMode ? "none" : "auto",
        WebkitUserSelect: "none",
        userSelect: "none",
        cursor: "default",
        borderRadius,
      }}
    >
      {/* Mobile Paint Mode Indicator */}
      {isPaintMode && showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            position: "absolute",
            top: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            background: indicatorColor,
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "500",
            zIndex: 10,
            pointerEvents: "none",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {indicatorText}
        </motion.div>
      )}

      {/* Base Image Layer (always visible) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${baseImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Reveal Image Layer (masked by paint strokes) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${revealImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitMask: `url(#${maskId})`,
          mask: `url(#${maskId})`,
        }}
      />

      {/* SVG Mask for paint strokes */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            <AnimatePresence>
              {stamps.map((s) => (
                <motion.image
                  key={s.id}
                  href={brushTexture}
                  x={s.x}
                  y={s.y}
                  width={s.size}
                  height={s.size}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: fadeDuration,
                    ease: "linear",
                  }}
                  onAnimationComplete={() => removeStamp(s.id)}
                />
              ))}
            </AnimatePresence>
          </mask>
        </defs>
      </svg>
    </div>
  );
}
