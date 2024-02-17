import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { showAnswer, wordToGuess } from "./../../store/GuessedWordSlice";

const Word: React.FunctionComponent = () => {
  const guessedWord = useAppSelector((state) => state.guessedWordSlice.value);
  const maxCount = useAppSelector((state) => state.guessedWordSlice.maxCount);

  const wordToGuess = useAppSelector(
    (state) => state.guessedWordSlice.wordToGuess
  );

  const dispatch = useAppDispatch();
  //const guessedWord: string[] = ["t", "e"];

  useEffect(() => {
    if (maxCount === 6) {
      alert("Game Done");
      dispatch(showAnswer());
    }
  }, [maxCount]);

  console.log("%c Incorrect Response Count:", "color:pink", maxCount);

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
