import React from 'react';
import { CalculatorInputs } from '../utils/calculator';
import InputGroup from './InputGroup';

interface InputFormProps {
  inputs: CalculatorInputs;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ inputs, onInputChange, onSubmit, loading }) => (
  <form onSubmit={onSubmit} className="p-6 md:p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <h2 className="md:col-span-2 text-xl font-semibold text-blue-700 border-b pb-2 mb-2">
        Property & Income
      </h2>
      <InputGroup label="Initial Property Price" id="initialPrice" name="initialPrice" type="number" step="1000" value={inputs.initialPrice} onChange={onInputChange} />
      <InputGroup label="Property Price After Period" id="finalPrice" name="finalPrice" type="number" step="1000" value={inputs.finalPrice} onChange={onInputChange} />
      <InputGroup label="Investment Period (Years)" id="investmentPeriod" name="investmentPeriod" type="number" value={inputs.investmentPeriod} onChange={onInputChange} />
      <InputGroup label="Yearly Rent Amount" id="yearlyRent" name="yearlyRent" type="number" step="100" value={inputs.yearlyRent} onChange={onInputChange} />
      <InputGroup label="Increase in Rent (% Yearly)" id="rentIncrease" name="rentIncrease" type="number" step="0.01" value={inputs.rentIncrease} onChange={onInputChange} />
      <InputGroup label="Property Tax (Yearly)" id="propertyTax" name="propertyTax" type="number" step="10" value={inputs.propertyTax} onChange={onInputChange} />
      <InputGroup label="Maintenance Cost (Yearly)" id="maintenance" name="maintenance" type="number" step="10" value={inputs.maintenance} onChange={onInputChange} />

      <h2 className="md:col-span-2 text-xl font-semibold text-blue-700 border-b pb-2 mt-6 mb-2">
        Loan Details
      </h2>
      <InputGroup label="Loan Amount" id="loanAmount" name="loanAmount" type="number" step="1000" value={inputs.loanAmount} onChange={onInputChange} />
      <InputGroup label="Interest Rate on Loan (%)" id="interestRate" name="interestRate" type="number" step="0.001" value={inputs.interestRate} onChange={onInputChange} />
      <InputGroup label="Total Loan Tenure (Years)" id="totalLoanTenure" name="totalLoanTenure" type="number" value={inputs.totalLoanTenure} onChange={onInputChange} />
      <InputGroup label="Loan Tenure Completed (Years)" id="loanTenureCompleted" name="loanTenureCompleted" type="number" value={inputs.loanTenureCompleted} onChange={onInputChange} />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {loading ? 'Calculating...' : 'Calculate Investment CAGR'}
    </button>
  </form>
);

export default InputForm;