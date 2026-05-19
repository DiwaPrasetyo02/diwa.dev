import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type SummaryCyclerProps = {
  summaries: string[];
};

export const SummaryCycler = ({ summaries }: SummaryCyclerProps) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % summaries.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [summaries.length, isPaused]);

  const goTo = useCallback((i: number) => setIndex(i), []);

  return (
    <section
      aria-label="Rotating summary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-fluid-body font-body text-border-dark leading-relaxed min-h-[4.5rem] md:min-h-[3.5rem]"
        >
          {summaries[index]}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-2 mt-3" role="tablist" aria-label="Summary variations">
        {summaries.map((s, i) => (
          <button
            key={s.slice(0, 20)}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => goTo(i)}
            className={`w-3 h-3 border-2 border-black transition-all duration-200 ${
              i === index ? "bg-accent shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "bg-bg-base"
            } hover:bg-accent/50`}
          />
        ))}
      </div>
    </section>
  );
};

SummaryCycler.displayName = "SummaryCycler";
