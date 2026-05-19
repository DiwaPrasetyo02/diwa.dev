export const SpinningBadge = () => {
  return (
    <div className="w-28 h-28 md:w-36 md:h-36 animate-spin-slow select-none pointer-events-none">
      <svg viewBox="0 0 200 200" className="w-full h-full" role="img" aria-label="experience badge">
        <defs>
          <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
        </defs>
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="var(--color-secondary)"
          stroke="currentColor"
          strokeWidth="6"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="var(--color-bg-base)"
          stroke="currentColor"
          strokeWidth="4"
        />
        <text className="font-mono" fontSize="14" fontWeight="bold" fill="currentColor">
          <textPath href="#circlePath" startOffset="0%">
            AI ENGINEER • DATA DRIVEN • ML OPS •
          </textPath>
        </text>
        <text
          x="100"
          y="105"
          textAnchor="middle"
          className="font-heading"
          fontSize="28"
          fontWeight="bold"
          fill="currentColor"
        >
          DP
        </text>
      </svg>
    </div>
  );
};
