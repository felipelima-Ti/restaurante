"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/formatcurrency";
import { Prisma } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react"
import { CartContext } from "../../contexts/cart";
import CartSheet from "../../components/cart-sheet";
interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true;
                }
            }
        }
    }>;

}
const ProductDetails = ({ product }: ProductDetailsProps) => {
    const { toggleCart, addProduct } = useContext(CartContext)
    const [quantity, setQuantity] = useState<number>(1);
    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if (prev == 1) {
                return 1
            }
            return prev - 1;
        });
    };
    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }
    const handleAddToCart = () => {
        addProduct({
            ...product,
            quantity: quantity,
        })
        toggleCart()
    };
    return (
        <>
            <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl py-5 p-5 flex-auto flex flex-col overflow-hidden">
                <div className="flex-auto overflow-hidden mt-2">
                    <div className="flex items-center">
                        {/*Nome do produto */}
                        <Image src={product.restaurant.avatarImageUrl}
                            alt={product.restaurant.name}
                            width={35} height={35}
                            className="rounded-full mt-2" />
                        <p className="gap-1 space-x-1 text-xs text-muted-foreground ml-2">
                            {product.restaurant.name}
                        </p>
                    </div>
                    <h2 className="mt-1 text-x1 font-semibold">{product.name}</h2>
                    {/*preço e quantidade*/}
                    <div className="flex items-center justify-between mt-3">
                        <h3 className="text xl font-semibold">
                            {formatCurrency(product.price)}
                        </h3>
                        <div className="flex items-center gap-3 text-center">
                            <Button variant="outline" className="h-8 w-8 rounded xl" onClick={handleDecreaseQuantity}>
                                <ChevronLeftIcon />
                            </Button>
                            <p className="w-4">{quantity}</p>
                            <Button variant="destructive" className="h-8 w-8 rounded xl" onClick={handleIncreaseQuantity}>
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                    <ScrollArea className="h-full">
                        <div className="mt-6 space-y-3">
                            <h4 className="font-semibold">Sobre</h4>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>
                        {/*Ingredientes */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-1.5">
                                <ChefHatIcon size={18} />
                                <h4 className="font-semibold">Indredientes</h4>
                            </div>
                            <ul className="list-disc px-5 text-sm text-muted-foreground">
                                {product.ingredients.map(ingredient => (
                                    <li key={ingredient}>{ingredient}</li>

                                ))}
                            </ul>
                        </div>
                    </ScrollArea>
                </div>
                <Button className="w-full rounded -full mt-6" onClick={handleAddToCart}>Adicionar á sacola</Button>
            </div>
            
            <CartSheet />

        </>
    );
}

export default ProductDetails;