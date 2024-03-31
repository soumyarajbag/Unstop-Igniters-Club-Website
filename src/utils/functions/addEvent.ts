import { ICoordinator } from "@/app/admin/events/add-event/page";
import { supabase } from "@/lib/supabase-client";

export const addEvent = async (inputs: any) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .insert({
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
        event_type: inputs.eventType,
        is_open: true,
      })
      .select("*");
    const userData: any = [];
    inputs.coordinators.map(async (coordinator: ICoordinator) => {
      const { data: userDetails, error: userError } = await supabase
        .from("users")
        .select("id,email")
        .eq("email", coordinator.email);
      userData.push(userDetails);
    });

    data &&
      userData.length > 0 &&
      userData.map(async (coordinator: any) => {
        await supabase
          .from("roles")
          .insert({
            id: coordinator.id,
            role: "coordinator",
            event_id: data[0].id,
            email: coordinator.email,
          })
          .select("*");
      });
  } catch (e) {
    throw e;
    console.log(e);
  }
};
