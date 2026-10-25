import { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, NAV_ITEMS, SEARCH_ENGINES } from './data/navData';
import type { NavItem, PricingFilter } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { CategorySection } from './components/CategorySection';
import { NavCard } from './components/NavCard';
import { DevToolsModal } from './components/DevToolsModal';
import { AddSiteModal } from './components/AddSiteModal';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import { Sparkles, Compass, ArrowUp, Heart } from 'lucide-react';

export function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('devai_favorites');
      return saved ? JSON.parse(saved) : ['deepseek-f', 'cursor-f', 'claude-f', 'v0-f'];
    } catch {
      return ['deepseek-f', 'cursor-f', 'claude-f', 'v0-f'];
    }
  });

  useEffect(() => {
    localStorage.setItem('devai_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Custom added sites
  const [customSites, setCustomSites] = useState<NavItem[]>(() => {
    try {
      const saved = localStorage.getItem('devai_custom_sites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('devai_custom_sites', JSON.stringify(customSites));
  }, [customSites]);

  // Modals and Drawers
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search & Filters
  const [activeEngine, setActiveEngine] = useState('internal');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [pricingFilter, setPricingFilter] = useState<PricingFilter>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        showToast('已从收藏夹移除', 'info');
        return prev.filter((favId) => favId !== id);
      } else {
        showToast('已加入我的收藏！', 'success');
        return [...prev, id];
      }
    });
  };

  // Add Custom Site
  const handleAddSite = (site: NavItem) => {
    setCustomSites((prev) => [site, ...prev]);
  };

  // All combined items
  const allItems = useMemo(() => {
    return [...NAV_ITEMS, ...customSites];
  }, [customSites]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Internal Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(query));
        const matchUrl = item.url.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchTags && !matchUrl) return false;
      }

      // Tag filter
      if (selectedTag) {
        if (!item.tags?.includes(selectedTag)) return false;
      }

      // Pricing filter
      if (pricingFilter !== 'all') {
        if (item.pricing !== pricingFilter) return false;
      }

      return true;
    });
  }, [allItems, searchTerm, selectedTag, pricingFilter]);

  // Categories with their filtered items
  const categoriesWithItems = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: filteredItems.filter((item) => item.category === cat.id),
    }));
  }, [filteredItems]);

  // Favorite items
  const favoriteItems = useMemo(() => {
    return filteredItems.filter((item) => favorites.includes(item.id));
  }, [filteredItems, favorites]);

  // Custom items
  const customItemsList = useMemo(() => {
    return filteredItems.filter((item) => item.id.startsWith('custom-'));
  }, [filteredItems]);

  // Scroll to section or change filter
  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    if (catId !== 'favorites' && catId !== 'custom') {
      const el = document.getElementById(catId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFiltering = !!searchTerm || !!selectedTag || pricingFilter !== 'all';

  return (
    <div className="min-h-screen bg-slate-50/80 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-200 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Toast System */}
      <Toast toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenDevTools={() => setIsDevToolsOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        totalToolsCount={allItems.length}
      />

      {/* Hero & Search Banner */}
      <div className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent">
        {/* Glow ambient background circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 时代全栈工程师与极客的高效工作台</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            探索全球领先的{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              AI 工具 & 开发者生态
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mb-6">
            实时收录 DeepSeek、Claude、Cursor、v0、Hugging Face 等上百款生产力工具，支持一键搜索、本地收藏与内置实用开发工具箱。
          </p>

          {/* SearchBar */}
          <SearchBar
            engines={SEARCH_ENGINES}
            activeEngine={activeEngine}
            onSelectEngine={setActiveEngine}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            pricingFilter={pricingFilter}
            onPricingChange={setPricingFilter}
          />
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex gap-6 w-full">
        {/* Sidebar */}
        <Sidebar
          categories={categoriesWithItems}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          favoritesCount={favorites.length}
          customSitesCount={customSites.length}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* Active View: Favorites */}
          {activeCategory === 'favorites' && (
            <CategorySection
              category={{
                id: 'favorites',
                name: '我的收藏夹',
                description: '你在本地标记收藏的高频网站，随时随地快速启动',
                icon: 'Star',
              }}
              items={favoriteItems}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onCopyLink={(url) => showToast(`链接已复制: ${url}`, 'success')}
            />
          )}

          {/* Active View: Custom sites */}
          {activeCategory === 'custom' && (
            <CategorySection
              category={{
                id: 'custom',
                name: '自定义收录站点',
                description: '你自行添加并保存在本地浏览器中的专属工具和私有入口',
                icon: 'Compass',
              }}
              items={customItemsList}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onCopyLink={(url) => showToast(`链接已复制: ${url}`, 'success')}
            />
          )}

          {/* Default / Filtered View: Categorized lists */}
          {activeCategory !== 'favorites' && activeCategory !== 'custom' && (
            <>
              {isFiltering ? (
                // When actively searching or filtering, display matched results unified
                <div className="mb-10">
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-slate-900 dark:text-slate-100">
                        搜索与筛选结果
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
                        共找到 {filteredItems.length} 个工具
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedTag(null);
                        setPricingFilter('all');
                      }}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      清空全部筛选条件
                    </button>
                  </div>

                  {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                      {filteredItems.map((item) => (
                        <NavCard
                          key={item.id}
                          item={item}
                          isFavorite={favorites.includes(item.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onCopyLink={(url) => showToast(`链接已复制: ${url}`, 'success')}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                      <Compass className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                        未检索到相关工具或资源
                      </h3>
                      <p className="text-xs text-slate-400 max-w-sm mb-4">
                        尝试更换搜索词，或点击下方按钮将该工具添加至您的专属导航中。
                      </p>
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-sm"
                      >
                        手动收录此网址
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Normal category view
                categoriesWithItems.map((cat) => (
                  <CategorySection
                    key={cat.id}
                    category={cat}
                    items={cat.items || []}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    onCopyLink={(url) => showToast(`链接已复制: ${url}`, 'success')}
                  />
                ))
              )}
            </>
          )}
        </main>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-xl hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 transition-all transform hover:-translate-y-0.5"
          aria-label="回到顶部"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Built-in Dev Tools Modal */}
      <DevToolsModal
        isOpen={isDevToolsOpen}
        onClose={() => setIsDevToolsOpen(false)}
        onShowToast={showToast}
      />

      {/* Add Custom Site Modal */}
      <AddSiteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        categories={CATEGORIES}
        onAddSite={handleAddSite}
        onShowToast={showToast}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">DevAI Hub</span>
            <span>· 极客与开发者导航站</span>
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Developers & AI Creators</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsDevToolsOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              在线小工具箱
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              提交收录
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              GitHub 开源
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
