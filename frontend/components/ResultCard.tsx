import React from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  isPrimary?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ label, value, isPrimary = false }) => (
  <div className={`flex flex-col p-4 rounded-lg ${isPrimary ? 'bg-blue-600' : 'bg-gray-100'}`}>
    <span className={`text-sm font-medium ${isPrimary ? 'text-blue-100' : 'text-gray-600'}`}>
      {label}
    </span>
    <span className={`text-2xl font-bold ${isPrimary ? 'text-white' : 'text-blue-800'}`}>
      {value}
    </span>
  </div>
);

export default ResultCard;