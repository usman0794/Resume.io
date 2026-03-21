/**
 * Component: CreateJobAlert
 *
 * Purpose:
 *   Small blue-text link row that lets users subscribe to job alert
 *   notifications for the current search query.
 *
 * Responsibilities:
 *   - Bell icon + "Create job alert" text link
 *   - Fires onClick callback
 *
 * Design Intent:
 *   Matches resume.io exact style: bell icon (#1A91F0), blue text,
 *   no underline, 14px. Sits below the tabs bar.
 */

import React from 'react';
import { Bell } from 'lucide-react';

interface CreateJobAlertProps {
  onClick?: () => void;
}

const CreateJobAlert: React.FC<CreateJobAlertProps> = ({ onClick }) => (
  <button className="cja-btn" onClick={onClick} aria-label="Create job alert">
    <Bell size={16} color="#1A91F0" strokeWidth={2} />
    <span className="cja-label">Create job alert</span>
  </button>
);

export default CreateJobAlert;
