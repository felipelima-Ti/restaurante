import { db } from "@/lib/prisma"
import Image from "next/image";
import { notFound } from "next/navigation";

import ConsumptionMethodOption from "./components/comsumption-method-option";
interface RestaurantPageProps{
    params: Promise<{slug: string}>
}

const RestaurantPage = async ({params}: RestaurantPageProps) => {
    const {slug} = await params
  const restaurant = await db.restaurant.findUnique({
    where: {slug},
   
});
  if(!restaurant){
    return notFound()
}
return(
<div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
   
    <div className="flex flex-col items-center gap-2">
    <Image src={restaurant?.avatarImageUrl} alt={restaurant.name}width={82} height={82}/>
    </div>
    <h2 className="p-1">{restaurant.name}</h2>
  
    <div className="pt-24 text-center space-y-2">
        <h3 className="text-2x1 font-semibold">
            Seja bem-vindo!
        </h3>
        <p className="opacity-55">
            Escolha como prefere aproveitar sua refeiçao. Estamos
            oferecer praticidade e sabor em cada detalhe!
        </p>
    </div>
    <div className="grid grid-cols-2 pt-14">
    <ConsumptionMethodOption
    option="DINE_IN"
    slug={slug}
    buttonText="Para comer aqui"
    imageAlt="Comer aqui"
    imageUrl="/dine_in.jpg"
    coverImageUrl="/restaurant.jpg"
    
    />
     <ConsumptionMethodOption
     option="TAKEAWAY"
     slug={slug}
    buttonText="Para levar"
    imageAlt="Para levar"
    imageUrl="/sacola.jpg"
    coverImageUrl="/restaurant.jpg"
    />
    </div>
</div>
)
};
export default RestaurantPage;
