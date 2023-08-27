import { useContext, useState } from "react";
import { ActionsContainer } from "../../components/ActionsContainer";
import { createPDF } from "../../utils/createPDF";
import { DashboardContainer, GraphicsContainer } from "./styles";
import { InventoryContext } from "../../contexts/InventoryContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useOutcomeByMonth } from "../../hooks/useOutcomeByMonth";
import { useIncomeByMonth } from "../../hooks/useIncomeByMonth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `Saidas e Entradas Por Mes de ${new Date().getUTCFullYear()}`,
    },
  },
};
const labels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function Dashboard() {
  const { transactions, products } = useContext(InventoryContext);

  const [filterProductId, setFilterProductId] = useState<number>(1);

  const outcomeByMonth = useOutcomeByMonth(filterProductId);
  const incomeByMonth = useIncomeByMonth(filterProductId);
  function handlePDFExport() {
    createPDF(transactions);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Saídas",
        data: [
          outcomeByMonth.Janeiro,
          outcomeByMonth.Fevereiro,
          outcomeByMonth.Março,
          outcomeByMonth.Abril,
          outcomeByMonth.Maio,
          outcomeByMonth.Junho,
          outcomeByMonth.Julho,
          outcomeByMonth.Agosto,
          outcomeByMonth.Setembro,
          outcomeByMonth.Outubro,
          outcomeByMonth.Novembro,
          outcomeByMonth.Dezembro,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Entradas",
        data: [
          incomeByMonth.Janeiro,
          incomeByMonth.Fevereiro,
          incomeByMonth.Março,
          incomeByMonth.Abril,
          incomeByMonth.Maio,
          incomeByMonth.Junho,
          incomeByMonth.Julho,
          incomeByMonth.Agosto,
          incomeByMonth.Setembro,
          incomeByMonth.Outubro,
          incomeByMonth.Novembro,
          incomeByMonth.Dezembro,
        ],
        backgroundColor: "rgba(147, 250, 165,0.5)",
      },
    ],
  };

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
        <Bar options={options} data={data} />
      </GraphicsContainer>
    </DashboardContainer>
  );
}
