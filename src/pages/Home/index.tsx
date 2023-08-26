import {
  ActionsContainer,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { dateFormatter } from "../../utils/formatters.ts";
import { Summary } from "../../components/Summary/index.tsx";
import { NewTransactionDialog } from "../../components/NewTransactionDialog/index.tsx";
import { useContext } from "react";
import { InventoryContext } from "../../contexts/InventoryContext.tsx";

export function Home() {
  const { transactions } = useContext(InventoryContext);

  return (
    <>
      <Summary />
      <TransactionsContainer>
        <ActionsContainer>
          <NewTransactionDialog />
        </ActionsContainer>
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{`${transaction.product?.name} - ${transaction.product?.description}`}</td>
                  <td>{transaction.location}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {transaction.quantity}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.location}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  );
}
