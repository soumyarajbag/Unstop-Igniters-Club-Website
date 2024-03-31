import { supabase } from "@/lib/supabase-client";

export const addCoordinator = async (eventName: string, email: string) => {
  try {
    const { data: userDetails, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email);
    const { data: eventDetails, error: eventError } = await supabase
      .from("events")
      .select("id")
      .eq("event_name", eventName);
    console.log(userDetails, eventDetails);
    const { data, error } = await supabase
      .from("roles")
      .insert({
        id: userDetails![0].id,
        role: "coordinator",
        event_id: eventDetails![0].id,
        email: email,
      })
      .select("*");
  } catch (e) {
    throw e;
  }
};
