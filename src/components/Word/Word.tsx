import { useAppSelector } from "../../hooks/hooks";

const shouldRevealCharacter = (char: string, guessedLetters: string[]) =>
  !/[a-zA-Z]/.test(char) || guessedLetters.includes(char.toLowerCase());

const Word = () => {
  const { usedLetters, wordToGuess } = useAppSelector((state) => state.guessedWordSlice);

  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-4">
      {wordToGuess.split(" ").map((word, wordIndex) => (
        <div key={`${word}-${wordIndex}`} className="flex justify-center gap-2">
          {word.split("").map((char, charIndex) => {
            const isVisible = shouldRevealCharacter(char, usedLetters);

            return (
              <div key={`${char}-${charIndex}`} className="flex flex-col items-center gap-2">
                <span
                  className={`grid h-9 w-8 place-items-center rounded-lg text-2xl font-black uppercase transition ${
                    isVisible ? "scale-100 text-white opacity-100" : "scale-90 text-transparent opacity-70"
                  }`}
                >
                  {char}
                </span>
                <span
                  className={`h-1 w-8 rounded-full ${
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
