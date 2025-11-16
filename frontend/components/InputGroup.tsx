import React from 'react';

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, id, ...props }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-1.5 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  </div>
);

export default InputGroup;