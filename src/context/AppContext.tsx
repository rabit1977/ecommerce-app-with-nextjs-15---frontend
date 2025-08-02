// src/context/AppContext.tsx
'use client';
import { initialProducts } from '@/lib/data';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { CartItem, Comment, Product } from '../../types';
import { CartProvider, useCart } from './CartContext'; // Import CartProvider and useCart
import { ThemeProvider, useTheme } from './ThemeContext'; // Import ThemeProvider and useTheme
import { UserProvider, useUser } from './UserContext'; // Import UserProvider and useUser

// Define the shape of the main AppContext (now much smaller)
interface AppContextType {
  products: Product[];
  allProducts: Product[];
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  addComment: (productId: number, comment: Comment) => void;
  getProductById: (productId: number) => Product | undefined;
  showToast: boolean;
  toastMessage: string;
  displayToast: (message: string) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  priceRange: number;
  setPriceRange: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  stockFilter: string;
  setStockFilter: React.Dispatch<React.SetStateAction<string>>;
  totalWishlistItems: number; // Keep this here as it depends on wishlistItems state
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Product-related states
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [stockFilter, setStockFilter] = useState('all');

  const maxPrice = useMemo(
    () => Math.ceil(Math.max(...initialProducts.map((p) => p.price))),
    []
  );
  const [priceRange, setPriceRange] = useState(maxPrice);

  // Toast display function
  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Wishlist functions
  const toggleWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      const isInWishlist = prevItems.some((item) => item.id === product.id);
      if (isInWishlist) {
        displayToast(`${product.name} removed from wishlist.`);
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        displayToast(`${product.name} added to wishlist!`);
        return [...prevItems, product];
      }
    });
  };

  const isInWishlist = (productId: number) =>
    wishlistItems.some((item) => item.id === productId);

  const addComment = (productId: number, comment: Comment) => {
    setProducts((currentProducts) =>
      currentProducts.map((p) => {
        if (p.id === productId) {
          return { ...p, comments: [comment, ...p.comments] };
        }
        return p;
      })
    );
    displayToast('Comment added successfully!');
  };

  const getProductById = (productId: number): Product | undefined => {
    return products.find((p) => p.id === productId);
  };

  // Filtered and sorted products logic (remains in AppContext as it depends on `products` state)
  const filteredAndSortedProducts = useMemo(() => {
    let processedProducts = [...products];
    processedProducts = processedProducts.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice = product.price <= priceRange;
      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'in-stock' && product.inStock) ||
        (stockFilter === 'out-of-stock' && !product.inStock);
      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    });

    switch (sortOrder) {
      case 'price-asc':
        processedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        processedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        processedProducts.sort((a, b) => a.id - b.id);
        break;
    }
    return processedProducts;
  }, [
    products,
    searchTerm,
    activeCategory,
    priceRange,
    sortOrder,
    stockFilter,
  ]);

  const totalWishlistItems = useMemo(
    () => wishlistItems.length,
    [wishlistItems]
  );

  const value: AppContextType = {
    products: filteredAndSortedProducts,
    allProducts: initialProducts,
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    addComment,
    getProductById,
    showToast,
    toastMessage,
    displayToast,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    priceRange,
    setPriceRange,
    maxPrice,
    sortOrder,
    setSortOrder,
    stockFilter,
    setStockFilter,
    totalWishlistItems,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp: () => AppContextType = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
