import React, { useState } from 'react';
import { X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface PricingLeadModalProps {
  open: boolean;
  onClose: () => void;
  payload: any;
  language: string;
  currency: string;
}

export const PricingLeadModal: React.FC<PricingLeadModalProps> = ({
  open,
  onClose,
  payload,
  language,
  currency
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    notes: '',
    consent: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.consent) return;
    
    setStatus('loading');
    setErrorMessage('');

    try {
       const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api';
       
       const body = {
         ...payload,
         ...formData,
         language,
         currency
       };

       const response = await fetch(`${backendUrl}/contact`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(body)
       });

       const data = await response.json();

       if (response.ok && data.success) {
         setStatus('success');
         setTimeout(() => {
           onClose();
           setStatus('idle');
           setFormData({
             name: '', email: '', phone: '', company: '', country: '', notes: '', consent: false
           });
         }, 15000);
       } else {
         setStatus('error');
         setErrorMessage(data.message || 'Submission failed.');
       }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in scrollbar-thin scrolbar-thumb-gray-300 scrolbar-track-gray-100 dark:scrolbar-thumb-gray-600 dark:scrolbar-track-gray-800">
      <div 
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {payload?.type === 'pricing-custom' ? 'Request Custom Proposal' : 'Complete Your Booking'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {payload?.type === 'pricing-custom' ? 'Tell us a bit more about your needs.' : `You selected: ${payload?.selectedPlan || 'Package'}`}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
           {status === 'success' ? (
             <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
               <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                 <CheckCircle size={32} />
               </div>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Received!</h3>
               <p className="text-gray-500 dark:text-gray-400 max-w-md">
                 Thank you for your interest. We have received your details and will get back to you shortly with next steps.
               </p>
               <Button onClick={onClose} variant="primary" className="mt-6 pr-6">
                 Close
               </Button>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
                   <input 
                     required 
                     name="name" 
                     value={formData.name} 
                     onChange={handleChange}
                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all dark:text-white"
                     placeholder="John Doe"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address *</label>
                   <input 
                     required 
                     type="email" 
                     name="email" 
                     value={formData.email} 
                     onChange={handleChange}
                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all dark:text-white"
                     placeholder="john@company.com"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number *</label>
                   <input 
                     required 
                     type="tel" 
                     name="phone" 
                     value={formData.phone} 
                     onChange={handleChange}
                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all dark:text-white"
                     placeholder="+1 (555) 000-0000"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name (optional)</label>
                   <input 
                     name="company" 
                     value={formData.company} 
                     onChange={handleChange}
                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all dark:text-white"
                     placeholder="Acme Inc."
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                   <input 
                     name="country" 
                     value={formData.country} 
                     onChange={handleChange}
                     className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all dark:text-white"
                     placeholder="United States"
                   />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Additional Notes</label>
                 <textarea 
                   name="notes" 
                   value={formData.notes} 
                   onChange={handleChange}
                   rows={3}
                   className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all dark:text-white"
                   placeholder="Any specific requirements or questions?"
                 ></textarea>
               </div>

               <div className="space-y-4 pt-2">
                 <label className="flex items-start gap-3 cursor-pointer group select-none">
                   <div className="relative flex items-center">
                     <input 
                       type="checkbox" 
                       name="consent"
                       checked={formData.consent}
                       onChange={handleChange}
                       className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 dark:border-gray-600 checked:bg-secondary checked:border-secondary transition-all"
                     />
                     <CheckCircle size={14} className="absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                   </div>
                   <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                     I agree to be contacted by GK WebTech regarding my inquiry. I understand my data will be processed in accordance with the Privacy Policy.
                   </span>
                 </label>

                 {status === 'error' && (
                   <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm">
                     <AlertCircle size={16} />
                     <span>{errorMessage}</span>
                   </div>
                 )}

                 <div className="flex justify-end pt-2">
                   <Button 
                     variant="primary" 
                     className="w-full md:w-auto px-4 pr-5 "
                     // Manually handling click to submit form
                     onClick={(e: React.MouseEvent) => handleSubmit(e as unknown as React.FormEvent)}
                     disabled={!formData.consent || status === 'loading'}
                   >
                     {status === 'loading' ? (
                       <span className="flex items-center gap-2">
                         <Loader2 size={18} className="animate-spin" />
                         Processing...
                       </span>
                     ) : 'Submit Request'}
                   </Button>
                 </div>
               </div>
             </form>
           )}
        </div>
      </div>
    </div>
  );
};
