"use client";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { login } from "@/utils/functions/login";
import { useUser } from "@/lib/store/user";
import { supabase } from "@/lib/supabase-client";


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
    path: "/team/Core",
  },

];
const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [userImg, setUserImg] = useState("");
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
   
    await supabase.auth.signOut();
    setShowAdminDashboard(false);
    setUser(undefined);
    setUserImg("");
    router.refresh();
 
    
  };
  useEffect(()=>{
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data) {
        setUserImg(data?.session?.user.user_metadata?.avatar_url);
      }
      const { data: roleData } = await supabase
      .from("roles")
      .select()
      .match({ id: data?.session?.user?.id });
      let isSuperAdmin = false;
      if (roleData) {
        for (const obj of roleData!) {
          if (obj.role === "admin") {
            isSuperAdmin = true;
          }
        }
     }
     if (isSuperAdmin) {
        setShowAdminDashboard(true);
     }
    }
    readUserSession();
  },[]) 
  useEffect(() => {
    
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);



    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
 
  }, [user]);

  const handleLogin = async () => {
   const data =  await login();
    
  };

  
  return (
    <>
      <div className="sticky left-0 top-0 z-[40] w-full  flex flex-col items-center  overflow-x-hidden ">
        <div
          className={`${
            scrolling || isMenuOpen
              ? "bg-[#0a2266]"
              : "bg-[#0a2266] bg-opacity-80"
          } flex flex-row  items-center justify-between lg:justify-around max-lg:w-full  w-[70vw]  py-0 lg:rounded-b-xl  gap-20 overflow-hidden px-5  max-md:border-b  md:flex lg:px-10
          `}
        >
          <div className="flex cursor-pointer items-center font-[Poppins] text-2xl font-bold text-gray-800">
            <span className="mr-1 py-2 text-3xl text-indigo-600">
              <Link href={"/"}>
                <Image
                  src="/logo.jpg"
                  width={50}
                  height={50}
                  className=" rounded-full"
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
                className={`block h-[2px] w-7 bg-white transition-all duration-500
              ${isMenuOpen ? "translate-y-2 rotate-45" : ""}
              `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-white transition-all duration-500
              ${isMenuOpen ? "translate-x-44 " : "translate-x-0"}
              `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-white transition-all duration-500
              ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}
              `}
              ></span>
            </div>

            <ul
              className={`fixed top-16 right-0  z-[90] w-full border-black md:space-x-5 rounded-b-xl  max-md:border-b-2  bg-[#01071c] pb-6 pl-4 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:bg-transparent md:pb-0 md:pl-0  ${
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
                    className={`  font-semibold rounded-xl max-md:my-3 duration-200 ease-linear text-sm md:text-xs lg:text-sm xl:text-[16px]  text-white hover:bg-[#3c6ce6] py-1 px-2 hover:text-white md:my-0 md:ml-2 md:hover:scale-105  lg:ml-8  ${
                      pathname === link.path && "text-white bg-[#3c6ce6]"
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ))}

{user!= undefined && showAdminDashboard && (
                <Link
                  href={"/admin"}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  <li
                   className={`  font-semibold rounded-xl max-md:my-3 duration-200 ease-linear text-sm md:text-xs lg:text-sm xl:text-[16px]  text-white hover:bg-[#3c6ce6] py-1 px-2 hover:text-white md:my-0 md:ml-2 md:hover:scale-105  lg:ml-8  ${
                    pathname === "/admin" && "text-white bg-[#3c6ce6]"
                  }`}
                  >
                    Admin
                  </li>
                </Link>
              )}
               {user != undefined && (
                  <Link href={"/profile"} onClick={()=> setIsMenuOpen(false)}>
                    <Image
                      src={userImg}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full ml-4 lg:ml-8"
                    />
                  </Link>
                )}
                  <button
                  onClick={() => {
                    {
                      user ? handleLogout() : handleLogin();
                      setIsMenuOpen(false);
                    }
                  }} className="border-2 max-md:mt-5 border-gray-500 bg-[#3c6ce6] rounded-full hover:bg-opacity-40 duration-300 text-sm md:text-xs lg:text-sm xl:text-sm hover:text-white font-bold text-white px-5 lg:px-10 py-2">
                {user ? (
                    <>
                      <IoIosLogOut
                        size={24}
                        className="inline-block lg:hidden"
                      />
                      <h1 className="lg:block hidden">Logout</h1>
                    </>
                  ) : (
                    "Login"
                  )}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
