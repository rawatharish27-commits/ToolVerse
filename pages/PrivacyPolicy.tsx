
import React from 'react';
import SEOHead from '../components/SEOHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 prose prose-slate">
      <SEOHead title="Privacy Policy" description="Learn how ToolVerse handles your data. Spoiler: We don't store any of it." url="https://toolverse.com/#privacy" />
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      <p className="text-slate-500 italic mb-10">Last updated: May 2024</p>
      
      <section>
        <h2>1. 100% Client-Side Processing</h2>
        <p>ToolVerse is built on a "Privacy First" architecture. Unlike other online tools, our utilities process your files and data directly in your browser. No files are ever uploaded to our servers for processing.</p>
      </section>

      <section>
        <h2>2. Data Collection</h2>
        <p>We do not collect personal information such as names, email addresses, or phone numbers unless you explicitly contact us. We do not require account registration to use our tools.</p>
      </section>

      <section>
        <h2>3. Use of Cookies</h2>
        <p>We use local storage to save your "Favorite Tools" and "Recent Activity" locally on your device. We use standard analytical cookies (Google Analytics) to understand site traffic and improve our user experience.</p>
      </section>

      <section>
        <h2>4. Advertising</h2>
        <p>We use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
      </section>

      <section>
        <h2>5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at support@toolverse.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
