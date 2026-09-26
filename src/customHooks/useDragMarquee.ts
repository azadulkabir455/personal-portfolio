"use client";

import { useEffect, useRef } from "react";

const dragThreshold = 5;
const friction = 0.94;
const releaseIdleMs = 80;

export function useDragMarquee(durationSeconds: number) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let offset = 0;
    let velocity = 0;
    let isHovered = false;
    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastTime = 0;
    let previousTime = performance.now();
    let frame = 0;

    const loopWidth = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return (track.scrollWidth + gap) / 2;
    };

    const wrap = (value: number, width: number) => (width > 0 ? ((value % width) - width) % width : 0);

    const tick = (time: number) => {
      const delta = Math.min(time - previousTime, 64);
      previousTime = time;
      const width = loopWidth();

      if (!isDragging) {
        if (Math.abs(velocity) > 0.02) {
          offset += velocity * delta;
          velocity *= Math.pow(friction, delta / 16);
        } else if (!isHovered && !prefersReducedMotion) {
          velocity = 0;
          offset -= (width / (durationSeconds * 1000)) * delta;
        }
      }

      offset = wrap(offset, width);
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      isDragging = true;
      hasDragged = false;
      velocity = 0;
      startX = event.clientX;
      startOffset = offset;
      lastX = event.clientX;
      lastTime = performance.now();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      const now = performance.now();
      const distance = event.clientX - startX;
      if (Math.abs(distance) > dragThreshold) hasDragged = true;
      offset = startOffset + distance;
      velocity = (event.clientX - lastX) / Math.max(now - lastTime, 1);
      lastX = event.clientX;
      lastTime = now;
    };

    const handlePointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      if (performance.now() - lastTime > releaseIdleMs) velocity = 0;
    };

    const handleClick = (event: MouseEvent) => {
      if (!hasDragged) return;
      event.preventDefault();
      event.stopPropagation();
      hasDragged = false;
    };

    const handleDragStart = (event: DragEvent) => event.preventDefault();

    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") isHovered = true;
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") isHovered = false;
    };

    track.addEventListener("pointerdown", handlePointerDown);
    track.addEventListener("pointerenter", handlePointerEnter);
    track.addEventListener("pointerleave", handlePointerLeave);
    track.addEventListener("click", handleClick, true);
    track.addEventListener("dragstart", handleDragStart);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("pointerdown", handlePointerDown);
      track.removeEventListener("pointerenter", handlePointerEnter);
      track.removeEventListener("pointerleave", handlePointerLeave);
      track.removeEventListener("click", handleClick, true);
      track.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [durationSeconds]);

  return trackRef;
}
