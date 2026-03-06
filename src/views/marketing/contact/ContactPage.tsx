import React from 'react';
import '@/styles/client/contact.css';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 hidden h-full w-full pointer-events-none opacity-40 md:block bg-[radial-gradient(circle_at_82%_16%,rgba(26,145,240,0.16),transparent_30%),radial-gradient(circle_at_72%_38%,rgba(30,37,50,0.08),transparent_26%)]" />

      <main className="max-w-[880px] mx-auto px-5 sm:px-6 pt-7 md:pt-[40px] relative z-10">
        {/* Hero Header */}
        <div className="mb-8 md:mb-[42px] max-w-[640px]">
          <h1 className="text-[40px] md:text-[46px] font-bold text-[#1A91F0] mb-4 tracking-tight leading-tight">
            Contact Us
          </h1>
          <p className="text-[#1E2532] text-[17px] md:text-[19px] leading-[1.6]">
            Have comments, questions, or feedback to share? Our team would love to hear from you. Please submit a message below.
          </p>
        </div>

        {/* Form Component */}
        <ContactForm />

        {/* Info/Address Component */}
        <ContactInfo />
      </main>
    </div>
  );
}
