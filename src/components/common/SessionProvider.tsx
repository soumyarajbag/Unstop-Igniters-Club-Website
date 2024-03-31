"use client";
import { useUser } from "@/lib/store/user";
import { supabase } from "@/lib/supabase-client";
import { getUserInfo } from "@/utils/functions/getUserInfo";
import { useEffect } from "react";

const SessionProvider = () => {
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);

  useEffect(() => {
    const readUserSession = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };
    readUserSession();
  }, []);

  return <></>;
};

export default SessionProvider;
