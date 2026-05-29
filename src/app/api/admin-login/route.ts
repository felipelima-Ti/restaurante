import { NextResponse } from "next/server";
import { ADMIN_CPFS } from "@/lib/admin-cpfs";

export async function POST(req: Request) {

  const body = await req.json();

  const cpf = body.cpf.replace(/\D/g, "");

  const isAdmin = ADMIN_CPFS.includes(cpf);

  if (!isAdmin) {
    return NextResponse.json(
      { error: "Não autorizado" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}