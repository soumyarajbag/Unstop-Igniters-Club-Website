import { supabase } from "@/lib/supabase-client";

export const addEvent = async(inputs:any) => {
    try{
        const {data,error} = await supabase.from('events').insert({
            event_name: inputs.name,
            schedule: inputs.schedule,
            description: inputs.description,
            links: inputs.links,
            rules: inputs.rules,
            venue: inputs.venue,
            max_team_size: inputs.maxTeamSize,
            min_team_size: inputs.minTeamSize,
            participants_count: inputs.participantsCount,
            image_url: inputs.imagePath,
        }).select('*');
       
    }
    catch(e){
        throw e;
        console.log(e)
    }
}