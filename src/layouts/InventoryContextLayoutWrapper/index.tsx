import { Outlet } from "react-router-dom";
import { InventoryProvider } from "../../contexts/inventoryContext";

export function InventoryContextLayoutWrapper() {
  return (
    <InventoryProvider>
      <Outlet />
    </InventoryProvider>
  );
}
