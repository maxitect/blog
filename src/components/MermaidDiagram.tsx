"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
  theme?: "default" | "neutral" | "dark" | "forest" | "base";
}

export default function MermaidDiagram({ chart, theme }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const selectedTheme = theme || (isDarkMode ? "dark" : "neutral");
    const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;

    mermaid.initialize({
      startOnLoad: false,
      theme: selectedTheme,
      securityLevel: "loose",
    });

    mermaid.render(id, chart).then(({ svg }) => {
      if (ref.current) {
        ref.current.innerHTML = svg;
      }
    });
  }, [chart, isDarkMode, theme]);

  return <div ref={ref} />;
}
