import React from "react";

const Figure: React.FunctionComponent = () => {
  return (
    <div className="text-3xl sm:my-8  mt-16 mb-1 border-2 rounded w-2/3 h-full relative flex justify-center min-w-[350px] shadow-sm shadow-gray-400 ">
      {/* vertical line  */}
      <div className="w-2 bg-white h-full sm:mr-24 relative mr-40" />

      {/* top line */}
      <div className="h-2 w-48 bg-white absolute top-8 sm:ml-2 -ml-8" />

      {/* small vertical line */}
      <div className="w-2 h-12 bg-white top-8 absolute sm:ml-48 ml-40" />

      {/* Head */}
      <div className="w-12 h-12 rounded-full border-color-white border-4 absolute top-20 sm:ml-48 ml-40 -mt-0.5" />

      {/* Body */}
      <div className="w-1 h-20 bg-white absolute sm:ml-48 ml-40 mt-[calc(8rem-3px)]" />

      {/* arms */}
      <div className="h-1 w-12 bg-white absolute top-40 sm:ml-[calc(192px+48px)] ml-[calc(192px+18px)] -rotate-45 origin-left" />
      <div className="h-1 w-12 bg-white absolute top-40 sm:ml-[calc(192px-48px)] ml-[calc(110px)] rotate-45 origin-right" />

      {/* legs */}
      <div className="h-1 w-12 bg-white absolute top-48 sm:ml-[calc(192px-48px)] ml-[calc(110px)] -rotate-45 origin-right mt-2" />
      <div className="h-1 w-12 bg-white absolute top-48 sm:ml-[calc(192px+48px)] ml-[calc(192px+18px)]  rotate-45 origin-left mt-2" />
    </div>
  );
};

export default Figure;
