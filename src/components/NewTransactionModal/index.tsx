import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryContext } from "../../contexts/InventoryContext";
import { useContext } from "react";
import { FormError } from "../FormError";

const newTransactionFormSchema = zod.object({
  quantity: zod
    .number({
      invalid_type_error: "Quantidade precisa ser um numero",
      required_error: "Quantidade é obrigatório",
    })
    .min(0, { message: "O numero precisa ser maior que 0" }),
  date: zod.date(),
  location: zod
    .string({ required_error: "Localização é obrigatória" })
    .min(2, { message: "Mínimo de 2 Caracteres" }),
  productId: zod.string({ required_error: "Produto é obrigatório" }),
  type: zod.enum(["income", "outcome"]),
});

type newTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const { products, createTransaction } = useContext(InventoryContext);

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreateNewTransaction(data: newTransactionFormInputs) {
    const response = await createTransaction(data);
    if (response instanceof Error) {
      setError("quantity", { message: response.message });
      return;
    }
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
            // min={0}
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

          <input
            type="datetime-local"
            placeholder="Data"
            required
            {...register("date", { valueAsDate: true })}
          />
          {errors.date && <FormError>{errors.date.message}</FormError>}

          <select id="productId" {...register("productId")}>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
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
