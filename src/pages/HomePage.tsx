import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturedTws } from '../components/FeaturedTws';
import { LatestArticles } from '../components/LatestArticles';
import { BrowseCategories } from '../components/BrowseCategories';
import { FindYourPerfectTws } from '../components/FindYourPerfectTws';

export const HomePage: React.FC = () => {
  return (
    <div className="animate-fadeIn w-full">
      <HeroSection />
      <FeaturedTws />
      <LatestArticles />
      <BrowseCategories />
      <FindYourPerfectTws />
    </div>
  );
};
