import { supabase } from "@/lib/supabase-client";

export const fetchEvents = async()=>{
    try {
        const { data , error }:any = await supabase
          .from("events")
          .select("*,roles(users(*))");
          console.log(data)
         
        return data;
      } catch (e) {
        throw e;
      }
}