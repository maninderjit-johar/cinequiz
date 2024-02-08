import React, { useState } from "react";

const Word: React.FunctionComponent = () => {
  const [wordFromApi, setWordFromApi] = useState<string>(
    "Testin23g with spaces"
  );

  const guessedWord: string[] = ["t", "e"];

  const processingString = (char: string): Boolean => {
    if (/[a-zA-Z]/.test(char) && !guessedWord.includes(char.toLowerCase())) {
      return false;
    }

    return true;
  };

  return wordFromApi.split("").map((item: string, index: number) =>
    item === " " ? (
      <div className="block w-8 m-x-2" />
    ) : (
      <div className="flex flex-col items-center">
        <span
          key={index}
          className={` uppercase  m-2 w-6 text-center text-2xl ${
            processingString(item) ? "visible" : "invisible"
          }`}
        >
          {item}
        </span>

        <span className="border-gray-100 uppercase border-b-2 m-x-2 w-6"></span>
      </div>
    )
  );
};

export default Word;
