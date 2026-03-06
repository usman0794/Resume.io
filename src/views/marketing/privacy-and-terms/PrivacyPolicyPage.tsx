import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '@/styles/client/privacy-and-terms.css';
import {
  LegalTabs,
  MobileLegalNav,
  PolicySection,
  PolicySubsection,
  PolicyTable,
  PolicyList,
  PolicyIndex,
  PolicyLink,
  PolicyInShort,
  PolicyAddress,
} from './components';
import type { LegalTab } from './components';

// ─── Data ────────────────────────────────────────────────────────────────────

const INDEX_ENTRIES = [
  {
    letter: 'A',
    title: 'WHAT PERSONAL DATA WE COLLECT AND FOR WHAT PURPOSES',
    href: '#section-a',
    children: [
      { number: '1', title: 'Personal Data You Disclose To Us', href: '#a-1' },
      { number: '2', title: 'Data Automatically Collected By Us', href: '#a-2' },
      { number: '3', title: 'Data Collected From Other Sources', href: '#a-3' },
      { number: '4', title: 'Specific Purposes For Which We May Use The Personal Data We Collect', href: '#a-4' },
    ],
  },
  { letter: 'B', title: 'DO WE COLLECT DATA FROM MINORS?', href: '#section-b' },
  { letter: 'C', title: 'HOW WE HANDLE YOUR SOCIAL LOGINS', href: '#section-c' },
  { letter: 'D', title: 'USE OF COOKIES AND OTHER TRACKING TECHNOLOGIES', href: '#section-d' },
  { letter: 'E', title: 'HOW YOUR PERSONAL DATA IS SHARED', href: '#section-e' },
  { letter: 'F', title: 'PROCESSORS AND INTERNATIONAL DATA TRANSFERS', href: '#section-f' },
  { letter: 'G', title: 'HOW LONG WE KEEP YOUR INFORMATION', href: '#section-g' },
  { letter: 'H', title: 'HOW WE KEEP YOUR INFORMATION SAFE', href: '#section-h' },
  { letter: 'I', title: 'NON-IDENTIFYING (ANONYMIZED) AND AGGREGATE DATA', href: '#section-i' },
  {
    letter: 'J',
    title: 'YOUR PRIVACY RIGHTS AND CHOICES',
    href: '#section-j',
    children: [
      { number: '1', title: 'How to Submit a Request to Exercise Your Rights', href: '#j-1' },
      { number: '2', title: 'Your Account and Communication Choice', href: '#j-2' },
      { number: '3', title: 'California Shine the Light Notice', href: '#j-3' },
    ],
  },
  { letter: 'K', title: 'UPDATES TO THIS POLICY', href: '#section-k' },
  { letter: 'L', title: 'HOW YOU CAN CONTACT US ABOUT THIS POLICY', href: '#section-l' },
  {
    title: 'ANNEX 1 – ADDITIONAL INFORMATION FOR CALIFORNIA RESIDENTS',
    href: '#annex-1',
    children: [
      { title: 'K. Updates to this Policy' },
      { title: 'L. How You Can Contact Us About This Policy' },
    ],
  },
];

const PROCESSING_TABLE_COLS = [
  { key: 'purpose', header: 'Purpose/Activity', width: '35%' },
  { key: 'type', header: 'Type of data', width: '25%' },
  { key: 'basis', header: 'Lawful basis for processing including basis of legitimate interest', width: '40%' },
];

