"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { z } from "zod";
import { isValidCpf } from "../helpers/cpf";
import { formatarEndereco } from "../helpers/endereco";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";
import { ConsumptionMethod } from "@prisma/client";
import { useParams, useSearchParams } from "next/navigation";
import { createOrder } from "../actions/create-order";
import { useContext, useTransition } from "react";
import { CartContext } from "../contexts/cart";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

// ======== Schema de validação ========
const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório.",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido",
    }),
  endereco: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? formatarEndereco(value) : "")),
  cartao: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? formatarEndereco(value) : "")),
  pagamento: z.string().trim().min(1, { message: "Selecione uma forma de pagamento" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      endereco: "",
      cartao: "",
      pagamento: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = searchParams.get(
        "consumptionMethod"
      ) as ConsumptionMethod;

      startTransition(async () => {
        await createOrder({
          consumptionMethod,
          customerCpf: data.cpf,
          customerEndereco: data.endereco,
          customerName: data.name,
          customerCartao: data.cartao,
          customerPagamento: data.pagamento,
          products,
          slug,
        });
        onOpenChange(false);
        toast.success("Pedido finalizado com sucesso!");
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Para exibir formulário condicional
  const pagamentoSelecionado = form.watch("pagamento");

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar seu pedido</DrawerTitle>
          <DrawerDescription>
            Insira seus dados abaixo para finalizar seu pedido
          </DrawerDescription>
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
                      <PatternFormat
                        placeholder="Digite seu CPF..."
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
                    <FormLabel>Seu endereço (opcional)</FormLabel>
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
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: tirar cebola ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pagamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de pagamento</FormLabel>
                    <FormControl>
                      <select {...field} className="border rounded p-2 w-full">
                        <option value="">Selecione...</option>
                        <option value="Caixa">Caixa</option>
                        <option value="Credito">Crédito</option>
                        <option value="Debito">Débito</option>
                        <option value="Pix">Pix</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Formulário condicional */}
              {pagamentoSelecionado && (
                <div className="mt-4 p-4 border rounded-md bg-gray-50 space-y-3">
                  <h3 className="text-sm font-semibold">
                    Finalizar pagamento ({pagamentoSelecionado})
                  </h3>

                  {pagamentoSelecionado === "Caixa" && (
                    <p>Pague no caixa depois</p>
                  )}

                  {pagamentoSelecionado === "Credito" && (
                    <>
                      <Input placeholder="Número do cartão" className="w-full" />
                      <Input placeholder="Nome no cartão" className="w-full" />
                      <div className="flex gap-2">
                        <Input placeholder="Validade" className="w-1/2" />
                        <Input placeholder="CVV" className="w-1/2" />
                      </div>
                    </>
                  )}

                  {pagamentoSelecionado === "Debito" && (
                    <>
                      <Input placeholder="Número do cartão" className="w-full" />
                      <Input placeholder="Nome no cartão" className="w-full" />
                    </>
                  )}

                  {pagamentoSelecionado === "Pix" && (
                    <p>Escaneie o QR Code ou use a chave PIX para pagar.</p>
                  )}
                </div>
              )}

              <DrawerFooter>
                <Button
                  type="submit"
                  className="w-full rounded-full"
                  disabled={isPending}
                >
                  {isPending && <Loader2Icon className="animate-spin" />}
                  Finalizar seu pedido
                </Button>
                <DrawerClose asChild>
                  <Button
                    className="w-full rounded-full card"
                    variant="secondary"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
