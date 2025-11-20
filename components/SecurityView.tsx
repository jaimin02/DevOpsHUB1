import React from 'react';
import { Card } from './Card';
import { INITIAL_SERVERS } from '../constants';
import { ShieldCheck, ChevronDown, Lock, Database, Plus } from 'lucide-react';

interface SecurityViewProps {
  view: string;
}

export const SecurityView: React.FC<SecurityViewProps> = ({ view }) => {
  
  return (
    <div className="p-8 space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <div>
         <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
           {view === 'port-management' ? 'Port Firewall Management' : 'Database Credentials'}
         </h1>
         <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
           {view === 'port-management' ? 'Configure server firewall rules and exceptions.' : 'Securely manage database access credentials.'}
         </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-600/20 transition-colors text-sm font-medium">
          <Plus size={16} />
          {view === 'port-management' ? 'Add Port Rule' : 'Rotate Credentials'}
        </button>
      </div>

      <div className="space-y-4">
        {INITIAL_SERVERS.slice(0, 3).map((server) => (
          <Card key={server.id} className="group overflow-hidden">
             <div className="flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors p-2 -m-2">
                <div className="flex items-center gap-4">
                   <div className={`p-2 rounded-lg ${view === 'port-management' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                     {view === 'port-management' ? <ShieldCheck size={20} /> : <Database size={20} />}
                   </div>
                   <div>
                     <h3 className="font-semibold text-slate-800 dark:text-white">{server.hostname}</h3>
                     <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{server.ipAddress} &bull; {server.os}</p>
                   </div>
                </div>
                <ChevronDown className="text-slate-400" size={20} />
             </div>

             {/* Content Area (Simulated Expanded) */}
             <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                {view === 'port-management' ? (
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase">
                      <tr>
                        <th className="py-2">Port</th>
                        <th className="py-2">Protocol</th>
                        <th className="py-2">Description</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 dark:text-slate-300">
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 font-mono text-xs">443</td>
                        <td>TCP</td>
                        <td>HTTPS Web Traffic</td>
                        <td><span className="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded text-xs">Allow</span></td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 font-mono text-xs">22</td>
                        <td>TCP</td>
                        <td>SSH Management</td>
                        <td><span className="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded text-xs">Allow (VPN Only)</span></td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <Lock className="text-slate-400" size={18} />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">PostgreSQL Admin</span>
                        <span className="text-xs text-slate-500">Last rotated: 14 days ago</span>
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm font-medium hover:underline">Reveal Password</button>
                  </div>
                )}
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
