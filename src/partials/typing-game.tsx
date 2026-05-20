import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import { indonesianWords } from "../data/indonesian-words";
import { cn } from "../lib/utils";

type GamePhase = "selecting" | "playing" | "finished";
type GameMode = "time" | "words";

interface GameConfig {
  mode: GameMode;
  value: number;
}

interface WordResult {
  word: string;
  typed: string;
  isCorrect: boolean;
}

const MODE_OPTIONS: { mode: GameMode; label: string; values: number[] }[] = [
  { mode: "time", label: "Time", values: [15, 30, 60, 120] },
  { mode: "words", label: "Words", values: [10, 25, 50, 100] },
];

const WORD_PREVIEW = 50;
const WORD_HISTORY = 3;

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function calcWPM(correctChars: number, elapsedSeconds: number): number {
  if (elapsedSeconds <= 0) return 0;
  return Math.round(correctChars / 5 / (elapsedSeconds / 60));
}

function calcAccuracy(correctChars: number, totalKeystrokes: number): number {
  if (totalKeystrokes <= 0) return 100;
  return Math.round((correctChars / totalKeystrokes) * 100);
}

export const TypingGame = () => {
  const [phase, setPhase] = useState<GamePhase>("selecting");
  const [config, setConfig] = useState<GameConfig>({ mode: "time", value: 30 });
  const [words, setWords] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const startedRef = useRef(false);
  const configRef = useRef(config);
  const wordsRef = useRef(words);
  const finalElapsedRef = useRef(0);

  const gameRef = useRef({
    currentInput: "",
    currentIndex: 0,
    completedWords: [] as WordResult[],
    startTime: 0,
  });

  configRef.current = config;
  wordsRef.current = words;

  const handleNewGame = (cfg: GameConfig) => {
    const pool = shuffleArray(indonesianWords);
    const needed = cfg.mode === "time" ? 200 : cfg.value;
    setWords(pool.slice(0, needed));
    setConfig(cfg);
    startedRef.current = false;
    gameRef.current = {
      currentInput: "",
      currentIndex: 0,
      completedWords: [],
      startTime: 0,
    };
    finalElapsedRef.current = 0;
    setPhase("playing");
  };

  const handleRestart = () => {
    handleNewGame(config);
  };

  const handleBackToMenu = () => {
    startedRef.current = false;
    gameRef.current = {
      currentInput: "",
      currentIndex: 0,
      completedWords: [],
      startTime: 0,
    };
    finalElapsedRef.current = 0;
    setPhase("selecting");
  };

  useEffect(() => {
    if (!started || phase !== "playing") return;

    const interval = setInterval(() => {
      const cfg = configRef.current;
      const g = gameRef.current;

      if (cfg.mode === "time") {
        const elapsed = (Date.now() - g.startTime) / 1000;
        if (elapsed >= cfg.value) {
          finalElapsedRef.current = elapsed;
          setPhase("finished");
          return;
        }
      }
      forceUpdate();
    }, 100);

    return () => clearInterval(interval);
  }, [started, phase]);

  useEffect(() => {
    if (phase !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const g = gameRef.current;

      if (!startedRef.current && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        startedRef.current = true;
        g.startTime = Date.now();
        setStarted(true);
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        if (g.currentInput.length > 0) {
          g.currentInput = g.currentInput.slice(0, -1);
          forceUpdate();
        }
        return;
      }

      if (e.key === " ") {
        e.preventDefault();
        if (g.currentInput === "") return;

        const word = wordsRef.current[g.currentIndex];
        const isCorrect = g.currentInput === word;
        g.completedWords.push({ word, typed: g.currentInput, isCorrect });
        g.currentIndex++;
        g.currentInput = "";

        const cfg = configRef.current;
        if (cfg.mode === "words" && g.currentIndex >= wordsRef.current.length) {
          finalElapsedRef.current = (Date.now() - g.startTime) / 1000;
          setPhase("finished");
          return;
        }

        forceUpdate();
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        g.currentInput += e.key;

        const cfg = configRef.current;
        if (cfg.mode === "words" && g.currentIndex === wordsRef.current.length - 1) {
          const word = wordsRef.current[g.currentIndex];
          if (g.currentInput === word) {
            g.completedWords.push({ word, typed: g.currentInput, isCorrect: true });
            g.currentIndex++;
            g.currentInput = "";
            finalElapsedRef.current = (Date.now() - g.startTime) / 1000;
            setPhase("finished");
            forceUpdate();
            return;
          }
        }

        forceUpdate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  const g = gameRef.current;
  const displayFrom = Math.max(0, g.currentIndex - WORD_HISTORY);
  const displayTo = Math.min(words.length, g.currentIndex + WORD_PREVIEW);
  const displayWords = words.slice(displayFrom, displayTo);

  const elapsed =
    phase === "finished"
      ? finalElapsedRef.current
      : g.startTime > 0
        ? (Date.now() - g.startTime) / 1000
        : 0;

  let correctChars = 0;
  let totalKeystrokes = 0;

  for (const w of g.completedWords) {
    for (let i = 0; i < w.typed.length; i++) {
      totalKeystrokes++;
      if (i < w.word.length && w.typed[i] === w.word[i]) correctChars++;
    }
    if (w.typed.length > w.word.length) {
      totalKeystrokes += w.typed.length - w.word.length;
    }
  }

  const currentWord = words[g.currentIndex];
  if (currentWord && g.currentInput && g.currentInput.length > 0) {
    for (let i = 0; i < g.currentInput.length; i++) {
      totalKeystrokes++;
      if (i < currentWord.length && g.currentInput[i] === currentWord[i]) {
        correctChars++;
      }
    }
    if (g.currentInput.length > currentWord.length) {
      totalKeystrokes += g.currentInput.length - currentWord.length;
    }
  }

  const wpm = calcWPM(correctChars, elapsed);
  const accuracy = calcAccuracy(correctChars, totalKeystrokes);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {phase === "selecting" && (
          <motion.div
            key="selecting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="border-4 border-black bg-bg-base shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12"
          >
            <div className="text-center mb-10">
              <h1 className="font-heading text-fluid-h1 font-bold mb-3">Typing Test</h1>
              <p className="font-body text-fluid-body text-border-dark/60">
                Test your typing speed with Indonesian words
              </p>
            </div>

            {MODE_OPTIONS.map((opt) => (
              <div key={opt.mode} className="mb-6 last:mb-0">
                <span className="font-heading font-bold text-lg mb-3 block">{opt.label}</span>
                <div className="flex flex-wrap gap-3">
                  {opt.values.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => handleNewGame({ mode: opt.mode, value: v })}
                      className={cn(
                        "px-6 py-3 font-heading font-bold border-4 border-black",
                        "bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                        "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]",
                        "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
                        "transition-all duration-100",
                        "focus-visible:outline-3 focus-visible:outline-dashed focus-visible:outline-secondary focus-visible:outline-offset-2",
                      )}
                    >
                      {opt.mode === "time" ? `${v}s` : `${v} kata`}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {phase === "playing" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="border-4 border-black bg-bg-base shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10"
          >
            <div className="flex items-center justify-between gap-6 mb-8 font-mono text-sm md:text-base">
              <div className="flex items-center gap-4">
                <span className="font-bold">
                  wpm: <span className="text-accent text-lg md:text-xl">{wpm}</span>
                </span>
                <span className="text-border-dark/30">|</span>
                <span className="font-bold">
                  acc: <span className="text-accent text-lg md:text-xl">{accuracy}%</span>
                </span>
              </div>

              <div className="font-bold tabular-nums">
                {config.mode === "time" ? (
                  <span className="text-lg md:text-xl">
                    {Math.max(0, config.value - Math.floor(elapsed))}s
                  </span>
                ) : (
                  <span className="text-lg md:text-xl">
                    {g.currentIndex}/{words.length}
                  </span>
                )}
              </div>
            </div>

            <div
              className={cn(
                "font-mono text-xl md:text-2xl leading-relaxed",
                "flex flex-wrap gap-x-3 gap-y-2",
                "min-h-[200px] select-none",
              )}
            >
              {displayWords.map((word, i) => {
                const actualIndex = displayFrom + i;

                if (actualIndex < g.currentIndex) {
                  const result = g.completedWords[actualIndex];
                  return (
                    <span
                      key={actualIndex}
                      className={cn(
                        "px-0.5",
                        result.isCorrect
                          ? "text-accent"
                          : "text-red-500",
                      )}
                    >
                      {word}
                    </span>
                  );
                }

                if (actualIndex === g.currentIndex) {
                  return (
                    <span
                      key={actualIndex}
                      className="px-0.5 bg-border-dark/5 dark:bg-white/5 rounded-none"
                    >
                      {word.split("").map((char, j) => {
                        const isTyped = j < g.currentInput.length;
                        const isCursor = j === g.currentInput.length;
                        const isCorrect = isTyped && g.currentInput[j] === char;

                        return (
                          <span
                            /* biome-ignore lint/suspicious/noArrayIndexKey: static char list */
                            key={j}
                            className={cn(
                              "relative inline-block",
                              isCorrect && "text-accent",
                              isTyped && !isCorrect && "text-red-500",
                              !isTyped && !isCursor && "text-border-dark/40 dark:text-white/40",
                              isCursor && "border-b-2 border-border-dark dark:border-white",
                            )}
                          >
                            {char}
                          </span>
                        );
                      })}
                      {g.currentInput.length > word.length && (
                        <span className="text-red-500">
                          {g.currentInput.slice(word.length)}
                        </span>
                      )}
                    </span>
                  );
                }

                return (
                  <span key={actualIndex} className="px-0.5 text-border-dark/30 dark:text-white/30">
                    {word}
                  </span>
                );
              })}
            </div>

            {!started && (
              <div className="mt-8 text-center">
                <span className="font-mono text-sm text-border-dark/40 animate-pulse">
                  Press any key to start...
                </span>
              </div>
            )}

            <div className="mt-6 pt-4 border-t-4 border-black flex items-center justify-between">
              <button
                type="button"
                onClick={handleBackToMenu}
                className={cn(
                  "px-5 py-2 font-heading font-bold text-sm border-4 border-black",
                  "bg-secondary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                  "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]",
                  "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
                  "transition-all duration-100",
                  "focus-visible:outline-3 focus-visible:outline-dashed focus-visible:outline-secondary focus-visible:outline-offset-2",
                )}
              >
                ← Menu
              </button>

              <div className="font-mono text-xs text-border-dark/30">
                {config.mode === "time"
                  ? `Time · ${config.value}s`
                  : `Words · ${config.value} kata`}
              </div>
            </div>
          </motion.div>
        )}

        {phase === "finished" && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="border-4 border-black bg-bg-base shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-center"
          >
            <h2 className="font-heading text-fluid-h2 font-bold mb-2">Test Complete!</h2>
            <p className="font-body text-fluid-body text-border-dark/60 mb-10">
              {config.mode === "time"
                ? `You typed for ${Math.floor(elapsed)} seconds`
                : `You typed ${words.length} words`}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
              <div className="border-4 border-black bg-primary p-4">
                <div className="font-heading text-3xl md:text-4xl font-bold">{wpm}</div>
                <div className="font-mono text-xs uppercase mt-1">wpm</div>
              </div>
              <div className="border-4 border-black bg-secondary p-4">
                <div className="font-heading text-3xl md:text-4xl font-bold">{accuracy}%</div>
                <div className="font-mono text-xs uppercase mt-1">accuracy</div>
              </div>
              <div className="border-4 border-black bg-accent p-4 text-white">
                <div className="font-heading text-3xl md:text-4xl font-bold">
                  {Math.floor(elapsed)}s
                </div>
                <div className="font-mono text-xs uppercase mt-1">time</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <div className="font-mono text-sm text-border-dark/60">
                {g.completedWords.filter((w) => w.isCorrect).length} / {g.completedWords.length}{" "}
                words correct
              </div>
              <div className="font-mono text-sm text-border-dark/60">
                {correctChars} correct chars
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleRestart}
                className={cn(
                  "px-8 py-4 font-heading font-bold text-lg border-4 border-black",
                  "bg-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                  "hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]",
                  "active:shadow-none active:translate-x-[6px] active:translate-y-[6px]",
                  "transition-all duration-100",
                  "focus-visible:outline-3 focus-visible:outline-dashed focus-visible:outline-secondary focus-visible:outline-offset-2",
                )}
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={handleBackToMenu}
                className={cn(
                  "px-8 py-4 font-heading font-bold text-lg border-4 border-black",
                  "bg-bg-base shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                  "hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]",
                  "active:shadow-none active:translate-x-[6px] active:translate-y-[6px]",
                  "transition-all duration-100",
                  "focus-visible:outline-3 focus-visible:outline-dashed focus-visible:outline-secondary focus-visible:outline-offset-2",
                )}
              >
                New Config
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
