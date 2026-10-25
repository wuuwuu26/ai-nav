import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 animate-slide-up ${
            toast.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 bg-white/90 dark:bg-slate-900/90'
              : toast.type === 'error'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300 bg-white/90 dark:bg-slate-900/90'
              : 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300 bg-white/90 dark:bg-slate-900/90'
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-blue-500 shrink-0" />}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => onClose(toast.id)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
