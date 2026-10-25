import React, { useRef, useEffect } from 'react';
import type { SearchEngine, PricingFilter } from '../types';
import { Search, X, Sparkles, Bot, Code2, Globe } from 'lucide-react';

interface SearchBarProps {
  engines: SearchEngine[];
  activeEngine: string;
  onSelectEngine: (id: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  pricingFilter: PricingFilter;
  onPricingChange: (pricing: PricingFilter) => void;
}

const POPULAR_TAGS = [
  '全部',
  '开源',
  '免费',
  '国产顶尖',
  'AI IDE',
  '大模型',
  '前端神器',
  'Agent开发',
  '本地大模型',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  engines,
  activeEngine,
  onSelectEngine,
  searchTerm,
  onSearchChange,
  selectedTag,
  onSelectTag,
  pricingFilter,
  onPricingChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut '/' to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== inputRef.current &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentEngine = engines.find((e) => e.id === activeEngine) || engines[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    if (currentEngine.id !== 'internal' && currentEngine.url) {
      window.open(currentEngine.url + encodeURIComponent(searchTerm.trim()), '_blank');
    }
  };

  const getEngineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
      case 'Bot':
        return <Bot className="w-4 h-4 text-cyan-500" />;
      case 'Code2':
        return <Code2 className="w-4 h-4 text-purple-500" />;
      default:
        return <Globe className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* Engine Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-2xl backdrop-blur-md border border-slate-300/40 dark:border-slate-700/50 shadow-inner">
        {engines.map((engine) => {
          const isActive = engine.id === activeEngine;
          return (
            <button
              key={engine.id}
              onClick={() => onSelectEngine(engine.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {getEngineIcon(engine.icon)}
              <span>{engine.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative w-full group">
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={currentEngine.placeholder}
            className="w-full pl-12 pr-28 py-3.5 text-sm md:text-base rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-500 shadow-sm focus:shadow-xl focus:shadow-indigo-500/10 focus:outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-all duration-300"
          />

          <div className="absolute right-3 flex items-center gap-1.5">
            {searchTerm && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {currentEngine.id !== 'internal' ? (
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-sm transition-colors"
              >
                搜索
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                /
              </kbd>
            )}
          </div>
        </div>
      </form>

      {/* Tags and Pricing Quick Filters */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 dark:text-slate-500 mr-1 text-[11px]">快速筛选:</span>
          {POPULAR_TAGS.map((tag) => {
            const isAll = tag === '全部';
            const isActive = isAll ? selectedTag === null : selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => onSelectTag(isAll ? null : tag)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-medium shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Pricing Filter */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
          {(
            [
              { key: 'all', label: '全部' },
              { key: 'free', label: '免费' },
              { key: 'open-source', label: '开源' },
              { key: 'freemium', label: '免费额度' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.key}
              onClick={() => onPricingChange(filter.key)}
              className={`px-2 py-0.5 rounded-md text-[11px] transition-all ${
                pricingFilter === filter.key
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-medium shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
