import React from 'react';
import type { Category } from '../types';
import {
  Flame,
  Bot,
  Terminal,
  Palette,
  Boxes,
  Server,
  Wrench,
  Star,
  PlusCircle,
  X,
  Compass,
} from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  favoritesCount: number;
  customSitesCount: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenAddModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  favoritesCount,
  customSitesCount,
  isOpen,
  onClose,
  onOpenAddModal,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-4 h-4 text-rose-500" />;
      case 'Bot':
        return <Bot className="w-4 h-4 text-sky-500" />;
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-emerald-500" />;
      case 'Palette':
        return <Palette className="w-4 h-4 text-purple-500" />;
      case 'Boxes':
        return <Boxes className="w-4 h-4 text-amber-500" />;
      case 'Server':
        return <Server className="w-4 h-4 text-blue-500" />;
      case 'Wrench':
        return <Wrench className="w-4 h-4 text-orange-500" />;
      default:
        return <Compass className="w-4 h-4 text-indigo-500" />;
    }
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Navigation Section */}
        <div className="mb-4">
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            导航分类
          </div>
          <div className="space-y-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(cat.icon)}
                    <span>{cat.name}</span>
                  </div>
                  {cat.items && cat.items.length > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {cat.items.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Personalized Section */}
        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 mb-4">
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            个人专属
          </div>
          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectCategory('favorites');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeCategory === 'favorites'
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star
                  className={`w-4 h-4 ${
                    activeCategory === 'favorites'
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-amber-400'
                  }`}
                />
                <span>我的收藏</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-bold">
                {favoritesCount}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectCategory('custom');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeCategory === 'custom'
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-indigo-500" />
                <span>自定义收录</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400">
                {customSitesCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Add Custom Site Prompt */}
      <div className="p-3 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl border border-indigo-500/10 dark:border-indigo-500/20 text-center">
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          找不到常用网站？
        </p>
        <p className="text-[11px] text-slate-400 mb-2.5">
          一键添加至本地专属导航
        </p>
        <button
          onClick={() => {
            onOpenAddModal();
            onClose();
          }}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-sm transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>自定义添加网址</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 pr-4">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
          {navContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[80vw] h-full bg-white dark:bg-slate-900 shadow-2xl p-4 flex flex-col z-10 border-r border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                导航菜单
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{navContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
