import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// import web components
import Dashboard from "./components/Dasborad"; // Typo in original file: Dasborad
import Navbar from "./components/Navbar";
import InsertLotteryForm from "./components/Insert";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

function AdminLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Admin Routes - Moved under /admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="insert" element={<InsertLotteryForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
