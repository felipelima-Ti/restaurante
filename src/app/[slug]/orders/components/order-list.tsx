"use client";
import { Button } from "@/components/ui/button";
import { ChevronsLeftIcon, ScrollTextIcon } from "lucide-react";
import { OrderStatus, Prisma } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/formatcurrency";
import { useRouter } from "next/navigation";

interface OrderListProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>[];
}

const getStatusLabel = (status: OrderStatus) => {
  if (status == "DELIVERY") return "Saiu para a entrega";
  if (status == "FINISHED") return "Finalizado";
  if (status == "IN_PREPERATION") return "Em preparo";
  if (status == "PENDING") return "Pendente";
  return "";
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
 
  const handleBackClick = () => {
    router.back();
    setTimeout(() => {
      if (typeof window !== "undefined") {
        location.reload();
      }
    }, 100);
  };

  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronsLeftIcon />
      </Button>

      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus pedidos</h2>
      </div>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5 border border-gray-200">
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white
                ${
                  order.status == OrderStatus.FINISHED
                    ? "bg-green-500"
                    : "bg-gray-400"
                }
                ${
                  order.status == OrderStatus.IN_PREPERATION
                    ? "bg-orange-400"
                    : "bg-gray-400"
                }
                ${
                  order.status == OrderStatus.DELIVERY
                    ? "bg-green-400"
                    : "bg-gray-400"
                }
              `}
            >
              {getStatusLabel(order.status)}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative h-4 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  width={300}
                  height={220}
                  className="rounded-sm"
                />
              </div>
              <p className="font-semibold text-sm">{order.restaurant.name}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="h-4 w-4 flex items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white mb-20">
                    {orderProduct.quantity}
                  </div>

                  <div>
                    <p className="text-sm">{orderProduct.product.name}</p>
                    <p className="mt-2 text-xs text-black-500">
                      código pedido: {order.id}
                    </p>
                    <p className="mt-2 text-xs text-black-500">
                      nome da rua: {order.customerEndereco}
                    </p>
                    <p className="mt-2 text-xs text-black-500">
                      observações: {order.customerCartao}
                    </p>
                    <p className="mt-2 text-xs text-black-500">
                        Pagamento: {order.customerPagamento}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
