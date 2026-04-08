import React, { useState } from 'react';
const topics = [
  'Feedback', 'Billing', 'Pricing', 'Page Errors',
  'Cancel Subscription', 'Subscription Expired', 'Email Subscription', 'Other'
];

export default function ContactForm() {
  const [activeTopic, setActiveTopic] = useState('Feedback');
  const [email,   setEmail]   = useState('');
  const [name,    setName]    = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error,   setError]   = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess('Your message has been sent! We\'ll get back to you shortly.');
      setEmail(''); setName(''); setMessage('');
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[10px] shadow-[0_2px_20px_rgba(0,0,0,0.03)] p-6 md:p-12 mb-10 md:mb-12">
      <h2 className="text-[22px] font-normal text-[#1E2532] mb-5">Select a topic</h2>

      {/* Topic Pills */}
      <div className="flex flex-wrap gap-[10px] mb-8 md:mb-10">
        {topics.map((topic) => (
          <button
            key={topic} type="button" onClick={() => setActiveTopic(topic)}
            className={`px-[18px] py-[9px] rounded text-[14px] transition-all duration-200 ${
              activeTopic === topic
                ? 'bg-[#1A91F0] text-white font-medium shadow-sm'
                : 'bg-[#F3F6F9] text-[#616B7B] hover:bg-[#E2E8F0]'
            }`}
          >{topic}</button>
        ))}
      </div>

      {/* Success / Error */}
      {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-[14px]">{success}</div>}
      {error   && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[14px]">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10">
          <div className="flex flex-col gap-6 md:gap-8">
            <div>
              <label className="block text-[13px] text-[#828BA2] mb-[10px]">Email *</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#F3F6F9] rounded-[4px] h-[52px] px-4 text-[#1E2532] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1A91F0]/30 transition-shadow border-none"
              />
            </div>
            <div>
              <label className="block text-[13px] text-[#828BA2] mb-[10px]">Name *</label>
              <input
                type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-[#F3F6F9] rounded-[4px] h-[52px] px-4 text-[#1E2532] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1A91F0]/30 transition-shadow border-none"
              />
            </div>
          </div>
          <div className="flex flex-col h-full">
            <label className="block text-[13px] text-[#828BA2] mb-[10px]">Message *</label>
            <textarea
              required value={message} onChange={e => setMessage(e.target.value)}
              className="w-full flex-grow bg-[#F3F6F9] rounded-[4px] p-4 text-[#1E2532] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1A91F0]/30 transition-shadow resize-none min-h-[160px] md:min-h-0 border-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="text-[#828BA2] text-[13px] text-center md:text-left leading-relaxed max-w-[400px]">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="#" className="text-[#1A91F0] hover:underline transition-colors">Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className="text-[#1A91F0] hover:underline transition-colors">Terms of Service</a> apply.
          </p>
          <button
            type="submit" disabled={loading}
            className="w-[200px] md:w-[160px] bg-[#1A91F0] hover:bg-[#157BD0] disabled:opacity-60 text-white font-medium text-[15px] py-[14px] rounded transition-colors"
          >
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
