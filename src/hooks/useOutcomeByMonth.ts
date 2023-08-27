import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";

export function useOutcomeByMonth(productId: number) {
  const { transactions } = useContext(InventoryContext);

  const filterTransactionsByProductIdOutcomeAndYear = transactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      if (
        productId === transaction.productId &&
        transaction.type === "outcome" &&
        transactionDate.getUTCFullYear() === new Date().getUTCFullYear()
      ) {
        return true;
      }
    }
  );

  const TotalOutcomeByMonth =
    filterTransactionsByProductIdOutcomeAndYear.reduce(
      (acc, transaction) => {
        const date = new Date(transaction.createdAt);
        switch (date.getMonth()) {
          case 0:
            acc.Janeiro += transaction.quantity;
            break;
          case 1:
            acc.Fevereiro += transaction.quantity;
            break;
          case 2:
            acc.Março += transaction.quantity;
            break;
          case 3:
            acc.Abril += transaction.quantity;
            break;
          case 4:
            acc.Maio += transaction.quantity;
            break;
          case 5:
            acc.Junho += transaction.quantity;
            break;
          case 6:
            acc.Julho += transaction.quantity;
            break;
          case 7:
            acc.Agosto += transaction.quantity;
            break;
          case 8:
            acc.Setembro += transaction.quantity;
            break;
          case 9:
            acc.Outubro += transaction.quantity;
            break;
          case 10:
            acc.Novembro += transaction.quantity;
            break;
          case 11:
            acc.Dezembro += transaction.quantity;
            break;
          default:
            break;
        }

        return acc;
      },
      {
        Janeiro: 0,
        Fevereiro: 0,
        Março: 0,
        Abril: 0,
        Maio: 0,
        Junho: 0,
        Julho: 0,
        Agosto: 0,
        Setembro: 0,
        Outubro: 0,
        Novembro: 0,
        Dezembro: 0,
      }
    );

  return TotalOutcomeByMonth;
}
