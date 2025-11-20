import React from 'react';
import { Card } from './Card';
import { INITIAL_USERS } from '../constants';
import { User, Shield, MoreVertical, Check, Search, Plus } from 'lucide-react';

interface UserAdminViewProps {
  view: string;
}

export const UserAdminView: React.FC<UserAdminViewProps> = ({ view }) => {
  
  return (
    <div className="p-8 space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <div>
         <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
           {view === 'user-master' ? 'User Management' : 'Role Master'}
         </h1>
         <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
           {view === 'user-master' ? 'Manage user access, roles, and activity.' : 'Define permissions and access levels.'}
         </p>
        </div>
        <div className="flex gap-3">
           {view === 'user-master' && (
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
             </div>
           )}
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-600/20 transition-colors text-sm font-medium">
             <Plus size={16} />
             {view === 'user-master' ? 'Add User' : 'Create Role'}
           </button>
        </div>
      </div>

      {view === 'user-master' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_USERS.map((user) => (
            <Card key={user.id} className="hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-bold text-slate-400 dark:text-slate-500">
                    {user.avatar || user.name.charAt(0)}
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <MoreVertical size={18} />
                  </button>
               </div>
               <h3 className="font-bold text-lg text-slate-800 dark:text-white">{user.name}</h3>
               <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">{user.role}</p>
               
               <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Status</span>
                   <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                     {user.status}
                   </span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Last Login</span>
                   <span className="text-slate-700 dark:text-slate-300">{user.lastLogin}</span>
                 </div>
               </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {/* Role Simulation */}
          {['Administrator', 'IQ Reviewer', 'Viewer', 'Auditor'].map((role, idx) => (
             <Card key={idx} className="flex flex-row items-center p-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 mr-4">
                   <Shield size={24} />
                </div>
                <div className="flex-1">
                   <h3 className="font-bold text-slate-800 dark:text-white">{role}</h3>
                   <p className="text-sm text-slate-500">Access level: {role === 'Administrator' ? 'Full System Access' : 'Read Only / Partial'}</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="text-right text-sm hidden sm:block">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{idx * 3 + 2} Users</div>
                      <div className="text-slate-500">Assigned</div>
                   </div>
                   <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">Configure</button>
                </div>
             </Card>
          ))}
        </div>
      )}
    </div>
  );
};
