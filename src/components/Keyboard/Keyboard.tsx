import React, { useState } from "react";
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
  const [wordFromApi, setWordFromApi] = useState<string>("Jab We Met");

  const alphabets: string[] = letters.abc;
  //console.log("Letters", alphabets);

  const screenKeyboardHandler = (val: string) => {
    if (maxCount < 6) {
      console.log("max count less than 6");

      dispatch(addToGuessedWord(val));
      console.log(maxCount);
    } else {
      alert(movieName);
    }
  };

  return (
    <div className="flex sm:max-w-lg max-w-sm flex-wrap justify-center">
      {alphabets.map((item: string) => (
        <span
          key={item}
          className="bg-white text-black font-bold text-lg border-2 border-gray-200 px-3 py-2 rounded m-2 uppercase hover:cursor-pointer hover:bg-slate-300 w-10 h-10 flex justify-center items-center hover:shadow-md hover:shadow-gray-600"
          onClick={() => screenKeyboardHandler(item)}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default Keyboard;
