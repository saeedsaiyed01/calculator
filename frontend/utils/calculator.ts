export interface CalculatorInputs {
  initialPrice: number;
  investmentPeriod: number;
  yearlyRent: number;
  rentIncrease: number;
  propertyTax: number;
  maintenance: number;
  finalPrice: number;
  loanAmount: number;
  loanTenureCompleted: number;
  totalLoanTenure: number;
  interestRate: number;
}

export interface CalculatorResults {
  monthlyEMI: number;
  interestPaid: number;
  totalRent: number;
  totalTax: number;
  totalMaintenance: number;
  netCashFlow: number;
  netGain: number;
  cagr: number;
}

export function calculateRealEstateCAGR(inputs: CalculatorInputs): CalculatorResults | { error: string } {
  try {
    const {
      initialPrice, investmentPeriod, yearlyRent, rentIncrease,
      propertyTax, maintenance, finalPrice, loanAmount,
      loanTenureCompleted, totalLoanTenure, interestRate
    } = inputs;

    const monthlyRate = interestRate / 12;
    const totalMonths = totalLoanTenure * 12;
    const completedMonths = loanTenureCompleted * 12;

    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

    let interestPaidTillNow = 0;
    let principal = loanAmount;
    for (let i = 0; i < completedMonths; i++) {
      let interestForMonth = principal * monthlyRate;
      interestPaidTillNow += interestForMonth;
      let principalPaid = emi - interestForMonth;
      principal -= principalPaid;
    }

    let totalRent: number;
    if (rentIncrease === 0) {
      totalRent = yearlyRent * investmentPeriod;
    } else {
      const r = 1 + rentIncrease;
      totalRent = yearlyRent * (Math.pow(r, investmentPeriod) - 1) / (r - 1);
    }

    const totalPropertyTax = propertyTax * investmentPeriod;
    const totalMaintenance = maintenance * investmentPeriod;
    const netCashFlow = totalRent - totalPropertyTax - totalMaintenance;
    const propertyGain = finalPrice - initialPrice;
    const netGain = propertyGain + netCashFlow - interestPaidTillNow;
    const beginningValue = initialPrice;
    const endingValue = initialPrice + netGain;
    const n = investmentPeriod;
    const cagr = Math.pow(endingValue / beginningValue, 1 / n) - 1;

    return {
      monthlyEMI: emi, interestPaid: interestPaidTillNow, totalRent: totalRent,
      totalTax: totalPropertyTax, totalMaintenance: totalMaintenance,
      netCashFlow: netCashFlow, netGain: netGain, cagr: cagr * 100,
    };
  } catch (e) {
    console.error("Calculation Error:", e);
    return { error: (e as Error).message || "Failed to calculate. Check inputs." };
  }
}