import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { ContentContainer } from "./styles";

export function DefaultLayout() {
  return (
    <>
      <Header />
      <Summary />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
}