const PROCESSING_TABLE_ROWS = [
  {
    purpose: 'To register you as a new customer',
    type: '(a) Identity\n(b) Contact',
    basis: 'Performance of a contract with you',
  },
  {
    purpose: 'To process and deliver your order including:\n(a) Manage payments, fees and charges\n(b) Collect and recover money owed to us',
    type: '(a) Identity\n(b) Contact\n(c) Financial\n(d) Transaction\n(e) Marketing and Communications',
    basis: '(a) Performance of a contract with you\n(b) Necessary for our legitimate interests (to recover debts due to us)',
  },
  {
    purpose: 'To manage our relationship with you which will include:\n(a) Notifying you about changes to our terms or privacy policy\n(b) Asking you to leave a review or take a survey',
    type: '(a) Identity\n(b) Contact\n(c) Profile\n(d) Marketing and Communications',
    basis: '(a) Performance of a contract with you\n(b) Necessary to comply with a legal obligation\n(c) Necessary for our legitimate interests (to keep our records updated and to study how customers use our products/services)',
  },
  {
    purpose: 'To enable you to partake in a prize draw, competition or complete a survey',
    type: '(a) Identity\n(b) Contact\n(c) Profile\n(d) Usage\n(e) Marketing and Communications',
    basis: '(a) Performance of a contract with you\n(b) Necessary for our legitimate interests (to study how customers use our products/services, to develop them and grow our business)',
  },
  {
    purpose: 'To administer and protect our business and this Platform (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data)',
    type: '(a) Identity\n(b) Contact\n(c) Technical',
    basis: '(a) Necessary for our legitimate interests (for running our business, provision of administration and IT services, network security, to prevent fraud and in the context of a business reorganisation or group restructuring exercise)\n(b) Necessary to comply with a legal obligation',
  },
  {
    purpose: 'To deliver relevant Platform content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you',
    type: '(a) Identity\n(b) Contact\n(c) Profile\n(d) Usage\n(e) Marketing and Communications\n(f) Technical',
    basis: 'Necessary for our legitimate interests (to study how customers use our products/services, to develop them, to grow our business and to inform our marketing strategy)',
  },
  {
    purpose: 'To use data analytics to improve our Platform, products/services, marketing, customer relationships and experiences',
    type: '(a) Technical\n(b) Usage',
    basis: 'Necessary for our legitimate interests (to define types of customers for our products and services, to keep our Platform updated and relevant, to develop our business and to inform our marketing strategy)',
  },
  {
    purpose: 'To make suggestions and recommendations to you about goods or services that may be of interest to you',
    type: '(a) Identity\n(b) Contact\n(c) Technical\n(d) Usage\n(e) Profile',
    basis: 'Necessary for our legitimate interests (to develop our products/services and grow our business)',
  },
];

const CCPA_TABLE_COLS = [
  { key: 'category', header: 'Category of personal information', width: '40%' },
  { key: 'recipients', header: 'Categories of recipients', width: '25%' },
  { key: 'purpose', header: 'Business / commercial purpose for collection', width: '35%' },
];

const CCPA_TABLE_ROWS = [
  {
    category: 'Identifiers (name, postal address, unique personal identifier, online identifier, IP address, email address, account name, SSN, DL, passport number)',
    recipients: 'Service providers\nAnalytics providers\nAdvertising partners\nAffiliated companies',
    purpose: 'Providing services\nMarketing\nAnalytics\nLegal compliance',
  },
  {
    category: 'Personal information categories (as defined in California Customer Records statute Cal. Civ. Code § 1798.80(e)) including name, address, telephone number, credit card number, employment',
    recipients: 'Service providers\nPayment processors\nAffiliated companies',
    purpose: 'Providing services\nProcessing payments\nLegal compliance',
  },
  {
    category: 'Protected classification characteristics under California or federal law',
    recipients: 'N/A – not shared unless required by law',
    purpose: 'N/A',
  },
  {
    category: 'Commercial information (records of personal property, products or services purchased, obtained, or considered)',
    recipients: 'Service providers\nAnalytics providers\nAffiliated companies',
    purpose: 'Providing services\nMarketing\nAnalytics',
  },
  { category: 'Biometric information', recipients: 'N/A – not collected', purpose: 'N/A' },
  {
    category: 'Internet or other similar network activity (browsing history, search history, interaction with website)',
    recipients: 'Analytics providers\nAdvertising partners\nService providers',
    purpose: 'Analytics\nMarketing\nImproving services',
  },
  {
    category: 'Geolocation data',
    recipients: 'Service providers\nAnalytics providers',
    purpose: 'Providing services\nAnalytics',
  },
  { category: 'Sensory data (audio, electronic, visual, thermal, olfactory)', recipients: 'N/A – not collected', purpose: 'N/A' },
  {
    category: 'Professional or employment-related information',
    recipients: 'Service providers\nAffiliated companies',
    purpose: 'Providing services',
  },
  { category: 'Non-public education information', recipients: 'N/A – not collected', purpose: 'N/A' },
  {
    category: 'Inferences drawn from other personal information to create a profile',
    recipients: 'Analytics providers\nAdvertising partners',
    purpose: 'Marketing\nAnalytics',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const PrivacyPolicyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromPath = (pathname: string): LegalTab => {
    if (pathname.includes('terms-and-conditions')) return 'terms';
    if (pathname.includes('right-of-withdrawal')) return 'withdrawal';
    return 'privacy';
  };

  const activeTab = getTabFromPath(location.pathname);

  const handleTabChange = (tab: LegalTab) => {
    if (tab === 'privacy') navigate('/privacy-policy');
    else if (tab === 'terms') navigate('/terms-and-conditions');
    else if (tab === 'withdrawal') navigate('/right-of-withdrawal');
  };

  return (
    <div
      className="w-full bg-white"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Header */}
      <div style={{ paddingTop: '40px', paddingBottom: '16px' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#1a91f0',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            margin: 0,
          }}
        >
          Legal Documents
        </h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:block">
        <LegalTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden" style={{ padding: '0 20px' }}>
        <MobileLegalNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 20px 80px',
        }}
      >
        {activeTab === 'privacy' && <PrivacyContent />}
        {activeTab === 'terms' && <TermsContent />}
        {activeTab === 'withdrawal' && <WithdrawalContent />}
      </div>
    </div>
  );
};

