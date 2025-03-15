import { NextResponse } from "next/server";
import supabase from "@/utils/supabaseClient";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) responseError("メールアドレスは必須です。", 400)

    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) responseError(error.message, 400)

    return NextResponse.json({ message: "リンクを送信しました。" });
  } catch (error) {
    if (error instanceof Error) responseError(error.message, 500)
    responseError("間違いがあります。", 500)
  }
}

const responseError = (message: string, code: number) => {
  return NextResponse.json({ error: message }, { status: code });
}
