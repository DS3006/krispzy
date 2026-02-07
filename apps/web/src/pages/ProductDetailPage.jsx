import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProduct, getProductQuantities } from '@/api/EcommerceApi';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, XCircle, ChevronLeft, ChevronRight, Star, ShieldCheck, Truck } from 'lucide-react';

// Premium product detail images
const DETAIL_IMAGES = [
  "https://images.unsplash.com/photo-1576394107941-89125ac94a13", // Artisanal packaging
  "https://images.unsplash.com/photo-1680345576216-5c0e8635153d", // Product detail
  "https://images.unsplash.com/photo-1621939514649-28b12e816747", // Ingredients
];

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Use our premium images instead of API images for the demo
  const displayImages = DETAIL_IMAGES;

  const handleAddToCart = useCallback(async () => {
    if (product && selectedVariant) {
      const availableQuantity = selectedVariant.inventory_quantity;
      try {
        await addToCart(product, selectedVariant, quantity, availableQuantity);
        toast({
          title: "Added to Cart! 🛒",
          description: `${quantity} x ${product.title} (${selectedVariant.title}) added.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oh no! Something went wrong.",
          description: error.message,
        });
      }
    }
  }, [product, selectedVariant, quantity, addToCart, toast]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + amount;
        if (newQuantity < 1) return 1;
        return newQuantity;
    });
  }, []);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1);
  }, [displayImages.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1);
  }, [displayImages.length]);

  const handleVariantSelect = useCallback((variant) => {
    setSelectedVariant(variant);
    setCurrentImageIndex(0);
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProduct(id);

        try {
          const quantitiesResponse = await getProductQuantities({
            fields: 'inventory_quantity',
            product_ids: [fetchedProduct.id]
          });

          const variantQuantityMap = new Map();
          quantitiesResponse.variants.forEach(variant => {
            variantQuantityMap.set(variant.id, variant.inventory_quantity);
          });

          const productWithQuantities = {
            ...fetchedProduct,
            variants: fetchedProduct.variants.map(variant => ({
              ...variant,
              inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
            }))
          };

          setProduct(productWithQuantities);

          if (productWithQuantities.variants && productWithQuantities.variants.length > 0) {
            setSelectedVariant(productWithQuantities.variants[0]);
          }
        } catch (quantityError) {
          throw quantityError;
        }
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-16 w-16 text-sage-green animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-warm-brown hover:text-sage-green transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>
        <div className="text-center text-red-400 p-8 bg-white rounded-2xl shadow-lg">
          <XCircle className="mx-auto h-16 w-16 mb-4" />
          <p className="mb-6">Error loading product: {error}</p>
        </div>
      </div>
    );
  }

  const price = selectedVariant?.sale_price_formatted ?? selectedVariant?.price_formatted;
  const originalPrice = selectedVariant?.price_formatted;
  const availableStock = selectedVariant ? selectedVariant.inventory_quantity : 0;
  const isStockManaged = selectedVariant?.manage_inventory ?? false;
  const canAddToCart = !isStockManaged || quantity <= availableStock;

  return (
    <>
      <Helmet>
        <title>{product.title} - Artisan Snacks</title>
        <meta name="description" content={product.description?.substring(0, 160) || product.title} />
      </Helmet>
      
      <div className="bg-cream min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-warm-brown transition-colors mb-8 font-medium">
            <ArrowLeft size={18} />
            Back to Collection
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-premium p-8 md:p-12">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-square bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={displayImages[currentImageIndex]}
                    alt={product.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-warm-brown p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-warm-brown p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>

                {product.ribbon_text && (
                  <div className="absolute top-6 left-6 bg-accent-gold text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                    {product.ribbon_text}
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-sage-green ring-2 ring-sage-green/30' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-accent-gold">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm text-gray-500 font-medium">4.9 (128 reviews)</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-warm-brown mb-3">{product.title}</h1>
              <p className="text-xl text-gray-500 mb-6 font-light">{product.subtitle}</p>

              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-gray-100">
                <span className="text-4xl font-bold text-sage-green">{price}</span>
                {selectedVariant?.sale_price_in_cents && (
                  <span className="text-2xl text-gray-400 line-through decoration-2">{originalPrice}</span>
                )}
              </div>

              <div className="prose prose-stone text-gray-600 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />

              {product.variants.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-warm-brown uppercase tracking-wider mb-3">Select Option</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map(variant => (
                      <Button
                        key={variant.id}
                        variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                        onClick={() => handleVariantSelect(variant)}
                        className={`h-auto py-3 px-6 text-base transition-all ${
                          selectedVariant?.id === variant.id 
                            ? 'bg-warm-brown text-white border-warm-brown shadow-md' 
                            : 'border-gray-200 text-gray-700 hover:border-warm-brown hover:text-warm-brown'
                        }`}
                      >
                        {variant.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border-2 border-gray-200 rounded-xl p-1 w-fit">
                  <Button onClick={() => handleQuantityChange(-1)} variant="ghost" size="icon" className="rounded-lg h-10 w-10 text-gray-600 hover:bg-gray-100"><Minus size={18} /></Button>
                  <span className="w-12 text-center text-warm-brown font-bold text-lg">{quantity}</span>
                  <Button onClick={() => handleQuantityChange(1)} variant="ghost" size="icon" className="rounded-lg h-10 w-10 text-gray-600 hover:bg-gray-100"><Plus size={18} /></Button>
                </div>
                
                <Button 
                  onClick={handleAddToCart} 
                  size="lg" 
                  className="flex-1 bg-accent-gold hover:bg-accent-gold/90 text-warm-brown font-bold text-lg py-6 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={!canAddToCart || !product.purchasable}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </div>

              {/* Stock Status */}
              <div className="mb-8">
                {isStockManaged && canAddToCart && product.purchasable && (
                  <p className="text-sm text-green-600 flex items-center gap-2 font-medium bg-green-50 w-fit px-3 py-1 rounded-full">
                    <CheckCircle size={16} /> In Stock ({availableStock} available)
                  </p>
                )}

                {isStockManaged && !canAddToCart && product.purchasable && (
                   <p className="text-sm text-amber-600 flex items-center gap-2 font-medium bg-amber-50 w-fit px-3 py-1 rounded-full">
                    <XCircle size={16} /> Low Stock - Only {availableStock} left
                  </p>
                )}

                {!product.purchasable && (
                    <p className="text-sm text-red-600 flex items-center gap-2 font-medium bg-red-50 w-fit px-3 py-1 rounded-full">
                      <XCircle size={16} /> Currently Unavailable
                    </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-sage-green/10 p-2 rounded-full text-sage-green">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-sage-green/10 p-2 rounded-full text-sage-green">
                    <Truck size={20} />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Fast Shipping</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;