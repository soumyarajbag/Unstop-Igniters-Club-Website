import { supabase } from "@/lib/supabase-client";

export const getCoordinators = async(eventId:string)=>{
    try{
        const coordinators:any = []
        const {data, error} = await supabase.from("roles").select("*").eq("event_id", eventId);
        data && data.length > 0 && data.map(async (coordinator:any)=>{
            const {data:userData,error:userError} = await supabase.from("users").select("name,phone").eq("id",coordinator.id);
           coordinators.push(userData![0])
        })
        return coordinators;
    }
    catch(e){
        throw e;
    }
}