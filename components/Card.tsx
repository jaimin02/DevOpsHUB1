import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, icon, action }) => {
  return (
    <div className={`
      bg-slate-200 dark:bg-slate-800 
      border border-slate-300 dark:border-slate-700 
      rounded-xl shadow-sm hover:shadow-md transition-all duration-300
      flex flex-col
      ${className}
    `}>
      {(title || icon || action) && (
        <div className="px-6 py-4 border-b border-slate-300/50 dark:border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <span className="text-blue-600 dark:text-blue-400">{icon}</span>}
            {title && <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-lg tracking-tight">{title}</h3>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 flex-1">
        {children}
      </div>
    </div>
  );
};
