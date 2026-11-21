import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, Menu, X, ShoppingCart,
  ArrowRight, Star, ShieldCheck, Zap, Users,
  Globe, Award, Moon, Sun,
} from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { DiscountShop } from '@/features/commerce/products/DiscountShop';
import { ServiceCenters } from '@/features/commerce/service-centers/ServiceCenters';
import { PremiumStores } from '@/features/commerce/stores/PremiumStores';
import { CompanyProducts } from '@/features/commerce/products/CompanyProducts';
import { ProductDescription } from '@/features/commerce/products/ProductDescription';
import { useProducts } from '@/lib/hooks/useDomain';
import { getProductImage, getCategoryName } from '@/lib/types/product.types';
import type { Product } from '@/lib/types/product.types';
import logo from '@/shared/assets/logo';
import personnelImage from '@/shared/assets/personnel.jpeg';
import bottleImage from '@/shared/assets/bottle.png';
import Image from 'next/image';

export type ActiveView =
  | 'home' | 'discount-shop' | 'service-centers'
  | 'premium-stores' | 'company-products' | 'product-details';

interface HomePageProps {
  onSignIn: () => void;
  onSignUp: () => void;
  isDark?: boolean;
  setIsDark?: (value: boolean) => void;
  initialView?: ActiveView;
  onViewChange?: (view: ActiveView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onSignIn, 
  onSignUp,
  isDark: externalIsDark,
  setIsDark: externalSetIsDark,
  initialView = 'home',
  onViewChange,
}) => {
  // Theme management
  const [internalIsDark, setInternalIsDark] = useState(() => {
    if (externalIsDark !== undefined) return externalIsDark;
    const saved = localStorage.getItem('crystalgreengold-theme');
    if (saved) return saved === 'dark';
    return true;
  });

  const isDark = externalIsDark !== undefined ? externalIsDark : internalIsDark;
  const setIsDark = externalSetIsDark || setInternalIsDark;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('crystalgreengold-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Fetch products
  const { products, loading: productsLoading } = useProducts(1, '');
  const featuredProducts = products.slice(0, 6);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [activeView, setActiveViewState] = useState<ActiveView>(initialView);
  const [previousView, setPreviousView] = useState<ActiveView>(initialView);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setActiveViewState(initialView);
    setPreviousView(initialView);
    setSelectedProduct(null);
  }, [initialView]);

  const setActiveView = (view: ActiveView) => {
    setActiveViewState(view);
    if (view !== 'product-details') {
      onViewChange?.(view);
    }
  };

  const shopLinks = [
    { name: 'Discount Shop', id: 'discount-shop' as ActiveView },
    { name: 'Local Centers', id: 'service-centers' as ActiveView },
    { name: 'State Centers', id: 'premium-stores' as ActiveView },
    { name: 'National Center', id: 'company-products' as ActiveView },
  ];

  const handleProductSelect = (product: Product) => {
    setPreviousView(activeView);
    setSelectedProduct(product);
    setActiveViewState('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (activeView) {
      case 'discount-shop':
        return (
          <div className="pt-24 pb-12 px-6">
            <DiscountShop onSelectProduct={handleProductSelect} />
          </div>
        );
      case 'service-centers':
        return (
          <div className="pt-24 pb-12 px-6">
            <ServiceCenters onSelectCenter={onSignUp} />
          </div>
        );
      case 'premium-stores':
        return (
          <div className="pt-24 pb-12 px-6">
            <PremiumStores onSelectStore={onSignUp} />
          </div>
        );
      case 'company-products':
        return (
          <div className="pt-24 pb-12 px-6">
            <CompanyProducts 
              onSelectProduct={handleProductSelect} 
              onBuyPackage={onSignUp} 
            />
          </div>
        );
      case 'product-details':
        return (
          <div className="pt-24 pb-12 px-6">
            <ProductDescription
              product={selectedProduct}
              onBack={() => setActiveView(previousView === 'product-details' ? 'company-products' : previousView)}
              onAddToCart={onSignUp}
              onBuyNow={onSignUp}
            />
          </div>
        );
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="pt-28 pb-16 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center space-x-2 bg-lime-400/10 text-lime-400 px-3 py-1.5 rounded-full border border-lime-400/30"
                  >
                    <Star size={14} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Natural Wellness · Empowered People · Brighter Futures</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-semibold text-emerald-950 dark:text-white leading-[1.02] tracking-tight"
                  >
                    NATURAL WELLNESS.<br />
                    <span className="text-lime-400">EMPOWERED PEOPLE.</span><br />
                    BRIGHTER FUTURES.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-base text-emerald-600 dark:text-emerald-200 max-w-lg leading-relaxed font-medium"
                  >
                    Welcome to NexoraLife Global — where wellness meets opportunity. Discover quality wellness products, personal growth, and a community built around shared progress.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-3"
                  >
                    <Button
                      onClick={() => setActiveView('company-products')}
                      className="w-full sm:w-auto bg-lime-400 hover:bg-lime-300 dark:bg-lime-400 dark:hover:bg-lime-300 text-slate-950 px-8 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 group text-xs"
                    >
                      <span>Explore Products</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const aboutSection = document.getElementById('about-nexoralife');
                        if (aboutSection) {
                          aboutSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold border text-xs"
                    >
                      Learn More
                    </Button>
                  </motion.div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-emerald-100 dark:border-emerald-600/30">
                    {[[ 'Quality', 'Thoughtful product selection' ], [ 'Growth', 'Personal development' ], [ 'Community', 'Shared progress' ]].map(([val, label]) => (
                      <div key={label}>
                        <p className="text-2xl font-black text-emerald-950 dark:text-white">{val}</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-linear-to-tr from-lime-400/20 to-emerald-400/10 rounded-full blur-3xl" />
                  <Image
                    src={bottleImage}
                    alt="Lifestyle"
                    className="relative rounded-3xl shadow-2xl border border-emerald-50 dark:border-white/10 rotate-0 hover:scale-[1.02] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-14 bg-slate-50 dark:bg-[#0b0f12] transition-colors duration-500 border-y border-slate-100 dark:border-white/[0.06]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center space-y-2 mb-12">
                  <h2 className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">Why Choose Us</h2>
                  <p className="text-3xl font-black text-emerald-950 dark:text-white tracking-tight">The NexoraLife Difference</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: ShieldCheck, title: 'Carefully Selected Products', desc: 'We focus on product quality, responsible selection, and customer satisfaction.', color: 'blue' },
                    { icon: Zap, title: 'Personal Development', desc: 'Explore opportunities to learn, develop useful skills, and grow as you go.', color: 'amber' },
                    { icon: Users, title: 'A Supportive Community', desc: 'Build meaningful relationships in a culture of teamwork, learning, and leadership.', color: 'emerald' },
                  ].map((f, i) => (
                    <Card key={i} className="p-6 space-y-4 group hover:-translate-y-2 transition-all duration-500 border-none shadow-xl">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                        f.color === 'blue' ? 'bg-emerald-600/10 text-emerald-600' :
                        f.color === 'amber' ? 'bg-lime-400/10 text-lime-400' :
                        'bg-emerald-700/10 text-emerald-700'
                      }`}>
                        <f.icon size={24} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-emerald-950 dark:text-white tracking-tight">{f.title}</h3>
                        <p className="text-sm text-emerald-600 dark:text-emerald-200 font-medium leading-relaxed">{f.desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-12 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div className="space-y-2">
                    <h2 className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">Our Catalog</h2>
                    <p className="text-3xl font-black text-emerald-950 dark:text-white tracking-tight">Featured Products</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveView('company-products')}
                    className="rounded-full px-6 py-2 font-black uppercase tracking-widest text-[10px] border-2"
                  >
                    View All Products
                  </Button>
                </div>

                {/* Loading Skeleton */}
                {productsLoading && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="rounded-[16px] bg-emerald-100 dark:bg-emerald-800 animate-pulse aspect-square" />
                    ))}
                  </div>
                )}

                {/* Products Grid */}
                {!productsLoading && featuredProducts.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {featuredProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => handleProductSelect(product)}
                      >
                        <div className="bg-white dark:bg-[#10151a]/40 rounded-[16px] overflow-hidden shadow-sm border border-emerald-100 dark:border-emerald-600/20 hover:shadow-xl transition-all duration-500">
                          <div className="relative aspect-square overflow-hidden bg-emerald-50 dark:bg-white/5">
                            <img
                              src={getProductImage(product)}
                              alt={product.name}
                              className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="rounded-full p-2.5 bg-white text-lime-400 hover:bg-lime-400 hover:text-emerald-950 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-lg">
                                <ShoppingCart size={16} />
                              </div>
                            </div>
                          </div>
                          <div className="p-3 space-y-1.5">
                            <div className="space-y-0.5">
                              <p className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em]">
                                {getCategoryName(product.category)}
                              </p>
                              <h3 className="text-sm font-black text-emerald-950 dark:text-white group-hover:text-lime-400 transition-colors truncate tracking-tight">
                                {product.name}
                              </h3>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-emerald-50 dark:border-emerald-600/20">
                              <span className="text-base font-black text-lime-400">
                                ₦{product.price.toLocaleString()}
                              </span>
                              <div className="flex items-center space-x-1">
                                <span className="text-[9px] font-bold text-emerald-500 dark:text-emerald-300">View details</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!productsLoading && featuredProducts.length === 0 && (
                  <div className="text-center py-16 text-emerald-400">
                    <p className="font-bold text-sm">No products available yet.</p>
                  </div>
                )}
              </div>
            </section>

            {/* About Section */}
            <section id="about-nexoralife" className="py-16 bg-[#0b0f12] text-white overflow-hidden relative border-y border-white/[0.06]">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-lime-400 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-lime-300 rounded-full blur-[100px]" />
              </div>
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">About NexoraLife Global</h2>
                    <p className="text-3xl font-black leading-tight tracking-tighter">
                      NATURAL WELLNESS.<br />
                      <span className="text-lime-400">EMPOWERED PEOPLE.</span><br />
                      BRIGHTER FUTURES.
                    </p>
                    <div className="space-y-6 text-emerald-100 text-base leading-relaxed font-medium">
                      <div>
                        <h3 className="text-xl font-black text-white">Vision Statement</h3>
                        <p>To become a globally recognised and trusted wellness enterprise, distinguished by quality products, innovation, customer satisfaction, and opportunities that empower individuals and communities.</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">Mission Statement</h3>
                        <p>To make quality wellness products accessible, promote informed wellness choices, empower individuals through entrepreneurship, and build a sustainable business community based on trust, integrity, and shared growth.</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">Wellness for everyday living</h3>
                        <p>NexoraLife offers herbal wellness and health-oriented products designed to complement modern lifestyles and support informed personal wellness choices.</p>
                        <p>Our product philosophy focuses on quality, responsible product selection, customer education, and satisfaction.</p>
                        <p className="pt-3">Discover products that complement your lifestyle.</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8 pt-6">
                      {[{ icon: Globe, label: 'Global\nPresence' }, { icon: Award, label: 'Certified\nQuality' }].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lime-400">
                            <Icon size={20} />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest whitespace-pre-line leading-tight">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Image
                      src={personnelImage}
                      alt="Our Team"
                      className="rounded-2xl w-full h-48 object-cover -mb-8"
                      referrerPolicy="no-referrer"
                    />
                    <Image
                      src={bottleImage}
                      alt="Product" 
                      className="rounded-2xl w-full h-48 object-cover mt-8" 
                      referrerPolicy="no-referrer" 
                    />
                   
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" 
                      alt="Team" 
                      className="rounded-2xl w-full h-48 object-cover -mt-8" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#07090c] transition-colors duration-500">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#07090c]/80 backdrop-blur-xl border-b border-emerald-100 dark:border-emerald-600/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveView('home')}>
              <img src={logo} alt="NexoraLife Global" className="h-8 w-auto" />
              <span className="text-lg font-black text-emerald-950 dark:text-white tracking-tighter">NexoraLife Global</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveView('home')}
                className={`text-xs font-bold transition-colors ${
                  activeView === 'home' ? 'text-lime-400' : 'text-emerald-600 dark:text-emerald-300 hover:text-lime-400'
                }`}
              >
                Home
              </button>
              <div className="relative group">
                <button
                  onMouseEnter={() => setIsShopDropdownOpen(true)}
                  onMouseLeave={() => setIsShopDropdownOpen(false)}
                  className={`flex items-center space-x-1 text-xs font-bold transition-colors ${
                    ['discount-shop', 'service-centers', 'premium-stores', 'company-products', 'product-details'].includes(activeView)
                      ? 'text-lime-400'
                      : 'text-emerald-600 dark:text-emerald-300 hover:text-lime-400'
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isShopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseEnter={() => setIsShopDropdownOpen(true)}
                      onMouseLeave={() => setIsShopDropdownOpen(false)}
                      className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#10151a] rounded-xl shadow-2xl border border-emerald-100 dark:border-emerald-600/30 overflow-hidden">
                      <div className="p-1.5">
                        {shopLinks.map((link) => (
                          <button
                            key={link.id}
                            onClick={() => { 
                              setActiveView(link.id); 
                              setIsShopDropdownOpen(false); 
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                              activeView === link.id
                                ? 'bg-lime-400 text-emerald-950'
                                : 'text-emerald-600 dark:text-emerald-300 hover:bg-lime-400/10 hover:text-lime-400'
                            }`}
                          >
                            {link.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-white/5 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={onSignIn}
                className="px-5 py-2 rounded-full font-black uppercase tracking-widest text-[10px] border-2"
              >
                Login
              </Button>
              <Button 
                onClick={onSignUp}
                className="bg-lime-400 hover:bg-lime-400 text-emerald-950 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-lime-400/20"
              >
                Sign Up
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-2 text-emerald-600 dark:text-emerald-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-[#07090c] border-b border-emerald-100 dark:border-emerald-600/30 overflow-hidden"
            >
              <div className="p-5 space-y-3">
                <button
                  onClick={() => {
                    setActiveView('home');
                    setIsMenuOpen(false);
                  }}
                  className="block text-base font-bold text-lime-400"
                >
                  Home
                </button>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Shop</p>
                  {shopLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveView(link.id);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-1.5 text-emerald-600 dark:text-emerald-300 font-bold text-sm"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <Button 
                    variant="outline" 
                    onClick={() => { 
                      onSignIn(); 
                      setIsMenuOpen(false); 
                    }} 
                    className="w-full py-3 rounded-xl font-black uppercase tracking-widest border-2 text-xs"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => { 
                      onSignUp(); 
                      setIsMenuOpen(false); 
                    }} 
                    className="w-full bg-lime-400 text-emerald-950 py-3 rounded-xl font-black uppercase tracking-widest text-xs"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {renderView()}

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-[#07090c] transition-colors duration-500 border-t border-emerald-100 dark:border-emerald-600/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveView('home')}>
              <img src={logo} alt="NexoraLife Global" className="h-10 w-auto" />
              <span className="text-xl font-black text-emerald-950 dark:text-white tracking-tighter">NexoraLife Global</span>
            </div>
            <p className="text-emerald-600 dark:text-emerald-200 max-w-sm text-sm font-medium leading-relaxed">
              Natural wellness, quality products, and opportunities that help people and communities grow.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-emerald-950 dark:text-white uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2 text-xs font-bold text-emerald-600 dark:text-emerald-300">
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-lime-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('company-products')} className="hover:text-lime-400 transition-colors">
                  Shop
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-lime-400 transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-emerald-950 dark:text-white uppercase tracking-widest">Legal</h4>
            <ul className="space-y-2 text-xs font-bold text-emerald-600 dark:text-emerald-300">
              <li>
                <a href="#" className="hover:text-lime-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-400 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-emerald-100 dark:border-emerald-600/30 text-center">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            © 2026 NexoraLife Global Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
