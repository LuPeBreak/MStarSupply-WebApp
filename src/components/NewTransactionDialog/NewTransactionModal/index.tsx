import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  FormError,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionFormSchema = zod.object({
  quantity: zod.number({ required_error: "Quantidade é obrigatório" }),
  location: zod.string({ required_error: "Localização é obrigatória" }).min(2, { message: "Mínimo de 2 Caracteres" }),
  productId: zod.string({ required_error: "Produto é obrigatório" }),
  type: zod.enum(["income", "outcome"]),
});

type newTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
    },
  });

  function handleCreateNewTransaction(data: newTransactionFormInputs) {
    console.log(data);
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="number"
            placeholder="Quantidade"
            required
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && <FormError>{errors.quantity.message}</FormError>}
          <input
            type="text"
            placeholder="Local"
            required
            {...register("location")}
          />
          {errors.location && <FormError>{errors.location.message}</FormError>}
          <select id="productId" {...register("productId")}>
            <option value="1">Product1</option>
            <option value="2">Product2</option>
          </select>

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value="income" variant="income">
                    <ArrowCircleUp /> Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown /> Saida
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}