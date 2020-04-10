const computeInfectionsByRequestedTime = (currentlyInfected, days) => {
  const factor = 2 ** ((1 / 3) * days);
  return currentlyInfected * factor;
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;
  // eslint-disable-next-line no-console
  console.log('computing...', reportedCases);

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: computeInfectionsByRequestedTime(
        currentlyInfectedImpact,
        30
      )
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: computeInfectionsByRequestedTime(
        currentlyInfectedSevereImpact,
        30
      )
    }
  };
};
const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
const res = covid19ImpactEstimator(input);
// eslint-disable-next-line no-console
console.log(JSON.stringify(res, null, 2));

// eslint-disable-next-line no-console
console.log(computeInfectionsByRequestedTime(1, 3));

export default covid19ImpactEstimator;


