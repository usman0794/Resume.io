import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/store/rootReducer';
import { logoutUser } from '@/store/actions/userActions';
import { ROUTES } from '@/routes/routePaths';

/* ── Toggle Switch ──────────────────────────────────────────────────────────── */
interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}
const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${checked ? 'bg-[#1A91F0]' : 'bg-gray-200'
      }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-[22px]' : 'translate-x-[2px]'
        }`}
    />
  </button>
);

/* ── Section Header ─────────────────────────────────────────────────────────── */
const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
  <div className="px-4 sm:px-0 py-2.5 border-y border-gray-100 bg-gray-50">
    <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-500">
      {label}
    </span>
  </div>
);

/* ── Social Row ─────────────────────────────────────────────────────────────── */
interface SocialRowProps {
  icon: React.ReactNode;
  name: string;
  connected?: string;
  actionLabel: string;
  actionColor: string;
}
const SocialRow: React.FC<SocialRowProps> = ({
  icon, name, connected, actionLabel, actionColor,
}) => (
  <div className="flex items-center justify-between py-3.5 px-4 sm:px-5 border-b border-gray-50 last:border-0">
    <div className="flex items-center gap-3">
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      <span className="text-sm text-gray-800">
        {name}
        {connected && (
          <span className="text-gray-500"> • {connected}</span>
        )}
      </span>
    </div>
    <button className={`text-sm font-semibold ${actionColor} hover:opacity-80 transition-opacity`}>
      {actionLabel}
    </button>
  </div>
);

/* ── Notification Row ───────────────────────────────────────────────────────── */
interface NotifRowProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  actionLabel?: string;
  actionColor?: string;
}
const NotifRow: React.FC<NotifRowProps> = ({
  title, description, checked, onChange, actionLabel, actionColor,
}) => (
  <div className="flex items-start justify-between py-4 px-4 sm:px-5 border-b border-gray-50 last:border-0 gap-4">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 mb-0.5">{title}</p>
      <p className="text-sm text-gray-500 leading-snug">{description}</p>
    </div>
    {actionLabel ? (
      <button className={`text-sm font-semibold flex-shrink-0 ${actionColor ?? 'text-[#1A91F0]'} hover:opacity-80 transition-opacity`}>
        {actionLabel}
      </button>
    ) : (
      <Toggle checked={checked} onChange={onChange} />
    )}
  </div>
);

/* ── Toast ──────────────────────────────────────────────────────────────────── */
interface ToastProps { message: string; type: 'success' | 'error' | 'info' }
const Toast: React.FC<ToastProps> = ({ message, type }) => (
  <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg text-white ${type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-[#1A91F0]'
    }`}>
    {message}
  </div>
);

