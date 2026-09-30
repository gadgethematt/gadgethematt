import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ProductItem, 
  ReviewArticle, 
  CategoryItem, 
  AffiliateLinkItem, 
  MediaItem, 
  ArticleComment,
  AdminRoute
} from '../types';
import { dbService } from '../services/dbService';

interface AppContextType {
  // Navigation
  currentPath: string;
  navigate: (path: string) => void;
  selectedSlug: string | null;
  
  // Data
  products: ProductItem[];
  articles: ReviewArticle[];
  categories: CategoryItem[];
  affiliateLinks: AffiliateLinkItem[];
  media: MediaItem[];
  comments: ArticleComment[];

  // Global UI Modals & Actions
  isAffiliateModalOpen: boolean;
  openAffiliateModal: (prod?: ProductItem) => void;
  closeAffiliateModal: () => void;
  selectedAffiliateProduct: ProductItem | null;

  isAudioTestOpen: boolean;
  toggleAudioTest: () => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Admin
  isAdminLoggedIn: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  adminRoute: AdminRoute;
  setAdminRoute: (route: AdminRoute) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;

  // Actions
  trackClick: (productId: string, productName: string, marketplace?: 'tokopedia' | 'other') => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [articles, setArticles] = useState<ReviewArticle[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLinkItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [comments, setComments] = useState<ArticleComment[]>([]);

  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);
  const [selectedAffiliateProduct, setSelectedAffiliateProduct] = useState<ProductItem | null>(null);
  const [isAudioTestOpen, setIsAudioTestOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminRoute, setAdminRoute] = useState<AdminRoute>('dashboard');
  const [editingId, setEditingId] = useState<string | null>(null);

  const refreshData = () => {
    setProducts(dbService.getProducts());
    setArticles(dbService.getArticles());
    setCategories(dbService.getCategories());
    setAffiliateLinks(dbService.getAffiliateLinks());
    setMedia(dbService.getMedia());
    setComments(dbService.getComments());
    setIsAdminLoggedIn(dbService.isAdminLoggedIn());
  };

  useEffect(() => {
    refreshData();
    const unsubscribe = dbService.subscribe(() => {
      refreshData();
    });

    // Handle initial browser URL path if any
    const path = window.location.pathname;
    if (path && path !== '/') {
      navigate(path);
    }

    return () => unsubscribe();
  }, []);

  const navigate = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Parse slug from routes like /products/soundcore-liberty-5
    const parts = path.split('/').filter(Boolean);
    if (parts.length >= 2) {
      setSelectedSlug(parts[1]);
    } else {
      setSelectedSlug(null);
    }

    setCurrentPath(path);
    try {
      window.history.pushState({}, '', path);
    } catch {
      // ignore frame history restrictions
    }
  };

  const openAffiliateModal = (prod?: ProductItem) => {
    const pubProducts = dbService.getProducts().filter(p => p.status === 'published');
    setSelectedAffiliateProduct(prod || pubProducts[0] || null);
    setIsAffiliateModalOpen(true);
  };

  const closeAffiliateModal = () => {
    setIsAffiliateModalOpen(false);
  };

  const toggleAudioTest = () => {
    setIsAudioTestOpen(prev => !prev);
  };

  const trackClick = (productId: string, productName: string, marketplace: 'tokopedia' | 'other' = 'tokopedia') => {
    dbService.trackAffiliateClick(productId, productName, marketplace);
  };

  const loginAdmin = () => {
    dbService.setAdminLoggedIn(true);
    setIsAdminLoggedIn(true);
    navigate('/admin');
  };

  const logoutAdmin = () => {
    dbService.setAdminLoggedIn(false);
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        selectedSlug,
        products,
        articles,
        categories,
        affiliateLinks,
        media,
        comments,
        isAffiliateModalOpen,
        openAffiliateModal,
        closeAffiliateModal,
        selectedAffiliateProduct,
        isAudioTestOpen,
        toggleAudioTest,
        searchQuery,
        setSearchQuery,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        adminRoute,
        setAdminRoute,
        editingId,
        setEditingId,
        trackClick,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
