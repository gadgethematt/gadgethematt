import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { StudentTwsGuideSection } from '../components/StudentTwsGuideSection';
import { FeaturedTws } from '../components/FeaturedTws';
import { LatestArticles } from '../components/LatestArticles';
import { BrowseCategories } from '../components/BrowseCategories';
import { FindYourPerfectTws } from '../components/FindYourPerfectTws';

export const HomePage: React.FC = () => {
  return (
    <div className="animate-fadeIn w-full">
      {/* 1. HERO SECTION & LANDING PAGE (matching reference image) */}
      <HeroSection />

      {/* 2. ARTIKEL SEO & BLOG SECTION: Rekomendasi TWS Terbaik 2026 untuk Pelajar */}
      <StudentTwsGuideSection />

      {/* 3. FEATURED TWS KATALOG */}
      <FeaturedTws />

      {/* 4. LATEST REVIEWS & ARTICLES */}
      <LatestArticles />

      {/* 5. BROWSE BY CATEGORY */}
      <BrowseCategories />

      {/* 6. FIND YOUR PERFECT TWS CTA */}
      <FindYourPerfectTws />
    </div>
  );
};
