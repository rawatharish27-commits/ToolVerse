
import React, { Suspense, lazy, useState, useMemo } from 'react';
import { TOOLS } from '../data/tools';
import RelatedTools from '../components/RelatedTools';
import ToolSEOContent from '../components/ToolSEOContent';
import AdSlot from '../components/AdSlot';
import { AD_CONFIG } from '../config/ads';

// Specialized Logic Clusters
const ImageTools = lazy(() => import('../components/tools/ImageTools'));
const PDFTools = lazy(() => import('../components/tools/PDFTools'));
const FinanceTools = lazy(() => import('../components/tools/FinanceTools'));
const AITextTools = lazy(() => import('../components/tools/AITextTools'));
const AIImageTools = lazy(() => import('../components/tools/AIImageTools'));
const UtilityTools = lazy(() => import('../components/tools/UtilityTools'));
const DataTools = lazy(() => import('../components/tools/DataTools'));
const NetworkTools = lazy(() => import('../components/tools/NetworkTools'));
const SecurityTools = lazy(() => import('../components/tools/SecurityTools'));
const SEOTools = lazy(() => import('../components/tools/SEOTools'));
const SocialTools = lazy(() => import('../components/tools/SocialTools'));
const OfficeTools = lazy(() => import('../components/tools/OfficeTools'));
const EducationTools = lazy(() => import('../components/tools/EducationTools'));
const PainPointTools = lazy(() => import('../components/tools/PainPointTools'));

// Strict Structure Implementations (Wave 1)
const FileNameFinder = lazy(() => import('../tools/file-name-rejection-cause-finder/index'));
const OtpCalculator = lazy(() => import('../tools/otp-delay-probability-calculator/index'));
const AutoFillAnalyzer = lazy(() => import('../tools/govt-form-auto-fill-failure-analyzer/index'));
const EmiRealityCheck = lazy(() => import('../tools/emi-actual-vs-advertised-calculator/index'));

interface ToolPageProps {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
}

const ToolPage: React.FC<ToolPageProps> = ({ slug, onNavigate }) => {
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const tool = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const renderToolLogic = () => {
    if (!tool) return (
      <div className="py-40 text-center space-y-6">
        <div className="text-9xl grayscale opacity-10">🕵️</div>
        <h2 className="text-2xl font-black text-slate-300 uppercase tracking-[0.4em]">Node ${slug} Not Found</h2>
        <button onClick={() => onNavigate('home')} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Return to Hub</button>
      </div>
    );

    // 1. Check for Strict Structure Tool Registry
    const strictTools: Record<string, React.ReactNode> = {
      'file-name-rejection-cause-finder': <FileNameFinder />,
      'otp-delay-probability-calculator': <OtpCalculator />,
      'govt-form-auto-fill-failure-analyzer': <AutoFillAnalyzer />,
      'emi-actual-vs-advertised-calculator': <EmiRealityCheck />
    };

    if (strictTools[slug]) return strictTools[slug];

    const commonProps = { 
      slug, 
      onSuccess: (m: string) => showToast(m, 'success'), 
      onError: (m: string) => showToast(m, 'error'),
      onNavigate
    };

    // 2. Dynamic Cluster Mapping
    switch (tool.category) {
      case 'image': return <ImageTools {...commonProps} />;
      case 'pdf': return <PDFTools {...commonProps} />;
      case 'calculators':
      case 'finance': return <FinanceTools {...commonProps} />;
      case 'ai': return slug.includes('image') ? <AIImageTools {...commonProps} /> : <AITextTools {...commonProps} />;
      case 'utility':
      case 'miscellaneous': return <UtilityTools {...commonProps} />;
      case 'data': return <DataTools {...commonProps} />;
      case 'network': return <NetworkTools {...commonProps} />;
      case 'security': return <SecurityTools {...commonProps} />;
      case 'seo': return <SEOTools {...commonProps} />;
      case 'social': return <SocialTools {...commonProps} />;
      case 'office': return <OfficeTools {...commonProps} />;
      case 'education': return <EducationTools {...commonProps} />;
      case 'government':
      case 'career':
      case 'daily-life': return <PainPointTools {...commonProps} />;
      default: return <UtilityTools {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {toast && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[500] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl animate-in slide-in-from-top-4 duration-300 ${toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
          {toast.type === 'success' ? '✓' : '⚠️'} {toast.msg}
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-8 pt-12 pb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:flex-grow">
            <Suspense fallback={<div className="h-96 flex items-center justify-center animate-pulse text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Synchronizing Logic Isolate...</div>}>
              {renderToolLogic()}
            </Suspense>

            {tool && (
              <>
                <ToolSEOContent tool={tool} />
                <RelatedTools currentSlug={slug} category={tool.category} onNavigate={onNavigate} />
              </>
            )}
          </div>

          <aside className="lg:w-80 flex-shrink-0 space-y-10">
             <div className="sticky top-32 space-y-10">
               <AdSlot id={AD_CONFIG.slots.sidebar} className="min-h-[600px]" />
               <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl overflow-hidden group border border-white/5">
                  <div className="relative z-10">
                    <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Pro Status</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-6">Execution tier: Public Edge. Upgrade for deeper neural audits.</p>
                    <button onClick={() => onNavigate('contact')} className="w-full py-4 bg-white text-slate-900 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">Get Pro Token</button>
                  </div>
               </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
