import React from 'react';

interface JobStatusToggleProps {
  isActive: boolean;
  onChange: (value: boolean) => void;
}

const JobStatusToggle: React.FC<JobStatusToggleProps> = ({ isActive, onChange }) => (
  <div className="jst-wrap">
    <span className="jst-label">Status</span>
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      className={`jst-toggle${isActive ? ' jst-toggle--on' : ''}`}
      onClick={() => onChange(!isActive)}
    >
      <span className="jst-thumb" />
    </button>
    <span className={`jst-status${isActive ? ' jst-status--active' : ''}`}>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  </div>
);

export default JobStatusToggle;
