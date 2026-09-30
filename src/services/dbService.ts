import { 
  ProductItem, 
  ReviewArticle, 
  CategoryItem, 
  AffiliateLinkItem, 
  MediaItem, 
  ArticleComment,
  AffiliateClickLog
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ARTICLES, 
  INITIAL_CATEGORIES, 
  INITIAL_AFFILIATE_LINKS, 
  INITIAL_MEDIA, 
  INITIAL_COMMENTS 
} from '../data/mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'gadgethematt_db_products_v2',
  ARTICLES: 'gadgethematt_db_articles_v2',
  CATEGORIES: 'gadgethematt_db_categories_v2',
  AFFILIATES: 'gadgethematt_db_affiliates_v2',
  CLICK_LOGS: 'gadgethematt_db_clicks_v2',
  MEDIA: 'gadgethematt_db_media_v2',
  COMMENTS: 'gadgethematt_db_comments_v2',
  ADMIN_SESSION: 'gadgethematt_admin_auth_v2'
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();

const notifyListeners = () => {
  listeners.forEach(fn => fn());
};

export const dbService = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // PRODUCTS
  getProducts(): ProductItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  getProductBySlug(slug: string): ProductItem | undefined {
    return this.getProducts().find(p => p.slug === slug || p.id === slug);
  },

  saveProduct(product: Partial<ProductItem> & { name: string }): ProductItem {
    const products = this.getProducts();
    const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (product.id) {
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...product, slug } as ProductItem;
      }
    } else {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        slug,
        name: product.name,
        brand: product.brand || 'GADGET HEMATT',
        category: product.category || 'ANC TWS',
        price: product.price || 0,
        oldPrice: product.oldPrice,
        rating: product.rating || 4.8,
        reviewCount: product.reviewCount || 1,
        badge: product.badge,
        tagline: product.tagline,
        description: product.description || '',
        imageUrl: product.imageUrl || '/src/assets/images/soundcore_liberty_5_1790729961290.jpg',
        gallery: product.gallery || [],
        specs: product.specs || {
          anc: 'Ada',
          battery: '8 Jam',
          codec: 'AAC',
          microphone: 'Dual Mic',
          waterResistance: 'IPX4',
          weight: '4g',
          connectivity: 'Bluetooth 5.3'
        },
        pros: product.pros || ['Desain ergonomis', 'Suara jernih'],
        cons: product.cons || ['Tersedia stok terbatas'],
        verdict: product.verdict || 'TWS berkualitas pilihan.',
        shopeeUrl: product.shopeeUrl || 'https://shopee.co.id',
        tokopediaUrl: product.tokopediaUrl || 'https://tokopedia.com',
        lazadaUrl: product.lazadaUrl,
        otherUrl: product.otherUrl,
        isFeatured: product.isFeatured || false,
        isBestValue: product.isBestValue || false,
        isPopular: product.isPopular || false,
        rank: product.rank,
        createdAt: new Date().toISOString().split('T')[0]
      };
      products.unshift(newProd);
    }

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    notifyListeners();
    return products.find(p => p.slug === slug || p.id === product.id) || products[0];
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id && p.slug !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    notifyListeners();
  },

  // ARTICLES / REVIEWS
  getArticles(): ReviewArticle[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
        return INITIAL_ARTICLES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ARTICLES;
    }
  },

  getArticleBySlug(slug: string): ReviewArticle | undefined {
    return this.getArticles().find(a => a.slug === slug || a.id === slug);
  },

  saveArticle(article: Partial<ReviewArticle> & { title: string }): ReviewArticle {
    const articles = this.getArticles();
    const slug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (article.id) {
      const index = articles.findIndex(a => a.id === article.id);
      if (index !== -1) {
        articles[index] = { ...articles[index], ...article, slug } as ReviewArticle;
      }
    } else {
      const newArt: ReviewArticle = {
        id: `art-${Date.now()}`,
        slug,
        title: article.title,
        subtitle: article.subtitle || '',
        excerpt: article.excerpt || article.subtitle || '',
        content: article.content || '<p>Konten artikel sedang disusun...</p>',
        category: article.category || 'Reviews',
        type: article.type || 'review',
        author: article.author || 'Dika Ramadhan',
        authorRole: article.authorRole || 'Head Audio Reviewer',
        authorAvatar: article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        readTime: article.readTime || '5 menit baca',
        featuredImage: article.featuredImage || '/src/assets/images/soundcore_liberty_5_1790729961290.jpg',
        status: article.status || 'published',
        rating: article.rating || 4.8,
        verdictScore: article.verdictScore || 9.2,
        highlightSummary: article.highlightSummary || article.excerpt,
        pros: article.pros || ['Respons frekuensi seimbang', 'ANC efektif'],
        cons: article.cons || ['Fitur app opsional'],
        relatedProductId: article.relatedProductId || 'prod-1',
        tags: article.tags || ['Reviews', 'TWS'],
        views: article.views || 10,
        affiliateClicks: article.affiliateClicks || 0,
        seoTitle: article.seoTitle || `${article.title} - GADGET HEMATT`,
        seoDescription: article.seoDescription || article.excerpt
      };
      articles.unshift(newArt);
    }

    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    notifyListeners();
    return articles.find(a => a.slug === slug || a.id === article.id) || articles[0];
  },

  deleteArticle(id: string): void {
    const articles = this.getArticles().filter(a => a.id !== id && a.slug !== id);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    notifyListeners();
  },

  // CATEGORIES
  getCategories(): CategoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CATEGORIES;
    }
  },

  getCategoryBySlug(slug: string): CategoryItem | undefined {
    return this.getCategories().find(c => c.slug === slug || c.id === slug);
  },

  saveCategory(cat: Partial<CategoryItem> & { name: string }): CategoryItem {
    const categories = this.getCategories();
    const slug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (cat.id) {
      const idx = categories.findIndex(c => c.id === cat.id);
      if (idx !== -1) {
        categories[idx] = { ...categories[idx], ...cat, slug } as CategoryItem;
      }
    } else {
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        slug,
        name: cat.name,
        description: cat.description || '',
        iconName: cat.iconName || 'Headphones',
        articleCount: cat.articleCount || 0,
        productCount: cat.productCount || 0,
        imageUrl: cat.imageUrl,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription
      };
      categories.push(newCat);
    }

    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    notifyListeners();
    return categories.find(c => c.slug === slug) || categories[0];
  },

  deleteCategory(id: string): void {
    const categories = this.getCategories().filter(c => c.id !== id && c.slug !== id);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    notifyListeners();
  },

  // AFFILIATE LINKS & TRACKING
  getAffiliateLinks(): AffiliateLinkItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AFFILIATES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(INITIAL_AFFILIATE_LINKS));
        return INITIAL_AFFILIATE_LINKS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_AFFILIATE_LINKS;
    }
  },

  trackAffiliateClick(productId: string, productName: string, marketplace: 'shopee' | 'tokopedia' | 'lazada' | 'other'): void {
    const links = this.getAffiliateLinks();
    const linkObj = links.find(l => l.productId === productId && l.marketplace === marketplace);
    
    if (linkObj) {
      linkObj.clicks += 1;
    } else {
      links.push({
        id: `aff-${Date.now()}`,
        productId,
        productName,
        marketplace,
        affiliateUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
        clicks: 1,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      });
    }

    localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(links));

    // Log click detail
    try {
      const clickLogsStr = localStorage.getItem(STORAGE_KEYS.CLICK_LOGS) || '[]';
      const clickLogs: AffiliateClickLog[] = JSON.parse(clickLogsStr);
      clickLogs.unshift({
        id: `click-${Date.now()}`,
        productId,
        productName,
        marketplace,
        timestamp: new Date().toLocaleString('id-ID')
      });
      localStorage.setItem(STORAGE_KEYS.CLICK_LOGS, JSON.stringify(clickLogs.slice(0, 100)));
    } catch {
      // ignore
    }

    notifyListeners();
  },

  getClickLogs(): AffiliateClickLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLICK_LOGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // MEDIA LIBRARY
  getMedia(): MediaItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEDIA);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(INITIAL_MEDIA));
        return INITIAL_MEDIA;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_MEDIA;
    }
  },

  addMedia(item: Partial<MediaItem> & { fileName: string; url: string }): MediaItem {
    const media = this.getMedia();
    const newMedia: MediaItem = {
      id: `m-${Date.now()}`,
      fileName: item.fileName,
      url: item.url,
      size: item.size || '350 KB',
      uploadDate: new Date().toISOString().split('T')[0],
      type: 'image'
    };
    media.unshift(newMedia);
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
    notifyListeners();
    return newMedia;
  },

  deleteMedia(id: string): void {
    const media = this.getMedia().filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
    notifyListeners();
  },

  // COMMENTS
  getComments(): ArticleComment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(INITIAL_COMMENTS));
        return INITIAL_COMMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_COMMENTS;
    }
  },

  addComment(comment: { articleId: string; articleTitle: string; userName: string; userEmail: string; comment: string }): ArticleComment {
    const comments = this.getComments();
    const newComm: ArticleComment = {
      id: `comm-${Date.now()}`,
      articleId: comment.articleId,
      articleTitle: comment.articleTitle,
      userName: comment.userName,
      userEmail: comment.userEmail,
      comment: comment.comment,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'pending'
    };
    comments.unshift(newComm);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    notifyListeners();
    return newComm;
  },

  updateCommentStatus(id: string, status: 'approved' | 'pending' | 'hidden'): void {
    const comments = this.getComments();
    const comm = comments.find(c => c.id === id);
    if (comm) {
      comm.status = status;
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
      notifyListeners();
    }
  },

  deleteComment(id: string): void {
    const comments = this.getComments().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    notifyListeners();
  },

  // ADMIN SESSION
  isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  },

  setAdminLoggedIn(status: boolean): void {
    if (status) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
    notifyListeners();
  }
};
