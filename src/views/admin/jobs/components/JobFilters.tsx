import { Input } from '@/components/ui';

interface JobFiltersProps {
  searchTerm: string;
  onSearch:   (v: string) => void;
  resultCount: number;
  showCount:  boolean;
}

const JobFilters = ({ searchTerm, onSearch, resultCount, showCount }: JobFiltersProps) => (
  <div className="table-filters">
    <Input
      withSearchIcon
      wide
      type="text"
      placeholder="Search jobs or companies…"
      value={searchTerm}
      onChange={e => onSearch(e.target.value)}
    />
    {showCount && searchTerm && (
      <span className="table-filters__count">
        {resultCount} result{resultCount !== 1 ? 's' : ''}
      </span>
    )}
  </div>
);

export default JobFilters;
