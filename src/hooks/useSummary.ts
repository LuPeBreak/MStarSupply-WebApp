import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";

export function useSummary() {
  const { transactions } = useContext(InventoryContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.quantity;
        acc.total += transaction.quantity;
      } else {
        acc.outcome += transaction.quantity;
        acc.total -= transaction.quantity;
      }
      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return summary;
}