// ─── Privacy Content ──────────────────────────────────────────────────────────

const PrivacyContent: React.FC = () => (
  <>
    <h2
      style={{
        fontSize: '13px',
        fontWeight: 700,
        color: '#111827',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      Privacy Policy
    </h2>

    <p style={{ fontWeight: 700, color: '#111827', marginBottom: '20px', fontSize: '14px' }}>
      Last Updated: March 18th, 2025
    </p>

    <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151', marginBottom: '16px' }}>
      Thank you for choosing to be part of our community. At Talent Worldwide, Inc. and our subsidiary
      and affiliated sites, we are committed to protecting your personal data and respecting your privacy
      rights. This Privacy Policy ("<strong>Policy</strong>") explains what personal data is collected and
      how it is processed by Talent Worldwide Inc. company, registered in the USA under EIN Registration
      Number 27-2293754, having its seat and registered address at 420 Lexington Avenue Suite 1402 – 1063,
      New York, NY 10170, USA, Tax ID: 27-2293754 ("<strong>Talent</strong>") and its subsidiaries and
      affiliates (collectively, "<strong>Career.io</strong>", "<strong>we</strong>", "<strong>us</strong>",
      or "<strong>our</strong>") when you access or use any website, mobile site or mobile application
      operated by us or our brands that link to this Policy (collectively, the "<strong>Platform</strong>").
      This includes TopResume, TopCV, Zipjob, TopInterview, ResumeRabbit, resume.io, Career.io, Startwire,
      Premier Virtual, CourseReport, CV Professionale, ResumeWriter SG (collectively we will refer to these
      parties as "Career.io Affiliates and Subsidiaries"). This Policy and other documents referenced in it
      apply to all personal data collected through our Platform and any related services, sales, marketing
      or events. In those cases, Talent and its Career.io Affiliates and Subsidiaries act as controllers of
      your personal data.
    </p>

    <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151', marginBottom: '16px' }}>
      Personal data is any information relating to an identified or identifiable natural person. It includes
      things like email addresses, phone numbers, mailing addresses, payment card information, account
      numbers, and government-issued identification numbers. These are just examples and there are many
      other types of information that would be considered personal data.
    </p>

    <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151', marginBottom: '24px' }}>
      This Policy describes our collection and use practices. To make this easier for you to navigate,
      please use the links below:
    </p>

    <PolicyIndex entries={INDEX_ENTRIES} />

    <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151', fontStyle: 'italic', marginBottom: '28px' }}>
      Please note that some of these sections may only apply to you if you are a resident of a particular
      country or state, so please read this Policy carefully to find the sections that are relevant to you.
    </p>

    {/* A */}
    <PolicySection id="section-a" title="A. WHAT PERSONAL DATA WE COLLECT AND FOR WHAT PURPOSES">
      <PolicySubsection id="a-1" title="1. Personal Data You Disclose To Us">
        <PolicyInShort text="We collect personal data that you provide to us, such as name, address, contact information, passwords and security data, payment information, and social media login data." />
        <p style={{ marginBottom: '14px' }}>
          We collect personal data that you voluntarily provide to us when registering on the Platform,
          expressing an interest in obtaining information about us or our products and services, when
          participating in activities on the Platform or otherwise when you contact us.
        </p>
        <p style={{ marginBottom: '14px' }}>
          The personal data that we collect depends on the context of your interactions with us and the
          Platform, the choices you make and the products and features you use. The personal data we collect
          may include the following:
        </p>
        <PolicyList
          items={[
            {
              label: 'To facilitate account creation and login process.',
              content: 'We may collect your name, email address and all other contact data details, including your first and last name, email address, password, profile picture, phone number, and other similar contact data. Processing is necessary for the performance of the contract with you, including to create an account with us. It is necessary for us to collect this information in order to enter into a contract with you. Without providing your personal data, you will not be able to enter into the contract with us.',
            },
            {
              label: 'To provide the services.',
              content: 'We may use your personal data (including your name, user-generated content such as a resume, cover letter, and employment history, location, industry, phone number, biography) to provide services you request. We cannot provide you our services without your personal data.',
            },
            {
              label: 'To send administrative information to you.',
              content: 'We may use your personal data to send you product, service and new feature information and/or information about changes to our terms, conditions, and policies.',
            },
            {
              label: 'To manage your orders for services.',
              content: 'We may use your personal data to fulfil and manage your orders for services, subscriptions, and payments made by you in connection with any services provided through the Platform. This may include your first and last name, billing address, email address, phone number, and the payment instrument. All payment processing is handled by our third-party payment processors and we do not directly store full payment card data. Processing is necessary for the performance of the contract with you.',
            },
            {
              label: 'To post testimonials.',
              content: 'We post testimonials on the Platform that may contain personal data. Prior to posting a testimonial, we will obtain your consent to use your name and testimonial. You have the right to withdraw your consent at any time without affecting the lawfulness of processing based on consent prior to such withdrawal.',
            },
            {
              label: 'To request feedback.',
              content: 'We may use your personal data to request feedback and to contact you about your use of the Platform.',
            },
            {
              label: 'To send you marketing and promotional communications.',
              content: 'We and/or our third-party marketing partners may use your personal data for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time (see the section Your Account and Communication Choice for more information).',
            },
            {
              label: 'To deliver targeted advertising to you.',
              content: 'We may use your personal data to develop and display personalized content and advertising tailored to your interests and/or location and to measure its effectiveness. For more information see our Cookie Policy.',
            },
            {
              label: 'To protect our services.',
              content: 'We may use your personal data as part of our efforts to keep the Platform safe and secure (for example, for fraud monitoring and prevention).',
            },
            {
              label: 'To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.',
              content: '',
            },
            {
              label: 'To respond to legal requests and prevent harm.',
              content: 'If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.',
            },
            {
              label: 'To manage user accounts.',
              content: 'We may use your personal data for the purposes of managing our account and keeping it in working order.',
            },
            {
              label: 'To deliver services to the user.',
              content: 'We may use your personal data to provide you with the requested service. Processing is necessary for the performance of the contract with you.',
            },
            {
              label: 'To respond to user inquiries/offer support to users.',
              content: 'We may use your personal data to respond to your inquiries and solve any potential issues you might have with the use of our services.',
            },
            {
              label: 'For other business purposes.',
              content: 'We may use your personal data for other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns, and to evaluate and improve the Platform, products, marketing and your experience.',
            },
          ]}
        />
      </PolicySubsection>

      <PolicySubsection id="a-2" title="2. Data Automatically Collected By Us">
        <PolicyInShort text="Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Platform." />
        <p style={{ marginBottom: '14px' }}>
          We automatically collect certain information when you visit, use or navigate the Platform. This
          information does not reveal your specific identity (like your name or contact information) but may
          include device and usage information, such as your IP address, browser and device characteristics,
          operating system, language preferences, referring URLs, device name, country, location, information
          about how and when you use the Platform and other technical information. This information is
          primarily needed to maintain the security and operation of the Platform, and for our internal
          analytics and reporting purposes.
        </p>
        <p style={{ marginBottom: '14px' }}>
          Like many businesses, we also collect information through cookies and similar technologies. You
          can find out more about this in our Cookie Policy.
        </p>
        <p style={{ marginBottom: '8px' }}>The information we collect includes:</p>
        <PolicyList
          items={[
            {
              label: 'Log and Usage Data.',
              content: 'Log and usage data is service-related, diagnostic, usage and performance information our servers automatically collect when you access or use the Platform and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type and settings and information about your activity in the Platform (such as the date/time stamps associated with your usage, pages and files viewed, searches and other actions you take such as which features you use), device event information (such as system activity, error reports and hardware settings).',
            },
            {
              label: 'Device Data.',
              content: 'We collect device data such as information about your computer, phone, tablet or other device you use to access the Platform. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system and system configuration information.',
            },
            {
              label: 'Location Data.',
              content: 'We collect location data such as information about your device\'s location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Platform. You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. Note however, if you choose to opt out, you may not be able to use certain aspects of the Services.',
            },
          ]}
        />
      </PolicySubsection>

      <PolicySubsection id="a-3" title="3. Data Collected From Other Sources">
        <PolicyInShort text="We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources." />
        <p style={{ marginBottom: '14px' }}>
          We may obtain information about you from other sources, such as public databases, joint marketing
          partners, affiliate programs, data providers, social media platforms, as well as from other third
          parties. Examples of the information we receive from other sources include: social media profile
          information (your name, gender, birthday, email, current city, state and country, user
          identification numbers for your contacts, profile picture URL and any other information that you
          choose to make public); marketing leads and search results and links, including paid listings (such
          as sponsored links).
        </p>
      </PolicySubsection>

      <PolicySubsection id="a-4" title="4. Specific Purposes For Which We May Use The Personal Data We Collect">
        <p style={{ marginBottom: '14px' }}>
          We use the personal data for the purposes described in the table below. In the table below, we
          have described the specific purposes for which we use the data collected, along with the legal
          basis of the processing.
        </p>
        <PolicyTable columns={PROCESSING_TABLE_COLS} rows={PROCESSING_TABLE_ROWS} />
      </PolicySubsection>
    </PolicySection>

    {/* B */}
    <PolicySection id="section-b" title="B. DO WE COLLECT DATA FROM MINORS?">
      <PolicyInShort text="We do not knowingly collect data from or market to children under 18 years of age." />
      <p style={{ marginBottom: '14px' }}>
        We do not knowingly solicit data from or market to children under 18 years of age. By using the
        Platform, you represent that you are at least 18 or that you are the parent or guardian of such a
        minor and consent to such minor dependent's use of the Platform. If we learn that personal data from
        users less than 18 years of age has been collected, we will deactivate the account and take
        reasonable measures to promptly delete such data from our records. If you become aware of any data
        we may have collected from children under age 18, please contact us at{' '}
        <PolicyLink href="mailto:privacy@career.io">privacy@career.io</PolicyLink>.
      </p>
    </PolicySection>

    {/* C */}
    <PolicySection id="section-c" title="C. HOW WE HANDLE YOUR SOCIAL LOGINS">
      <PolicyInShort text="If you choose to register or log in to our services using a social media account, we may have access to certain information about you." />
      <p style={{ marginBottom: '14px' }}>
        The Platform offers you the ability to register and login using your third-party social media
        account details (like your Facebook or Google logins). Where you choose to do this, we will receive
        certain profile information about you from your social media provider. The profile information we
        receive may vary depending on the social media provider concerned, but will often include your name,
        email address, friends list, profile picture as well as other information you choose to make public
        on such social media platform.
      </p>
      <p style={{ marginBottom: '14px' }}>
        We will use the information we receive only for the purposes that are described in this privacy
        policy or that are otherwise made clear to you on the relevant Platform. Please note that we do not
        control, and are not responsible for, other uses of your personal data by your third-party social
        media provider. We recommend that you review their privacy policy to understand how they collect,
        use and share your personal data, and how you can set your privacy preferences on their sites and
        apps.
      </p>
    </PolicySection>

    {/* D */}
    <PolicySection id="section-d" title="D. USE OF COOKIES AND OTHER TRACKING TECHNOLOGIES">
      <PolicyInShort text="We may use cookies and other tracking technologies to collect and store your information." />
      <p style={{ marginBottom: '14px' }}>
        We may use cookies and similar tracking technologies (like web beacons and pixels) to access or
        store information. Specific information about how we use such technologies and how you can refuse
        certain cookies is set out in our Cookie Policy.
      </p>
    </PolicySection>

    {/* E */}
    <PolicySection id="section-e" title="E. HOW YOUR PERSONAL DATA IS SHARED">
      <PolicyInShort text="We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations." />
      <p style={{ marginBottom: '12px' }}>
        We may process or share your data that we hold based on the following legal basis:
      </p>
      <PolicyList
        items={[
          { label: 'Consent:', content: 'We may process your data if you have given us specific consent to use your personal data for a specific purpose.' },
          { label: 'Legitimate Interests:', content: 'We may process your data when it is reasonably necessary to achieve our legitimate business interests.' },
          { label: 'Performance of a Contract:', content: 'Where we have entered into a contract with you, we may process your personal data to fulfill the terms of our contract.' },
          { label: 'Legal Obligations:', content: 'We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).' },
          { label: 'Vital Interests:', content: 'We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.' },
        ]}
      />
      <p style={{ marginBottom: '12px' }}>
        More specifically, we may need to process your data or share your personal data in the following
        situations:
      </p>
      <PolicyList
        items={[
          { label: 'Business Transfers.', content: 'We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.' },
          { label: 'Vendors, Consultants and Other Third-Party Service Providers.', content: 'We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. Unless described in this notice, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes.' },
          { label: 'Affiliates.', content: 'We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.' },
          { label: 'Business Partners.', content: 'We may share your information with our business partners to offer you certain products, services or promotions.' },
        ]}
      />
    </PolicySection>

    {/* F */}
    <PolicySection id="section-f" title="F. PROCESSORS AND INTERNATIONAL DATA TRANSFERS">
      <PolicyInShort text="We may transfer, store, and process your information in countries other than your own." />
      <p style={{ marginBottom: '14px' }}>
        Our servers are located in the United States. If you are accessing our Platform from outside the
        United States, please be aware that your information may be transferred to, stored, and processed
        by us in our facilities and by those third parties with whom we may share your personal data, in the
        United States and other countries.
      </p>
      <p style={{ marginBottom: '14px' }}>
        If you are a resident in the European Economic Area, then these countries may not necessarily have
        data protection laws or other similar laws as comprehensive as those in your country. We will
        however take all necessary measures to protect your personal data in accordance with this privacy
        policy and applicable law.
      </p>
      <p style={{ marginBottom: '14px' }}>
        <strong>European Commission's Standard Contractual Clauses:</strong> Such measures include
        implementing the European Commission's Standard Contractual Clauses for transfers of personal data
        between our group companies and between us and our third-party providers, which require all such
        recipients to protect personal data that they process from the EEA in accordance with European data
        protection laws and regulations. Our Standard Contractual Clauses can be provided upon request.
      </p>
    </PolicySection>

    {/* G */}
    <PolicySection id="section-g" title="G. HOW LONG WE KEEP YOUR INFORMATION">
      <PolicyInShort text="We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law." />
      <p style={{ marginBottom: '14px' }}>
        We will only keep your personal data for as long as it is necessary for the purposes set out in
        this privacy policy, unless a longer retention period is required or permitted by law (such as tax,
        accounting or other legal requirements). No purpose in this notice will require us keeping your
        personal data for longer than the period of time in which users have an account with us.
      </p>
      <p style={{ marginBottom: '14px' }}>
        When we have no ongoing legitimate business need to process your personal data, we will either
        delete or anonymize such information, or, if this is not possible (for example, because your
        personal data has been stored in backup archives), then we will securely store your personal data
        and isolate it from any further processing until deletion is possible.
      </p>
    </PolicySection>

    {/* H */}
    <PolicySection id="section-h" title="H. HOW WE KEEP YOUR INFORMATION SAFE">
      <PolicyInShort text="We aim to protect your personal data through a system of organizational and technical security measures." />
      <p style={{ marginBottom: '14px' }}>
        We have implemented appropriate technical and organizational security measures designed to protect
        the security of any personal data we process. However, despite our safeguards and efforts to secure
        your information, no electronic transmission over the Internet or information storage technology can
        be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or
        other unauthorized third parties will not be able to defeat our security and improperly collect,
        access, steal, or modify your information. Although we will do our best to protect your personal
        data, transmission of personal data to and from the Platform is at your own risk. You should only
        access the Platform within a secure environment.
      </p>
    </PolicySection>

    {/* I */}
    <PolicySection id="section-i" title="I. NON-IDENTIFYING (ANONYMIZED) AND AGGREGATE DATA">
      <p style={{ marginBottom: '14px' }}>
        We may use your personal data to create non-identifying information that we might use alone or in
        the aggregate with information obtained from other sources, in order to help us to optimally deliver
        our services or to help advertisers target users with their products or services, or for other
        business purposes. We may share this aggregated, non-identifying information with third parties.
        This non-identifying information is not subject to this privacy policy.
      </p>
    </PolicySection>

    {/* J */}
    <PolicySection id="section-j" title="J. YOUR PRIVACY RIGHTS AND CHOICES">
      <PolicyInShort text="In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal data. You may review, change, or terminate your account at any time." />
      <p style={{ marginBottom: '14px' }}>
        In some regions (like the European Economic Area), you have certain rights under applicable data
        protection laws. These may include the right (i) to request access and obtain a copy of your
        personal data, (ii) to request rectification or erasure; (iii) to restrict the processing of your
        personal data; and (iv) if applicable, to data portability. In certain circumstances, you may also
        have the right to object to the processing of your personal data. To make such a request, please
        use the contact details provided below. We will consider and act upon any request in accordance
        with applicable data protection laws.
      </p>
      <p style={{ marginBottom: '14px' }}>
        If we are relying on your consent to process your personal data, you have the right to withdraw
        your consent at any time. Please note however that this will not affect the lawfulness of the
        processing before its withdrawal, nor will it affect the processing of your personal data conducted
        in reliance of lawful processing grounds other than consent.
      </p>
      <p style={{ marginBottom: '14px' }}>
        If you are a resident in the European Economic Area and you believe we are unlawfully processing
        your personal data, you also have the right to complain to your local data protection supervisory
        authority. You can find their contact details here:{' '}
        <PolicyLink href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" external>
          http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
        </PolicyLink>.
      </p>
      <p style={{ marginBottom: '14px' }}>
        If you are a resident in Switzerland, the contact details for the data protection authorities are
        available here:{' '}
        <PolicyLink href="https://www.edoeb.admin.ch/edoeb/en/home.html" external>
          https://www.edoeb.admin.ch/edoeb/en/home.html
        </PolicyLink>.
      </p>

      <PolicySubsection id="j-1" title="1. How to Submit a Request to Exercise Your Rights">
        <p style={{ marginBottom: '14px' }}>
          To submit a request to exercise any of the privacy rights described in this Policy, please submit
          a request to <PolicyLink href="mailto:privacy@career.io">privacy@career.io</PolicyLink>. We will
          need to verify your identity before processing your request by asking you to log into your account
          or provide some identification information. Where required by applicable law, we will process your
          request within 30 days, or will let you know if we need more time.
        </p>
      </PolicySubsection>

      <PolicySubsection id="j-2" title="2. Your Account and Communication Choice">
        <p style={{ marginBottom: '14px' }}>
          If you would at any time like to review or change the information in your account or terminate
          your account, you can log into your account settings and update your user account or contact us
          using the contact information provided.
        </p>
        <p style={{ marginBottom: '14px' }}>
          Upon your request to terminate your account, we will deactivate or delete your account and
          information from our active databases. However, we may retain some information in our files to
          prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use
          and/or comply with applicable legal requirements.
        </p>
        <p style={{ marginBottom: '14px' }}>
          <strong>Opting out of email marketing:</strong> You can unsubscribe from our marketing email list
          at any time by clicking on the unsubscribe link in the emails that we send or by contacting us
          using the details provided below. You will then be removed from the marketing email list — however,
          we may still communicate with you, for example to send you service-related emails that are
          necessary for the administration and use of your account.
        </p>
      </PolicySubsection>

      <PolicySubsection id="j-3" title="3. California Shine the Light Notice">
        <p style={{ marginBottom: '14px' }}>
          California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users
          who are California residents to request and obtain from us, once a year and free of charge,
          information about categories of personal data (if any) we disclosed to third parties for direct
          marketing purposes and the names and addresses of all third parties with which we shared personal
          data in the immediately preceding calendar year. If you are a California resident and would like
          to make such a request, please submit your request in writing to us using the contact information
          provided below.
        </p>
        <p style={{ marginBottom: '14px' }}>
          If you are under 18 years of age, reside in California, and have a registered account with the
          Platform, you have the right to request removal of unwanted data that you publicly post on the
          Platform. To request removal of such data, please contact us using the contact information
          provided below, and include the email address associated with your account and a statement that
          you reside in California. We will make sure the data is not publicly displayed on the Platform,
          but please be aware that the data may not be completely or comprehensively removed from all our
          systems (e.g., backups, etc.).
        </p>
      </PolicySubsection>
    </PolicySection>

    {/* K */}
    <PolicySection id="section-k" title="K. UPDATES TO THIS POLICY">
      <PolicyInShort text="Yes, we will update this notice as necessary to stay compliant with relevant laws." />
      <p style={{ marginBottom: '14px' }}>
        We may update this privacy policy from time to time. The updated version will be indicated by an
        updated "Revised" date and the updated version will be effective as soon as it is accessible. If we
        make material changes to this privacy policy, we may notify you either by prominently posting a
        notice of such changes or by directly sending you a notification. We encourage you to review this
        privacy policy frequently to be informed of how we are protecting your data.
      </p>
    </PolicySection>

    {/* L */}
    <PolicySection id="section-l" title="L. HOW YOU CAN CONTACT US ABOUT THIS POLICY">
      <p style={{ marginBottom: '14px' }}>
        If you have questions or comments about this policy, you may email us at{' '}
        <PolicyLink href="mailto:privacy@career.io">privacy@career.io</PolicyLink> or by post to:
      </p>
      <PolicyAddress
        lines={[
          'Talent Worldwide, Inc.',
          '420 Lexington Avenue Suite 1402 – 1063',
          'New York, NY 10170',
          'United States',
        ]}
      />
    </PolicySection>

    {/* Annex 1 */}
    <PolicySection id="annex-1" title="ANNEX 1 – ADDITIONAL INFORMATION FOR CALIFORNIA RESIDENTS">
      <p style={{ marginBottom: '14px' }}>
        This section provides additional information about how we process the personal data of California
        residents, and the rights that California residents have under the California Consumer Privacy Act
        ("CCPA").
      </p>
      <PolicyTable columns={CCPA_TABLE_COLS} rows={CCPA_TABLE_ROWS} />

      <p style={{ fontWeight: 700, marginBottom: '12px', color: '#111827' }}>Your California Privacy Rights</p>
      <p style={{ marginBottom: '12px' }}>If you are a California resident, you may exercise the following rights:</p>
      <PolicyList
        items={[
          { label: 'Right to Know.', content: 'You have the right to request that we disclose information to you about our collection and use of your personal information over the past 12 months.' },
          { label: 'Right to Delete.', content: 'You have the right to request that we delete any of your personal information that we collected from you and retained, subject to certain exceptions.' },
          { label: 'Right to Opt-Out of Sale.', content: 'You have the right to opt-out of the sale of your personal information. We do not sell your personal information as the term "sell" is traditionally understood. However, we may share your personal information with our partners, which under California law may constitute a "sale."' },
          { label: 'Right to Non-Discrimination.', content: 'You have the right not to receive discriminatory treatment by us for the exercise of your privacy rights.' },
        ]}
      />
      <p style={{ marginBottom: '14px' }}>
        To exercise any of the rights described above, please submit a verifiable consumer request to us
        by emailing us at{' '}
        <PolicyLink href="mailto:privacy@career.io">privacy@career.io</PolicyLink>. Only you or a person
        registered with the California Secretary of State that you authorize to act on your behalf, may
        make a verifiable consumer request related to your personal data.
      </p>
      <p style={{ marginBottom: '14px' }}>
        We endeavor to respond to a verifiable consumer request within 45 days of its receipt. If we
        require more time (up to 90 days), we will inform you of the reason and extension period in
        writing. Any disclosures we provide will only cover the 12-month period preceding the verifiable
        consumer request's receipt.
      </p>
    </PolicySection>
  </>
);

// ─── Terms Content ────────────────────────────────────────────────────────────

const TERMS_SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using resume.io, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.`,
  },
  {
    title: '2. Use of Service',
    body: `resume.io grants you a limited, non-exclusive, non-transferable, revocable licence to use the platform for your personal, non-commercial resume-building purposes. You may not use the service for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks.`,
  },
  {
    title: '3. Accounts',
    body: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account. resume.io will not be liable for any loss resulting from unauthorised use of your account.`,
  },
  {
    title: '4. Intellectual Property',
    body: `The service and its original content, features, and functionality are and will remain the exclusive property of resume.io and its licensors. Our trademarks may not be used in connection with any product or service without prior written consent.`,
  },
  {
    title: '5. Subscriptions & Billing',
    body: `Some features of resume.io require a paid subscription. You agree to pay all fees associated with the subscription plan you select. Fees are non-refundable except as required by applicable law or as described in our Refund Policy. We reserve the right to change subscription fees upon reasonable notice.`,
  },
  {
    title: '6. User Content',
    body: `You retain ownership of any content you submit or create through the service (e.g., your resume). By submitting content, you grant resume.io a limited licence to use, store, and display that content solely for the purpose of providing the service to you.`,
  },
  {
    title: '7. Disclaimer of Warranties',
    body: `The service is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components.`,
  },
  {
    title: '8. Limitation of Liability',
    body: `To the maximum extent permitted by law, resume.io shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of the service.`,
  },
  {
    title: '9. Governing Law',
    body: `These Terms shall be governed by and construed in accordance with the laws of the State of New York, USA, without regard to its conflict of law provisions. Any disputes shall be resolved exclusively in the courts located in New York County, New York.`,
  },
  {
    title: '10. Changes to Terms',
    body: `We reserve the right to update these Terms at any time. We will notify you of material changes by posting the new Terms on this page with an updated effective date. Your continued use of the service after changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: '11. Contact',
    body: `If you have any questions about these Terms, please contact us at nabeel@resume.io.com.`,
  },
];

const TermsContent: React.FC = () => (
  <>
    <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      Terms of Service
    </h2>
    <p style={{ fontWeight: 700, color: '#111827', marginBottom: '20px', fontSize: '14px' }}>
      Last Updated: March 18th, 2025
    </p>
    {TERMS_SECTIONS.map(({ title, body }) => (
      <div key={title} style={{ marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, color: '#111827', marginBottom: '8px', fontSize: '14px' }}>{title}</p>
        <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151' }}>{body}</p>
      </div>
    ))}
  </>
);

// ─── Withdrawal Content ───────────────────────────────────────────────────────

const WithdrawalContent: React.FC = () => (
  <>
    <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      Right of Withdrawal
    </h2>
    <p style={{ fontWeight: 700, color: '#111827', marginBottom: '20px', fontSize: '14px' }}>
      Last Updated: March 18th, 2025
    </p>
    <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151', marginBottom: '16px' }}>
      If you are a consumer resident in the European Union, you have the right to withdraw from a contract entered into with resume.io within <strong>14 days</strong> of the date the contract was concluded, without giving any reason.
    </p>
    <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151', marginBottom: '16px' }}>
      <strong>Exception:</strong> The right of withdrawal does not apply once you have expressly consented to the commencement of performance of digital content services before the end of the withdrawal period and acknowledged that you thereby lose your right of withdrawal.
    </p>
    <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151', marginBottom: '16px' }}>
      To exercise your right of withdrawal, you must notify us by sending a clear statement (e.g., a letter sent by post or email) to:
    </p>
    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '16px', marginBottom: '20px', fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
      <strong>resume.io / Talent Worldwide, Inc.</strong><br />
      420 Lexington Avenue Suite 1402 – 1063<br />
      New York, NY 10170, USA<br />
      Email: <a href="mailto:nabeel@resume.io.com" style={{ color: '#1a91f0' }}>nabeel@resume.io.com</a>
    </div>
    <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151', marginBottom: '16px' }}>
      If you withdraw from this contract, we shall reimburse you all payments received from you, without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw from this contract. We will carry out such reimbursement using the same means of payment as you used for the initial transaction.
    </p>
  </>
);

export default PrivacyPolicyPage;
