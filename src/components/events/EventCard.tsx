import { getCoordinators } from "@/utils/functions/getCoordinators";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { ILink } from "@/app/admin/events/add-event/page";
import RulesModal from "./RulesModal";
import EventRegModal from "./EventRegModal";
import Image from "next/image";

const CoordinatorChip = ({ coordinator }: { coordinator: any }) => {
  return (
    <div className="flex flex-row items-center lg:gap-3 flex-wrap">
      <h1 className="text-white font-semibold">
        {" "}
        {coordinator.users?.name} :{" "}
      </h1>
      <h1 className="text-[#1a8fdd] font-semibold">
        {" "}
        +91 {coordinator.users?.phone}{" "}
      </h1>
    </div>
  );
};

const LinkButton = ({ link }: { link: ILink }) => {
  return (
    <Link
      href={link.url}
      target="_blank"
      className="bg-slate-500 text-white px-5 py-1 rounded-xl"
    >
      {link.title}
    </Link>
  );
};
const EventCard = ({ event, index }: { event: any; index: number }) => {
  const { roles } = event;
  const [rulesOpen, setRulesOpen] = useState<boolean>(false);
  const [isRegFormOpen, setIsRegFormOpen] = useState<boolean>(false);
  console.log(index)
  return (
    <div className="w-[90%] md:w-[70%] mx-auto lg:w-[60%]  flex flex-col-reverse xl:flex-row p-4 border-y border-[#1a8fdd] rounded-xl justify-between px-5 gap-2">
      <div className="flex flex-col  gap-2 justify-start items-start lg:w-[65%]">
        <h1 className="text-[#1a8fdd] font-bold text-start text-3xl tracking-wider">
          {event.event_name}
        </h1>
        <div className="flex flex-wrap flex-row justify-between items-start w-full gap-5">
          <h1 className="font-semibold text-slate-400 text-lg">
            Schedule : {event.schedule}
          </h1>
          <h1 className="font-semibold text-slate-400 text-start text-lg">
            Venue : {event.venue}
          </h1>
        </div>
        {event.participants_count ? (
          <h1 className="font-semibold text-slate-400 text-lg">
            Participants : {event.participants_count}
          </h1>
        ):null}
       {roles.length > 0 && <>
        <h1 className="font-semibold text-slate-400 text-lg">Coordinators :</h1>
        <div className="flex flex-col items-start gap-1">
          {roles.length > 0 &&
            roles.map((coordinator: any, index: number) => {
              return <CoordinatorChip key={index} coordinator={coordinator} />;
            })}
        </div>
        </>}
        <div className="flex flex-row mt-2 items-center max-md:justify-center w-full gap-10 flex-wrap">
          {event.photos && event.photos.length > 0 && (
            <button
              onClick={() => {}}
              className="px-2 py-1 bg-blue text-white rounded-xl bg-blue-500"
            >
              View Gallery
            </button>
          )}
          {event.rules && event.rules.length > 0 &&
            <button
              onClick={() => {
                setRulesOpen(true);
              }}
              className="px-2 py-1 bg-blue text-white rounded-xl bg-blue-500"
            >
              View Rules
            </button>
          }
        </div>
        {event.links.length > 0 && <div className="flex flex-col items-start gap-1">
          <h1 className="font-semibold text-slate-400 text-lg">
            View Related Links :
          </h1>
          <div className="flex flex-row flex-wrap gap-2 items-center ">
            {event.links.length > 0 &&
              event.links.map((link: ILink, index: number) => {
                return <LinkButton key={index} link={link} />;
              })}
          </div>
        </div>}

        <h1 className="font-semibold text-slate-400 text-xl">Description :</h1>
        <p className="font-medium text-white text-md tracking-wide text-start">
          {parse(event.description)}
        </p>
      </div>
      <div className="flex flex-col gap-5 max-lg:mx-auto">
        <Image
          className="w-full h-full  rounded-2xl lg:h-[400px] lg:w-[350px] mx-auto"
          src={event.image_url}
          width={350}
          height={400}
          alt=""
        />
     
        {event?.is_open &&  <button onClick={()=>setIsRegFormOpen(true)} className="text-[#1a8fdd] text-xl tracking-wider font-semibold font-sans border hover:invert border-[#1a8fdd] w-3/4 mx-auto rounded-xl px-5 py-2">
            REGISTER NOW
          </button>}
       
      </div>
      <RulesModal
        isOpen={rulesOpen}
        onClose={() => {
          setRulesOpen(false);
        }}
        rules={event.rules}
      />
      <EventRegModal 
      isOpen={isRegFormOpen}
      onClose={()=>setIsRegFormOpen(false)}
      eventDetails={event}
      />
    </div>
  );
};

export default EventCard;
