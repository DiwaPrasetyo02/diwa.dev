import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { burstConfetti } from "../lib/confetti";
import { cn } from "../lib/utils";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const STYLES_TO_SAVE = [
  "position",
  "left",
  "top",
  "width",
  "margin",
  "zIndex",
  "pointerEvents",
  "boxShadow",
  "transition",
  "transform",
] as const;

function saveOriginalStyles(el: HTMLElement): Record<string, string> {
  const saved: Record<string, string> = {};
  for (const key of STYLES_TO_SAVE) {
    saved[key] = el.style[key as any] ?? "";
  }
  return saved;
}

function restoreOriginalStyles(el: HTMLElement, saved: Record<string, string>) {
  for (const key of STYLES_TO_SAVE) {
    (el.style as any)[key] = saved[key];
  }
}

export const KonamiEasterEgg = () => {
  const [active, setActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const indexRef = useRef(0);
  const activeRef = useRef(false);
  const dragTargetRef = useRef<HTMLElement | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const originalStylesRef = useRef<Map<HTMLElement, Record<string, string>>>(new Map());
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const resetAllDraggedElements = () => {
    for (const [el, saved] of originalStylesRef.current) {
      restoreOriginalStyles(el, saved);
    }
    originalStylesRef.current.clear();
  };

  const startDrag = (e: MouseEvent) => {
    if (!document.body.classList.contains("chaos-mode")) return;
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;
    if (target.closest("[data-chaos-ignore]")) return;

    const rect = target.getBoundingClientRect();

    if (!originalStylesRef.current.has(target)) {
      originalStylesRef.current.set(target, saveOriginalStyles(target));
    }

    dragTargetRef.current = target;
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    target.style.position = "fixed";
    target.style.left = `${rect.left}px`;
    target.style.top = `${rect.top}px`;
    target.style.width = `${rect.width}px`;
    target.style.zIndex = "9999";
    target.style.pointerEvents = "none";
    target.style.margin = "0";
    target.style.transition = "box-shadow 0.1s, transform 0.1s";
    target.style.boxShadow = "12px 12px 0px 0px rgba(0,0,0,1)";

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const onDrag = (e: MouseEvent) => {
    const target = dragTargetRef.current;
    if (!target) return;
    target.style.left = `${e.clientX - dragOffsetRef.current.x}px`;
    target.style.top = `${e.clientY - dragOffsetRef.current.y}px`;
  };

  const stopDrag = () => {
    const target = dragTargetRef.current;
    if (target) {
      target.style.pointerEvents = "";
    }
    dragTargetRef.current = null;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const endChaosMode = () => {
    resetAllDraggedElements();
    document.body.classList.remove("chaos-mode");
    document.removeEventListener("mousedown", startDrag);
    stopDrag();
    setActive(false);
    setShowToast(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeRef.current) return;

      const expected = KONAMI_CODE[indexRef.current];
      if (e.key === expected) {
        const next = indexRef.current + 1;
        if (next >= KONAMI_CODE.length) {
          indexRef.current = 0;
          setActive(true);
          setShowToast(true);
          burstConfetti();
          document.body.classList.add("chaos-mode");
          document.addEventListener("mousedown", startDrag);

          const timer = setTimeout(() => {
            endChaosMode();
          }, 6000);

          cleanupRef.current = () => {
            clearTimeout(timer);
            endChaosMode();
          };
        } else {
          indexRef.current = next;
        }
      } else {
        indexRef.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(t);
  }, [showToast]);

  const handleDismiss = () => {
    setShowToast(false);
    cleanupRef.current?.();
  };

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          data-chaos-ignore
          className={cn(
            "fixed top-20 left-1/2 -translate-x-1/2 z-[100]",
            "border-4 border-black bg-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            "px-8 py-4 text-center",
          )}
        >
          <p className="font-heading text-2xl font-bold">🎮 CHAOS MODE ACTIVATED</p>
          <p className="font-mono text-sm mt-1 text-black/60">
            Click & drag any element — resets in 6s
          </p>
          <button
            type="button"
            onClick={handleDismiss}
            data-chaos-ignore
            className={cn(
              "mt-3 px-4 py-1 font-mono text-xs font-bold border-2 border-black",
              "bg-bg-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
              "hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]",
              "transition-all duration-100",
            )}
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
