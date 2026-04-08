import React from 'react';
interface LoginGateModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginGateModal = ({ onClose, onLogin }: LoginGateModalProps) => (
  <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] p-8 text-center">
      <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign in to download</h2>
      <p className="text-sm text-gray-400 mb-6">
        Your resume is ready! Sign in to download and save it — your work won't be lost.
      </p>
      <button
        onClick={onLogin}
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors mb-3"
      >
        Sign in / Create account
      </button>
      <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
        Maybe later
      </button>
    </div>
  </div>
);

export default LoginGateModal;
