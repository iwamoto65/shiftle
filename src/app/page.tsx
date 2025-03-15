"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "@/utils/supabaseClient";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLogin(!!data.session);
      setIsLoading(false);
    };

    checkUserStatus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading ? (
        <p>読み込み中...</p>
      ) : (
        <>
          <h1>HOME</h1>
          {isLogin ? (
            <>
              <Link href="mypage">マイページ</Link>
            </>
          ) : (
            <>
              <Link href="signup">新規登録またはログイン</Link>
            </>
          )}
        </>
      )}
    </div>
  );
}
