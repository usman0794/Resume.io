import React, { useState } from 'react';
import '@/styles/client/privacy-and-terms.css';

const DoNotSellPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div
      className="w-full bg-white"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", minHeight: '60vh' }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px 100px' }}>
        {/* Title */}
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#1a91f0',
            marginBottom: '28px',
            lineHeight: 1.2,
          }}
        >
          Do Not Sell or Share My Personal Data
        </h1>

        {/* Body */}
        <p style={{ fontSize: '15px', lineHeight: '1.75', color: '#374151', marginBottom: '40px' }}>
          We do not sell your personal information for a monetary fee; however, some U.S. privacy
          laws define a "sale" very broadly such that it may include our sharing of your personal
          information with certain third parties if we receive anything of value in return. In that
          regard, we share your personal information with certain third-party marketing partners and,
          in exchange, we receive the ability to market or offer our products and services through
          their websites and applications. This may be considered a "sale" under some laws.
        </p>

        {/* Opt-out form */}
        {submitted ? (
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center',
              color: '#166534',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            ✓ Your opt-out request has been submitted. We will process it within 15 business days.
          </div>
        ) : (
          <div>
            <p
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#111827',
                textAlign: 'center',
                marginBottom: '24px',
                lineHeight: '1.5',
              }}
            >
              To opt out of our processing your personal information in this way, please provide
              your email address:
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Your email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: '1 1 260px',
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: error ? '1.5px solid #ef4444' : '1.5px solid #d1d5db',
                  borderRadius: '6px',
                  outline: 'none',
                  color: '#111827',
                  background: '#fff',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 28px',
                  background: '#1a91f0',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Submit
              </button>
            </form>
            {error && (
              <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoNotSellPage;
