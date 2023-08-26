import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Product {
  id: number;
  name: string;
  quantity: number;
  description: string;
  type: number;
  manufacturer: string;
  createdAt: string;
}

interface Transaction {
  id: number;
  description: string;
  quantity: number;
  type: "income" | "outcome";
  location: string;
  productId: number;
  product?: Product;
  createdAt: string;
}

interface InventoryContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

export const InventoryContext = createContext({} as InventoryContextType);

interface InventoryProviderProps {
  children: ReactNode;
}

export function InventoryProvider({ children }: InventoryProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        _expand: "product",
        q: query,
      },
    });

    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <InventoryContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </InventoryContext.Provider>
  );
}
