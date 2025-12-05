import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';
import { Product, CartItem, ViewState } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Initialize cart from localStorage with error handling
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Initialize from URL and handle browser history
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get('product');
      const checkoutParam = params.get('checkout');
      
      if (checkoutParam === 'true') {
        setView('CHECKOUT');
        return;
      }

      if (productId) {
        const product = PRODUCTS.find(p => p.id === Number(productId));
        if (product) {
          setSelectedProduct(product);
          setView('PRODUCT_DETAIL');
          return;
        }
      }
      
      // Default to home if no specific route
      setView('HOME');
      setSelectedProduct(null);
    };

    // Check on mount
    handleUrlChange();

    // Listen for browser back/forward buttons
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Navigation Handler
  const handleNavigate = (sectionId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    url.searchParams.delete('checkout');
    window.history.pushState({}, '', url);

    if (view !== 'HOME') {
      setView('HOME');
      // Wait for render then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Product View Handler
  const handleViewProduct = (product: Product) => {
    // Update URL without reloading
    const url = new URL(window.location.href);
    url.searchParams.set('product', product.id.toString());
    url.searchParams.delete('checkout');
    window.history.pushState({}, '', url);
    
    setSelectedProduct(product);
    setView('PRODUCT_DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    url.searchParams.delete('checkout');
    window.history.pushState({}, '', url);
    setView('HOME');
  };

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    url.searchParams.set('checkout', 'true');
    window.history.pushState({}, '', url);
    setView('CHECKOUT');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    // Clear cart
    setCart([]);
    localStorage.removeItem('cart');
    // Note: We don't change view immediately to allow showing success message in CheckoutPage
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Layout 
      cartCount={totalItems} 
      onOpenCart={() => setIsCartOpen(true)}
      onNavigate={handleNavigate}
    >
      {view === 'HOME' && (
        <HomePage 
          onViewProduct={handleViewProduct} 
          onAddToCart={addToCart}
        />
      )}
      
      {view === 'PRODUCT_DETAIL' && selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onBack={handleBack}
          onAddToCart={addToCart}
        />
      )}

      {view === 'CHECKOUT' && (
        <CheckoutPage 
          cart={cart}
          onBack={handleBack}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
    </Layout>
  );
};

export default App;