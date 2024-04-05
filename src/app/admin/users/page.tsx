"use client";
import { MemberCard } from "@/components/admin/MemberCard";
import TeamAddModal from "@/components/admin/TeamAddModal";
import Heading from "@/components/common/Heading";
import { fetchTeamMembers } from "@/utils/functions/fetchTeamMembers";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

export const CategoryChip = ({ name}: { name: string }) => {  
  return (
    <Link href={"/admin/users/" + name} className="bg-[#1a8fdd] text-white py-2  lg:py-2 text-xs  lg:text-sm xl:text-lg px-5 md:px-10 border-2 cursor-pointer border-black hover:bg-white hover:text-black rounded-xl  font-semibold">
      {name}
    </Link>
  );
};

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    const getTeam = async () => {
      try{
          const data = await fetchTeamMembers()
          console.log(data)
      }
      catch(e){
          console.log(e)
      }
    }
    getTeam()
  },[])
  return (
    <div className="flex flex-col items-center justify-center mx-auto gap-6 w-full">
      <div className="flex flex-row flex-wrap gap-2 w-full items-center justify-center">
        <Heading text="Manage Team" />
        <button onClick={()=>setIsOpen(true)}>
          <IoMdAddCircle className="h-10 w-10 text-[#1a8fdd]" />
        </button>
      </div>

    
      <div className="flex flex-row flex-wrap mx-auto justify-center items-center w-full gap-10 px-10 ">
      
        
      </div>
      <TeamAddModal isOpen={isOpen} onClose={() => {
        setIsOpen(false)
      }} />
    </div>
  );
};

export default page;
