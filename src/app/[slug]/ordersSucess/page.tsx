"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ChevronsLeftIcon} from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
   const handleBackClick = () => {
  router.push(`/${slug}`);
};

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className=" text-center text-3xl font-bold">
        Pedido realizado com sucesso!
      </h1>

      <p className="text-center">
        Seu pedido foi enviado ao restaurante.
      </p>
      <div className="flex items-center gap-6">
          <Button
        size="icon"
        variant="secondary"
        className="rounded-xl bg-red-500 text-white hover:bg-red-600 w-45"
        onClick={handleBackClick}
      >
        <p className="p-3">voltar para o Cardápio</p>
      </Button>

      <Button className="text-white hover:bg-yellow-600" onClick={() => router.push(`/${slug}/orders`)}>
        Ver meus pedidos
      </Button>
    </div>
    </div>
  );
}
