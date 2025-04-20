import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Provider as ProductProvider } from './context/ProductContext';
import { Provider as CartProvider } from './context/CartContext';

import DashBoardPage from './screens/Dashboard';
import ProductPage from './screens/Product';
import ShoppingCartPage from './screens/ShoppingCart';
import CheckoutPage from './screens/Checkout';

import { Navbar } from './navbar/Navbar';

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <Router>
          <Navbar />
          {/* Switch change to Routes for react 6*/}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route path='/product' element={<ProductPage /> } />
            <Route path='/shopping_cart' element={<ShoppingCartPage /> } />
            <Route path='/checkout' element={<CheckoutPage />} />
          </Routes>
        </Router>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
