const occupationData = {
  Employed: 300,
  'Self-employed': 250,
  Student: 100,
};

const childCostData = 30;
const houseHoldDenominator = 40;
const liabilityDenominator = 50;
const currency = 'EU';

const recommendationEngine = (params) => {
  const { children, childrenNumber, occupation } = params;
  const insuranceData = {
    'Personal Liability': occupationData[occupation] / liabilityDenominator,
    'Health Insurance': 1,
    'Household Content': occupationData[occupation] / houseHoldDenominator,
    Currency: currency,
  };
  if (children) {
    insuranceData['Health Insurance'] =
      occupationData[occupation] + childrenNumber * childCostData;
  } else {
    insuranceData['Health Insurance'] = occupationData[occupation];
  }
  return insuranceData;
};

export default recommendationEngine;
