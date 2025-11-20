import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants';
import { LogOut, Infinity, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  // Track expanded parent items
  const [expandedItems, setExpandedItems] = useState<string[]>(['iq-master', 'security', 'master', 'user-admin']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-30 shadow-xl overflow-hidden">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-950/50 shrink-0">
        <div className="flex items-center gap-3 text-blue-500">
          <Infinity size={32} strokeWidth={2.5} />
          <span className="text-xl font-bold tracking-wider text-white">DEVOPS HUB</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.id);
          const isActive = activeTab === item.id || item.children?.some(child => child.id === activeTab);

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (hasChildren) {
                    toggleExpand(item.id);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                  text-sm font-medium group
                  ${isActive && !hasChildren
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive && !hasChildren ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} />
                  {item.label}
                </div>
                {hasChildren && (
                  <span className="text-slate-500">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                )}
              </button>

              {/* Submenu */}
              {hasChildren && isExpanded && (
                <div className="mt-1 ml-4 space-y-1 pl-4 border-l border-slate-800">
                  {item.children!.map((child) => {
                    const isChildActive = activeTab === child.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => setActiveTab(child.id)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
                          text-sm font-medium
                          ${isChildActive 
                            ? 'text-blue-400 bg-slate-800/50' 
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}
                        `}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${isChildActive ? 'bg-blue-400' : 'bg-slate-600'}`}></div>
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile / Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/30 shrink-0">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-red-500/10 hover:rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
        <div className="mt-4 text-xs text-slate-600 text-center">
          v2.4.0 Enterprise
        </div>
      </div>
    </aside>
  );
};
