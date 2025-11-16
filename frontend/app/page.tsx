'use client';

import { useState } from 'react';
import InputForm from '../components/InputForm';
import ResultsDisplay from '../components/ResultsDisplay';
import type { CalculatorInputs, CalculatorResults } from '../utils/calculator';
import { calculateRealEstateCAGR } from '../utils/calculator';

export default function Home() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialPrice: 3400000,
    investmentPeriod: 10,
    yearlyRent: 144000,
    rentIncrease: 0.05,
    propertyTax: 2000,
    maintenance: 10000,
    finalPrice: 6000000,
    loanAmount: 3000000,
    loanTenureCompleted: 5,
    totalLoanTenure: 10,
    interestRate: 0.085,
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const format = (type: 'currency' | 'percent', value: number): string => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    switch (type) {
      case 'currency':
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
      case 'percent':
        return `${value.toFixed(4)}%`;
      default:
        return value.toString();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    await new Promise(res => setTimeout(res, 500));

    const calcResults = calculateRealEstateCAGR(inputs);
    if ('error' in calcResults) {
      setError(calcResults.error);
    } else {
      setResults(calcResults);
    }
    setLoading(false);
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-800 text-center p-6 bg-gray-100 border-b">
          Real Estate Investment (CAGR) Calculator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <InputForm
            inputs={inputs}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            loading={loading}
          />
          <ResultsDisplay
            results={results}
            loading={loading}
            error={error}
            format={format}
          />
        </div>
      </div>
    </div>
  );
}