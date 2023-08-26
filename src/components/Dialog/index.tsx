import * as radixDialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { ActionButton } from "./styles";

interface NewTransactionDialogProps {
  buttonText: string;
  children: ReactNode;
}

export function Dialog({ buttonText, children }: NewTransactionDialogProps) {
  return (
    <radixDialog.Root>
      <radixDialog.Trigger asChild>
        <ActionButton> {buttonText} </ActionButton>
      </radixDialog.Trigger>

      {children}
    </radixDialog.Root>
  );
}
