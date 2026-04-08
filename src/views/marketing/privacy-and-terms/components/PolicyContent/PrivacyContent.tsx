import React from 'react';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly, such as your name, email address, and resume content when you create an account or use our builder. We also collect usage data including pages visited, features used, and device/browser type to improve our service.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `Your information is used to provide and improve resume.io services, personalise your experience, send important product updates, and respond to your support requests. We do not sell your personal data to third parties.`,
  },
  {
    title: '3. Data Storage & Security',
    body: `All data is encrypted in transit (TLS) and at rest (AES-256). We store your data on secure cloud infrastructure with strict access controls. We retain your data for as long as your account is active, or as necessary to provide our services.`,
  },
  {
    title: '4. Cookies',
    body: `We use essential cookies to maintain your session and preferences. We may use analytics cookies to understand how you use resume.io. You can disable non-essential cookies in your browser settings at any time.`,
  },
  {
    title: '5. Third-Party Services',
    body: `We use trusted third-party services including Firebase (authentication), and payment processors for premium plans. These providers have their own privacy policies and we encourage you to review them. We only share the minimum data necessary.`,
  },
  {
    title: '6. Your Rights',
    body: `You have the right to access, correct, or delete your personal data at any time. You may export your resume data or close your account from your dashboard settings. For GDPR or CCPA requests, contact us at privacy@resume.io.com.`,
  },
  {
    title: '7. Changes to This Policy',
    body: `We may update this Privacy Policy periodically. We will notify you of material changes via email or a notice on our website. Continued use of resume.io after changes take effect constitutes acceptance of the updated policy.`,
  },
  {
    title: '8. Contact',
    body: `For privacy-related questions or requests, email us at privacy@resume.io.com. We aim to respond within 5 business days.`,
  },
];

const PrivacyContent: React.FC = () => (
  <div className="prose prose-slate dark:prose-invert max-w-none space-y-10">
    {SECTIONS.map(({ title, body }) => (
      <div key={title}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
      </div>
    ))}
  </div>
);

export default PrivacyContent;
