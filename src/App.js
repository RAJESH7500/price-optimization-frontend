import ResiterForm from "./components/RegisterForm";
import Home from "./components/Home";
import PriceOptimizationTable from "./components/PriceOptimizationTable";
import ProductManagement from "./components/ProductManagement";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { PrivateRoutes } from "./components/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./constant";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      checkToken(token);
    }
  }, []);

  const checkToken = async (token) => {
    const url = `${BASE_URL}/api/auth/verify-token`;

    try {
      const config = {
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(config);
      console.log("response is of app ", response);
    } catch (error) {
      console.log("error occured of app ", error);
      localStorage.removeItem("token");
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/manage-product"
          element={
            <PrivateRoutes>
              <ProductManagement />
            </PrivateRoutes>
          }
        />
        <Route
          path="/optimize-price"
          element={
            <PrivateRoutes>
              <PriceOptimizationTable />
            </PrivateRoutes>
          }
        />
        <Route path="/register" element={<ResiterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
