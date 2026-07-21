import { useAppSelector } from "../../hooks/hooks";

const Figure = () => {
  const { maxCount, status } = useAppSelector((state) => state.guessedWordSlice);
  const isLost = status === "lost";

  return (
    <div className={`figure-stage grid min-h-56 place-items-center overflow-hidden rounded-[1.25rem] bg-black/20 p-4 ${isLost ? "is-lost" : ""}`}>
      <svg
        className="h-52 w-full max-w-sm drop-shadow-[0_0_18px_rgba(251,191,36,0.15)]"
        viewBox="0 0 320 230"
        role="img"
        aria-label={`Hangman progress: ${maxCount} incorrect guesses out of 6`}
      >
        <line x1="54" y1="206" x2="210" y2="206" className="stroke-white/80" strokeWidth="8" strokeLinecap="round" />
        <line x1="78" y1="206" x2="78" y2="28" className="stroke-white/80" strokeWidth="8" strokeLinecap="round" />
        <line x1="78" y1="28" x2="220" y2="28" className="stroke-white/80" strokeWidth="8" strokeLinecap="round" />
        <line x1="220" y1="28" x2="220" y2="58" className="stroke-white/80" strokeWidth="6" strokeLinecap="round" />
        <line x1="78" y1="70" x2="120" y2="28" className="stroke-white/25" strokeWidth="5" strokeLinecap="round" />

        <g className="hangman-person">
          {maxCount > 0 && (
            <circle cx="220" cy="82" r="23" fill="transparent" className="stroke-amber-200" strokeWidth="7" />
          )}
          {maxCount > 1 && <line x1="220" y1="107" x2="220" y2="158" className="stroke-amber-200" strokeWidth="7" strokeLinecap="round" />}
          {maxCount > 2 && <line x1="220" y1="122" x2="187" y2="145" className="stroke-amber-200" strokeWidth="7" strokeLinecap="round" />}
          {maxCount > 3 && <line x1="220" y1="122" x2="253" y2="145" className="stroke-amber-200" strokeWidth="7" strokeLinecap="round" />}
          {maxCount > 4 && <line x1="220" y1="157" x2="190" y2="192" className="stroke-amber-200" strokeWidth="7" strokeLinecap="round" />}
          {maxCount > 5 && <line x1="220" y1="157" x2="250" y2="192" className="stroke-amber-200" strokeWidth="7" strokeLinecap="round" />}
        </g>
      </svg>
    </div>
  );
};

export default Figure;
