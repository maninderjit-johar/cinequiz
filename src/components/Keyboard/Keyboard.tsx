import { useEffect } from "react";

import letters from "./data.json";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToGuessedWord } from "../../store/GuessedWordSlice";

const Keyboard = () => {
  const dispatch = useAppDispatch();
  const { status, usedLetters, wordToGuess } = useAppSelector((state) => state.guessedWordSlice);
  const alphabets: string[] = letters.abc;
  const isDisabled = status !== "playing";

  useEffect(() => {
    const keyPressHandler = (event: globalThis.KeyboardEvent) => {
      const letter = event.key.toLowerCase();

      if (/^[a-z]$/.test(letter)) {
        dispatch(addToGuessedWord(letter));
      }
    };

    window.addEventListener("keydown", keyPressHandler);

    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [dispatch]);

  return (
    <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
      {alphabets.map((item: string) => {
        const letter = item.toLowerCase();
        const hasBeenUsed = usedLetters.includes(letter);
        const isCorrectGuess = hasBeenUsed && wordToGuess.toLowerCase().includes(letter);
        const isWrongGuess = hasBeenUsed && !isCorrectGuess;
        const usedStyle = isCorrectGuess
          ? "border-emerald-300/45 bg-emerald-300/15 text-emerald-100 shadow-lg shadow-emerald-500/10"
          : "border-white/5 bg-white/5 text-white/25";

        return (
          <button
            type="button"
            key={item}
            disabled={isDisabled || hasBeenUsed}
            className={`grid h-11 w-11 place-items-center rounded-xl border text-sm font-black uppercase transition sm:h-12 sm:w-12 sm:text-base ${
              hasBeenUsed
                ? usedStyle
                : "border-white/10 bg-white/12 text-white shadow-lg shadow-black/10 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-amber-300 hover:text-slate-950"
            } ${isWrongGuess ? "line-through" : ""} disabled:cursor-not-allowed`}
            onClick={() => dispatch(addToGuessedWord(letter))}
            aria-label={`${item}${isCorrectGuess ? " correct guess" : ""}${isWrongGuess ? " incorrect guess" : ""}`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
