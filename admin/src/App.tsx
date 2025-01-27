// import React from "react";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";

// import web components
import Dashboard from "./components/Dasborad";
import Navbar from "./components/Navbar";
import InsertLotteryForm from "./components/Insert";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/insert" element={<InsertLotteryForm />} />
        </Routes>
      </BrowserRouter>
      <Footer /> 
      
    </>
  );
}

export default App;
