import React, { useEffect, useRef } from "react";

export const HackerBackground = ({
  color = "#c307e0",
  fontSize = 12,
  speed = 1,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrameId;
    let lastTime = 0;

    const interval = 40;

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+";

    let columns = 0;
    let drops = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      columns = Math.floor(canvas.width / fontSize);

      drops = new Array(columns)
        .fill(0)
        .map(() => Math.random() * -100);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);

      if (currentTime - lastTime < interval) {
        return;
      }

      lastTime = currentTime;

      // Dark trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.09)";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.fillStyle = color;

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const text =
          chars[Math.floor(Math.random() * chars.length)];

        const x = i * fontSize;

        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (
          y > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }

        drops[i] += speed;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      cancelAnimationFrame(animationFrameId);
    };
  }, [color, fontSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",

        inset: 0,

        width: "100%",
        height: "100%",

        zIndex: 0,

        pointerEvents: "none",

        opacity: 0.35,
      }}
    />
  );
};