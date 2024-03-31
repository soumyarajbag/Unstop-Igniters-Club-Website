"use client";
import Cells from "@/components/home/Cells";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import { useEffect, useRef, useState } from "react";
const page = () => {
 
  return (
    <div
      className="w-full flex flex-col min-h-[80vh] items-center justify-center gap-10  overflow-hidden"
    >
      <Hero />
     <Featured />
     <Cells />
    </div>
  );
};

export default page;
