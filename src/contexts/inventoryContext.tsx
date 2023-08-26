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
  createTransaction: (data: CreateTransactionFormData) => Promise<Error | void>;
  createProduct: (data: CreateProductFormData) => void;
}

export const InventoryContext = createContext({} as InventoryContextType);

interface CreateTransactionFormData {
  quantity: number;
  location: string;
  productId: string;
  type: "income" | "outcome";
}
interface CreateProductFormData {
  name: string;
  manufacturer: string;
  type: string;
  description: string;
}

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

  async function createTransaction(data: CreateTransactionFormData) {
    try {
      const { productId, quantity, location, type } = data;
      const productData = await api.get(`products/${productId}`);

      if (type === "outcome" && productData.data.quantity < quantity) {
        return new Error(
          "A quantidade requerida excede a quantidade em estoque"
        );
      }

      const response = await api.post("transactions", {
        quantity,
        location,
        productId: Number(productId),
        type,
        createdAt: new Date(),
      });

      setTransactions((state) => [
        { product: productData.data, ...response.data },
        ...state,
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async function createProduct(data: CreateProductFormData) {
    try {
      const { description, manufacturer, name, type } = data;
      const response = await api.post("products", {
        name,
        type,
        description,
        manufacturer,
        quantity: 0,
        createdAt: new Date(),
      });

      setProducts((state) => [response.data, ...state]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        transactions,
        products,
        fetchTransactions,
        fetchProducts,
        createTransaction,
        createProduct,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}
