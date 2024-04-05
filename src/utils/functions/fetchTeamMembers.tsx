import { supabase } from "@/lib/supabase-client"

export const fetchTeamMembers = async () => {
    try{
        const {data,error} = await supabase
            .from('club_team')
            .select('*')
        return data
    }
    catch(e){
        console.log(e)
    }
}