import SalaryRange from './SalaryRange';

const JOB_TYPES = ['full-time', 'part-time', 'contract', 'remote', 'internship'] as const;

export interface JobFormData {
  title: string;
  company_name: string;
  company_address: string;
  job_type: string;
  salary_range: string;
  closing_date: string;
  source: string;
  source_url: string;
  description: string;
}

interface JobFormFieldsProps {
  form: JobFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSalaryChange: (v: string) => void;
}

const JobFormFields = ({ form, onChange, onSalaryChange }: JobFormFieldsProps) => (
  <div>
    {/* Job Title */}
    <div className="form-field">
      <label className="form-label">
        Job Title <span className="form-label__req">*</span>
      </label>
      <input
        name="title"
        value={form.title}
        onChange={onChange}
        required
        placeholder="e.g. Senior Laravel Developer"
        className="form-input"
      />
    </div>

    {/* Company + Location */}
    <div className="form-field form-field--half">
      <div>
        <label className="form-label">
          Company Name <span className="form-label__req">*</span>
        </label>
        <input
          name="company_name"
          value={form.company_name}
          onChange={onChange}
          required
          placeholder="e.g. Acme Corp"
          className="form-input"
        />
      </div>
      <div>
        <label className="form-label">Location</label>
        <input
          name="company_address"
          value={form.company_address}
          onChange={onChange}
          placeholder="e.g. Lahore, Pakistan"
          className="form-input"
        />
      </div>
    </div>

    {/* Type + Salary */}
    <div className="form-field form-field--half">
      <div>
        <label className="form-label">
          Job Type <span className="form-label__req">*</span>
        </label>
        <select name="job_type" value={form.job_type} onChange={onChange} className="form-input form-select">
          {JOB_TYPES.map(t => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>
      <SalaryRange value={form.salary_range} onChange={onSalaryChange} />
    </div>

    {/* Closing date */}
    <div className="form-field">
      <label className="form-label">Closing Date</label>
      <input
        type="date"
        name="closing_date"
        value={form.closing_date}
        onChange={onChange}
        className="form-input"
      />
    </div>

    {/* Source + URL */}
    <div className="form-field form-field--half">
      <div>
        <label className="form-label">Source</label>
        <input
          name="source"
          value={form.source}
          onChange={onChange}
          placeholder="e.g. rozee, linkedin"
          className="form-input"
        />
      </div>
      <div>
        <label className="form-label">Source URL</label>
        <input
          type="url"
          name="source_url"
          value={form.source_url}
          onChange={onChange}
          placeholder="https://rozee.pk/job/..."
          className="form-input"
        />
      </div>
    </div>

    {/* Description */}
    <div className="form-field">
      <label className="form-label">
        Description <span className="form-label__req">*</span>
      </label>
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        required
        rows={8}
        placeholder="Full job description, requirements, responsibilities…"
        className="form-input form-input--textarea"
      />
    </div>
  </div>
);

export default JobFormFields;
