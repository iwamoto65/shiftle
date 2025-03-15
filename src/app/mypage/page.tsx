"use client";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function MyPagePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();
      setUser(supabaseUser);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>マイページ</h1>
      {user?.id}
    </div>
  );
}
