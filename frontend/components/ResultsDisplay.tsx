import React from 'react';
import { CalculatorResults } from '../utils/calculator';
import ResultCard from './ResultCard';

interface ResultsDisplayProps {
  results: CalculatorResults | null;
  loading: boolean;
  error: string | null;
  format: (type: 'currency' | 'percent', value: number) => string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, loading, error, format }) => (
  <div className="p-6 md:p-8 bg-gray-50 border-t lg:border-t-0 lg:border-l">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
      Your Investment Results
    </h2>

    {loading && (
      <div className="text-center p-12">
        <p className="text-gray-600 animate-pulse">Calculating...</p>
      </div>
    )}

    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        <strong className="font-bold">Error: </strong>
        <span>{error}</span>
      </div>
    )}

    {results && !error && (
      <div className="flex flex-col gap-4">
        <ResultCard
          label="Net Investment CAGR"
          value={format('percent', results.cagr)}
          isPrimary={true}
        />
        <ResultCard
          label="Net Gain (Total Profit)"
          value={format('currency', results.netGain)}
          isPrimary={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t mt-4">
          <ResultCard label="Monthly EMI" value={format('currency', results.monthlyEMI)} />
          <ResultCard label="Total Interest Paid" value={format('currency', results.interestPaid)} />
          <ResultCard label="Net Cash Flow (from Rent)" value={format('currency', results.netCashFlow)} />
          <ResultCard label="Total Rent Over Period" value={format('currency', results.totalRent)} />
        </div>
      </div>
    )}

    {!loading && !error && !results && (
      <div className="text-center p-12 text-gray-500">
        <p>Enter your investment details and click "Calculate" to see your results.</p>
      </div>
    )}
  </div>
);

export default ResultsDisplay;