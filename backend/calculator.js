function calculateRealEstateCAGR(inputs) {
  try {
    const {
      initialPrice, investmentPeriod, yearlyRent, rentIncrease,
      propertyTax, maintenance, finalPrice, loanAmount,
      loanTenureCompleted, totalLoanTenure, interestRate
    } = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, parseFloat(value)])
    );

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

    let totalRent;
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
    return { error: e.message || "Failed to calculate. Check inputs." };
  }
}

module.exports = { calculateRealEstateCAGR };