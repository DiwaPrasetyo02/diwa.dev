import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type SummaryCyclerProps = {
  summaries: string[];
};

export const SummaryCycler = ({ summaries }: SummaryCyclerProps) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const measureRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % summaries.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [summaries.length, isPaused]);

  useEffect(() => {
    let tallest = 0;
    for (const el of measureRefs.current) {
      if (el) {
        tallest = Math.max(tallest, el.scrollHeight);
      }
    }
    if (tallest > 0) {
      setMaxHeight(tallest);
    }
  }, [summaries]);

  const goTo = useCallback((i: number) => setIndex(i), []);

  return (
    <section
      aria-label="Rotating summary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative"
    >
      <div className="relative overflow-hidden" style={{ minHeight: maxHeight ? `${maxHeight}px` : undefined }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-fluid-body font-body text-border-dark leading-relaxed"
          >
            {summaries[index]}
          </motion.p>
        </AnimatePresence>
      </div>

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

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-0 -z-10">
        {summaries.map((s, i) => (
          <p
            key={i}
            ref={(el) => { measureRefs.current[i] = el; }}
            className="text-fluid-body font-body text-border-dark leading-relaxed"
          >
            {s}
          </p>
        ))}
      </div>
    </section>
  );
};

SummaryCycler.displayName = "SummaryCycler";
