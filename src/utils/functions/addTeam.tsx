import { supabase } from "@/lib/supabase-client";

export const addTeam = async (
  name: string,
  role: string,
  github: string,
  linkedin: string,
  instagram: string,
  image: string,
  cell: string
) => {
  try {
    const social_links = {
      github: github,
      linkedin: linkedin,
      instagram: instagram,
    };
    const { data, error } = await supabase
      .from("club_team")
      .insert({
        name: name,
        role: role,
        social_links: social_links,
        image: image,
        category_name: cell,
      })
      .select("*");
  } catch (e) {
    console.log(e);
  }
};
