import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Product {
  id: number;
  name: string;
  regNo: string;
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
  date: Date;
  type: "income" | "outcome";
}
interface CreateProductFormData {
  name: string;
  manufacturer: string;
  type: string;
  description: string;
  regNo: string;
}

interface InventoryProviderProps {
  children: ReactNode;
}

export function InventoryProvider({ children }: InventoryProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchTransactions() {
    const response = await api.get("transaction");

    setTransactions(response.data);
  }

  async function fetchProducts() {
    const response = await api.get("product");

    setProducts(response.data);
  }

  async function createTransaction(data: CreateTransactionFormData) {
    try {
      const { productId, quantity, location, type, date } = data;
      const productData = await api.get(`product/${productId}`);

      let newProduct: Product = productData.data;

      if (type === "outcome") {
        if (productData.data.quantity < quantity) {
          return new Error(
            "A quantidade requerida excede a quantidade em estoque"
          );
        }

        newProduct = {
          ...productData.data,
          quantity: productData.data.quantity - quantity,
        };
        await api.patch(`product/${productId}`, newProduct);
      }
      if (type === "income") {
        newProduct = {
          ...productData.data,
          quantity: productData.data.quantity + quantity,
        };
        await api.patch(`product/${productId}`, newProduct);
      }

      const response = await api.post("transaction", {
        quantity,
        location,
        productId: Number(productId),
        type,
        createdAt: date,
      });

      setTransactions((state) => [
        { product: productData.data, ...response.data },
        ...state,
      ]);
      setProducts((state) =>
        state.map((product) => {
          if (product.id === productData.data.id) {
            return newProduct;
          } else {
            return product;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function createProduct(data: CreateProductFormData) {
    try {
      const { description, manufacturer, name, type, regNo } = data;
      const response = await api.post("product", {
        name,
        type,
        regNo,
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
