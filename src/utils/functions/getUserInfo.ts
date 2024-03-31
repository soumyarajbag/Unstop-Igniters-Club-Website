import { supabase } from "@/lib/supabase-client";


export async function getUserInfo() {
  const { data, error } = await supabase.auth.getSession();
  console.log(data)
  const userDetails = await supabase
    .from("users")
    .select()
    .eq("id", data.session?.user.id);

  if (error) {
    throw error;
  }

  return userDetails?.data?.[0];
}