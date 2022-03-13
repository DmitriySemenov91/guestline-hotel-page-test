import React from "react";
import { Container } from "@mui/material";
import { Header } from "./components/header";

import { Home } from "./pages/home";

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <Home />
      </Container>
    </div>
  );
}

export default App;
