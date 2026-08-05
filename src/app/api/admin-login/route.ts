import { NextResponse } from "next/server";
import { ADMIN_CPFS } from "@/lib/admin-cpfs";

export async function POST(req: Request) {
  const body = await req.json();

  const cpf = body.cpf.replace(/\D/g, "");

  if (!ADMIN_CPFS.includes(cpf)) {
    return NextResponse.json(
      { error: "Não autorizado" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin", cpf, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
  });

  return response;
}