
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { ADMIN_CPFS } from "@/lib/admin-cpfs";

import OrderList from "../../[slug]/orders/components/order-adm";

import LogoutButton from "../../admin/button";

 import { cookies } from "next/headers";

interface AdminOrdersPageProps {
  searchParams: Promise<{
    cpf?: string;
  }>;
}

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
 
const cookieStore = await cookies();

const cpf = cookieStore.get("admin")?.value;

if (!cpf || !ADMIN_CPFS.includes(cpf)) {
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

     <LogoutButton/>

      </div>

      <OrderList orders={orders} />

    </div>
  );
}