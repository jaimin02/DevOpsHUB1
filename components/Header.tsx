import React from 'react';
import { Bell, Search, Moon, Sun, User } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  isDark: boolean;
  user: { name: string; role: string };
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme, isDark, user }) => {
  return (
    <header className="h-20 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-20 transition-colors duration-300">
      {/* Search Bar */}
      <div className="w-96 relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search inventories, logs, or users..." 
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-200 placeholder:text-slate-400 shadow-sm transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
        </button>

        <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{user.role}</div>
          </div>
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center border-2 border-blue-200 dark:border-blue-700">
            <User className="text-blue-600 dark:text-blue-300" size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};
