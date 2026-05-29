import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const order = await db.order.update({
    where: {
      id: Number(id),
    },
    data: {
      customerName: body.customerName,
      customerCpf: body.customerCpf,
      customerEndereco: body.customerEndereco,
      customerCartao: body.customerCartao,
      customerPagamento: body.customerPagamento,
      status: body.status as OrderStatus,
    },
  });

  return NextResponse.json(order);
}