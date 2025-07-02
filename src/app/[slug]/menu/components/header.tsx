"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { Restaurant } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant,'name' | 'coverImageUrl'>
}

const RestaurantHeader = ({restaurant}: RestaurantHeaderProps) => {
    const {slug} =useParams<{ slug: string}>();
    const  router = useRouter();
    const handleBackClick = () => router.back();
    const handleOrdersClick = () => router.push(`/${slug}/orders`)
    return ( 
        <div>
        <div className="relative min-h-[300px] w-full ">
            <Button variant="secondary" size="icon" className="absolute top-4 left-4 rounded-full z-50" onClick={handleBackClick}>
                <ChevronLeftIcon/>
            </Button>
           
            <Image src={restaurant.coverImageUrl} alt={restaurant.name } fill className="object-cover"/>
            <Button variant="secondary" size="icon" className="absolute top-4 right-4 rounded-full z-50" onClick={handleOrdersClick}>
            <ScrollTextIcon/>
            </Button>
        </div>
    </div>
     );
}
 
export default RestaurantHeader;