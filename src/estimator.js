const computeInfectionsByRequestedTime = (
  currentlyInfected,
  periodDuration,
  pType
) => {
  let factor;
  const periodType = pType.toLowerCase();
  if (periodType === 'days') {
    factor = Math.floor(2 ** (1 / 3) * periodDuration);
  } else if (periodType === 'weeks') {
    factor = Math.floor(2 ** (1 / 3) * periodDuration * 7);
  } else if (periodType === 'months') {
    factor = Math.floor(2 ** (1 / 3) * periodDuration * 30);
  } else {
    factor = 'unknown period';
  }
  return typeof factor === 'string' ? factor : currentlyInfected * factor;
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;

  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;
  const infectionsByRequestedTimeImpact = computeInfectionsByRequestedTime(
    currentlyInfectedImpact,
    timeToElapse,
    periodType
  );
  const infectionsByRequestedTimeSevereImpact = computeInfectionsByRequestedTime(
    currentlyInfectedSevereImpact,
    timeToElapse,
    periodType
  );

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact
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
  periodType: 'weeks',
  timeToElapse: 1,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

console.log(covid19ImpactEstimator(input));

export default covid19ImpactEstimator;

/**
 * 1 week
  impact: { currentlyInfected: 6740, infectionsByRequestedTime: 53920 },
  severeImpact: { currentlyInfected: 33700, infectionsByRequestedTime: 269600 }

  7 days

 */
