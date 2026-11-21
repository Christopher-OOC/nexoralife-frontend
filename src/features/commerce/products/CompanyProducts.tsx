import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingBag, ChevronLeft, ChevronRight, ShoppingCart, Loader2, PackageSearch, ArrowUpRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ErrorState } from '@/shared/ui/ErrorState';
import { useCart } from '@/features/cart/CartContext';
import { normalizeProduct } from '@/lib/utils/data-normalization';
import { productService } from '@/lib/api/services/product.service';
import { categoryService } from '@/lib/api/services/category.service';
import type { Category } from '@/lib/types/category.types';

interface Product {
  id: string;
  name: string;
  price: number;
  pv: number;
  bv: number;
  image: string;
  storeId?: string;
  category?: { 
    id: number; 
    name: string;
  } | string;
  description?: string;
  availableQuantity?: number;
}

interface CompanyProductsProps {
  onSelectProduct: (product: any) => void;
  onBuyPackage: () => void;
}

// Helper function to get category name safely
const getCategoryName = (category: Product['category']): string => {
  if (!category) return 'General';
  if (typeof category === 'string') return category;
  return category.name || 'General';
};

export const CompanyProducts: React.FC<CompanyProductsProps> = ({ onSelectProduct, onBuyPackage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.warn('Categories unavailable for product catalog.');
      setCategories([]);
    }
  };


  const fetchData = useCallback(async (page = 1, search = '', categoryId = '') => {
    setIsLoading(true);
    setError(null);
    try {
      // Try fetching with pagination and category filtering
      const result = await productService.getAll(page, 8, search, categoryId);
      
      const productData = (result.data || []).map(normalizeProduct);
      setProducts(productData);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
    } catch (err: any) {
      console.warn('Product catalog request failed, trying unfiltered fallback.');
      // Fallback: If paginated fetch fails, try fetching all and handle locally
      try {
        const result = await productService.getAll();
        const productData = (result.data || []).map(normalizeProduct);
        setProducts(productData);
        setTotalPages(1); // Client-side fallback usually means 1 page of all results or we'd need more logic
        setTotalElements(productData.length);
      } catch (fallbackErr: any) {
        console.warn('Product catalog fallback request failed.');
        setProducts([]);
        setTotalPages(1);
        setError(getRequestErrorMessage(fallbackErr, 'Failed to load products.'));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchData(1, searchQuery, activeCategoryId);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategoryId, fetchData]);

  useEffect(() => {
    fetchData(currentPage, searchQuery, activeCategoryId);
  }, [currentPage, fetchData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening product description modal
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      pv: product.pv,
      bv: product.bv,
      storeId: product.storeId,
    });
    
    
    console.log(`Added ${product.name} to cart`);
  };

  // We are using server-side filtering now
  const filtered = products;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <Loader2 className="w-12 h-12 text-amber-400 animate-spin mb-4" />
        <p className="text-emerald-600 font-bold animate-pulse">Loading product catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Catalog Error" 
        message={error} 
        onRetry={() => fetchData(currentPage, searchQuery)} 
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 py-2">
      <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Shop / National Center</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Official products</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Browse the current product catalog and find what you need.</p>
        </div>
        <Button onClick={onBuyPackage} className="h-10 px-4">
          <ShoppingBag size={16} /> Buy a package
        </Button>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input type="text" placeholder="Search products..." value={searchQuery} onChange={handleSearch} aria-label="Search products" className="h-10 pl-9" />
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <p className="text-sm tabular-nums text-slate-500 dark:text-slate-400">{totalElements.toLocaleString()} products</p>
          <Button type="button" variant="ghost" size="icon" onClick={() => void fetchData(currentPage, searchQuery, activeCategoryId)} disabled={isLoading} aria-label="Refresh products" title="Refresh products">
            <RefreshCw className={isLoading ? 'animate-spin' : ''} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Product categories">
        <button 
          onClick={() => handleCategoryChange('')}
          className={`rounded-md border px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategoryId === ''
            ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-white/5'
          }`}
        >
          All Categories
        </button>
        {categories.map(category => (
          <button 
            key={category.id} 
            onClick={() => handleCategoryChange(String(category.id))}
            className={`rounded-md border px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategoryId === String(category.id)
              ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-white/5'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 text-center text-slate-500 dark:border-white/15 dark:text-slate-400">
          <PackageSearch className="size-8" />
          {searchQuery ? 'No products match your search.' : 'No products found.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer" 
              onClick={() => onSelectProduct(product)}
            >
              <Card className="overflow-hidden rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Handle image load error
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center text-emerald-200 text-4xl ${product.image ? 'hidden' : ''}`}>
                    📦
                  </div>
                  <Badge variant="secondary" className="absolute left-3 top-3 border border-slate-200 bg-background/90 text-slate-700 shadow-sm dark:border-white/10 dark:text-slate-200">
                    {product.availableQuantity && product.availableQuantity > 0 ? `${product.availableQuantity} in stock` : 'Catalog item'}
                  </Badge>
                </div>
                <CardContent className="flex min-h-52 flex-col space-y-3 p-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      {getCategoryName(product.category)}
                    </p>
                    <h3 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-3 dark:border-white/10">
                    <span className="text-lg font-semibold tabular-nums text-slate-950 dark:text-white">
                      ₦{Number(product.price ?? 0).toLocaleString('en-NG')}
                    </span>
                    <div className="text-right text-xs text-muted-foreground">
                      <span>{product.pv} PV · {product.bv} BV</span>
                    </div>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={(event) => { event.stopPropagation(); onSelectProduct(product); }}>
                      View details <ArrowUpRight size={15} />
                    </Button>
                    <Button type="button" size="sm" onClick={(event) => handleAddToCart(product, event)}>
                      <ShoppingCart size={15} /> Add to cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 pt-4">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
            disabled={currentPage === 1}
            className="rounded-md border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            // Show pages around current page
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button 
                key={pageNum} 
                onClick={() => setCurrentPage(pageNum)}
                className={`h-9 min-w-9 rounded-md px-3 text-sm font-medium transition-all ${
                  currentPage === pageNum 
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
            disabled={currentPage === totalPages}
            className="rounded-md border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

function getRequestErrorMessage(err: any, fallback: string) {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.response?.data?.error) return err.response.data.error;
  if (err?.response?.status >= 500) return 'Products are temporarily unavailable. Please try again later.';
  if (err?.code === 'ECONNABORTED') return 'The request timed out. Please try again.';
  if (err?.message === 'Network Error') return 'Unable to reach the API. Please check the backend connection and try again.';
  return fallback;
}
