export type NavTab = 
  | 'home'
  | 'katalog'
  | 'reviews'
  | 'comparisons'
  | 'best-tws'
  | 'buying-guides'
  | 'categories'
  | 'search'
  | 'affiliate'
  | 'about'
  | 'contact';

export type AdminRoute = 
  | 'dashboard'
  | 'articles'
  | 'article-new'
  | 'article-edit'
  | 'products'
  | 'product-new'
  | 'product-edit'
  | 'categories'
  | 'affiliate-links'
  | 'media'
  | 'comments'
  | 'analytics'
  | 'settings';

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string; // e.g. 'budget', 'premium', 'anc', 'gaming', 'sports'
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  tagline?: string;
  description: string;
  imageUrl: string;
  gallery?: string[];
  specs: {
    anc: string;
    battery: string;
    codec: string;
    microphone: string;
    waterResistance: string;
    weight: string;
    connectivity: string;
    driverSize?: string;
    multipoint?: string;
    spatialAudio?: string;
  };
  pros: string[];
  cons: string[];
  verdict: string;
  tokopediaUrl: string;
  otherUrl?: string;
  status: 'published' | 'draft';
  isFeatured?: boolean;
  isBestValue?: boolean;
  isPopular?: boolean;
  rank?: number;
  createdAt: string;
}

export interface ReviewArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  type: 'review' | 'buying_guide' | 'comparison' | 'news';
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  featuredImage: string;
  status: 'published' | 'draft';
  rating?: number;
  verdictScore?: number;
  highlightSummary?: string;
  pros?: string[];
  cons?: string[];
  relatedProductId?: string;
  tags: string[];
  views: number;
  affiliateClicks: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  articleCount: number;
  productCount: number;
  imageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface AffiliateLinkItem {
  id: string;
  productId: string;
  productName: string;
  marketplace: 'tokopedia' | 'other';
  affiliateUrl: string;
  clicks: number;
  status: 'active' | 'paused';
  createdAt: string;
}

export interface AffiliateClickLog {
  id: string;
  productId: string;
  productName: string;
  marketplace: 'tokopedia' | 'other';
  timestamp: string;
  referrer?: string;
  device?: string;
}

export interface MediaItem {
  id: string;
  fileName: string;
  url: string;
  size: string;
  uploadDate: string;
  type: 'image' | 'document';
}

export interface ArticleComment {
  id: string;
  articleId: string;
  articleTitle: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'hidden';
}

export interface SearchResult {
  products: ProductItem[];
  articles: ReviewArticle[];
  categories: CategoryItem[];
}
