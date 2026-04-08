import { Input } from '@/components/ui';

interface BlogFiltersProps {
  searchTerm:  string;
  onSearch:    (val: string) => void;
  resultCount: number;
  totalCount:  number;
}

const BlogFilters: React.FC<BlogFiltersProps> = ({ searchTerm, onSearch, resultCount, totalCount }) => (
  <div className="table-filters">
    <Input
      withSearchIcon
      type="text"
      placeholder="Search posts…"
      value={searchTerm}
      onChange={e => onSearch(e.target.value)}
    />
    {searchTerm && (
      <span className="table-filters__count">
        {resultCount} of {totalCount} result{resultCount !== 1 ? 's' : ''}
      </span>
    )}
  </div>
);

export default BlogFilters;
