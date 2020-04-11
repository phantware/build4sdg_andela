const computeInfectionsByRequestedTime = (
  currentlyInfected,
  periodDuration,
  pType
) => {
  let factor;
  const periodType = pType.toLowerCase();
  if (periodType === 'days') {
    factor = 2 ** ((1 / 3) * periodDuration);
  } else if (periodType === 'weeks') {
    factor = 2 ** ((1 / 3) * periodDuration * 7);
  } else if (periodType === 'months') {
    factor = 2 ** ((1 / 3) * periodDuration * 30);
  } else {
    factor = 'unknown period';
  }
  return typeof factor === 'string' ? factor : currentlyInfected * factor;
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: computeInfectionsByRequestedTime(
        currentlyInfectedImpact,
        timeToElapse,
        periodType
      )
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: computeInfectionsByRequestedTime(
        currentlyInfectedSevereImpact,
        timeToElapse,
        periodType
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
  periodType: 'dAYs',
  timeToElapse: 28,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

console.log(covid19ImpactEstimator(input));

export default covid19ImpactEstimator;
