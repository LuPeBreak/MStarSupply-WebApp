import {
  ActionsContainer,
  PriceHighlight,
} from "./styles";
import { dateFormatter } from "../../utils/formatters.ts";
import { NewTransactionDialog } from "../../components/NewTransactionDialog/index.tsx";
import { useContext } from "react";
import { InventoryContext } from "../../contexts/InventoryContext.tsx";
import { Table } from "../../components/Table/index.ts";

export function Home() {
  const { transactions } = useContext(InventoryContext);

  return (
    <>
      <ActionsContainer>
        <NewTransactionDialog />
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
