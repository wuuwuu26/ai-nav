export interface NavItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  icon?: string;
  tags?: string[];
  pricing?: 'free' | 'freemium' | 'paid' | 'open-source';
  isHot?: boolean;
  isNew?: boolean;
  stars?: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  items?: NavItem[];
}

export type PricingFilter = 'all' | 'free' | 'open-source' | 'freemium';

export interface SearchEngine {
  id: string;
  name: string;
  url: string;
  placeholder: string;
  icon: string;
}
