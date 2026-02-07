import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import HomePage from '@/pages/HomePage';
import ProductListingPage from '@/pages/ProductListingPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-cream">
        <Header setIsCartOpen={setIsCartOpen} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/success" element={<PaymentSuccessPage />} />
          </Routes>
        </main>
        <Footer />
        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;