import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ProductsList from '@/components/ProductsList';
import { Button } from '@/components/ui/button';

const ProductListingPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Helmet>
        <title>Shop All Products - Artisan Snacks</title>
        <meta name="description" content="Browse our complete collection of handcrafted artisanal snacks. Find your perfect healthy snack today." />
      </Helmet>

      <div className="bg-gradient-to-b from-cream to-white min-h-screen">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-warm-brown to-sage-green text-white py-16">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Our Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg opacity-90"
            >
              Discover our full range of artisanal healthy snacks
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sage-green"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-warm-brown mb-4">Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['All Snacks', 'Nuts & Seeds', 'Dried Fruits', 'Energy Bars', 'Granola', 'Trail Mix', 'Protein Snacks', 'Vegan Options'].map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer hover:text-warm-brown transition-colors">
                    <input type="checkbox" className="rounded border-gray-300 text-sage-green focus:ring-sage-green" />
                    <span className="text-gray-700">{category}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-warm-brown mb-4">Price Range</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-sage-green"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-sage-green"
                  />
                  <Button className="bg-sage-green hover:bg-sage-green/90 text-white">
                    Apply
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          <ProductsList />
        </div>
      </div>
    </>
  );
};

export default ProductListingPage;