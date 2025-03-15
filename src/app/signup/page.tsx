"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabaseClient";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.push("/mypage");
      }
    };

    checkUser();
  }, [router]);

  const handleSignUp = async () => {
    const data = await fetch("/api/supabase/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then((res) => res.json());

    setMessage(data.message || data.error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold">新規登録</h1>
      <input type="email" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 my-2" />
      <button onClick={handleSignUp} className="bg-blue-500 text-white p-2 rounded">
        認証リンクを送信
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
