const computeInfectionsByRequestedTime = (currentlyInfected, days) => {
  const factor = 2 ** ((1 / 3) * days);
  return currentlyInfected * factor;
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: computeInfectionsByRequestedTime(
        currentlyInfectedImpact,
        7
      )
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: computeInfectionsByRequestedTime(
        currentlyInfectedSevereImpact,
        7
      )
    }
  };
};

export default covid19ImpactEstimator;
