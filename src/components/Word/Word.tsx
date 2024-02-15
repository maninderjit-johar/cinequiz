import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/hooks";
import { wordToGuess } from "./../../store/GuessedWordSlice";

const Word: React.FunctionComponent = () => {
  const guessedWord = useAppSelector((state) => state.guessedWordSlice.value);
  const wordToGuess = useAppSelector(
    (state) => state.guessedWordSlice.wordToGuess
  );

  //const guessedWord: string[] = ["t", "e"];

  const [maxCount, setMaxCount] = useState<number>(0);

  console.log(guessedWord);

  const processingString = (char: string): Boolean => {
    if (/[a-zA-Z]/.test(char) && !guessedWord.includes(char.toLowerCase())) {
      return false;
    }

    return true;
  };

  return wordToGuess.split("").map((item: string, index: number) =>
    item === " " ? (
      <div key={index} className="block w-8 m-x-2" />
    ) : (
      <div key={index} className="flex flex-col items-center">
        <span
          className={` uppercase  m-2 w-6 text-center text-2xl ${
            processingString(item) ? "visible" : "invisible"
          }`}
        >
          {item}
        </span>

        <span className="border-gray-100 uppercase border-b-4 rounded-lg m-x-2 w-8"></span>
      </div>
    )
  );
};

export default Word;
