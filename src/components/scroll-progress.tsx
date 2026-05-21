import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "../lib/utils";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const width = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[6px] pointer-events-none">
      <motion.div
        className={cn(
          "h-full border-r-4 border-black",
          "bg-gradient-to-r from-primary via-secondary to-accent",
        )}
        style={{ width }}
      />
      <div className="absolute bottom-0 left-0 right-0 border-b-4 border-black" />
    </div>
  );
};
