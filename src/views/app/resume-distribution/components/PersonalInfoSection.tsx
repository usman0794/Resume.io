import React from 'react';

interface PersonalInfo {
  firstName      : string;
  lastName       : string;
  jobTitle       : string;
  currentLocation: string;
  email          : string;
}

interface PersonalInfoSectionProps {
  values  : PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

const Field = ({
  label, id, value, onChange, type = 'text', placeholder,
}: {
  label: string; id: string; value: string;
  onChange: (v: string) => void; type?: string; placeholder?: string;
}) => (
  <div className="rdc-field">
    <label htmlFor={id} className="rdc-field__label">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className="rdc-field__input"
    />
  </div>
);

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ values, onChange }) => (
  <section className="rdc-section">
    <h2 className="rdc-section__title">Personal Information</h2>

    <div className="rdc-grid-2">
      <Field id="firstName"       label="First Name"       value={values.firstName}       onChange={v => onChange('firstName', v)}       placeholder="e.g. John" />
      <Field id="lastName"        label="Last Name"        value={values.lastName}        onChange={v => onChange('lastName', v)}        placeholder="e.g. Smith" />
    </div>

    <Field id="jobTitle"          label="Current Job Title" value={values.jobTitle}        onChange={v => onChange('jobTitle', v)}        placeholder="e.g. Software Engineer" />
    <Field id="currentLocation"   label="Current Location"  value={values.currentLocation} onChange={v => onChange('currentLocation', v)} placeholder="e.g. New York, NY" />
    <Field id="email" type="email" label="Email Address"    value={values.email}           onChange={v => onChange('email', v)}           placeholder="e.g. john@example.com" />
  </section>
);

export default PersonalInfoSection;
