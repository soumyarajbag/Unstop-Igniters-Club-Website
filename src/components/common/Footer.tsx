import Link from "next/link";
import React from "react";

import { BsLinkedin, BsInstagram, BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-[#0a2266] ">
      <div className="pt-2 ">
        <div className="flex flex-row flex-wrap items-center  justify-evenly py-3">
          <div className="flex flex-col items-center text-white">
            <h1 className="text-slate-400 font-semibold text-2xl">
              Quick Links
            </h1>
            <div className="mt-5 flex flex-wrap flex-row justify-center items-center gap-7 ">
              <Link
                href="/team/Core"
                className="text-lg hover:text-[#7fb3d5] hover:scale-105 duration-300"
              >
                Meet Our Team
              </Link>
              <Link
                href="/events"
                className="text-lg hover:text-[#7fb3d5] hover:scale-105 duration-300"
              >
                Check Our Events
              </Link>
              {/* <h1 className='text-lg'>Our Projects</h1> */}
            </div>
          </div>
          <div className="flex flex-row xl:flex-col pt-2 xl:pt-0 items-center justify-center gap-2">
            <img
              className="h-[100px] w-[100px] xl:h-[150px] xl:w-[150px] rounded-full"
              src={"https://i.postimg.cc/NF4JW6RT/logo.jpg"}
              alt=""
            />
            <h1 className="text-[#0addf0] font-bold text-md xl:text-lg">
              Unstop Igniters Club{" "}
              <span className="text-white font-semibold text-lg">RCCIIT</span>
            </h1>
          </div>
          <div className="flex flex-col  items-center text-white gap-2 xl:gap-5">
            <h1 className="text-slate-400 font-semibold text-lg  xl:text-2xl">
              Contact Us :
            </h1>
            <div className="flex flex-wrap justify-center items-center flex-row gap-2 text-md xl:text-lg font-semibold">
              <h1>Soumyaraj Bag : </h1>
              <Link
                href={`tel: +91 8017067052`}
                className="hover:text-green-500 cursor-pointer"
              >
                +91 8337045160
              </Link>
            </div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-slate-400 font-semibold text-lg  xl:text-xl">
                Socialize with Us{" "}
              </h1>
              <div className="flex flex-row gap-10 flex-wrap">
                <Link
                  href="https://in.linkedin.com/company/unstop-igniters-club-rcciit"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 xl:px-3 xl:py-3 rounded-full bg-[#215594] my-auto font-bold text-lg text-white hover:bg-white hover:text-[#215594]"
                >
                  <BsLinkedin className="h-[20px] w-[20px] xl:h-[30px] xl:w-[30px]" />
                </Link>
                <a
                  href="https://www.facebook.com/profile.php?id=100090192732723"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 xl:px-3 xl:py-3 my-auto rounded-full bg-[#1a8fdd] font-bold text-xl text-white hover:bg-white hover:text-[#1a8fdd] "
                >
                  <BsFacebook className="h-[20px] w-[20px] xl:h-[30px] xl:w-[30px]" />
                </a>
                <a
                  href="https://www.instagram.com/unstop_igniters/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 xl:px-3 xl:py-3 my-auto rounded-full bg-[#a256c0] font-bold text-xl text-white hover:bg-white hover:text-[#a256c0]"
                >
                  <BsInstagram className="h-[20px] w-[20px] xl:h-[30px] xl:w-[30px]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row text-white bg-[#01071c] flex-wrap justify-evenly ">
          <div className="flex flex-row gap-2 text-md">
            © by
            <h1 className="text-[#0addf0] font-semibold">
              Unstop Igniters Club of RCCIIT 2024
            </h1>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-md">
            <h1>Made with ❤️ by</h1>
            <Link
              target="_blank"
              href="https://linkedin.com/in/soumyarajbag"
              className="text-[#0addf0] font-semibold"
            >
              Soumyaraj Bag
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
