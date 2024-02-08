import React from "react";
import letters from "./data.json";

const Keyboard: React.FunctionComponent = () => {
  const alphabets: string[] = letters.abc;
  console.log("Letters", alphabets);
  return (
    <div className="flex sm:max-w-lg max-w-sm flex-wrap justify-center">
      {alphabets.map((item: string) => (
        <span
          key={item}
          className="border-2 border-white px-3 py-2 rounded m-2 uppercase hover:cursor-pointer hover:bg-gray-400 w-10 h-10 flex justify-center items-center"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default Keyboard;
