import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  withSearchIcon?: boolean;
  wide?:           boolean;
}

const SearchIcon = () => (
  <svg className="input-icon" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ withSearchIcon, wide, className = '', ...props }, ref) => {
    if (withSearchIcon) {
      return (
        <div className="input-search-wrap">
          <SearchIcon />
          <input
            ref={ref}
            className={`input ${wide ? 'input--wide' : ''} ${className}`.trim()}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={`input ${className}`.trim()}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
