import { User } from "@supabase/supabase-js";

export interface IUser extends User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  college: string;
  college_roll: string;
}
