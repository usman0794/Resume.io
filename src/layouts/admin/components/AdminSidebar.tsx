import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import type { User } from '@/types/user.types';

// ── Icons ──────────────────────────────────────────────────────────────────

const DashIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BlogIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const JobIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m8-8H4" />
  </svg>
);

const TplIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const ExtIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
    className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// ── Nav Config  (Add FIRST, List SECOND in every group) ───────────────────

interface SubItem {
  label: string;
  icon: React.ReactNode;
  to: string;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  to?: string;
  subItems?: SubItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <DashIcon />,
    to: ROUTES.ADMIN_DASHBOARD,
  },
  {
    label: 'Jobs',
    icon: <JobIcon />,
    subItems: [
      { label: 'Add Job', icon: <PlusIcon />, to: ROUTES.ADMIN_JOB_CREATE },
      { label: 'All Jobs', icon: <JobIcon />, to: ROUTES.ADMIN_JOBS },
    ],
  },
  {
    label: 'Templates',
    icon: <TplIcon />,
    subItems: [
      { label: 'Add Template', icon: <PlusIcon />, to: ROUTES.ADMIN_TEMPLATE_CREATE },
      { label: 'All Templates', icon: <TplIcon />, to: ROUTES.ADMIN_TEMPLATES },
    ],
  },
  {
    label: 'Blog Management',
    icon: <BlogIcon />,
    subItems: [
      { label: 'New Post', icon: <PlusIcon />, to: ROUTES.ADMIN_BLOG_CREATE },
      { label: 'All Posts', icon: <BlogIcon />, to: ROUTES.ADMIN_BLOGS },
    ],
  },
];

// ── NavRow ─────────────────────────────────────────────────────────────────

interface NavRowProps {
  label: string;
  icon: React.ReactNode;
  to: string;
  isActive: boolean;
  indent?: boolean;
}

const NavRow = ({ label, icon, to, isActive, indent }: NavRowProps) => (
  <Link
    to={to}
    className={`
      flex items-center gap-3.5 w-full text-base font-medium border-b border-[#eef0f4]
      transition-all duration-150 no-underline
      ${indent ? 'pl-12 pr-6 py-4' : 'pl-6 pr-6 py-4'}
      ${isActive
        ? 'bg-[#FBFBFB] text-[#1a56db] font-semibold shadow-[inset_3px_0_0_#1a56db]'
        : 'text-[#3D5170] hover:bg-[#f8fafc] hover:text-[#1a56db]'
      }
    `}
  >
    <span className={`flex flex-shrink-0 transition-colors duration-150 ${isActive ? 'text-[#1a56db]' : 'text-[#CACEDB]'}`}>
      {icon}
    </span>
    <span className="flex-1">{label}</span>
  </Link>
);

// ── NavGroup ───────────────────────────────────────────────────────────────

interface NavGroupProps {
  item: NavItem;
  currentPath: string;
}

const NavGroup = ({ item, currentPath }: NavGroupProps) => {
  const isChildActive = item.subItems?.some(s => s.to === currentPath) ?? false;
  const [open, setOpen] = useState(isChildActive);

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className={`
          flex items-center gap-3.5 w-full text-base font-medium border-b border-[#eef0f4]
          pl-6 pr-6 py-4 transition-all duration-150 text-left
          ${isChildActive
            ? 'bg-[#FBFBFB] text-[#1a56db] font-semibold shadow-[inset_3px_0_0_#1a56db]'
            : 'text-[#3D5170] hover:bg-[#f8fafc] hover:text-[#1a56db]'
          }
        `}
      >
        <span className={`flex flex-shrink-0 transition-colors duration-150 ${isChildActive ? 'text-[#1a56db]' : 'text-[#CACEDB]'}`}>
          {item.icon}
        </span>
        <span className="flex-1">{item.label}</span>
        <ChevronIcon open={open} />
      </button>

      {open && item.subItems?.map((sub, i) => (
        <NavRow
          key={i}
          label={sub.label}
          icon={sub.icon}
          to={sub.to}
          isActive={currentPath === sub.to}
          indent
        />
      ))}
    </>
  );
};

// ── AdminSidebar ───────────────────────────────────────────────────────────

interface Props {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const AdminSidebar = ({ user, open, onLogout }: Props) => {
  const location = useLocation();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'A';

  return (
    <aside
      className={`admin-sidebar${open ? ' admin-sidebar--open' : ''}`}
      aria-label="Admin navigation"
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-6 h-20 border-b border-[#eef0f4] flex-shrink-0">
        <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center no-underline">
          <span className="font-extrabold text-2xl text-[#3D5170] tracking-tight">resume</span>
          <span className="font-extrabold text-2xl text-[#1a56db] tracking-tight">.io</span>
        </Link>
        <span className="text-[0.65rem] font-extrabold text-[#1a56db] uppercase tracking-widest bg-[#eef4ff] border border-[#c7d7fb] px-2.5 py-1 rounded-md leading-none ml-1">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden" aria-label="Primary navigation">
        {NAV_ITEMS.map((item, i) =>
          item.subItems ? (
            <NavGroup key={i} item={item} currentPath={location.pathname} />
          ) : (
            <NavRow
              key={i}
              label={item.label}
              icon={item.icon}
              to={item.to!}
              isActive={location.pathname === item.to}
            />
          )
        )}
      </nav>

      {/* Footer */}
      <div className="px-5 pt-4 pb-5 border-t border-[#eef0f4] flex-shrink-0">
        {/* View live site */}
        <Link
          to={ROUTES.HOME ?? '/'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-3 text-sm text-slate-500 font-medium no-underline hover:bg-slate-50 hover:text-[#3D5170] transition-all duration-150"
        >
          <span className="text-slate-400 flex"><ExtIcon /></span>
          View live site
        </Link>

        {/* User card */}
        <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-[#F5F6F8]">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a56db] to-[#1e3a8a] text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 tracking-wide shadow-[0_2px_8px_rgba(26,86,219,0.25)]">
            {initials}
          </div>

          {/* Name + role */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base text-[#3D5170] m-0 truncate leading-snug">
              {user?.name ?? 'Admin'}
            </p>
            <p className="text-xs text-[#818EA3] mt-0.5 m-0 leading-none">
              Administrator
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            title="Sign out"
            aria-label="Sign out"
            className="flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150 flex-shrink-0 border-none bg-transparent cursor-pointer"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;