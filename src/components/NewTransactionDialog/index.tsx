import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionButton } from "./styles";
import { NewTransactionModal } from "./NewTransactionModal";

export function NewTransactionDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <NewTransactionButton> Nova transação </NewTransactionButton>
      </Dialog.Trigger>

      <NewTransactionModal />
    </Dialog.Root>
  );
}
