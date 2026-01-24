
import React from 'react';
import SEOHead from '../components/SEOHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 sm:px-6 lg:px-8">
      <SEOHead 
        title="Privacy Policy" 
        description="Official Privacy Policy for ToolVerse. Transparency on cookies, data handling, and Google AdSense." 
        url="https://toolverse-4gr.pages.dev/privacy" 
      />

      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm">
        <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Privacy Policy</h1>
        
        <div className="prose prose-slate prose-sm md:prose-base max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
          <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.</p>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">Information We Collect</h2>
            <p>We do not collect personal information such as name, email address, or phone number. Our tools work without user registration.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">Cookies and Advertising</h2>
            <p>We use third-party advertising services such as Google AdSense. These services may use cookies or web beacons to show ads based on user visits to this and other websites.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">Google AdSense</h2>
            <p>Google uses the DoubleClick cookie, which enables it to show ads to users based on their interests. Users may opt out of personalized advertising by visiting Google Ads Settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">Data Security</h2>
            <p>All tools run directly in your browser or via secure servers. We do not store user-generated data.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">External Links</h2>
            <p>Our website may contain links to external websites. We are not responsible for the privacy practices of those websites.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">Consent</h2>
            <p>By using our website, you consent to this Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">Updates</h2>
            <p>This policy may be updated from time to time. Any changes will be posted on this page.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
