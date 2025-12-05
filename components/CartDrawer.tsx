import React, { useEffect, useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck } from './Icons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`relative w-full max-w-md bg-white/95 dark:bg-[#0f0f10] border-l border-slate-200 dark:border-white/10 shadow-2xl h-full flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white font-display">
            <ShoppingBag size={20} className="text-neon-cyan" />
            Your Cart
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">({cart.length} items)</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-900 dark:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
              <div className="p-6 bg-slate-100 dark:bg-white/5 rounded-full">
                <ShoppingBag size={48} strokeWidth={1} className="text-slate-400 dark:text-white/40" />
              </div>
              <p className="text-lg font-medium text-slate-900 dark:text-white">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="text-neon-cyan hover:text-neon-purple font-bold transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 animate-fade-in group">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 font-display">{item.title}</h3>
                    <p className="text-xs text-neon-cyan uppercase tracking-wider font-bold mt-1">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 rounded-lg p-1 border border-slate-200 dark:border-white/5">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white dark:hover:bg-white/10 rounded shadow-sm transition-colors disabled:opacity-50 text-slate-600 dark:text-white"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center text-slate-900 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white dark:hover:bg-white/10 rounded shadow-sm transition-colors text-slate-600 dark:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Shipping</span>
                <span className="text-neon-cyan font-bold">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-white/10 font-display">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:bg-neon-cyan dark:hover:bg-neon-cyan hover:text-black transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center justify-center gap-2"
            >
              Checkout
              <ShieldCheck size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;