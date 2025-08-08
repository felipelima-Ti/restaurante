import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
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

