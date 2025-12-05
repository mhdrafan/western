import React, { useState, useEffect } from 'react';
import { PRODUCTS, TESTIMONIALS, FAQS } from '../constants';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { Truck, ShieldCheck, Headphones, ChevronDown, ChevronUp, Star, ArrowLeft, ArrowRight: ArrowRightIcon, ChevronRight } from './Icons';

interface HomePageProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewProduct, onAddToCart }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 bg-slate-50 dark:bg-dark-bg">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px] animate-float opacity-40 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[120px] animate-float opacity-30 mix-blend-screen" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300">New Collection 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 font-display leading-[1.1]">
              Future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Retail Therapy</span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mb-10 leading-relaxed">
              Experience the next generation of dropshipping. Curated essentials with ultra-fast delivery and a seamless, futuristic shopping experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] overflow-hidden"
              >
                <span className="relative z-10">Start Shopping</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-blue opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </button>
              
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-bold text-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative animate-float hidden lg:block" style={{ perspective: '1000px' }}>
            {/* 3D Floating Cards Effect */}
            <div className="relative z-20 transform rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
               <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 glass-card">
                  <img 
                    src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800" 
                    alt="Hero Product" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  
                  {/* Floating UI Element */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400">Featured Drop</p>
                      <p className="font-bold">Cyber Sneakers</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-sm font-bold border border-neon-cyan/20">
                      $129.00
                    </span>
                  </div>
               </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 -right-10 w-20 h-20 border border-neon-purple/30 rounded-full animate-spin-slow" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-neon-cyan/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Truck size={32} />, title: "Hyper-Fast Shipping", desc: "Global delivery in 3-5 days." },
              { icon: <ShieldCheck size={32} />, title: "Secure Blockchain", desc: "Encrypted payment processing." },
              { icon: <Headphones size={32} />, title: "24/7 AI Support", desc: "Always online to assist you." }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl hover:bg-white/80 dark:hover:bg-white/5 transition-colors group">
                <div className="mb-4 text-slate-900 dark:text-white group-hover:text-neon-cyan transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-display">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Drops</span></h2>
            <p className="text-slate-500 dark:text-slate-400">Curated specifically for the digital age.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-neon-cyan transition-colors group">
            View All <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewProduct={onViewProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 overflow-hidden bg-slate-50 dark:bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16 font-display">Verified Feedback</h2>
          <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
            {TESTIMONIALS.map(testimonial => (
              <div key={testimonial.id} className="min-w-[300px] md:min-w-[400px] snap-center glass-card p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="flex text-neon-cyan mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className="stroke-none" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-neon-cyan/20">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {testimonial.name}
                      <ShieldCheck size={14} className="text-neon-green" />
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12 font-display">FAQ</h2>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-300 dark:hover:border-white/20"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                {faq.question}
                <div className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                  {openFaqIndex === index ? <ChevronUp size={20} className="text-neon-cyan" /> : <ChevronDown size={20} className="text-slate-400" />}
                </div>
              </button>
              <div 
                className={`px-6 text-slate-600 dark:text-slate-300 overflow-hidden transition-all duration-300 ${
                  openFaqIndex === index ? 'max-h-48 py-4 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-black dark:from-[#0a0a0a] dark:to-black"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
           
           {/* Glows */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/20 rounded-full blur-[80px]"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/20 rounded-full blur-[80px]"></div>

           <div className="relative z-10 p-12 md:p-20 text-center">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Ready to Elevate?</h2>
             <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">Join the movement. Premium quality, futuristic design, and unmatched service.</p>
             
             <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan backdrop-blur-md transition-all text-center"
               />
               <button className="w-full px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                 Get Started
               </button>
             </form>
           </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;