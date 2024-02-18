import React, { KeyboardEvent, useEffect, useState } from "react";
import letters from "./data.json";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToGuessedWord } from "../../store/GuessedWordSlice";

const Keyboard: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const guessedWord = useAppSelector((state) => state.guessedWordSlice.value);

  const maxCount = useAppSelector((state) => state.guessedWordSlice.maxCount);
  const movieName = useAppSelector(
    (state) => state.guessedWordSlice.wordToGuess
  );

  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  //  const [wordFromApi, setWordFromApi] = useState<string>("Jab We Met");

  const alphabets: string[] = letters.abc;

  //console.log("Guessed Word", guessedWord);
  //console.log("Used Letters", usedLetters);

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);

    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, []);
  const screenKeyboardHandler = (val: string) => {
    if (
      !usedLetters.includes(val.toLowerCase()) &&
      /[a-zA-Z]/.test(val.toLowerCase())
    ) {
      setUsedLetters((prevLetters) => [...prevLetters, val.toLowerCase()]);

      if (maxCount < 6) {
        //console.log("max count less than 6");

        dispatch(addToGuessedWord(val));
      } else {
        alert(movieName);
      }
    }
  };

  const keyPressHandler = (e: KeyboardEvent) => {
    console.log(e.key);
    console.log(maxCount);
    if (
      !usedLetters.includes(e.key.toLowerCase()) &&
      /[a-zA-Z]/.test(e.key.toLowerCase())
    ) {
      setUsedLetters((prevLetters) => [...prevLetters, e.key.toLowerCase()]);

      if (maxCount < 6) {
        // console.log("max count less than 6");

        dispatch(addToGuessedWord(e.key.toLowerCase()));
      } else {
        alert(movieName);
      }
    }
  };
  return (
    <div className="flex sm:max-w-lg max-w-sm flex-wrap justify-center">
      {alphabets.map((item: string) => (
        <div
          tabIndex={0}
          key={item}
          className={`bg-white text-black font-bold md:text-lg text-sm border-2
           border-gray-200 px-3 py-2 rounded m-2 uppercase
           hover:cursor-pointer hover:bg-slate-300 md:w-10 md:h-10 w-8 h-8              
           flex justify-center items-center hover:shadow-md hover:shadow-gray-600
           ${
             usedLetters.includes(item.toLowerCase()) &&
             "hover:cursor-not-allowed bg-gray-600 hover:bg-gray-600 opacity-90 text-white hover:shadow-none"
           }
           `}
          onClick={() => screenKeyboardHandler(item)}
          onKeyDown={keyPressHandler}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
