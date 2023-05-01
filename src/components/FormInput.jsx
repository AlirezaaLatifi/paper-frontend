import { useState } from 'react';

function FormInput({
  name,
  type,
  label,
  placeholder,
  required,
  errorMessage,
  pattern,
  onChange,
  value,
}) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  return (
    <label className="group flex flex-col gap-2 text-sm font-medium dark:text-white">
      <span className="text-gray-500 group-focus-within:text-black">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        value={value}
        onChange={onChange}
        onBlur={() => setShowErrorMessage(true)}
        data-blur={showErrorMessage}
        className={`peer block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
          name === 'confirmPassword'
            ? 'focus:invalid:border-red-500'
            : 'data-[blur=true]:invalid:border-red-500'
        } ${
          name === 'password' || name === 'confirmPassword'
            ? 'tracking-widest'
            : ''
        }`}
      />
      <span
        className={`hidden text-red-500 ${
          name === 'confirmPassword'
            ? 'peer-focus:peer-invalid:inline'
            : 'peer-invalid:peer-data-[blur=true]:inline'
        }`}
      >
        {errorMessage}
      </span>
    </label>
  );
}

export default FormInput;
