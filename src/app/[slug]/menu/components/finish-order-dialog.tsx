"use client";

import { Button } from "@/components/ui/button";
import { Drawer,DrawerClose,DrawerContent,DrawerDescription,DrawerFooter,DrawerHeader,DrawerTitle,DrawerTrigger } from "@/components/ui/drawer";
import { z} from "zod";
import { isValidCpf } from "../helpers/cpf";
import { formatarEndereco } from "../helpers/endereco";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {PatternFormat} from 'react-number-format'
import { ConsumptionMethod } from "@prisma/client";
import { useParams, useSearchParams } from "next/navigation";
import { createOrder } from "../actions/create-order";
import { useContext, useTransition } from "react";
import { CartContext } from "../contexts/cart";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { formatarCartao } from "../helpers/cartao";
const formSchema = z.object({
     name: z.string().trim().min(1, {
    message: 'O nome é obrigatório',
  }),
  cpf: z.string().trim().min(1, {
    message: 'O CPF é obrigatório.',
  }).refine((value) => isValidCpf(value), {
    message: 'CPF inválido',
  }),
  endereco: z.string().trim().min(1, {
    message: 'O endereço é obrigatório.',
  }).transform((value) => formatarEndereco(value)),
   cartao: z.string()
    .trim()
    .transform((value) => formatarCartao(value))
});

type FormSchema  = z.infer<typeof formSchema>

interface FinishOrderDialogProps {
    open:boolean;
    onOpenChange : (open: boolean) => void
}

const FinishOrderDialog = ({open, onOpenChange}:FinishOrderDialogProps) => {
  const {slug} = useParams<{slug: string }>()
    const {products} = useContext(CartContext)
  const searchParams = useSearchParams();
  const [isPending,startTransition] = useTransition();
    const form =  useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
            endereco:"",
            cartao:"",
        },
        shouldUnregister: true,
    })
    const onSubmit = async (data: FormSchema )  => {
        try{
          const consumptionMethod = searchParams.get(
            "consumptionMethod",
          ) as ConsumptionMethod;
          startTransition(async () => {
            await createOrder({
              consumptionMethod,
              customerCpf: data.cpf,
              customerEndereco: data.endereco,
              customerName: data.name,
              customerCartao: data.cartao,
              products,
              slug,
            });
            onOpenChange(false);
            toast.success("Pedido finalizado com sucesso!");
          })
        }catch (error){
          console.error(error)
        }
    }
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Finalizar seu pedido</DrawerTitle>
                <DrawerDescription>insira seus dados abaixo para finalizar seu pedido</DrawerDescription>
                </DrawerHeader>
            <div className="p-5">
                <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu CPF</FormLabel>
              <FormControl>
                <PatternFormat placeholder="digite seu CPF..."
                 format="###.###.###-##"
                 customInput={Input}
                 {...field}
                 />
              </FormControl>
              <FormMessage />
            </FormItem> 
          )}
        />
         <FormField
          control={form.control}
          name="endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu endereço</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu endereço..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="cartao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>digite o numero do cartão</FormLabel>
              <FormControl>
                <Input placeholder="Cartao credito ou debito..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <DrawerFooter>
         <Button type="submit"  className="2-full rounded-full" disabled={isPending}>
          {isPending && <Loader2Icon className="animate-spin"/>}
          Finalizar seu pedido</Button>
                    <DrawerClose asChild>
                        <Button className="w-full rounded-full card" variant="secondary">Cancelar</Button>
                    </DrawerClose>
                </DrawerFooter>
      </form>
    </Form>
    </div>
               
            </DrawerContent>
        </Drawer>
    );
}
export default FinishOrderDialog;