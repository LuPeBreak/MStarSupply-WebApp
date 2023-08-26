import { ActionsContainer } from "../../components/ActionsContainer";
import { DashboardContainer, GraphicsContainer } from "./styles";

export function Dashboard() {
  function handlePDFExport() {
    console.log("criando pdf");
  }
  return (
    <DashboardContainer>
      <ActionsContainer>
        <button onClick={handlePDFExport}>Exportar PDF</button>
      </ActionsContainer>
      <GraphicsContainer>
        <h2>Gráficos</h2>
      </GraphicsContainer>
    </DashboardContainer>
  );
}
