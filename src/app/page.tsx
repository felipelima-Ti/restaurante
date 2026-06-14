import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const restaurant = await db.restaurant.findFirst();

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className=" bg-red-400/10 h-screen flex flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center">
        <Image
          src="https://github.com/felipelima-Ti/restaurante/blob/main/public/logoi.png?raw=true"
          alt="Nome do restaurante"
          width={82}
          height={82}
        />
      </div>

      <h2 className="p-1 text-3xl text-red-700  font-bold text-center">{restaurant.name}</h2>
      <div className="pt-24 text-center space-y-2">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        

        <p className="opacity-55">
          O sabor que você procura está aqui, onde cada prato conta uma
          história.
        </p>
      </div>

      <div className="pt-14">
        <Button
          className="bg-red-700 text-white px-10 py-2 rounded-full"
          asChild
        >
          <Link href={`/${restaurant.slug}/menu`}>
            Ver cardápio
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;