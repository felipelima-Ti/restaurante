import { db } from "@/lib/prisma";
import EditOrderForm from "./components/edit-order-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditOrderPage({
  params,
}: Props) {
  const { id } = await params;

  const order = await db.order.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!order) {
    return <div>Pedido não encontrado</div>;
  }

  return (
    <EditOrderForm order={order} />
  );
}