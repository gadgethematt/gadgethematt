import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AffiliateModal } from './components/AffiliateModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { KatalogPage } from './pages/KatalogPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ReviewDetailPage } from './pages/ReviewDetailPage';
import { ComparisonsPage } from './pages/ComparisonsPage';
import { BestTwsPage } from './pages/BestTwsPage';
import { BuyingGuidesPage } from './pages/BuyingGuidesPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { SearchPage } from './pages/SearchPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AffiliatePage } from './pages/AffiliatePage';

// Admin Pages
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminArticlesPage } from './admin/AdminArticlesPage';
import { AdminArticleFormPage } from './admin/AdminArticleFormPage';
import { AdminProductsPage } from './admin/AdminProductsPage';
import { AdminProductFormPage } from './admin/AdminProductFormPage';
import { AdminCategoriesPage } from './admin/AdminCategoriesPage';
import { AdminAffiliateLinksPage } from './admin/AdminAffiliateLinksPage';
import { AdminMediaPage } from './admin/AdminMediaPage';
import { AdminCommentsPage } from './admin/AdminCommentsPage';
import { AdminAnalyticsPage } from './admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './admin/AdminSettingsPage';

export const AppContent: React.FC = () => {
  const { currentPath, isAdminLoggedIn, adminRoute } = useApp();

  // Handle Admin Routes
  if (currentPath.startsWith('/admin')) {
    if (currentPath === '/admin/login' || !isAdminLoggedIn) {
      return <AdminLoginPage />;
    }

    return (
      <AdminLayout>
        {adminRoute === 'dashboard' && <AdminDashboard />}
        {adminRoute === 'articles' && <AdminArticlesPage />}
        {(adminRoute === 'article-new' || adminRoute === 'article-edit') && <AdminArticleFormPage />}
        {adminRoute === 'products' && <AdminProductsPage />}
        {(adminRoute === 'product-new' || adminRoute === 'product-edit') && <AdminProductFormPage />}
        {adminRoute === 'categories' && <AdminCategoriesPage />}
        {adminRoute === 'affiliate-links' && <AdminAffiliateLinksPage />}
        {adminRoute === 'media' && <AdminMediaPage />}
        {adminRoute === 'comments' && <AdminCommentsPage />}
        {adminRoute === 'analytics' && <AdminAnalyticsPage />}
        {adminRoute === 'settings' && <AdminSettingsPage />}
      </AdminLayout>
    );
  }

  // Handle Public Routes
  const renderPublicPage = () => {
    if (currentPath === '/' || currentPath === '') return <HomePage />;
    if (currentPath === '/katalog') return <KatalogPage />;
    if (currentPath === '/reviews') return <ReviewsPage />;
    if (currentPath.startsWith('/reviews/')) return <ReviewDetailPage />;
    if (currentPath === '/comparisons') return <ComparisonsPage />;
    if (currentPath === '/best-tws') return <BestTwsPage />;
    if (currentPath === '/buying-guides') return <BuyingGuidesPage />;
    if (currentPath.startsWith('/buying-guides/')) return <ReviewDetailPage />;
    if (currentPath === '/categories') return <CategoriesPage />;
    if (currentPath.startsWith('/categories/')) return <CategoryDetailPage />;
    if (currentPath === '/search') return <SearchPage />;
    if (currentPath.startsWith('/products/')) return <ProductDetailPage />;
    if (currentPath === '/about') return <AboutPage />;
    if (currentPath === '/contact') return <ContactPage />;
    if (currentPath === '/affiliate') return <AffiliatePage />;

    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f4f7f5] to-[#f8fafc] text-[#080808] selection:bg-[#B9F43A] selection:text-black font-sans antialiased overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="w-full flex-1">
        {renderPublicPage()}
      </main>

      <Footer />
      <AffiliateModal />
    </div>
  );
};
