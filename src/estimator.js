const covid19ImpactEstimator = (data) => {
  let factor;
  const periodDuration = data.timeToElapse;
  const impact = {};
  const severeImpact = {};
  if (data.periodType === 'days') {
    factor = Math.floor(periodDuration / 3);
  } else if (data.periodType === 'weeks') {
    factor = Math.floor((7 * periodDuration) / 3);
  } else if (data.periodType === 'month') {
    factor = Math.floor((30 * periodDuration) / 3);
  }
  impact.currentlyInfacted = ((data.reportedCases) * 10);
  severeImpact.currentlyInfacted = ((data.reportedCases) * 50);
  impact.infectionByRequestedTime = (impact.currentlyInfected * (2 ** factor));
  severeImpact.infectionByRequestedTime = (severeImpact.currentlyInfected * (2 ** factor));

  const output = {
    data,
    impact,
    severeImpact
  };
  return output;
};

export default covid19ImpactEstimator;
