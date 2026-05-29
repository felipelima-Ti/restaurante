import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("PATCH executado");

  const { status } = await request.json();
  const { id } = await params;

  const order = await db.order.update({
    where: {
      id: Number(id),
    },
    data: {
      status,
    },
  });

  return NextResponse.json(order);
}