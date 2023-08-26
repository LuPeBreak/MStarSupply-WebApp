import { Outlet } from "react-router-dom";
import { InventoryProvider } from "../../contexts/InventoryContext";

export function InventoryContextLayoutWrapper() {
  return (
    <InventoryProvider>
      <Outlet />
    </InventoryProvider>
  );
}
