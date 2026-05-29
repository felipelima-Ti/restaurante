"use client";

import { useState } from "react";
import { Order, OrderStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface Props {
  order: Order;
}

export default function EditOrderForm({
  order,
}: Props) {
  const router = useRouter();

  const [customerName, setCustomerName] =
    useState(order.customerName);

  const [customerCpf, setCustomerCpf] =
    useState(order.customerCpf);

  const [customerEndereco, setCustomerEndereco] =
    useState(order.customerEndereco);

  const [customerCartao, setCustomerCartao] =
    useState(order.customerCartao ?? "");

  const [customerPagamento, setCustomerPagamento] =
    useState(order.customerPagamento ?? "");

  const [status, setStatus] = useState(order.status);

  const handleSave = async () => {
    await fetch(`/api/orders/${order.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName,
        customerCpf,
        customerEndereco,
        customerCartao,
        customerPagamento,
        status,
      }),
    });

    router.back();
     setTimeout(() => {
    window.location.reload();
  }, 100);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        Editar Pedido #{order.id}
      </h1>

      <Input
        value={customerName}
        onChange={(e) =>
          setCustomerName(e.target.value)
        }
        placeholder="Nome"
      />

      <Input
        value={customerCpf}
        onChange={(e) =>
          setCustomerCpf(e.target.value)
        }
        placeholder="CPF"
      />

      <Input
        value={customerEndereco}
        onChange={(e) =>
          setCustomerEndereco(e.target.value)
        }
        placeholder="Endereço"
      />

      <Input
        value={customerCartao}
        onChange={(e) =>
          setCustomerCartao(e.target.value)
        }
        placeholder="Observações"
      />

      <Input
        value={customerPagamento}
        onChange={(e) =>
          setCustomerPagamento(e.target.value)
        }
        placeholder="Pagamento"
      />

      <select
        className="w-full border rounded-md p-2"
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value as OrderStatus
          )
        }
      >
        <option value="PENDING">
          Pendente
        </option>

        <option value="IN_PREPERATION">
          Em preparo
        </option>

        <option value="DELIVERY">
          Saiu para entrega
        </option>

        <option value="FINISHED">
          Finalizado
        </option>
      </select>

      <Button
        className="w-full"
        onClick={handleSave}
      >
        Salvar Alterações
      </Button>
    </div>
  );
}