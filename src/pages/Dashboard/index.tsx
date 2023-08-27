import { useContext, useState } from "react";
import { ActionsContainer } from "../../components/ActionsContainer";
import { createPDF } from "../../utils/createPDF";
import { DashboardContainer, GraphicsContainer } from "./styles";
import { InventoryContext } from "../../contexts/InventoryContext";

export function Dashboard() {
  const { transactions, products } = useContext(InventoryContext);

  const [filterProductId, setFilterProductId] = useState<number>(0);

  function handlePDFExport() {
    createPDF(transactions);
  }

  return (
    <DashboardContainer>
      <ActionsContainer>
        <select
          onChange={(e) => setFilterProductId(Number(e.target.value))}
          value={filterProductId}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <button onClick={handlePDFExport}>Exportar PDF</button>
      </ActionsContainer>
      <GraphicsContainer>
        <h2>Gráficos</h2>
      </GraphicsContainer>
    </DashboardContainer>
  );
}
