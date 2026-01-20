import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Support', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', subject: 'Support', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-32 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <SEOHead 
        title="Contact Us - ToolVerse Support Hub" 
        description="Get in touch with the ToolVerse team. We're here to help with tool suggestions, technical support, or licensing inquiries." 
        url="https://toolverse-4gr.pages.dev/contact" 
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <span className="mr-2">💬</span> Reach Out
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-none">
            Let's start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Conversation.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Have a tool request? Found a bug? Or just want to say hello? Our team is monitoring the hub 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl mb-6">📧</div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Email Support</h3>
              <p className="text-slate-500 text-sm font-medium mb-4">Expect a response within 4-6 business hours.</p>
              <a href="mailto:support@toolverse.com" className="text-indigo-600 font-black text-lg hover:underline">support@toolverse.com</a>
            </div>

            <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl mb-6">🌍</div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Global HQ</h3>
              <p className="text-slate-500 text-sm font-medium">Remote-first engineering team distributed across 12 countries.</p>
            </div>

            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
              <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Support Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Mon - Fri</span>
                  <span>24 Hours</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Sat - Sun</span>
                  <span>Limited Availability</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {formState === 'success' ? (
              <div className="h-full bg-emerald-50 rounded-[3rem] p-12 border border-emerald-100 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-8 shadow-xl">✅</div>
                <h2 className="text-3xl font-black text-emerald-900 mb-4 tracking-tight">Message Transmitted!</h2>
                <p className="text-emerald-700 font-medium max-w-sm mb-8">
                  Your request has been successfully queued. One of our engineers will reach out to you shortly.
                </p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-indigo-100/30 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Satoshi Nakamoto" 
                      className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-slate-700 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. contact@example.com" 
                      className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-slate-700 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Inquiry Type</label>
                  <select 
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-slate-700 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Support">Technical Support</option>
                    <option value="Tool Request">New Tool Suggestion</option>
                    <option value="Business">Business & Licensing</option>
                    <option value="Bug">Report a Bug</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Your Message</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder="How can we help you today?" 
                    className="w-full p-8 rounded-3xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-slate-700 transition-all"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70"
                >
                  {formState === 'submitting' ? 'Transmitting...' : 'Dispatch Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;