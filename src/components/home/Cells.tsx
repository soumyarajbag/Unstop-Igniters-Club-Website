import React from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import { FadeIn } from "react-slide-fade-in";

const CellCard = ({
  image,
  name,
  members,
  description,
}: {
  image: string;
  name: string;
  members: number;
  description: string;
}) => {
  return (
    <div className="hover:scale-105 relative ease-in-out duration-300  h-auto  gap-20 xl:w-[450px] xl:h-[450px] ">
      <div className="w-[320px] h-[460px]  gap-20 md:w-[380px] xl:w-[480px] xl:h-[450px]  border-t duration-150  hover:border-[#1a8fdd] bg-black z-0 rounded-lg">
        {/* <h1 className='relative left-[65%] top-[5%] md:left-[75%] text-[#1a8fdd] font-bold text-lg hover:text-opacity-60 cursor-pointer' onClick={openModal}>View Team</h1> */}
        <div className="w-[320px] h-full  md:w-[380px]  xl:w-[450px] xl:h-[450px]  border-0 p-8 rounded-tr-full z-10 bg-[#0a2266] flex flex-col items-center">
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col items-center justify-center">
              <img
                className="h-[170px] w-[170px] rounded-full"
                src={image}
                alt=""
              />
              <h1 className=" text-2xl mt-4 font-bold text-[#1a8fdd]">
                {name}
              </h1>
              {/* <h1 className="text-white font-semibold text-md">
                Members : {members}
              </h1> */}
            </div>
            <div className=" w-[300px] md:w-[350px]  ">
              <p className="text-white tracking-wider">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Cells = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-20">
      <Heading text="Our Cells" />
      <div className="flex flex-row flex-wrap items-center max-md:gap-20 md:gap-32 justify-center">
      <FadeIn 
          from="bottom"
          positionOffset={200}
          triggerOffset={0}
          delayInMilliseconds={80}
        >
        <CellCard
          image="/home/tech.png"
          description="Collaborative Open Source Projects , Workshops , Tech-Talks , Developing New Unstop Products , Business + Tech Hackathons and Many More..."
          members={12}
          name="Tech Cell"
        />
        </FadeIn>
        <FadeIn 
          from="bottom"
          positionOffset={200}
          triggerOffset={0}
          delayInMilliseconds={90}
        >
        <CellCard
          image="/home/creative.jpg"
          description="Creatively Writing Yearly Magazine , College Innovations and Elaborations on Various Unstop Events , Getting chance to meet Much more Talented Creators ."
          members={12}
          name="Creative Cell"
        />
           </FadeIn>
           <FadeIn 
          from="bottom"
          positionOffset={200}
          triggerOffset={0}
          delayInMilliseconds={100}
        >
        <CellCard
          image="/home/sponsor.png"
          description="Contacting companies for sponsorships, marketing Unstop events, collaborating with other Unstop clubs for exciting business and management events."
          members={12}
          name="Sponsorship & Marketing Cell"
        />
        </FadeIn>
        <FadeIn 
          from="bottom"
          positionOffset={200}
          triggerOffset={0}
          delayInMilliseconds={110}
        >
        <CellCard
          image="/home/media.avif"
          description="Promoting The Unstop Events on Social Media and Getting into touch with other Unstop Clubs to Collaborate in New Exciting Business and Management (Tech/Non-Tech) Events ."
          members={12}
          name="Social Media Cell"
        />
         </FadeIn>
      </div>
    </div>
  );
};

export default Cells;
