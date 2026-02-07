import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090');

// Helper function to format currency
export const formatCurrency = (amountInCents, currencyInfo = { code: 'USD', symbol: '$' }) => {
  const amount = amountInCents / 100;
  return `${currencyInfo.symbol}${amount.toFixed(2)}`;
};

export const EcommerceApi = {
  // Products
  async getProducts() {
    try {
      const records = await pb.collection('products').getFullList({
        sort: '-created',
      });
      return records;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async getProduct(id) {
    try {
      const record = await pb.collection('products').getOne(id);
      return record;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Cart operations
  async getCart() {
    try {
      const records = await pb.collection('cart').getFullList({
        expand: 'product',
      });
      return records;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  },

  async addToCart(productId, quantity = 1) {
    try {
      const data = {
        product: productId,
        quantity: quantity,
      };
      const record = await pb.collection('cart').create(data);
      return record;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  async updateCartItem(id, quantity) {
    try {
      const record = await pb.collection('cart').update(id, { quantity });
      return record;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  async removeFromCart(id) {
    try {
      await pb.collection('cart').delete(id);
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  async clearCart() {
    try {
      const cartItems = await this.getCart();
      await Promise.all(cartItems.map(item => pb.collection('cart').delete(item.id)));
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Orders
  async createOrder(orderData) {
    try {
      const record = await pb.collection('orders').create(orderData);
      return record;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getOrders() {
    try {
      const records = await pb.collection('orders').getFullList({
        sort: '-created',
      });
      return records;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },
};

// Product quantities
export const getProductQuantities = async (productIds) => {
  try {
    // This would typically query inventory/stock from your database
    // For now, return mock quantities
    const quantities = {};
    productIds.forEach(id => {
      quantities[id] = Math.floor(Math.random() * 50) + 10; // Random quantity between 10-60
    });
    return quantities;
  } catch (error) {
    console.error('Error fetching product quantities:', error);
    return {};
  }
};

// Individual product export
export const getProduct = async (id) => {
  return EcommerceApi.getProduct(id);
};

// Products list export
export const getProducts = async () => {
  return EcommerceApi.getProducts();
};

// Checkout function
export const initializeCheckout = async ({ items, successUrl, cancelUrl }) => {
  try {
    // This is a placeholder for checkout initialization
    // In a real app, you would integrate with a payment provider like Stripe
    console.log('Initializing checkout with items:', items);
    console.log('Success URL:', successUrl);
    console.log('Cancel URL:', cancelUrl);
    
    // Return a mock checkout URL or session
    return {
      url: successUrl, // Redirect to success page
      success: true,
      message: 'Checkout initialized successfully'
    };
  } catch (error) {
    console.error('Error initializing checkout:', error);
    throw error;
  }
};

export default EcommerceApi;
