import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';

// Curated high-quality snack images to ensure premium aesthetic
const SNACK_IMAGES = [
  "https://images.unsplash.com/photo-1605024344839-e6e41aea6b23", // Healthy snack bowl
  "https://images.unsplash.com/photo-1654600870472-7c4afe2f70e1", // Granola and nuts
  "https://images.unsplash.com/photo-1554485545-a04ed0d897a6", // Dried fruits and nuts
  "https://images.unsplash.com/photo-1599490659213-e2b9527bd087", // Chips bowl
];

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const displayVariant = useMemo(() => product.variants[0], [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  const displayPrice = useMemo(() => hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted, [displayVariant, hasSale]);
  const originalPrice = useMemo(() => hasSale ? displayVariant.price_formatted : null, [displayVariant, hasSale]);

  // Deterministic image selection based on product ID to keep it consistent
  const productImage = useMemo(() => {
    // Use the product's ID to select an image from our curated list
    // This ensures the same product always gets the same image
    const charCodeSum = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return SNACK_IMAGES[charCodeSum % SNACK_IMAGES.length];
  }, [product.id]);

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.variants.length > 1) {
      navigate(`/product/${product.id}`);
      return;
    }

    const defaultVariant = product.variants[0];

    try {
      await addToCart(product, defaultVariant, 1, defaultVariant.inventory_quantity);
      toast({
        title: "Added to Cart! 🛒",
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error adding to cart",
        description: error.message,
      });
    }
  }, [product, addToCart, toast, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-cream">
          <div className="relative h-64 overflow-hidden">
            <img
              src={productImage}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            {product.ribbon_text && (
              <div className="absolute top-3 left-3 bg-accent-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {product.ribbon_text}
              </div>
            )}
            
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-warm-brown text-xs font-bold px-3 py-1 rounded-full flex items-baseline gap-1.5 shadow-sm">
              {hasSale && (
                <span className="line-through opacity-60 text-gray-500">{originalPrice}</span>
              )}
              <span className="text-sage-green text-sm">{displayPrice}</span>
            </div>
          </div>
          
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-3 h-3 fill-accent-gold text-accent-gold" />
              ))}
              <span className="text-xs text-gray-400 ml-1">(24)</span>
            </div>
            
            <h3 className="text-xl font-bold text-warm-brown mb-2 group-hover:text-accent-gold transition-colors line-clamp-1">
              {product.title}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
              {product.subtitle || 'Handcrafted with premium natural ingredients for the perfect crunch.'}
            </p>
            
            <Button 
              onClick={handleAddToCart} 
              className="w-full bg-sage-green hover:bg-sage-green/90 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductsList = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsWithQuantities = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsResponse = await getProducts({ limit });

        if (productsResponse.products.length === 0) {
          setProducts([]);
          return;
        }

        const productIds = productsResponse.products.map(product => product.id);

        const quantitiesResponse = await getProductQuantities({
          fields: 'inventory_quantity',
          product_ids: productIds
        });

        const variantQuantityMap = new Map();
        quantitiesResponse.variants.forEach(variant => {
          variantQuantityMap.set(variant.id, variant.inventory_quantity);
        });

        const productsWithQuantities = productsResponse.products.map(product => ({
          ...product,
          variants: product.variants.map(variant => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
          }))
        }));

        setProducts(productsWithQuantities);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsWithQuantities();
  }, [limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-16 w-16 text-sage-green animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-8">
        <p>Error loading products: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-400 p-8">
        <p>No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductsList;