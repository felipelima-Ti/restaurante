import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumptionMethodOption from "./[slug]/components/comsumption-method-option";
import "./style.css";

const HomePage = async () => {
  const restaurant = await db.restaurant.findFirst(); // Busca restaurante

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
      <Image
src="https://github.com/felipelima-Ti/restaurante/blob/main/public/logoi.png?raw=true"
  alt="Nome do restaurante"
  width={82}
  height={82}
/>      
      </div>

      <h2 className="p-1">{restaurant.name}</h2>
      <div className="pt-24 text-center space-y-2">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
         O sabor que você procura está aqui, onde cada prato conta uma história Escolha como prefere aproveitar sua refeição!
        </p>
      </div>
      <div className="grid grid-cols-2 pt-14">
        <ConsumptionMethodOption
          option="DINE_IN"
          slug={restaurant.slug} //slug restaurante
          buttonText="Para comer aqui"
          imageAlt="Comer aqui"
          imageUrl="/dine_in.jpg"
          coverImageUrl="/restaurant.jpg"
        />
        <ConsumptionMethodOption
          option="TAKEAWAY"
          slug={restaurant.slug}
          buttonText="Para levar"
          imageAlt="Para levar"
          imageUrl="/sacola.jpg"
          coverImageUrl="/restaurant.jpg"
        />
      </div>
    </div>
  );
};

export default HomePage;
