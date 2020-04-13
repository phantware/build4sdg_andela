const covid19ImpactEstimator = (data) => {
  // Challenge 1
  let factor;
  const periodDuration = data.timeToElapse;
  const impact = {};
  const severeImpact = {};
  if (data.periodType === 'days') {
    factor = Math.floor(periodDuration / 3);
  } else if (data.periodType === 'weeks') {
    factor = Math.floor((7 * periodDuration) / 3);
  } else if (data.periodType === 'months') {
    factor = Math.floor((30 * periodDuration) / 3);
  }
  // impact estimation
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  // severe impact estimation
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** factor;
  // Challenge 2
  // impact estimation
  impact.severeCasesByRequestedTime = Math.floor(
    0.15 * impact.infectionsByRequestedTime
  );
  impact.totalBeds = Math.floor(impact.totalHospitalBeds * 0.35);
  impact.impactHospitalBedsByRequestedTime = Math.floor(
    impact.totalBeds - impact.severeCasesByRequestedTime
  );
  // severe impact estimation
  severeImpact.severeCasesByRequestedTime = Math.floor(
    0.15 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.totalBeds = Math.floor(severeImpact.totalHospitalBeds * 0.35);
  severeImpact.impactHospitalBedsByRequestedTime = Math.floor(
    severeImpact.totalBeds - severeImpact.severeCasesByRequestedTime
  );

  const output = {
    data,
    impact,
    severeImpact
  };
  return output;
};

export default covid19ImpactEstimator;
