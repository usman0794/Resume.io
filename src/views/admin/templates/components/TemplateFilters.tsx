import { Input } from '@/components/ui';

interface Props {
  searchTerm: string;
  onSearch:   (val: string) => void;
}

const TemplateFilters = ({ searchTerm, onSearch }: Props) => (
  <div className="table-filters" style={{ marginBottom: 16, background: 'var(--clr-surface)', borderRadius: 'var(--radius-card)', border: '1px solid var(--clr-border)', padding: '14px 18px' }}>
    <Input
      withSearchIcon
      wide
      type="text"
      placeholder="Search templates by name or tag…"
      value={searchTerm}
      onChange={e => onSearch(e.target.value)}
    />
    {searchTerm && (
      <span className="table-filters__count">
        Searching: &ldquo;{searchTerm}&rdquo;
      </span>
    )}
  </div>
);

export default TemplateFilters;
