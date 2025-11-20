import React from 'react';
import { Card } from './Card';
import { RECENT_ACTIVITY, BACKUP_STATS, CHART_DATA } from '../constants';
import { 
  ArrowUp, ArrowDown, Activity, Database, CheckCircle, Server, AlertTriangle, Clock, MoreHorizontal, FileCheck, PenTool 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const iconMap: Record<string, React.ReactNode> = {
  database: <Database size={24} />,
  check: <CheckCircle size={24} />,
  server: <Server size={24} />,
  activity: <Activity size={24} />,
  'file-check': <FileCheck size={24} />,
  'signature': <PenTool size={24} />,
};

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BACKUP_STATS.map((stat, idx) => (
          <Card key={idx} className="transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                {iconMap[stat.icon] || <Activity size={24} />}
              </div>
              <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
                stat.trendDirection === 'up' 
                  ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'text-rose-600 bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400'
              }`}>
                {stat.trendDirection === 'up' ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                {stat.trend}%
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</h4>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">{stat.value}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Middle Row: Chart & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Backup Inventory Summary (Chart) */}
        <Card 
          className="lg:col-span-2" 
          title="Backup Inventory Summary" 
          icon={<Activity size={20} />}
          action={
             <select className="text-sm bg-transparent border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-slate-600 dark:text-slate-300 outline-none">
               <option>Last 7 Days</option>
               <option>Last 30 Days</option>
             </select>
          }
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity" icon={<Clock size={20} />}>
          <div className="space-y-6">
            {RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex gap-4 group">
                <div className="relative">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 relative
                    ${activity.status === 'success' ? 'bg-emerald-100 border-emerald-200 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-900' : ''}
                    ${activity.status === 'warning' ? 'bg-amber-100 border-amber-200 text-amber-600 dark:bg-amber-900/20 dark:border-amber-900' : ''}
                    ${activity.status === 'error' ? 'bg-rose-100 border-rose-200 text-rose-600 dark:bg-rose-900/20 dark:border-rose-900' : ''}
                  `}>
                    {activity.status === 'success' && <CheckCircle size={18} />}
                    {activity.status === 'warning' && <AlertTriangle size={18} />}
                    {activity.status === 'error' && <AlertTriangle size={18} />}
                  </div>
                  {/* Vertical Line Connector */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-200 dark:bg-slate-700 group-last:hidden"></div>
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex justify-between items-start">
                    <h5 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{activity.action}</h5>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{activity.details}</p>
                  <div className="mt-2 flex items-center gap-2">
                     <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                       {activity.user}
                     </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
            View Full Report
          </button>
        </Card>
      </div>

      {/* Quick Actions / Lower Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card title="System Health" icon={<Server size={20} />}>
            <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                 <span className="text-slate-700 dark:text-slate-300 text-sm">Database Cluster A</span>
               </div>
               <span className="text-emerald-600 text-sm font-medium">Operational</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                 <span className="text-slate-700 dark:text-slate-300 text-sm">File Storage Gateway</span>
               </div>
               <span className="text-emerald-600 text-sm font-medium">Operational</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                 <span className="text-slate-700 dark:text-slate-300 text-sm">Reporting Service</span>
               </div>
               <span className="text-amber-600 text-sm font-medium">High Latency</span>
            </div>
         </Card>
         <Card title="Pending Approvals" icon={<MoreHorizontal size={20} />}>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                 <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">User Role Update</span>
                    <span className="text-xs text-slate-500">Requested by Sarah Connor</span>
                 </div>
                 <div className="flex gap-2">
                   <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">Approve</button>
                   <button className="px-3 py-1 text-xs bg-white border border-slate-300 text-slate-600 rounded hover:bg-slate-50">Deny</button>
                 </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                 <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Policy Exception</span>
                    <span className="text-xs text-slate-500">Requested by IT Security</span>
                 </div>
                 <div className="flex gap-2">
                   <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">Approve</button>
                   <button className="px-3 py-1 text-xs bg-white border border-slate-300 text-slate-600 rounded hover:bg-slate-50">Deny</button>
                 </div>
              </div>
            </div>
         </Card>
      </div>
    </div>
  );
};