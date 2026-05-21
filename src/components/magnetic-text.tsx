import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "../lib/utils";

type MagneticTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  repelRadius?: number;
  repelStrength?: number;
};

export const MagneticText = ({
  text,
  as: Tag = "h2",
  className,
  repelRadius = 80,
  repelStrength = 8,
}: MagneticTextProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [forces, setForces] = useState<{ x: number; y: number }[]>(
    text.split("").map(() => ({ x: 0, y: 0 })),
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const chars = container.querySelectorAll<HTMLElement>("[data-char]");

    const newForces = text.split("").map((_, i) => {
      const char = chars[i];
      if (!char) return { x: 0, y: 0 };
      const cr = char.getBoundingClientRect();
      const cx = cr.left + cr.width / 2;
      const cy = cr.top + cr.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < repelRadius) {
        const strength = (1 - dist / repelRadius) * repelStrength;
        return {
          x: -(dx / dist) * strength,
          y: -(dy / dist) * strength,
        };
      }
      return { x: 0, y: 0 };
    });

    setForces(newForces);
  };

  const handleMouseLeave = () => {
    setForces(text.split("").map(() => ({ x: 0, y: 0 })));
  };

  const TagComponent = Tag as keyof JSX.IntrinsicElements;

  return (
    <TagComponent
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative inline-block select-none", className)}
    >
      {text.split("").map((char, i) => (
        <motion.span
          /* biome-ignore lint/suspicious/noArrayIndexKey: static char list */
          key={i}
          data-char
          className="inline-block"
          animate={{
            x: forces[i]?.x ?? 0,
            y: forces[i]?.y ?? 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 12,
            mass: 0.5,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </TagComponent>
  );
};
