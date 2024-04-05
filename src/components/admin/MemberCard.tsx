"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

export function MemberCard({ memberDetails }: { memberDetails: any }) {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] w-[300px] h-[500px] flex flex-col items-center justify-center gap-3 max-w-sm p-4 sm:p-10  dark:bg-zinc-900">
        <img
          src={memberDetails?.image}
          alt="Member Image"
    
          className="rounded-full w-64 h-64 object-cover"
        />
        <h1 className="text-white text-xl text-center font-semibold tracking-wide">
          {memberDetails?.name}
        </h1>
        <h1 className="text-white text-lg text-center font-semibold tracking-wide">
          {memberDetails?.role}
        </h1>
        <div className="flex flex-row items-center gap-5 mt-3">
          {
            <Link
              href={memberDetails?.social_links?.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-[#0c0b0f] font-bold text-xl text-white hover:bg-white hover:text-[#0c0b0f]"
            >
              <BsGithub className="h-[25px] w-[25px]" />
            </Link>
          }
          {
            <Link
              href={memberDetails?.social_links?.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-[#215594] font-bold text-xl text-white hover:bg-white hover:text-[#215594]"
            >
              <BsLinkedin className="h-[25px] w-[25px]" />
            </Link>
          }
          {
            <Link
              href={memberDetails?.social_links?.instagram}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-[#6a45e4] font-bold text-xl text-white hover:bg-white hover:text-[#6a45e4] "
            >
              <BsInstagram className="h-[25px] w-[25px]" />
            </Link>
          }
        </div>
      </BackgroundGradient>
    </div>
  );
}
