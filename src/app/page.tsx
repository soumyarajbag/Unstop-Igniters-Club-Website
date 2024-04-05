"use client";
import Cells from "@/components/home/Cells";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
const page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
 
  return (
    <>
    {loading ?<div className="flex flex-col items-center gap-20 justify-center h-screen ">
      <div className="loading-logo shadow">
      <img id="rotating-frame" src={'/logo.jpg'} alt="" className="h-[200px] w-[200px] rounded-full " />
      </div>
      <div className="flex flex-col items-center justify-center">

<BeatLoader color="#1a8fdd"
  size={20} />
<h1 className=" text-2xl text-[#1a8fdd] font-bold">Unstop Igniters Club RCCIIT</h1>
      </div>
      
</div> : <div
      className=" w-full flex flex-col min-h-[80vh] items-center justify-center gap-10  overflow-hidden"
    >
      <Hero />
     <Featured />
     <Cells />
    </div>}
    </>
    
  );
};

export default page;
