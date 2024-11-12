import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import CoinDetails from "./pages/CoinDetails";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/coin/:coinId"} element={<CoinDetails />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
