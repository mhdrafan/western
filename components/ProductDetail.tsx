import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowLeft, Star, Truck, ShieldCheck, ShoppingBag, Share2, Check, ChevronRight } from './Icons';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const images = [
    product.image,
    `${product.image}?v=2`,
    `${product.image}?v=3`,
    `${product.image}?v=4`
  ];

  const handleShare = async () => {
    const shareData = {
      title: `Western Store - ${product.title}`,
      text: `Check out the ${product.title} at Western Store!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-8 animate-slide-up">
        <button 
          onClick={onBack} 
          className="hover:text-neon-cyan transition-colors"
        >
          Home
        </button>
        <ChevronRight size={14} className="mx-2 text-slate-600 dark:text-slate-600" />
        <span className="font-medium text-slate-900 dark:text-white cursor-default">
          {product.category}
        </span>
        <ChevronRight size={14} className="mx-2 text-slate-600 dark:text-slate-600" />
        <span className="truncate text-slate-400 max-w-[150px] sm:max-w-none opacity-70">
          {product.title}
        </span>
      </nav>

      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
      >
        <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery - Sticky on Desktop */}
        <div className="space-y-6 lg:sticky lg:top-32 h-fit">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 shadow-2xl relative group">
            <img 
              src={activeImage} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 relative ${
                  activeImage === img 
                    ? 'border-neon-cyan ring-2 ring-neon-cyan/20' 
                    : 'border-transparent hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                {activeImage === img && <div className="absolute inset-0 bg-neon-cyan/10" />}
              </button>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col pt-4">
          <div className="glass-panel p-8 rounded-3xl shadow-lg border border-slate-200/50 dark:border-white/10">
            <div className="mb-4 flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan font-bold text-xs uppercase tracking-widest border border-neon-cyan/20">
                {product.category}
              </span>
              <div className="relative">
                <button 
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                >
                  {showShareTooltip ? <Check size={20} className="text-neon-green" /> : <Share2 size={20} />}
                </button>
                {showShareTooltip && (
                  <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap">
                    Copied!
                  </div>
                )}
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-display leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center text-neon-cyan">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium border-l border-slate-300 dark:border-white/10 pl-4">
                {product.reviews} Reviews
              </span>
            </div>

            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-8 font-display">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-10 border-b border-slate-200 dark:border-white/10 pb-10">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                <div className="p-2 bg-white dark:bg-black rounded-full text-neon-cyan shadow-sm">
                  <Truck size={20} />
                </div>
                <span className="font-bold text-sm">Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                <div className="p-2 bg-white dark:bg-black rounded-full text-neon-purple shadow-sm">
                  <ShieldCheck size={20} />
                </div>
                <span className="font-bold text-sm">Lifetime Warranty</span>
              </div>
            </div>

            <div className="mt-auto">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-black py-5 px-8 rounded-2xl font-bold text-lg hover:bg-neon-cyan dark:hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] flex items-center justify-center gap-3 transform active:scale-[0.98]"
              >
                <ShoppingBag size={24} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;