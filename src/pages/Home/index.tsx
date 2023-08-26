import {
  ActionsContainer,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { dateFormatter } from "../../utils/formatters.ts";
import { Summary } from "../../components/Summary/index.tsx";
import { NewTransactionDialog } from "../../components/NewTransactionDialog/index.tsx";

export function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testTransactionData: any[] = [
    {
      id: 0,
      productId: 0, //brings name & description
      product: {
        id: 0,
        type: "technology",
        name: "Produto de teste",
        description: "um produto teste",
        manufacturer: "EmpresaTeste",
      },
      description: "Entrada de um produto",
      type: "income",
      location: "RJ",
      quantity: 100,
      createdAt: "2023-04-18T19:23:00.595Z",
    },
    {
      id: 1,
      productId: 0,
      product: {
        id: 0,
        type: "technology",
        name: "Produto de teste",
        description: "um produto teste",
        manufacturer: "EmpresaTeste",
      },
      type: "outcome",
      location: "RJ",
      quantity: 20,
      createdAt: "2023-04-18T19:23:00.595Z",
    },
  ];

  return (
    <>
      <Summary />
      <TransactionsContainer>
        <ActionsContainer>
          <NewTransactionDialog />
        </ActionsContainer>
        <TransactionsTable>
          <tbody>
            {testTransactionData.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{`${transaction.product?.name} - ${transaction.product?.description}`}</td>
                  <td>{transaction.product?.category}</td>
                  <td>{transaction.location}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {transaction.quantity}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
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
