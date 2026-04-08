/**
 * Component: ColumnIcon
 *
 * Purpose:
 *   Renders the correct icon for each kanban column header.
 *   Maps iconType string → lucide-react icon component.
 *
 * Design Intent:
 *   Icons match resume.io reference exactly:
 *   heart (Shortlist), sparkles (Auto Apply), briefcase (Applied),
 *   users (Interview), check-circle (Offer), x-circle (Rejected).
 */

import React from 'react';
import {
  Heart, Sparkles, Briefcase,
  Users, CheckCircle, XCircle,
} from 'lucide-react';

interface ColumnIconProps {
  type: string;
  size?: number;
  color?: string;
}

const ColumnIcon: React.FC<ColumnIconProps> = ({ type, size = 16, color = 'currentColor' }) => {
  switch (type) {
    case 'heart': return <Heart size={size} color={color} strokeWidth={2} />;
    case 'auto': return <Sparkles size={size} color={color} strokeWidth={2} />;
    case 'briefcase': return <Briefcase size={size} color={color} strokeWidth={2} />;
    case 'interview': return <Users size={size} color={color} strokeWidth={2} />;
    case 'offer': return <CheckCircle size={size} color={color} strokeWidth={2} />;
    case 'reject': return <XCircle size={size} color={color} strokeWidth={2} />;
    default: return <Briefcase size={size} color={color} strokeWidth={2} />;
  }
};

export default ColumnIcon;
