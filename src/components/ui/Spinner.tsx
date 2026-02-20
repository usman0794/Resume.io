interface SpinnerProps {
  color?: 'primary' | 'green' | 'orange';
  text?:  string;
}

const Spinner = ({ color = 'primary', text }: SpinnerProps) => (
  <div className="loading-state">
    <div className={`spinner spinner--md ${color !== 'primary' ? `spinner--${color}` : ''}`.trim()} />
    {text && <p className="loading-state__text">{text}</p>}
  </div>
);

export default Spinner;
