import { useAppSelector } from "../../hooks/hooks";

const shouldRevealCharacter = (char: string, guessedLetters: string[]) =>
  !/[a-zA-Z]/.test(char) || guessedLetters.includes(char.toLowerCase());

const Word = () => {
  const { usedLetters, wordToGuess } = useAppSelector((state) => state.guessedWordSlice);

  return (
    <div className="movie-word flex flex-wrap justify-center gap-x-3 gap-y-3 sm:gap-x-5 sm:gap-y-4">
      {wordToGuess.split(" ").map((word, wordIndex) => (
        <div key={`${word}-${wordIndex}`} className="movie-word-group flex justify-center gap-1.5 sm:gap-2">
          {word.split("").map((char, charIndex) => {
            const isVisible = shouldRevealCharacter(char, usedLetters);

            return (
              <div key={`${char}-${charIndex}`} className="movie-letter flex flex-col items-center gap-1.5 sm:gap-2">
                <span
                  className={`grid h-7 w-6 place-items-center rounded-md text-lg font-black uppercase transition sm:h-9 sm:w-8 sm:rounded-lg sm:text-2xl ${
                    isVisible ? "scale-100 text-white opacity-100" : "scale-90 text-transparent opacity-70"
                  }`}
                >
                  {char}
                </span>
                <span
                  className={`h-1 w-6 rounded-full sm:w-8 ${
                    isVisible ? "bg-amber-300 shadow-lg shadow-amber-300/30" : "bg-white/25"
                  }`}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Word;