/* ── Confirm Modal ──────────────────────────────────────────────────────────── */
const ConfirmModal: React.FC<{
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ title, message, confirmLabel, confirmColor, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors ${confirmColor}`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

/* ── Main Page ──────────────────────────────────────────────────────────────── */
const AccountSettingsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.userReducer.user);

  // Split name into first / last
  const nameParts = user?.name?.trim().split(' ') ?? [];
  const [firstName, setFirstName] = useState(nameParts[0] ?? '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') ?? '');
  const email = user?.email ?? '';

  // Notification toggles
  const [notifs, setNotifs] = useState({
    updatesOffers: true,
    resumeAnalytics: true,
    newsletter: false,
    careerPlans: false,
  });
  const setNotif = (key: keyof typeof notifs) => (v: boolean) =>
    setNotifs((prev) => ({ ...prev, [key]: v }));

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const showToast = (message: string, type: ToastProps['type'] = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Delete confirm modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Save handler — no backend endpoint yet, show info toast
  const handleSave = () => {
    showToast('Profile update coming soon.', 'info');
  };

  // Delete account → logout (no delete endpoint on backend yet)
  const handleDeleteConfirmed = async () => {
    setShowDeleteConfirm(false);
    await dispatch(logoutUser());
    navigate(ROUTES.HOME ?? '/');
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {toast && <Toast message={toast.message} type={toast.type} />}
      {showDeleteConfirm && (
        <ConfirmModal
          title="Delete Account"
          message="Are you sure you want to delete your account? This action cannot be undone."
          confirmLabel="Yes, Delete"
          confirmColor="bg-red-500 hover:bg-red-600"
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {/* ── Page container ── */}
      <div className="max-w-[720px] mx-auto py-8 sm:py-10 px-0 sm:px-4">

        {/* Page title */}
        <h1 className="text-2xl sm:text-[26px] font-bold text-gray-900 mb-6 px-4 sm:px-0">
          Account Settings
        </h1>

        {/* ══════════════════════════════
            YOUR PLAN
            ══════════════════════════════ */}
        <SectionHeader label="Your Plan" />

        <div className="bg-white border border-gray-100 mb-0">
          <div className="flex items-center gap-4 px-4 sm:px-5 py-4">
            <div className="w-12 h-12 rounded-full border-[2.5px] border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 rounded-full border-[2px] border-dashed border-gray-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-0.5">Free Account</p>
              <p className="text-sm text-gray-500 leading-snug">
                You are on the free plan. You can save your data and search for jobs.
                Upgrade for PDF downloads &amp; premium features.
              </p>
              <button className="mt-2 text-sm font-semibold text-[#1A91F0] hover:opacity-80 transition-opacity">
                Upgrade
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            ACCOUNT
            ══════════════════════════════ */}
        <SectionHeader label="Account" />

        <div className="bg-white border border-gray-100 mb-0">
          <div className="px-4 sm:px-5 pt-5 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A91F0]/30 focus:border-[#1A91F0] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A91F0]/30 focus:border-[#1A91F0] transition"
                />
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none cursor-default"
              />
              <p className="mt-1.5 text-xs text-gray-500 leading-snug">
                Use this email to log in to your resume.io account and receive notifications.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="mt-3 text-sm font-semibold text-[#1A91F0] hover:opacity-80 transition-opacity"
            >
              Save
            </button>
          </div>
        </div>

        {/* ══════════════════════════════
            SOCIAL PROFILE
            ══════════════════════════════ */}
        <SectionHeader label="Social Profile" />

        <div className="bg-white border border-gray-100 mb-0">
          <SocialRow
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            }
            name="Facebook"
            actionLabel="Connect"
            actionColor="text-[#1A91F0]"
          />
          <SocialRow
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
            name="LinkedIn"
            actionLabel="Connect"
            actionColor="text-[#1A91F0]"
          />
          <SocialRow
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            }
            name="Google"
            connected={email || undefined}
            actionLabel={email ? 'Disconnect' : 'Connect'}
            actionColor="text-[#1A91F0]"
          />
        </div>

        {/* ══════════════════════════════
            EMAIL NOTIFICATIONS
            ══════════════════════════════ */}
        <SectionHeader label="Email Notifications" />

        <div className="bg-white border border-gray-100 mb-0">
          <NotifRow
            title="Updates and Offers"
            description="Discounts, special offers, new features and more"
            checked={notifs.updatesOffers}
            onChange={setNotif('updatesOffers')}
          />
          <NotifRow
            title="Resume Analytics"
            description="Views, downloads and monthly statistics for each resume"
            checked={notifs.resumeAnalytics}
            onChange={setNotif('resumeAnalytics')}
          />
          <NotifRow
            title="Resume and Job Tips Newsletter"
            description="Useful resume and job tips! Straight to your inbox every 2 weeks"
            checked={notifs.newsletter}
            onChange={setNotif('newsletter')}
          />
          <NotifRow
            title="Career Plans"
            description="Get notified when career planning is available"
            checked={notifs.careerPlans}
            onChange={setNotif('careerPlans')}
          />
          <NotifRow
            title="Job alerts"
            description="Get recommended jobs based on your search preferences and career profile"
            checked={false}
            onChange={() => { }}
            actionLabel="Manage"
            actionColor="text-[#1A91F0]"
          />
        </div>

        {/* ══════════════════════════════
            DANGER ZONE
            ══════════════════════════════ */}
        <SectionHeader label="Danger Zone" />

        <div className="bg-white border border-gray-100 mb-8">
          <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
            <p className="text-sm text-gray-600 leading-snug">
              Once you delete your account, it cannot be undone. This is permanent.
            </p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
            >
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountSettingsPage;
