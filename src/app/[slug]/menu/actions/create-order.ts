"use server";
import { db } from "@/lib/prisma";
import { ConsumptionMethod } from "@prisma/client";
import { removeCpfPunctation } from "../helpers/cpf";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { formatarEndereco } from "../helpers/endereco";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  customerEndereco: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
    console.log("Received consumptionMethod:", input.consumptionMethod);
    console.log("Available Consumption Methods:", Object.values(ConsumptionMethod));
  
   
    const restaurant = await db.restaurant.findUnique({
      where: { slug: input.slug },
    });
  
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
  
    const productsWithPrices = await db.product.findMany({
      where: {
        id: { in: input.products.map((product) => product.id) },
      },
    });
  
    const productsWithPricesAndQuantities = input.products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      price: productsWithPrices.find((p) => p.id === product.id)?.price ?? 0, // Evita erro se não encontrar preço
    }));
  
    await db.order.create({
      data: {
        status: "PENDING",
        customerName: input.customerName,
        customerCpf: removeCpfPunctation(input.customerCpf),
        customerEndereco: formatarEndereco(input.customerEndereco),
        orderProducts: {
          createMany: {
            data: productsWithPricesAndQuantities,
          },
        },
        total: productsWithPricesAndQuantities.reduce((acc, product) => acc + product.price * product.quantity, 0),
        consumptionMethod: input.consumptionMethod, // Agora garantimos que será válido
        restaurantId: restaurant.id,
      },
    });
    revalidatePath(`/${input.slug}/orders`);
    redirect(
      `/${input.slug}/orders?cpf=${removeCpfPunctation(input.customerCpf)}`
    );
  };