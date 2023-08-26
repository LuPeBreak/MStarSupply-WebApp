import { Routes, Route } from "react-router-dom";
import { Transactions } from "./pages/Transactions";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { InventoryContextLayoutWrapper } from "./layouts/InventoryContextLayoutWrapper";
import { Products } from "./pages/Products";

export function Router() {
  return (
    <Routes>
      <Route element={<InventoryContextLayoutWrapper />}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Transactions />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Route>
    </Routes>
  );
}
