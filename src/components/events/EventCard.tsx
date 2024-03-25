import React, { useState } from "react";

const CoordinatorChip = () => {
  return (
    <div className="flex flex-row items-center lg:gap-2 flex-wrap">
      <h1 className="text-white font-semibold"> Shrayanendra Nath Mandal : </h1>
      <h1 className="text-[#1a8fdd] font-semibold"> +91 8337045160 </h1>
    </div>
  );
};
const EventCard = () => {
  return (
    <div className="w-[90%] md:w-[70%] lg:w-[60%] flex flex-col-reverse xl:flex-row p-4 border-y border-[#1a8fdd] rounded-xl justify-between px-5 gap-2">
      <div className="flex flex-col gap-2 justify-start items-start lg:w-[65%]">
        <h1 className="text-[#1a8fdd] font-bold text-3xl tracking-wider">
          Igniters Tank
        </h1>
        <div className="flex flex-wrap flex-row justify-between w-full">
          <h1 className="font-semibold text-slate-400 text-xl">
            Date : 14. 03. 2024{" "}
          </h1>
          <h1 className="font-semibold text-slate-400 text-xl">
            Venue : Online{" "}
          </h1>
        </div>
        <h1 className="font-semibold text-slate-400 text-xl">
          Participants : 18{" "}
        </h1>
        <h1 className="font-semibold text-slate-400 text-xl">Coordinators :</h1>
        <div className="flex flex-col items-start gap-1">
          <CoordinatorChip />
          <CoordinatorChip />
          <CoordinatorChip />
        </div>
        <div className="flex flex-row mt-2 items-center max-md:justify-center w-full gap-10 flex-wrap">
          <button
            onClick={() => {}}
            className="px-2 py-1 bg-blue text-white rounded-xl bg-blue-500"
          >
            View Gallery
          </button>
          <button
            onClick={() => {}}
            className="px-2 py-1 bg-blue text-white rounded-xl bg-blue-500"
          >
            View Rules
          </button>
        </div>

        <h1 className="font-semibold text-slate-400 text-xl">Description :</h1>
        <p className="font-medium text-white text-lg tracking-wide">
          Photography and reel contest in association with Techtrix
        </p>
      </div>
      <div className="flex flex-col gap-5 max-lg:mx-auto">
        <img
          className="w-[280px] h-[400px] rounded-2xl object-cover xl:h-[400px] xl:w-[350px]"
          src="/logo.jpg"
          alt=""
        />
        <button className="text-[#1a8fdd] text-xl tracking-wider font-semibold font-sans border hover:invert border-[#1a8fdd] w-3/4 mx-auto rounded-xl px-5 py-2">
          REGISTER NOW
        </button>
      </div>
    </div>
  );
};

export default EventCard;
