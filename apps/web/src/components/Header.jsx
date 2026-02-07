import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';

const Header = ({ setIsCartOpen }) => {
  const location = useLocation();
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-warm-brown to-accent-gold bg-clip-text text-transparent"
            >
              Artisan Snacks
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-warm-brown' : 'text-gray-700 hover:text-warm-brown'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`font-medium transition-colors ${
                isActive('/products') ? 'text-warm-brown' : 'text-gray-700 hover:text-warm-brown'
              }`}
            >
              Shop
            </Link>
            <a
              href="#about"
              className="font-medium text-gray-700 hover:text-warm-brown transition-colors"
            >
              About
            </a>
          </nav>

          <Button
            onClick={() => setIsCartOpen(true)}
            variant="ghost"
            size="icon"
            className="relative hover:bg-sage-green/10"
          >
            <ShoppingCart className="h-6 w-6 text-warm-brown" />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-accent-gold text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;