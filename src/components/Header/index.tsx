import { HeaderContainer, HeaderContent } from "./styles";
import logoImg from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="Logo Morning Star" />
        <nav>
          <Link to={"/"}>Dashboard</Link>
          <Link to={"/products"}>Produtos</Link>
          <Link to={"/transactions"}>Entrada e saida</Link>
        </nav>
      </HeaderContent>
    </HeaderContainer>
  );
}
