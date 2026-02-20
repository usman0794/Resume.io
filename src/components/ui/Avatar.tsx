type Size = 'sm' | 'md';

interface AvatarProps {
  initials:   string;
  size?:      Size;
  className?: string;
}

const Avatar = ({ initials, size = 'md', className = '' }: AvatarProps) => (
  <div className={`avatar avatar--${size} ${className}`.trim()}>
    {initials}
  </div>
);

export default Avatar;
