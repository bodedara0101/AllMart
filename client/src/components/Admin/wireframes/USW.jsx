import React from "react";

const USW = () => {
  return (
    <>
      <div className="animate-pulse grid w-full mt-5 grid-flow-col justify-between auto-cols-fr grid-rows-4 gap-6">
        {Array.from({ length: 4 }).map((index) => (
          <div key={index} className="flex flex-col justify-between overflow-hidden items-center hover:shadow-lg transition-shadow duration-300 rounded-xl border shadow-black h-[100px] text-black ">
          <div className="w-full flex flex-col h-full p-3 justify-evenly ">
            <div className="h-[10px]  w-full rounded-full bg-gray-300"></div>
            <div className="h-[10px]  w-full rounded-full bg-gray-300"></div>
            <div className="h-[10px]  w-full rounded-full bg-gray-300"></div>
          </div>
        </div>
        ))}
      </div>
    </>
  );
};

export default USW;
