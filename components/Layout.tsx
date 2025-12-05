import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sun, Moon, Menu, X, Facebook, Instagram, Twitter } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, cartCount, onOpenCart, onNavigate }) => {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial theme check
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Shop', id: 'shop' },
    { name: 'About', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen selection:bg-neon-cyan selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/5 rounded-full blur-[120px] dark:bg-neon-purple/10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan/5 rounded-full blur-[120px] dark:bg-neon-cyan/10" />
      </div>

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/70 dark:bg-dark-bg/70 backdrop-blur-xl border-slate-200/50 dark:border-white/5 py-4 shadow-lg shadow-black/5' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display group"
          >
            WESTERN<span className="text-neon-cyan group-hover:text-neon-purple transition-colors duration-300">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8">
              {navLinks.map(link => (
                <button 
                  key={link.name}
                  onClick={() => onNavigate(link.id)}
                  className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-neon-cyan to-neon-purple group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 pl-8 border-l border-slate-200 dark:border-white/10">
              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-neon-cyan dark:hover:text-neon-cyan transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button 
                onClick={onOpenCart}
                className="relative p-2 text-slate-900 dark:text-white hover:text-neon-cyan dark:hover:text-neon-cyan transition-colors group"
              >
                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform duration-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-neon-cyan to-neon-blue text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-fade-in shadow-[0_0_10px_rgba(0,243,255,0.4)]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-slate-900 dark:text-white"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-cyan text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 dark:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-xl animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <button 
                  key={link.name}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-lg font-medium text-slate-900 dark:text-white font-display"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex justify-between items-center">
                <span className="text-slate-500 font-display">Theme</span>
                <button 
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-lg text-sm font-medium border border-transparent dark:border-white/5"
                >
                  {isDark ? <><Sun size={16} /> Light</> : <><Moon size={16} /> Dark</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-[#080808] border-t border-slate-200 dark:border-white/5 pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 block font-display">
                WESTERN<span className="text-neon-cyan">.</span>
              </span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 text-sm">
                Futuristic essentials for the modern pioneer. Engineered for style, built for performance.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-neon-cyan transition-colors hover:scale-110 transform duration-200"><Instagram size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-neon-cyan transition-colors hover:scale-110 transform duration-200"><Twitter size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-neon-cyan transition-colors hover:scale-110 transform duration-200"><Facebook size={20} /></a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 font-display">Collections</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-neon-cyan transition-colors">Latest Drops</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-neon-cyan transition-colors">Best Sellers</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-neon-cyan transition-colors">Accessories</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-neon-cyan transition-colors">Techwear</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 font-display">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-neon-cyan transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-neon-cyan transition-colors">Tracking</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-neon-cyan transition-colors">Returns</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-neon-cyan transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 font-display">Stay Updated</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">Join the mailing list for exclusive drops.</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="email@address.com" 
                  className="flex-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all text-slate-900 dark:text-white"
                />
                <button type="button" className="bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all">
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-white/5 text-center text-slate-500 dark:text-slate-500 text-xs">
            &copy; 2025 Western Store. Designed for the Future.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;