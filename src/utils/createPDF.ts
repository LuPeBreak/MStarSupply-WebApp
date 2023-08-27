import jsPDF from "jspdf";
import logoSvg from "../assets/logo.svg";
import { dateFormatter } from "./formatters";

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

export function createPDF(transactions: Transaction[]) {
  const doc = new jsPDF("p", "pt");

  doc.setFontSize(40);
  doc.text("MStarSupply", 190, 50);
  doc.addImage(logoSvg, "JPEG", 15, 40, 180, 180);
  doc.setFontSize(10);
  let height = 100;
  const width = 100;

  doc.text(`Produto`, width, height);
  doc.text(`| `, width + 100, height);
  doc.text(`Tipo`, width + 110, height);
  doc.text(`| `, width + 150, height);
  doc.text(`Quantidade `, width + 160, height);
  doc.text(`| `, width + 220, height);
  doc.text(`Localização `, width + 230, height);
  doc.text(`| `, width + 300, height);
  doc.text(`Data `, width + 310, height);

  transactions.forEach((transaction) => {
    height += 20;

    doc.text(`${transaction.product?.name} `, width, height);
    doc.text(`| `, width + 100, height);
    doc.text(`${transaction.type} `, width + 110, height);
    doc.text(`| `, width + 150, height);
    doc.text(`${transaction.quantity} `, width + 160, height);
    doc.text(`| `, width + 220, height);
    doc.text(`${transaction.location} `, width + 230, height);
    doc.text(`| `, width + 300, height);
    doc.text(
      `${dateFormatter.format(new Date(transaction.createdAt))} `,
      width + 310,
      height
    );

    if (height >= 800) {
      doc.addPage();
      height = 100;
    }
  });

  doc.save("teste.pdf");
}
