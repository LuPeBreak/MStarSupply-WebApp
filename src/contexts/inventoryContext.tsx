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
  products: Product[];
  fetchTransactions: (query?: string) => Promise<void>;
  fetchProducts: (query?: string) => Promise<void>;
}

export const InventoryContext = createContext({} as InventoryContextType);

interface InventoryProviderProps {
  children: ReactNode;
}

export function InventoryProvider({ children }: InventoryProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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

  async function fetchProducts(query?: string) {
    const response = await api.get("products", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setProducts(response.data);
  }

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  return (
    <InventoryContext.Provider
      value={{ transactions, products, fetchTransactions, fetchProducts }}
    >
      {children}
    </InventoryContext.Provider>
  );
}
