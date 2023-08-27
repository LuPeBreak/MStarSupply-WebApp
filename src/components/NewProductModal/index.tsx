import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay } from "./styles";
import { X } from "phosphor-react";
import { FormError } from "../FormError";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { InventoryContext } from "../../contexts/InventoryContext";

const newProductFormSchema = zod.object({
  name: zod
    .string({ required_error: "O Nome do produto é obrigatório" })
    .min(2, { message: "Mínimo de 2 Caracteres" }),
  manufacturer: zod.string({
    required_error: "O Fabricante do produto é obrigatório",
  }),
  type: zod.string({ required_error: "O Tipo do produto é obrigatório" }),
  description: zod
    .string({ required_error: "A descrição produto é obrigatória" })
    .min(2, { message: "Mínimo de 2 Caracteres" }),
  regNo: zod
    .string({ required_error: "O numero de registro do produto é obrigatório" })
    .min(1, { message: "Mínimo de 1 Carácter" }),
});

type newProductFormInputs = zod.infer<typeof newProductFormSchema>;

export function NewProductModal() {
  const { createProduct } = useContext(InventoryContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<newProductFormInputs>({
    resolver: zodResolver(newProductFormSchema),
  });

  function handleCreateNewProduct(data: newProductFormInputs) {
    createProduct(data);
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Novo Produto</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewProduct)}>
          <input
            type="text"
            placeholder="Nome"
            required
            {...register("name")}
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}

          <input
            type="text"
            placeholder="Fabricante"
            required
            {...register("manufacturer")}
          />
          {errors.manufacturer && (
            <FormError>{errors.manufacturer.message}</FormError>
          )}

          <input
            type="text"
            placeholder="Tipo"
            required
            {...register("type")}
          />
          {errors.type && <FormError>{errors.type.message}</FormError>}

          <input
            type="text"
            placeholder="Numero de Registro"
            required
            {...register("regNo")}
          />
          {errors.regNo && <FormError>{errors.regNo.message}</FormError>}

          <textarea
            placeholder="Descrição"
            required
            {...register("description")}
          />
          {errors.description && (
            <FormError>{errors.description.message}</FormError>
          )}

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
