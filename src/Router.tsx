import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { InventoryContextLayoutWrapper } from "./layouts/InventoryContextLayoutWrapper";

export function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route element={<InventoryContextLayoutWrapper />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}
