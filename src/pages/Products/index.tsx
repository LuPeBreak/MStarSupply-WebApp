import { useContext } from "react";
import { Table } from "../../components/Table";
import { ActionsProductsContainer } from "./styles";
import { InventoryContext } from "../../contexts/InventoryContext";
import { dateFormatter } from "../../utils/formatters";
import { NewProductModal } from "../../components/NewProductModal";
import { Dialog } from "../../components/Dialog";

export function Products() {
  const { products } = useContext(InventoryContext);

  return (
    <>
      <ActionsProductsContainer>
        <Dialog buttonText="Novo Produto">
          <NewProductModal />
        </Dialog>
      </ActionsProductsContainer>
      <Table>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.manufacturer}</td>
                <td>{product.quantity}</td>
                <td>{dateFormatter.format(new Date(product.createdAt))}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
