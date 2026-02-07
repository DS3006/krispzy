import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const PaymentSuccessPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [orderSummary, setOrderSummary] = useState([]);
  const [orderTotal, setOrderTotal] = useState('');

  useEffect(() => {
    // Capture cart items before clearing
    if (cartItems.length > 0) {
      setOrderSummary([...cartItems]);
      setOrderTotal(getCartTotal());
      // Clear cart after successful payment
      setTimeout(() => clearCart(), 1000);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Order Confirmed - Artisan Snacks</title>
        <meta name="description" content="Thank you for your order! Your artisanal snacks are on their way." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-cream to-white py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-green-100 rounded-full p-6">
                <CheckCircle className="h-20 w-20 text-green-600" />
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-warm-brown mb-4">
                Order Confirmed!
              </h1>
              <p className="text-lg text-gray-600">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </motion.div>

            {/* Order Summary */}
            {orderSummary.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-sage-green/10 rounded-2xl p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-warm-brown mb-4 flex items-center gap-2">
                  <Package className="h-6 w-6" />
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {orderSummary.map((item) => (
                    <div key={item.variant.id} className="flex justify-between items-center py-3 border-b border-sage-green/20 last:border-0">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold text-warm-brown">{item.product.title}</p>
                          <p className="text-sm text-gray-600">{item.variant.title}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-accent-gold">
                        {item.variant.sale_price_formatted || item.variant.price_formatted}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t-2 border-sage-green/30 flex justify-between items-center">
                  <span className="text-xl font-bold text-warm-brown">Total</span>
                  <span className="text-3xl font-bold text-accent-gold">{orderTotal}</span>
                </div>
              </motion.div>
            )}

            {/* Delivery Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-accent-gold/10 rounded-2xl p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-warm-brown mb-3">Estimated Delivery</h3>
              <p className="text-gray-700 mb-2">
                Your artisanal snacks will be carefully packaged and shipped within 1-2 business days.
              </p>
              <p className="text-gray-700">
                Expected delivery: <span className="font-semibold text-warm-brown">3-5 business days</span>
              </p>
            </motion.div>

            {/* Order Confirmation Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-8"
            >
              <p className="text-gray-600">
                A confirmation email with your order details has been sent to your email address.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/products" className="flex-1 sm:flex-initial">
                <Button size="lg" className="w-full bg-sage-green hover:bg-sage-green/90 text-white font-semibold">
                  Continue Shopping <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/" className="flex-1 sm:flex-initial">
                <Button size="lg" variant="outline" className="w-full border-2 border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white font-semibold">
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessPage;