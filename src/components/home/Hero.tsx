"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaSchoolCircleExclamation } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

const Hero = () => {
  const [joinModal, setJoinModal] = useState(false);
  const openJoinModal = () => {
    setJoinModal(true);
  };
  const closeJoinModal = () => {
    setJoinModal(false);
  };

  return (
    <div className="lg:h-[60vh] flex flex-col-reverse md:flex-row max-lg:flex-wrap-reverse justify-evenly items-center gap-12 w-[80%] md:w-[80%]  lg:w-[70%] 2xl:w-[60%]">
      <div className="flex flex-col gap-8 w-full">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Unstop Igniters Club of RCCIIT",
            1000,
            "Entrepreneurship Club of RCCIIT",
            1000,
          ]}
          wrapper="span"
       
          style={{ display: "inline-block" }}
          className="font-bold text-lg lg:text-3xl w-full lg:w-full  text-[#0addf0]"
          repeat={Infinity}
        />
        {/* <h1 className=" font-bold text-4xl text-[#0addf0]">
          Unstop Igniters Club of RCCIIT
        </h1> */}

        <div className="text-white  font-semibold text-sm lg:text-sm 2xl:text-lg w-full lg:w-[70%]">
          Unstop Igniters Club is a community program by Unstop (formerly
          Dare2Compete) that aims to foster a culture of competitiveness,
          learning, and growth among students. It provides a platform for
          students to showcase their talent and skills across different domains,
          such as coding, entrepreneurship, writing, and public speaking. The
          club also facilitates and collaborates with entities on-campus and
          off-campus to create opportunities for students.
          <div className="flex flex-wrap flex-row justify-center mx-auto mt-10  lg:w-auto gap-5 md:gap-10  items-center">
            <button
              onClick={openJoinModal}
              className="p-2 xl:px-4 xl:py-2 rounded-full bg-[#1a8fdd] font-bold text-lg text-white hover:bg-white hover:text-[#1a8fdd]"
            >
              Join Us
            </button>
            <Link
              href="https://www.facebook.com/profile.php?id=100090192732723"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-full bg-[#1a8fdd] font-bold text-xl text-white hover:bg-white hover:text-[#1a8fdd] "
            >
              <BsFacebook className="h-10 w-6" />
            </Link>
            <Link
              href="https://www.instagram.com/unstop_igniters/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-full bg-[#a256c0] font-bold text-xl text-white hover:bg-white hover:text-[#a256c0]"
            >
              <BsInstagram className="h-10 w-6" />
            </Link>
            <Link
              href="https://in.linkedin.com/company/unstop-igniters-club-rcciit"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-full bg-[#215594] font-bold text-xl text-white hover:bg-white hover:text-[#215594]"
            >
              <BsLinkedin className="h-10 w-6" />
            </Link>
          </div>
        </div>
      </div>

      <div>
        <img className="w-48  lg:w-80  rounded-full" src={"/logo.jpg"} alt="" />
      </div>
      {/* {joinModal && <JoinModal closeJoinModal={closeJoinModal} />} */}

      
    </div>
  );
};

export default Hero;
