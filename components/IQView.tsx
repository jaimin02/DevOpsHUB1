import React, { useState } from 'react';
import { Card } from './Card';
import { INITIAL_IQ_REQUESTS } from '../constants';
import { IQRequest } from '../types';
import { FileText, CheckCircle, XCircle, AlertCircle, ArrowRight, Clock, Eye } from 'lucide-react';

interface IQViewProps {
  view: string;
}

export const IQView: React.FC<IQViewProps> = ({ view }) => {
  const [requests] = useState<IQRequest[]>(INITIAL_IQ_REQUESTS);

  // Filter requests based on view
  const getFilteredRequests = () => {
    if (view === 'iq-review') {
      return requests.filter(r => r.status === 'Pending Approval');
    }
    return requests;
  };

  const displayData = getFilteredRequests();

  const renderStatus = (status: string) => {
    const styles: Record<string, string> = {
      'Approved': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      'Pending Approval': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      'Draft': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      'Rejected': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles['Draft']}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-8 space-y-6 fade-in">
       <div className="flex justify-between items-center">
         <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {view === 'iq-review' ? 'IQ Review Board' : 'IQ Checklist Requests'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {view === 'iq-review' ? 'Review and approve pending IQ requests.' : 'Manage installation qualification requests and lifecycle.'}
          </p>
         </div>
         {view !== 'iq-review' && (
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors text-sm font-medium">
             New Request
           </button>
         )}
       </div>

       {/* Content */}
       {view === 'iq-details' ? (
         <div className="grid grid-cols-1 gap-6">
            {/* Simulate Details View */}
            <Card title="Active IQ Lifecycle: US-EAST-WEB-01" icon={<FileText size={20}/>}>
               <div className="space-y-8">
                 {/* Progress Stepper */}
                 <div className="relative flex items-center justify-between px-4">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                    {['Checklist', 'Protocol', 'Script', 'Report'].map((step, i) => (
                      <div key={step} className="flex flex-col items-center bg-slate-100 dark:bg-slate-950 px-2">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-colors
                           ${i === 0 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-400'}
                         `}>
                           {i + 1}
                         </div>
                         <span className="text-xs mt-2 font-medium text-slate-600 dark:text-slate-400">{step}</span>
                      </div>
                    ))}
                 </div>

                 <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Stage 1: Checklist Validation</h3>
                    <div className="space-y-3">
                       <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="text-emerald-500" size={18} />
                            <span className="text-sm text-slate-700 dark:text-slate-300">Server Prerequisites Verified</span>
                          </div>
                          <span className="text-xs text-slate-400">Auto-verified</span>
                       </div>
                       <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="text-emerald-500" size={18} />
                            <span className="text-sm text-slate-700 dark:text-slate-300">Network Connectivity Test</span>
                          </div>
                          <span className="text-xs text-slate-400">Passed</span>
                       </div>
                       <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 opacity-50">
                          <div className="flex items-center gap-3">
                            <Clock className="text-amber-500" size={18} />
                            <span className="text-sm text-slate-700 dark:text-slate-300">Security Group Validation</span>
                          </div>
                          <span className="text-xs text-slate-400">Pending</span>
                       </div>
                    </div>
                 </div>
               </div>
            </Card>
         </div>
       ) : (
         <Card className="overflow-hidden border-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Request ID</th>
                    <th className="px-6 py-3 font-semibold">Requester</th>
                    <th className="px-6 py-3 font-semibold">Server</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                   {displayData.length === 0 ? (
                     <tr>
                       <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No records found.</td>
                     </tr>
                   ) : displayData.map((item) => (
                     <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                       <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">{item.requestId}</td>
                       <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.requester}</td>
                       <td className="px-6 py-4 text-slate-600 dark:text-slate-300 flex items-center gap-2">
                         <FileText size={14} className="text-slate-400"/>
                         {item.serverName}
                       </td>
                       <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-mono text-xs">{item.submissionDate}</td>
                       <td className="px-6 py-4">{renderStatus(item.status)}</td>
                       <td className="px-6 py-4 text-right">
                          {view === 'iq-review' ? (
                             <div className="flex justify-end gap-2">
                               <button className="px-3 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700">Approve</button>
                               <button className="px-3 py-1 text-xs bg-rose-600 text-white rounded hover:bg-rose-700">Reject</button>
                             </div>
                          ) : (
                             <button className="text-slate-500 hover:text-blue-600"><Eye size={18}/></button>
                          )}
                       </td>
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>
         </Card>
       )}
    </div>
  );
};
