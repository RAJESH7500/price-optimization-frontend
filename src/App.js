import ResiterForm from './components/RegisterForm';
import Home from './components/Home';
import PriceOptimizationTable from './components/PriceOptimizationTable';
import ProductManagement from './components/ProductManagement';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { PrivateRoutes } from './components/PrivateRoutes';
import Dashboard from './components/Dashboard';

function App() {
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
