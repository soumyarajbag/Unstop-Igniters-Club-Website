import { supabase } from "@/lib/supabase-client";

export const eventReg = async (
  team: any,
  participants: any,
  file: any,
  eventId: any,
) => {
  const eventResponse = await supabase
    .from("events")
    .select("max_team_size,event_type")
    .eq("id", eventId);

  let teamId = "";
  let fileName = "";
  if (eventResponse.data![0].event_type === "submission") {
    fileName = Date.now() + file.name!;
  }
  const eventType =
    eventResponse.data![0].max_team_size > 1 ? "team" : "individual";
  if (eventType === "team") {
    const { data } = await supabase
      .from("teams")
      .insert({
        event_id: eventId,
        team_name: team.teamName,
        team_lead_email: team.teamLeadEmail,
        submission_filename: fileName,
        college: team.college,
        attendance: false,
      })
      .select();
    teamId = data![0].id!;
    participants.forEach(async (participant: any) => {
      await supabase
        .from("participants")
        .insert({
          team_id: teamId,
          phone: participant.phone,
          name: participant.name,
          email: participant.email,
        })
        .select();
    });
  }

  if (eventType === "individual") {
    const { data: individualData, error: individualError } = await supabase
      .from("teams")
      .insert({
        event_id: eventId,
        team_name: team.teamName,
        team_lead_email: team.teamLeadEmail,
        submission_filename: fileName,
        college: team.college,
        attendance: false,
      })
      .select();
    teamId = individualData![0].id!;
    const { data: participantData, error: participantError } = await supabase
      .from("participants")
      .insert({
        team_id: individualData![0].team_id!,
        phone: team.teamLeadPhone,
        name: team.teamLeadName,
        email: team.teamLeadEmail,
      })
      .select();
    if (individualError || participantError) {
      // console.log(individualError, participantError);
    }
    // console.log(individualData, participantData);
  }
  if (eventResponse.data![0].event_type === "submission") {
    const { data: uploadFile, error: uploadError } = await supabase.storage
      .from("submissions")
      .upload(`events/${eventId}/${fileName}`, file!);
  }

  // console.log(uploadFile);
};
