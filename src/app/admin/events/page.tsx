"use client";
import Heading from "@/components/common/Heading";
import EventCard from "@/components/events/EventCard";
import Link from "next/link";
import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const page = () => {
  const [eventName, setEventName] = useState<any>([]);
  const [coordinatorFormOpen, setCoordinatorFormOpen] = useState<boolean>(false);
  return (
    <div className="min-h-[80vh] w-full mx-auto flex flex-col items-center gap-5">
      <Heading text="Manage Events" />
      <div className="flex flex-col  md:flex-row w-full md:w-[90%]  gap-2 mx-auto items-center justify-center flex-wrap">
        <div className="w-[90%] px-2 md:w-[60%] flex flex-row my-3 items-center gap-2">
          <input
            type="text"
            placeholder="Search for Events"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full bg-transparent text-[#1a8fdd] font-semibold active:border-[#1a8fdd] border-2 border-[#1a8fdd] rounded-full py-4 px-4"
          />
          <IoSearchSharp className="w-10 h-10 text-[#1a8fdd]" />
        </div>
        <div className="flex flex-row items-center flex-wrap w-[60%] md:full gap-2 md:gap-5 justify-center">
          <Link href={"/admin/events/add-event"}><button className="text-[#1a8fdd] text-xl tracking-wider font-semibold font-sans border hover:invert border-[#1a8fdd]   rounded-xl px-5 py-2">
            Add Event
          </button>
          </Link>
          <button className="text-[#1a8fdd] text-xl tracking-wider font-semibold font-sans border hover:invert border-[#1a8fdd]   rounded-xl px-5 py-2">
            Add Coordinator
          </button>
        </div>
      </div>
      <EventCard />
     
    </div>
  );
};

export default page;
