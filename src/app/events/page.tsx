"use client";
import Heading from "@/components/common/Heading";
import EventCard from "@/components/events/EventCard";

const EventCard2 = () => {
  return (
    <div className="flex flex-col border w-[80%] md:w-[40%] lg:w-[25%] rounded-2xl border-white px-10 py-5 bg-[#0a2266] items-center gap-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <img src="/logo.jpg" alt="" className="w-80 " />
        <h1 className="text-[#1a8fdd] font-semibold text-2xl">Event Name</h1>
      </div>
      <p className="text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi magnam
        atque impedit ipsam!
      </p>
      <button className="bg-[#1a8fdd] text-white px-8 py-2 rounded-xl font-semibold hover:bg-opacity-40 cursor-pointer">
        View Details
      </button>
    </div>
  );
};
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
