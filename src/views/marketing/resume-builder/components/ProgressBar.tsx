interface ProgressBarProps {
  progress: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = 'bg-orange-500' }) => (
  <div className="w-full bg-gray-200 h-1 rounded mb-4 mt-2">
    <div className={`${color} h-1 rounded transition-all duration-300`} style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
  </div>
);

export default ProgressBar;
