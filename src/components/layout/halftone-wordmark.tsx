"use client";

import {useEffect, useRef} from "react";
import {hwfFitSize, hwfRadius, hwfStep, hwfWarmth} from "./halftone-physics";

// Canvas behavior adapted from the 21st.dev source supplied by the user.
// Uses the portfolio font and theme ink; warm color is the user's logo color.
export function HalftoneWordmark() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const samplerCanvas = document.createElement("canvas");
    samplerCanvas.width = samplerCanvas.height = 1;
    const sampler = samplerCanvas.getContext("2d", {willReadFrequently: true});
    let ink = [128, 128, 128];
    const warm = [206, 107, 78]; // #CE6B4E
    let inkCss = "", width = 0, height = 0, dpr = 1;
    let frame = 0, visible = false, disposed = false, lastTick = 0;
    let px = -1e5, py = -1e5;
    let ring = {x: 0, y: 0, t: -1};
    // x, y, vx, vy, homeX, homeY, radius.
    let dots = new Float32Array(0);

    function wake() {
      if (!disposed && visible && !frame) frame = requestAnimationFrame(loop);
    }
    function readInk() {
      const color = getComputedStyle(canvas!).color;
      if (color !== inkCss && sampler) {
        sampler.clearRect(0, 0, 1, 1);
        sampler.fillStyle = color;
        sampler.fillRect(0, 0, 1, 1);
        ink = Array.from(sampler.getImageData(0, 0, 1, 1).data).slice(0, 3);
      }
      inkCss = color;
    }
    function draw(now: number) {
      const context = ctx!;
      readInk();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      const radius = reduced.matches ? 0 : 64;
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t;
      const ringRadius = ringAge * 0.9;
      let moving = false;
      for (let j = 0; j < dots.length; j += 7) {
        let x = dots[j], y = dots[j + 1], vx = dots[j + 2], vy = dots[j + 3];
        const hx = dots[j + 4], hy = dots[j + 5];
        if (!reduced.matches) {
          if (ringAge < 900) {
            const dx = hx - ring.x, dy = hy - ring.y;
            const distance = Math.hypot(dx, dy) + 0.001;
            const band = 1 - Math.min(1, Math.abs(distance - ringRadius) / 26);
            const force = band * 3.2 * (1 - ringAge / 900);
            vx += dx / distance * force;
            vy += dy / distance * force;
          }
          [x, y, vx, vy] = hwfStep(x, y, vx, vy, hx, hy, px, py, radius);
          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) moving = true;
          else {x = hx; y = hy; vx = 0; vy = 0;}
        } else {x = hx; y = hy; vx = 0; vy = 0;}
        dots[j] = x; dots[j + 1] = y; dots[j + 2] = vx; dots[j + 3] = vy;
        const amount = hwfWarmth(x, y, hx, hy, 28);
        context.fillStyle = amount > 0.02
          ? `rgb(${ink.map((channel, i) => Math.round(channel + (warm[i] - channel) * amount)).join(",")})`
          : inkCss;
        // Full opacity and coverage-based radii reproduce the dense print.
        context.beginPath();
        context.arc(x, y, dots[j + 6], 0, Math.PI * 2);
        context.fill();
      }
      return !reduced.matches && (moving || ringAge < 900 || px > -1e4);
    }
    function loop(now: number) {
      frame = 0;
      if (!visible || disposed) return;
      // Keep spring speed consistent on high-refresh screens.
      if (lastTick && now - lastTick < 1000 / 60 - 1) {wake(); return;}
      lastTick = now;
      if (draw(now)) wake();
      else lastTick = 0;
    }
    function build() {
      if (disposed) return;
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width)); height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr); canvas!.height = Math.round(height * dpr);
      const mask = document.createElement("canvas");
      mask.width = width; mask.height = height;
      const m = mask.getContext("2d", {willReadFrequently: true});
      if (!m) return;
      const family = getComputedStyle(canvas!).fontFamily;
      const letters = Array.from("rafifmuhmr");
      m.fontKerning = "none";
      m.font = `800 100px ${family}`;
      const measured = letters.reduce((sum, letter) => sum + m.measureText(letter).width, 0);
      const size = hwfFitSize(measured, width * 1.02);
      m.font = `800 ${size}px ${family}`;
      const metrics = letters.map((letter) => m.measureText(letter));
      const textWidth = metrics.reduce((sum, box) => sum + box.width, 0);
      const cap = Math.max(...metrics.map((box) => box.actualBoundingBoxAscent)) || size * 0.72;
      m.fillStyle = "#000";
      m.textBaseline = "alphabetic";
      let cursor = (width - textWidth) / 2;
      // Separate draw calls prevent cross-letter ligatures in the canvas mask.
      letters.forEach((letter, index) => {
        m.fillText(letter, cursor, height + cap * 0.2);
        cursor += metrics[index].width;
      });
      const pixels = m.getImageData(0, 0, width, height).data;
      const gap = width < 640 ? 4 : 6;
      const values: number[] = [];
      for (let gy = 0; gy < Math.ceil(height / gap); gy++) {
        for (let gx = 0; gx < Math.ceil(width / gap); gx++) {
          let sum = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(width - 1, Math.floor(gx * gap + (sx + 0.5) * gap / 3));
              const y = Math.min(height - 1, Math.floor(gy * gap + (sy + 0.5) * gap / 3));
              sum += pixels[(y * width + x) * 4 + 3];
            }
          }
          const coverage = sum / (9 * 255);
          if (coverage < 0.06) continue;
          const hx = gx * gap + gap / 2, hy = gy * gap + gap / 2;
          values.push(hx, hy, 0, 0, hx, hy, hwfRadius(coverage, gap));
        }
      }
      dots = new Float32Array(values);
      wake();
    }
    function point(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      return {x: event.clientX - rect.left, y: event.clientY - rect.top};
    }
    function move(event: PointerEvent) {if (event.pointerType !== "touch") {const p = point(event); px = p.x; py = p.y; wake();}}
    function leave() {px = py = -1e5; wake();}
    function click(event: PointerEvent) {if (!reduced.matches) {ring = {...point(event), t: performance.now()}; wake();}}
    const resize = new ResizeObserver(build);
    resize.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {cancelAnimationFrame(frame); frame = 0; lastTick = 0;}
    });
    intersection.observe(canvas);
    const theme = new MutationObserver(wake);
    theme.observe(document.documentElement, {attributes: true, attributeFilter: ["class", "style"]});
    canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerleave", leave); canvas.addEventListener("pointerdown", click);
    reduced.addEventListener("change", build);
    void document.fonts.ready.then(build);
    return () => {
      disposed = true; cancelAnimationFrame(frame);
      resize.disconnect(); intersection.disconnect(); theme.disconnect();
      canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", leave); canvas.removeEventListener("pointerdown", click);
      reduced.removeEventListener("change", build);
    };
  }, []);
  return <div className="overflow-hidden"><span className="sr-only">rafifmuhmr</span><canvas ref={ref} aria-hidden="true" className="block aspect-[8/1] w-full touch-pan-y font-sans text-foreground [font-variant-ligatures:none]" /></div>;
}
