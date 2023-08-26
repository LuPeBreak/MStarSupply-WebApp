import { ActionsContainer, PriceHighlight } from "./styles.ts";
import { dateFormatter } from "../../utils/formatters.ts";
import { useContext } from "react";
import { InventoryContext } from "../../contexts/InventoryContext.tsx";
import { Table } from "../../components/Table/index.ts";
import { Dialog } from "../../components/Dialog/index.tsx";
import { NewTransactionModal } from "../../components/NewTransactionModal/index.tsx";

export function Transactions() {
  const { transactions } = useContext(InventoryContext);

  return (
    <>
      <ActionsContainer>
        <Dialog buttonText="Nova transação">
          <NewTransactionModal />
        </Dialog>
      </ActionsContainer>
      <Table>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{`${transaction.product?.name} - ${transaction.product?.description}`}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === "outcome" && "- "}
                    {transaction.quantity}
                  </PriceHighlight>
                </td>
                <td>{transaction.location}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
