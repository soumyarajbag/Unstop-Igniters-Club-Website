"use client";
import CoordinatorModal from "@/components/admin/CoordinatorModal";
import Heading from "@/components/common/Heading";
import EventCard from "@/components/events/EventCard";
import { fetchEvents } from "@/utils/functions/fetchEvents";
import { fetchEventsName } from "@/utils/functions/fetchEventsName";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { PuffLoader } from "react-spinners";

const page = () => {
  const [events, setEvents] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState<any>([]);
  const [coordinatorFormOpen, setCoordinatorFormOpen] = useState<boolean>(false);

  useEffect(() => {
    const getAllEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    getAllEvents();
  }, []);
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
          <button onClick={()=>setCoordinatorFormOpen(true)} className="text-[#1a8fdd] text-xl tracking-wider font-semibold font-sans border hover:invert border-[#1a8fdd]   rounded-xl px-5 py-2">
            Add Coordinator
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap items-center text-center justify-center gap-16">
        {loading ? (
          <PuffLoader color="#1a8fdd" size={50} />
        ) : events && events.length > 0 ? (
          events.map((event: any,index:number) => {
            return <EventCard key={index} event={event} index={index} />;
          })
        ) : (
          <h1 className="text-[#1a8fdd] font-semibold text-xl">
            No Events Available !
          </h1>
        )}
      </div>
     <CoordinatorModal isOpen={coordinatorFormOpen} onClose={() => setCoordinatorFormOpen(false)} />
    </div>
  );
};

export default page;
