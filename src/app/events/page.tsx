"use client";
import Heading from "@/components/common/Heading";
import EventCard from "@/components/events/EventCard";
import { fetchEvents } from "@/utils/functions/fetchEvents";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const page = () => {
  const [events, setEvents] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllEvents = async () => {
      const data = await fetchEvents();
      console.log(data)
      setEvents(data);
      setLoading(false);
    };
    getAllEvents();
  }, []);

  return (
    <div className="flex w-full flex-col items-center  gap-10 py-10 min-h-[100vh]">
      <Heading text="Events" />

      <div className="w-full flex flex-col flex-wrap items-center text-center justify-center gap-16">
        {loading ? (
          <PuffLoader color="#1a8fdd" size={50} />
        ) : events && events.length > 0 ? (
          events.map((event: any) => {
            return <EventCard key={event.id} event={event} />;
          })
        ) : (
          <h1 className="text-[#1a8fdd] font-semibold text-xl">
            No Events Available !
          </h1>
        )}
      </div>
    </div>
  );
};

export default page;
