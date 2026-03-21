import React, { useMemo } from 'react';

interface PasswordStrengthBarProps {
  password: string;
}

type Strength = 'weak' | 'fair' | 'good' | 'strong';

interface StrengthResult {
  level: Strength;
  score: number; // 1-4
  label: string;
  color: string;
}

function getStrength(password: string): StrengthResult {
  if (!password) return { level: 'weak', score: 0, label: '', color: '' };

  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 'weak',   score: 1, label: 'Weak',   color: '#ef4444' };
  if (score === 2) return { level: 'fair',   score: 2, label: 'Fair',   color: '#f97316' };
  if (score === 3) return { level: 'good',   score: 3, label: 'Good',   color: '#3b82f6' };
  return              { level: 'strong', score: 4, label: 'Strong', color: '#22c55e' };
}

const SEGMENTS = 4;

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ password }) => {
  const strength = useMemo(() => getStrength(password), [password]);

  if (!password) return null;

  return (
    <div className="mt-2 w-full">
      {/* Segment bar */}
      <div className="flex items-center gap-1 mb-1.5">
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i < strength.score ? strength.color : '#e5e7eb',
            }}
          />
        ))}
      </div>

      {/* Label */}
      <p className="text-xs font-medium transition-colors" style={{ color: strength.color }}>
        {strength.label} password
      </p>
    </div>
  );
};

export default PasswordStrengthBar;
