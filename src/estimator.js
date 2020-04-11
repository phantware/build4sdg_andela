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

export default covid19ImpactEstimator;
