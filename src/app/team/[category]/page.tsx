"use client";
import { MemberCard } from "@/components/admin/MemberCard";
import Heading from "@/components/common/Heading";
import { supabase } from "@/lib/supabase-client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FadeIn } from "react-slide-fade-in";

const page = () => {
  const params = useParams();
  const [team, setTeam] = useState<any>([]);
  useEffect(() => {
    const getTeamByCategory = async () => {
      try {
        const { data } = await supabase
          .from("club_team")
          .select("*")
          .eq("category_name", decodeURIComponent(params.category.toString()));
        setTeam(data!);
      } catch (e) {
        console.log(e);
      }
    };
    getTeamByCategory();
  }, [params.category]);
  return (
    <div className="flex flex-col flex-wrap mx-auto justify-center items-center w-full gap-10 px-10 mt-5">
      <Heading text={decodeURIComponent(params.category.toString())} />
      <div className="flex flex-row flex-wrap mx-auto justify-center items-center gap-20 px-10 ">
        {team.length > 0 && team.map((member: any, index: number) => {
          return (
            <FadeIn 
            from="bottom"
            key={index}
            positionOffset={200}
            triggerOffset={0}
            delayInMilliseconds={80}
          >
          <MemberCard  memberDetails={member} />
          </FadeIn>
          )
        })}
      </div>
    </div>
  );
};

export default page;
