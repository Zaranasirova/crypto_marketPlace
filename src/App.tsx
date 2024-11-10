import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
