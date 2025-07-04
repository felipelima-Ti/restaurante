import { db } from "@/lib/prisma";
//import { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";
//import Image from "next/image";
//import { Button } from "@/components/ui/button";
//import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import RestaurantHeader from "./components/header";
import RestaurantCategories from "./components/categories";



interface RestaurantMenuPageProps {
    params: Promise<{ slug: string}>;
    searchParams : Promise<{consumptionMethod: string}>
}
const isConsumptionMethodValid = (ConsumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(ConsumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
    const { slug } = await params;
    const {consumptionMethod} = await searchParams
    if(!isConsumptionMethodValid(consumptionMethod)){
        return notFound()
    }
    const restaurant = await db.restaurant.findUnique({
        where: {slug},
        include: {
            menuCategories: {
                include: { products:true },
            }
          }
    });
    console.log(restaurant?.menuCategories)
    if(!restaurant){
        return notFound()
    }
   return(
    <div className="flex h-full flex-col">
        <RestaurantHeader restaurant={restaurant}/>
        <RestaurantCategories restaurant={restaurant}/>
    </div>
   ) 
};

export default RestaurantMenuPage;
//http://localhost:3000/FAST-burguer/menu?consumptionMethod=1234

