"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (!accessToken || !refreshToken) router.push("/");
      const { data } = await supabase.auth.getSession();

      if (data) {
        router.push("/mypage");
      } else {
        router.push("/");
      }
    };

    handleAuth();
  }, [router]);

  return <p>ログイン処理中...</p>;
}
