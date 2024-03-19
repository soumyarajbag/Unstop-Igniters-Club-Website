"use client";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navRoutes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Events",
    path: "/events",
  },
  {
    name: "Team",
    path: "/team",
  },
  {
    name: "Contact Us",
    path: "/contacts",
  },
];
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="sticky left-0 top-0 z-[40] w-screen  flex flex-col items-center  overflow-x-hidden ">
        <div
          className={`${
            scrolling || isMenuOpen
              ? "bg-[#4074c8]"
              : "bg-[#A1C4FD] navbar bg-opacity-80"
          } flex flex-row  items-center justify-between lg:justify-around max-lg:w-full  lg:min-w-[70vw] border border-white py-0 lg:rounded-b-xl  gap-20 overflow-hidden px-5  max-md:border-b  md:flex lg:px-10
          `}
        >
          <div className="flex cursor-pointer items-center font-[Poppins] text-2xl font-bold text-gray-800">
            <span className="mr-1 pt-2 text-3xl text-indigo-600">
              <Link href={"/"}>
                <img
                  src="/logo.jpg"
                  className="w-12 md:w-14 lg:w-16 rounded-full"
                  alt=""
                />
              </Link>
            </span>
          </div>
          <div className="flex flex-row-reverse items-center justify-between gap-4 md:flex-row">
            <div
              className="flex  h-full w-8 cursor-pointer flex-col items-center justify-center gap-[6px]
             md:hidden
            "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span
                className={`block h-[2px] w-7 bg-black transition-all duration-500
              ${isMenuOpen ? "translate-y-2 rotate-45" : ""}
              `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-black transition-all duration-500
              ${isMenuOpen ? "translate-x-44 " : "translate-x-0"}
              `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-black transition-all duration-500
              ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}
              `}
              ></span>
            </div>

            <ul
              className={`fixed top-16 right-0 my-5 z-[90] w-full border-black md:space-x-5 rounded-b-xl  max-md:border-b-2  bg-gray-50 pb-6 pl-4 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:bg-transparent md:pb-0 md:pl-0  ${
                isMenuOpen ? "block top-0 right-0" : " hidden"
              }`}
            >
              {navRoutes.map((link, index) => (
                <Link
                  href={link.path}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  key={index}
                >
                  <li
                    className={`  font-semibold rounded-xl max-md:my-3 duration-200 ease-linear text-sm md:text-xs lg:text-sm xl:text-[16px]  text-black hover:bg-[#3c6ce6] py-1 px-2 hover:text-white md:my-0 md:ml-2 md:hover:scale-105  lg:ml-8  ${
                      pathname === link.path && "text-white bg-[#3c6ce6]"
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ))}

              <button className="border-2 border-gray-500 rounded-full hover:bg-black duration-300 text-sm md:text-xs lg:text-sm xl:text-sm hover:text-white font-bold text-black px-5 lg:px-10 py-2">
                <IoIosLogOut size={24} className="inline-block lg:hidden" />
                <h1 className="lg:block hidden">Logout</h1>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
