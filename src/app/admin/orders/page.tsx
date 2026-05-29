import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { ADMIN_CPFS } from "@/lib/admin-cpfs";

import OrderList from "../../[slug]/orders/components/order-adm";

interface AdminOrdersPageProps {
  searchParams: Promise<{
    cpf?: string;
  }>;
}

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {

  const { cpf } = await searchParams;

  if (!cpf) {
    redirect("/admin/login");
  }

  const formattedCpf = cpf.replace(/\D/g, "");

  const isAdmin = ADMIN_CPFS.includes(formattedCpf);

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },

      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Painel Admin
        </h1>

        <a
          href="/admin/login"
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          Sair
        </a>

      </div>

      <OrderList orders={orders} />

    </div>
  );
}