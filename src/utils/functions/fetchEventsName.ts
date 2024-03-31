import { supabase } from "@/lib/supabase-client"

export const fetchEventsName = async () => {
    try{
        const {data, error} = await supabase.from('events').select('id,event_name');
        return data;
    }
   catch(e){
         console.log(e)
   }


}