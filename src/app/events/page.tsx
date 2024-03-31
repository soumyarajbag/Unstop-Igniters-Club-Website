"use client";
import Heading from "@/components/common/Heading";
import EventCard from "@/components/events/EventCard";



const page = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 py-10">
      <Heading text="Events" />
      
      <div className="w-full flex flex-row flex-wrap items-center text-center justify-center gap-16">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default page;
