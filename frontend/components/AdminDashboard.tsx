import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeader } from './SectionHeader';
import { Check, X, Loader2, AlertCircle, Calendar, Package, Layers, CreditCard, DollarSign, LogOut, Trash2, AlertTriangle, Mail } from 'lucide-react';
import { Button } from './Button';

interface BasePlan {
  id: string;
  name: string;
  price: number;
}

interface Addon {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  country?: string;
  date: string;
  
  // Pricing Fields
  planType: 'prebuilt' | 'custom' | 'landing';
  basePlan?: BasePlan;
  includedServices?: string[];
  selectedAddons?: Addon[];
  addonsSubtotal?: number;
  totalPrice?: number;
  pricingFormulaString?: string;
  currency?: string;
  
  // Legacy/Other
  type: string;
  source: string;
  notes?: string;
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // OTP States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const getApiUrl = () => {
    return (import.meta as any).env?.VITE_BACKEND_URL 
      ? (import.meta as any).env.VITE_BACKEND_URL
      : 'http://localhost:4000/api';
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const API_URL = `${getApiUrl()}/contact`;
      
      const res = await fetch(API_URL, {
        credentials: 'include',
      });

      if (res.status === 401 || res.status === 403) {
        navigate('/login');
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch leads: ${res.statusText}`);
      }
      
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      } else {
        throw new Error(data.message || 'Unknown error');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const API_URL = getApiUrl();
      await fetch(`${API_URL}/admin/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      const API_URL = getApiUrl();
      const res = await fetch(`${API_URL}/contact/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      const data = await res.json();
      if (data.success) {
        setLeads(leads.filter(lead => lead._id !== id));
      } else {
        alert(data.message || "Failed to delete lead");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Error deleting lead");
    }
  };

  const handleRequestOtp = async () => {
    if (!window.confirm("⚠️ DANGER: You are about to DELETE ALL LEADS. This cannot be undone. Do you want to proceed?")) return;
    
    setOtpLoading(true);
    setOtpError('');
    try {
      const API_URL = getApiUrl();
      const res = await fetch(`${API_URL}/contact/send-otp`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      
      if (data.success) {
        setShowOtpModal(true);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!otp) {
      setOtpError("Please enter OTP");
      return;
    }

    setOtpLoading(true);
    try {
      const API_URL = getApiUrl();
      const res = await fetch(`${API_URL}/contact/delete-all`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
        credentials: 'include',
      });
      
      const data = await res.json();
      if (data.success) {
        setLeads([]);
        setShowOtpModal(false);
        setOtp('');
        alert(`Success: ${data.message}`);
      } else {
        setOtpError(data.message || "Invalid OTP or failed to delete");
      }
    } catch (error) {
      console.error("Error deleting all leads:", error);
      setOtpError("Error executing deletion");
    } finally {
      setOtpLoading(false);
    }
  };

  const formatPrice = (amount?: number, currency?: string) => {
    if (amount === undefined || amount === null) return '-';
    const symbol = currency === 'USD' ? '$' : currency === 'INR' ? '₹' : '€';
    return `${symbol}${amount}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center bg-bg-light dark:bg-gray-950">
        <Loader2 className="w-10 h-10 animate-spin text-secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center bg-bg-light dark:bg-gray-950 text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-2xl font-bold">Error Loading Dashboard</h2>
        <p className="mt-2">{error}</p>
        <button onClick={fetchLeads} className="mt-6 px-6 py-2 bg-secondary text-primary rounded-lg font-bold">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-bg-light dark:bg-gray-950 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-8">
          <SectionHeader
            label="Internal Portal"
            title="Admin Dashboard"
            subtitle={`Manage and track your leads efficiently. Total: ${leads.length}`}
            center={false}
          />
          <div className="flex gap-4">
            <button 
              onClick={handleRequestOtp}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors text-sm font-medium border border-red-200"
            >
              <Trash2 size={18} />
              Delete All Leads
            </button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 font-bold text-sm text-gray-500 uppercase">Date</th>
                  <th className="p-4 font-bold text-sm text-gray-500 uppercase">Client</th>
                  <th className="p-4 font-bold text-sm text-gray-500 uppercase">Plan Type</th>
                  <th className="p-4 font-bold text-sm text-gray-500 uppercase">Breakdown</th>
                  <th className="p-4 font-bold text-sm text-gray-500 uppercase text-right">Total</th>
                  <th className="p-4 font-bold text-sm text-gray-500 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 align-top text-sm text-gray-500 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                      <div className="text-xs opacity-70">{new Date(lead.createdAt).toLocaleTimeString()}</div>
                    </td>
                    
                    <td className="p-4 align-top">
                      <div className="font-bold text-primary dark:text-white">{lead.name}</div>
                      <a 
                        href={`mailto:${lead.email}`} 
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline flex items-center gap-1 mt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail size={14} />
                        {lead.email}
                      </a>
                      <div className="text-xs text-gray-400 mt-1">{lead.company} | {lead.country}</div>
                    </td>

                    <td className="p-4 align-top">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${lead.planType === 'custom' ? 'bg-purple-100 text-purple-800' : 
                          lead.planType === 'prebuilt' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {lead.planType || lead.type}
                      </span>
                      {lead.basePlan && (
                         <div className="mt-2 text-sm">
                           <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                             <Calendar size={14} />
                             <span>{lead.basePlan.name}</span>
                           </div>
                         </div>
                      )}
                    </td>

                    <td className="p-4 align-top">
                      <div className="space-y-2 text-sm">
                        {/* Base Plan Price */}
                        {lead.basePlan && lead.basePlan.price > 0 && (
                          <div className="flex justify-between w-full max-w-xs text-gray-600 dark:text-gray-400">
                            <span>Base: {lead.basePlan.name}</span>
                            <span>{formatPrice(lead.basePlan.price, lead.currency)}</span>
                          </div>
                        )}

                        {/* Addons */}
                        {lead.selectedAddons && lead.selectedAddons.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Add-ons</div>
                            {lead.selectedAddons.map((addon, idx) => (
                              <div key={idx} className="flex justify-between w-full max-w-xs text-gray-700 dark:text-gray-300">
                                <span>{addon.name}</span>
                                <span>{formatPrice(addon.price, lead.currency)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between w-full max-w-xs border-t border-gray-200 dark:border-gray-700 mt-1 pt-1 font-medium">
                              <span>Subtotal</span>
                              <span>{formatPrice(lead.addonsSubtotal, lead.currency)}</span>
                            </div>
                          </div>
                        )}

                        {/* Included Services (Prebuilt) */}
                        {lead.includedServices && lead.includedServices.length > 0 && (
                           <div className="mt-2">
                             <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Included</div>
                             <div className="flex flex-wrap gap-1">
                               {lead.includedServices.map((s, i) => (
                                 <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                                   {s}
                                 </span>
                               ))}
                             </div>
                           </div>
                        )}
                        
                        {/* Formula String Debug */}
                        {lead.pricingFormulaString && (
                          <div className="mt-2 text-xs text-gray-400 font-mono bg-gray-50 dark:bg-gray-900/50 p-1 rounded">
                            {lead.pricingFormulaString}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-4 align-top text-right">
                      <div className="text-xl font-bold text-secondary">
                        {formatPrice(lead.totalPrice, lead.currency)}
                      </div>
                      <div className="text-xs text-gray-400 uppercase">{lead.currency}</div>
                    </td>

                    <td className="p-4 align-top text-center">
                      <button
                        onClick={() => handleDeleteLead(lead._id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete Lead"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* OTP Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-red-200 dark:border-red-900/50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3 text-red-600">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Confirm Deletion</h3>
                </div>
                <button 
                  onClick={() => setShowOtpModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                An OTP has been sent to your admin email. Please enter it below to confirm deletion of <strong>ALL leads</strong>.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-mono text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowOtpModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAll}
                    disabled={otpLoading}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {otpLoading ? 'Verifying...' : 'Delete All'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
