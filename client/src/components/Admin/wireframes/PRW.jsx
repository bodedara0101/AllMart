import React from "react";

const PRW = () => {
  return (
    <>
      <div className="animate-pulse grid w-full mt-5 grid-flow-col justify-between auto-cols-fr grid-rows-2 gap-6">
        {Array.from({ length: 6 }).map((index) => (
          <div className="flex flex-col justify-between overflow-hidden items-center hover:shadow-lg transition-shadow duration-300 rounded-xl border shadow-black h-[300px] text-black ">
          <div className="h-[150px] w-full bg-gray-300"></div>
          <div className="w-full flex flex-col h-[150px] p-3 justify-evenly ">
            <div className="h-[30px]  w-full rounded-full bg-gray-300"></div>
            <div className="h-[30px]  w-full rounded-full bg-gray-300"></div>
            <div className="h-[30px]  w-full rounded-full bg-gray-300"></div>
          </div>
        </div>
        ))}
      </div>
    </>
  );
};

export default PRW;
