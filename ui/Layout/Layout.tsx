import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../Topbar";

export default function Layout() {
  return (
    <LayoutStyled>
      <header>
        <Topbar />
      </header>
      <main>
        <Outlet />
      </main>
    </LayoutStyled>
  );
}

const LayoutStyled = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-areas:
    "head head"
    "nav  main";

  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;

  header {
    grid-area: head;
    margin-bottom: 40px;
  }

  nav {
    grid-area: nav;
  }

  main {
    grid-area: main;
  }
`;
