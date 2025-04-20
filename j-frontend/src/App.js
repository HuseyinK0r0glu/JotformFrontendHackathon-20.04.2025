import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Provider as ProductProvider } from './context/ProductContext';

import DashBoardPage from './screens/Dashboard';
import ProductPage from './screens/Product';

function App() {
  return (
    <ProductProvider>
        <Router>
          {/* Switch change to Routes for react 6*/}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashBoardPage />}/>
            <Route path='/product' element={<ProductPage /> } />
          </Routes>
        </Router>
    </ProductProvider>
  );
}

export default App;
