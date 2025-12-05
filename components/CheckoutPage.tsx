import React, { useState } from 'react';
import { CartItem } from '../types';
import { ArrowLeft, ShieldCheck, CreditCard, MapPin, User, Mail, Lock, Check, Truck, Calendar } from './Icons';

interface CheckoutPageProps {
  cart: CartItem[];
  onBack: () => void;
  onPlaceOrder: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onBack, onPlaceOrder }) => {
  const [step, setStep] = useState<'DETAILS' | 'SUCCESS'>('DETAILS');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Payment Processing API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate random order ID
    const newOrderId = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    setOrderId(newOrderId);
    setIsProcessing(false);
    setStep('SUCCESS');
    
    onPlaceOrder(); 
  };

  if (step === 'SUCCESS') {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto animate-fade-in flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-neon-green/10 rounded-full flex items-center justify-center text-neon-green mb-6 animate-pulse-glow">
          <Check size={48} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display">Order Confirmed</h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-10 max-w-md">
          Thank you for choosing the future. Your order details have been secured and sent to <span className="font-bold text-slate-900 dark:text-white">{formData.email}</span>.
        </p>
        
        <div className="glass-card rounded-2xl p-8 w-full max-w-md mb-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-purple" />
          <div className="flex justify-between mb-3">
            <span className="text-slate-500 dark:text-slate-400">Order ID</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{orderId}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-slate-500 dark:text-slate-400">Date</span>
            <span className="text-slate-900 dark:text-white">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-white/10">
            <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
            <span className="font-bold text-neon-cyan text-xl">${total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="bg-slate-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:bg-neon-cyan dark:hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Return to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 font-display">
            <ShieldCheck className="text-neon-cyan" />
            Secure Checkout
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Section */}
            <section className="glass-card p-8 rounded-3xl">
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <User size={20} className="text-slate-400" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-cyan transition-colors" size={18} />
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan outline-none transition-all placeholder-slate-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">First Name</label>
                  <input 
                    required
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan outline-none transition-all placeholder-slate-400"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Last Name</label>
                  <input 
                    required
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan outline-none transition-all placeholder-slate-400"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Section */}
            <section className="glass-card p-8 rounded-3xl">
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <MapPin size={20} className="text-slate-400" />
                Shipping Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Street Address</label>
                  <input 
                    required
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan outline-none transition-all placeholder-slate-400"
                    placeholder="123 Future Blvd"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">City</label>
                    <input 
                      required
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan outline-none transition-all placeholder-slate-400"
                      placeholder="Neo Tokyo"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">ZIP Code</label>
                    <input 
                      required
                      type="text" 
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan outline-none transition-all placeholder-slate-400"
                      placeholder="90210"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="glass-card p-8 rounded-3xl relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-[50px] pointer-events-none" />
              
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <CreditCard size={20} className="text-slate-400" />
                Payment Method
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Card Number</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-cyan transition-colors" size={18} />
                    <input 
                      required
                      type="text" 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19}
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan outline-none transition-all font-mono placeholder-slate-400"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Expiry Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-cyan transition-colors" size={18} />
                      <input 
                        required
                        type="text" 
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        maxLength={5}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan outline-none transition-all font-mono placeholder-slate-400"
                        placeholder="MM/YY"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">CVC</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-cyan transition-colors" size={18} />
                      <input 
                        required
                        type="password" 
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        maxLength={3}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan outline-none transition-all font-mono placeholder-slate-400"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg text-black shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]
                ${isProcessing 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-white hover:bg-neon-cyan hover:shadow-[0_0_30px_rgba(0,243,255,0.4)]'
                }`}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Lock size={20} />
                  Pay ${total.toFixed(2)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="glass-card rounded-3xl p-8 sticky top-32 border border-slate-200 dark:border-white/10">
            <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white font-display">Order Summary</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 p-2 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-white/5 flex-shrink-0 border border-slate-200 dark:border-white/10">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-neon-cyan">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-200 dark:border-white/10 mt-6 pt-6 space-y-3">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400 items-center">
                <span className="flex items-center gap-2"><Truck size={14} className="text-neon-purple" /> Shipping</span>
                <span className="text-neon-cyan font-bold">Free</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-white/10 font-display">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;