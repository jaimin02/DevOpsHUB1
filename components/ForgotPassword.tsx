import React, { useState } from 'react';
import { Infinity, ArrowLeft, Mail } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 dark:bg-blue-900/10 blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-300/20 dark:bg-slate-800/20 blur-[100px]"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 backdrop-blur-sm">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-600/20 mb-4">
              <Infinity size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Reset Password</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 text-center">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {isSent ? (
            <div className="text-center space-y-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-lg text-sm border border-emerald-100 dark:border-emerald-900">
                Check your email! We have sent a password reset link to <strong>{email}</strong>.
              </div>
              <button 
                onClick={onBack}
                className="w-full py-3 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Sign In
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-slate-100 text-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-lg font-medium shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
              
              <button 
                type="button"
                onClick={onBack}
                className="w-full py-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};