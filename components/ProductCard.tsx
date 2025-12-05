import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Share2, Check } from './Icons';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct, onAddToCart }) => {
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = new URL(window.location.href);
    url.searchParams.set('product', product.id.toString());
    const shareUrl = url.toString();

    const shareData = {
      title: `Western Store - ${product.title}`,
      text: `Check out the ${product.title} at Western Store!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <div 
      className="group relative bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1 hover:scale-[1.01]"
    >
      <div className="relative aspect-[4/5] overflow-hidden cursor-pointer bg-slate-100 dark:bg-white/5" onClick={() => onViewProduct(product)}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Share Button - Always visible on mobile, visible on hover desktop */}
        <button
          onClick={handleShare}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md text-slate-900 dark:text-white shadow-lg 
            opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-[-10px] lg:group-hover:translate-y-0
            transition-all duration-300 hover:bg-neon-cyan hover:text-black z-10"
          aria-label="Share"
        >
          {showShareTooltip ? <Check size={18} /> : <Share2 size={18} />}
        </button>

        {/* Quick Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 p-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg 
            translate-y-0 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100
            transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] z-10 active:scale-90"
          aria-label="Add to cart"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
        
        <p className="text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">{product.category}</p>
        <h3 
          className="text-lg font-bold text-slate-900 dark:text-white mb-2 cursor-pointer hover:text-neon-cyan transition-colors font-display"
          onClick={() => onViewProduct(product)}
        >
          {product.title}
        </h3>
        
        <div className="mt-auto flex justify-between items-end border-t border-slate-100 dark:border-white/5 pt-4">
          <span className="text-xl font-bold text-slate-900 dark:text-white font-display">${product.price.toFixed(2)}</span>
          <div className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md">
            <span>{product.reviews} Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;