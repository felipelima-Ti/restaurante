import Image from "next/image";
import { CartContext, CartProduct } from "../contexts/cart";
import { formatCurrency } from "@/helpers/formatcurrency";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps{
    product: CartProduct
}
const CartProductItem = ({product}: CartItemProps) => {
    const{decreaseProductQuantity,increaseProductQuantity,removeProduct} = useContext(CartContext)
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
                <Image src={product.imageUrl} alt={product.name} fill/>
            </div>
            <div className="space-y-1">
                <p className="text-xs max-w-[72%] truncate text-ellipsis">{product.name}</p>
                <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                <div className="flex items-center gap-1 text-center">
                    <Button variant="outline" className="w-7 h-7 rounded-lg"onClick={() => decreaseProductQuantity(product.id)}>
                        <ChevronLeftIcon size={14}/>
                    </Button>
                    <p className="text-xs w-7">{product.quantity}</p>
                    <Button variant="destructive" className="w-7 h-7 rounded-lg"onClick={()=> increaseProductQuantity(product.id)}>
                        <ChevronRightIcon size={14}/>
                    </Button>
                      <Button className="h-7 w-7 rounded-lg ml-20" variant="outline"onClick={() =>removeProduct(product.id)}>
                <TrashIcon/></Button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CartProductItem;