interface SalaryRangeProps {
  value: string;
  onChange: (v: string) => void;
}

const SalaryRange = ({ value, onChange }: SalaryRangeProps) => (
  <div>
    <label className="form-label">Salary Range</label>
    <input
      name="salary_range"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="e.g. PKR 80k–120k / month"
      className="form-input"
    />
    <p className="form-hint">Enter as free text, e.g. "PKR 80k–120k"</p>
  </div>
);

export default SalaryRange;
