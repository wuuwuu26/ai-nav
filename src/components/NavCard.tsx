import React, { useState } from 'react';
import type { NavItem } from '../types';
import { ExternalLink, Star, Copy, Check, Sparkles } from 'lucide-react';

interface NavCardProps {
  item: NavItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopyLink: (url: string) => void;
}

export const NavCard: React.FC<NavCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onCopyLink,
}) => {
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract domain for favicon
  let domain = '';
  try {
    const urlObj = new URL(item.url);
    domain = urlObj.hostname;
  } catch {
    domain = '';
  }

  // Favicon URL using Google Favicon service or ddg
  const faviconUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    : '';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    onCopyLink(item.url);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite(item.id);
  };

  // Pricing badge color and label
  const getPricingBadge = () => {
    switch (item.pricing) {
      case 'open-source':
        return {
          label: '开源',
          className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        };
      case 'free':
        return {
          label: '免费',
          className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        };
      case 'freemium':
        return {
          label: '免费体验',
          className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        };
      case 'paid':
        return {
          label: '商业付费',
          className: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        };
      default:
        return null;
    }
  };

  const pricingBadge = getPricingBadge();

  // Consistent gradient based on item name
  const getGradient = (name: string) => {
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-500',
      'from-emerald-400 to-teal-600',
      'from-amber-400 to-orange-500',
      'from-cyan-500 to-blue-600',
      'from-rose-500 to-pink-600',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <div
      onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
      className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      {/* Top subtle glow bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/0 group-hover:via-indigo-500/60 to-transparent transition-all duration-500" />

      <div>
        {/* Card Header: Icon + Name + Actions */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center p-1.5 shadow-sm">
              {!imgError && faviconUrl ? (
                <img
                  src={faviconUrl}
                  alt={item.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
              ) : (
                <div
                  className={`w-full h-full rounded-lg bg-gradient-to-br ${getGradient(
                    item.name
                  )} flex items-center justify-center text-white font-bold text-base shadow-inner`}
                >
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                  {item.name}
                </h3>
                {item.isHot && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    <Sparkles className="w-2.5 h-2.5" />
                    热门
                  </span>
                )}
              </div>

              {pricingBadge && (
                <span
                  className={`inline-block mt-0.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${pricingBadge.className}`}
                >
                  {pricingBadge.label}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={handleFavorite}
              title={isFavorite ? '取消收藏' : '添加收藏'}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-500 hover:bg-amber-500/10'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Star
                className="w-4 h-4"
                fill={isFavorite ? 'currentColor' : 'none'}
              />
            </button>
            <button
              onClick={handleCopy}
              title="复制网址"
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Card Body: Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {item.description}
        </p>
      </div>

      {/* Card Footer: Tags & Jump link indicator */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1.5 overflow-hidden flex-wrap max-h-5">
          {item.tags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0">
          <span>访问</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};
