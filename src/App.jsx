import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductDetails from './components/productDetails/ProductDetails';
import CompareProducts from './components/compareProducts/CompareProducts';
import './App.css';

function App() {


  return (
    <Router>
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<ProductDetails />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/compare-products" element={<CompareProducts />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;
