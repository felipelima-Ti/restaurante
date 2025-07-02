import { SheetContent, SheetHeader, SheetTitle, Sheet } from "@/components/ui/sheet";
import { CartContext } from "../contexts/cart";
import { useContext, useState } from "react";
import CartProductItem from "./cart-product-item";
import { Card,CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/formatcurrency";
import "./style.css"

import { Button } from "@/components/ui/button";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [FinishOrDialogIsOpen, setFinishDialogIsOpen] = useState(false)
  const { isOpen, toggleCart, products,total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="py-5 flex flex-col h-full">
       <div className="flex-auto">
       {products.map((product) => (
         <CartProductItem key={product.id} product={product}/>
        ))}
       </div>
       <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="font-semibold text-sm">{formatCurrency(total)}</p>
          </div>
        </CardContent>
       </Card>
       <Button className="w-full rounded-full" onClick={() =>setFinishDialogIsOpen(true)}>Finalizar pedido</Button>
       <FinishOrderDialog open ={FinishOrDialogIsOpen} onOpenChange={setFinishDialogIsOpen}/>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;