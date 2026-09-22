export type NavTab = 'hero' | 'gear' | 'reviews' | 'calculator';

export type ProductColor = 'pearl' | 'titanium' | 'onyx';

export type SoundMode = 'anc' | 'transparency' | 'bass_boost';

export interface ProductItem {
  id: string;
  name: string;
  category: 'audio' | 'power' | 'setup' | 'budget';
  tag: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  specs: {
    battery: string;
    latency: string;
    weight: string;
    connectivity: string;
    warranty: string;
  };
  studentVerdict: string;
  shopeeUrl: string;
  tokopediaUrl: string;
  voucherCode?: string;
  imageIcon: string;
  imageUrl?: string;
  customButtonText?: string;
}

export interface ReviewArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  imageSeed: string;
  scenario: string;
  verdictScore: number;
  highlightSummary: string;
  testedEnvironment: string[];
  pros: string[];
  cons: string[];
  studentTip: string;
  relatedProductId: string;
}

export interface VoucherItem {
  id: string;
  platform: 'shopee' | 'tokopedia' | 'blibli';
  platformName: string;
  code: string;
  discount: string;
  minSpend: string;
  expiresIn: string;
  type: 'Flash Sale' | 'Cashback' | 'Gratis Ongkir' | 'Official Mall';
  description: string;
  isPopular?: boolean;
}

export interface BudgetPreset {
  id: string;
  label: string;
  amount: number;
  icon: string;
}

export interface BundleResult {
  title: string;
  subtitle: string;
  persona: string;
  totalPrice: number;
  remainingBudget: number;
  savings: number;
  items: ProductItem[];
  vibeDescription: string;
}
