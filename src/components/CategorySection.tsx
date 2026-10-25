import React from 'react';
import type { Category, NavItem } from '../types';
import { NavCard } from './NavCard';
import {
  Flame,
  Bot,
  Terminal,
  Palette,
  Boxes,
  Server,
  Wrench,
  Star,
  Compass,
  FolderOpen,
} from 'lucide-react';

interface CategorySectionProps {
  category: Category;
  items: NavItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onCopyLink: (url: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  items,
  favorites,
  onToggleFavorite,
  onCopyLink,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-sky-500" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-500" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-500" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-amber-500" />;
      case 'Server':
        return <Server className="w-5 h-5 text-blue-500" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-orange-500" />;
      case 'Star':
        return <Star className="w-5 h-5 text-amber-500 fill-amber-500" />;
      default:
        return <Compass className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section id={category.id} className="scroll-mt-24 mb-10">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/60 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 shadow-2xs">
            {getCategoryIcon(category.icon)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {category.name}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                {items.length}
              </span>
            </div>
            {category.description && (
              <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {items.map((item) => (
            <NavCard
              key={item.id}
              item={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
              onCopyLink={onCopyLink}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 border border-dashed border-slate-200 dark:border-slate-800 text-center">
          <FolderOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            暂无匹配的内容或尚未添加收录
          </p>
        </div>
      )}
    </section>
  );
};
