import React, { useState } from 'react';
import { Card } from './Card';
import { ServerInventory, MasterEntity } from '../types';
import { INITIAL_SERVERS, INITIAL_LOCATIONS, INITIAL_OS, INITIAL_INFRASTRUCTURE, INITIAL_DB_PROVIDERS, INITIAL_ANTIVIRUS, INITIAL_ENVIRONMENTS, INITIAL_DEPARTMENTS } from '../constants';
import { Search, Plus, Filter, Server, MapPin, Trash2, Edit2, X, Save } from 'lucide-react';

interface MasterViewProps {
  type: string;
}

export const MasterView: React.FC<MasterViewProps> = ({ type }) => {
  // Simulated State (In a real app, this would be fetched)
  const [inventory, setInventory] = useState<ServerInventory[]>(INITIAL_SERVERS);
  const [locations, setLocations] = useState<MasterEntity[]>(INITIAL_LOCATIONS);
  const [os, setOs] = useState<MasterEntity[]>(INITIAL_OS);
  const [infra, setInfra] = useState<MasterEntity[]>(INITIAL_INFRASTRUCTURE);
  const [dbProviders, setDbProviders] = useState<MasterEntity[]>(INITIAL_DB_PROVIDERS);
  const [antivirus, setAntivirus] = useState<MasterEntity[]>(INITIAL_ANTIVIRUS);
  const [environments, setEnvironments] = useState<MasterEntity[]>(INITIAL_ENVIRONMENTS);
  const [departments, setDepartments] = useState<MasterEntity[]>(INITIAL_DEPARTMENTS);

  const [showAddModal, setShowAddModal] = useState(false);
  
  // Generic Title Mapping
  const getTitle = () => {
    switch(type) {
      case 'inventory': return 'Server Inventory';
      case 'locations': return 'Location Master';
      case 'os': return 'Operating System Master';
      case 'infrastructure': return 'Infrastructure Providers';
      case 'db-providers': return 'Database Providers';
      case 'antivirus': return 'AntiVirus Solutions';
      case 'environments': return 'Environment Master';
      case 'dept-name': return 'Department Name Master';
      default: return 'Master Data';
    }
  };

  // Generic Data Switcher
  const getData = (): any[] => {
    switch(type) {
      case 'inventory': return inventory;
      case 'locations': return locations;
      case 'os': return os;
      case 'infrastructure': return infra;
      case 'db-providers': return dbProviders;
      case 'antivirus': return antivirus;
      case 'environments': return environments;
      case 'dept-name': return departments;
      default: return locations;
    }
  };

  const data = getData();

  return (
    <div className="p-8 space-y-6 fade-in relative">
      {/* Add New Modal Simulation */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-700">
             <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
               <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Add New {getTitle().replace('Master', '').trim()}</h3>
               <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                 <X size={20} />
               </button>
             </div>
             <div className="p-6 space-y-4">
               {type === 'inventory' ? (
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <label className="text-xs font-medium text-slate-500">Hostname</label>
                     <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" placeholder="SRV-001" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-xs font-medium text-slate-500">IP Address</label>
                     <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" placeholder="192.168.1.10" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-xs font-medium text-slate-500">OS</label>
                     <select className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
                       <option>Windows Server 2019</option>
                       <option>Ubuntu 20.04</option>
                     </select>
                   </div>
                   <div className="space-y-1">
                     <label className="text-xs font-medium text-slate-500">Environment</label>
                     <select className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
                       <option>Production</option>
                       <option>Staging</option>
                     </select>
                   </div>
                 </div>
               ) : (
                 <>
                   <div className="space-y-1">
                     <label className="text-xs font-medium text-slate-500">Name</label>
                     <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" placeholder="Enter name..." />
                   </div>
                   <div className="space-y-1">
                     <label className="text-xs font-medium text-slate-500">Description</label>
                     <textarea className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" rows={3} placeholder="Enter description..."></textarea>
                   </div>
                 </>
               )}
               
               <div className="space-y-1">
                 <label className="text-xs font-medium text-slate-500">Status</label>
                 <div className="flex items-center gap-4">
                   <label className="flex items-center gap-2">
                     <input type="radio" name="status" defaultChecked className="text-blue-600" />
                     <span className="text-sm text-slate-700 dark:text-slate-300">Active</span>
                   </label>
                   <label className="flex items-center gap-2">
                     <input type="radio" name="status" className="text-blue-600" />
                     <span className="text-sm text-slate-700 dark:text-slate-300">Inactive</span>
                   </label>
                 </div>
               </div>
             </div>
             <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
               <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg">Cancel</button>
               <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-2">
                 <Save size={16} />
                 Save Record
               </button>
             </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{getTitle()}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage system wide {getTitle().toLowerCase()}.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
             <Filter size={16} />
             Filter
           </button>
           <button 
             onClick={() => setShowAddModal(true)}
             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-600/20 transition-colors text-sm font-medium"
           >
             <Plus size={16} />
             Add New
           </button>
        </div>
      </div>

      <Card className="overflow-hidden border-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex gap-4 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {type === 'inventory' ? (
                  <>
                    <th className="px-6 py-3 font-semibold">Hostname</th>
                    <th className="px-6 py-3 font-semibold">IP Address</th>
                    <th className="px-6 py-3 font-semibold">OS</th>
                    <th className="px-6 py-3 font-semibold">Location</th>
                    <th className="px-6 py-3 font-semibold">Environment</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 font-semibold">Name</th>
                    <th className="px-6 py-3 font-semibold">Description</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                  </>
                )}
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  {type === 'inventory' ? (
                    <>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        <Server size={16} className="text-blue-500" />
                        {item.hostname}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-mono text-xs">{item.ipAddress}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.os}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.location}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${item.environment === 'Production' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 
                            'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}
                        `}>
                          {item.environment}
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                         {type === 'locations' && <MapPin size={16} className="text-emerald-500" />}
                         {item.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.description}</td>
                    </>
                  )}
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}
                    `}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30">
           <span className="text-xs text-slate-500 dark:text-slate-400">Showing {data.length} records</span>
           <div className="flex gap-2">
             <button className="px-3 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">Previous</button>
             <button className="px-3 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">Next</button>
           </div>
        </div>
      </Card>
    </div>
  );
};