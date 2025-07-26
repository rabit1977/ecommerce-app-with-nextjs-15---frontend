'use client';
import { initialProducts } from '@/lib/data';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { CartItem, Comment, Product, User } from '../../types';

interface AppContextType {
  products: Product[];
  allProducts: Product[];
  cartItems: CartItem[];
  wishlistItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  addComment: (productId: number, comment: Comment) => void;
  getProductById: (productId: number) => Product | undefined;
  cartSubtotal: number;
  shippingCost: number;
  tax: number;
  totalCost: number;
  totalItems: number;
  totalWishlistItems: number;
  placeOrder: () => {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    orderNumber: string;
  };
  showToast: boolean;
  toastMessage: string;
  displayToast: (message: string) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  currentUser: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  theme: { mode: string; scheme: string };
  toggleThemeMode: () => void;
  setThemeScheme: (scheme: string) => void;
  priceRange: number;
  setPriceRange: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  stockFilter: string;
  setStockFilter: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // ... (All state and functions from the previous version's AppProvider go here)
  // This is a direct copy-paste of the logic, now correctly typed.
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState({ mode: 'light', scheme: 'blue' });
  const [sortOrder, setSortOrder] = useState('default');
  const [stockFilter, setStockFilter] = useState('all');

  const maxPrice = useMemo(
    () => Math.ceil(Math.max(...initialProducts.map((p) => p.price))),
    []
  );
  const [priceRange, setPriceRange] = useState(maxPrice);

  const toggleThemeMode = () =>
    setTheme((prev) => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  const setThemeScheme = (scheme: string) =>
    setTheme((prev) => ({ ...prev, scheme }));

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const login = (email: string, name: string) => {
    setCurrentUser({ email, name });
    displayToast(`Welcome back, ${name}!`);
    setCartItems([]);
    setWishlistItems([]);
  };

  const logout = () => {
    setCurrentUser(null);
    displayToast('You have been logged out.');
  };

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    displayToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => setCartItems([]);

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

  const isInWishlist = (productId: number) =>
    wishlistItems.some((item) => item.id === productId);

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

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );
  const shippingCost = useMemo(
    () => (cartSubtotal > 500 || cartSubtotal === 0 ? 0 : 25),
    [cartSubtotal]
  );
  const tax = useMemo(() => cartSubtotal * 0.08, [cartSubtotal]);
  const totalCost = useMemo(
    () => cartSubtotal + shippingCost + tax,
    [cartSubtotal, shippingCost, tax]
  );
  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );
  const totalWishlistItems = useMemo(
    () => wishlistItems.length,
    [wishlistItems]
  );

  const placeOrder = () => {
    const orderDetails = {
      items: [...cartItems],
      subtotal: cartSubtotal,
      shipping: shippingCost,
      tax: tax,
      total: totalCost,
      orderNumber: `NGS-${Date.now()}`,
    };
    clearCart();
    return orderDetails;
  };

  const value: AppContextType = {
    products: filteredAndSortedProducts,
    allProducts: initialProducts,
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    addComment,
    getProductById,
    cartSubtotal,
    shippingCost,
    tax,
    totalCost,
    totalItems,
    totalWishlistItems,
    placeOrder,
    showToast,
    toastMessage,
    displayToast,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    currentUser,
    login,
    logout,
    theme,
    toggleThemeMode,
    setThemeScheme,
    priceRange,
    setPriceRange,
    maxPrice,
    sortOrder,
    setSortOrder,
    stockFilter,
    setStockFilter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp: () => AppContextType = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
