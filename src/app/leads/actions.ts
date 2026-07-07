"use server";

import { cookies } from "next/headers";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please fill in all fields." };
  }

  if (email === "0day.ashish@gmail.com" && password === "Ashish@1206") {
    const cookieStore = await cookies();
    cookieStore.set("leads_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      sameSite: "lax",
    });
    return { success: true };
  }

  return { error: "Invalid email or password." };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("leads_session");
}
