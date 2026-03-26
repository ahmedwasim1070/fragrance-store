// Imports
import { StrictMode, useState } from 'react'; 
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Products from './pages/Products';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [idxPr, setIdxPr] = useState(0);

  return (
    <Routes>
      <Route path='/' element={<Home idxPr={idxPr} setIdxPr={setIdxPr} />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/products' element={<Products />} />
      <Route path='/contact-us' element={<ContactPage />} />
      <Route path='/about-us' element={<AboutPage />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <ToastContainer />
      </CartProvider>
    </BrowserRouter>    
  </StrictMode>
);