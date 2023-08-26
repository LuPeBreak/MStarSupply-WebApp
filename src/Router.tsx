import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { InventoryContextLayoutWrapper } from "./layouts/InventoryContextLayoutWrapper";
import { Products } from "./pages/Products";

export function Router() {
  return (
    <Routes>
      <Route element={<InventoryContextLayoutWrapper />}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Route>
    </Routes>
  );
}
