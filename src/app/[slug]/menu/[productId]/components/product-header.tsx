"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";



interface ProductHeaderProps {
    product: Pick<Product,'name' | 'imageUrl'>;
}
const ProductHeader = ({ product }: ProductHeaderProps) => {
    const {slug} = useParams<{slug: string}>();
    const router = useRouter()
    const handleBackClick = () => router.back();
    const handleOrdersClick  = () =>router.push(`/${slug}/orders`)
    return ( 
                <div className="relative h-[250px] w-full ">
                    <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute top-4 left-4 rounded-full z-50"
                    onClick={handleBackClick}
                    >
                        <ChevronLeftIcon/>
                    </Button>
                    <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute top-4 right-4 rounded-full z-50"
                    onClick={handleOrdersClick} 
                    >
                    <ScrollTextIcon/>
                    </Button>
                    <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain mt-2"
                    />
                </div>
     );
}
 
export default ProductHeader ;