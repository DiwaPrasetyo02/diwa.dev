import { useEffect, useState } from "react";

export const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visit")
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  if (count === null) return null;

  return (
    <span className="font-mono text-[10px] border-2 border-black px-2 py-1 bg-bg-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      VISITORS: {count.toLocaleString()}
    </span>
  );
};

VisitorCounter.displayName = "VisitorCounter";
