/* eslint-disable newline-per-chained-call */
import Joi from '@hapi/joi';

class PatientRecordValidation {
  static async patientRecord(req, res, next) {
    const schema = Joi.object({
      region: {
        name: Joi.string().trim().required(),
        avgAge: Joi.number().required(),
        avgDailyIncomeInUSD: Joi.number().required(),
        avgDailyIncomePopulation: Joi.number().required()
      },
      periodType: Joi.string().required(),
      timeToElapse: Joi.number().required(),
      reportedCases: Joi.number().required(),
      population: Joi.number().required(),
      totalHospitalBeds: Joi.number().required()
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((e) => ({ message: e.message }));
      return res.status(400).send({ errors });
    }
    req.body = { ...value };
    return next();
  }

  static async patientRecordJson(req, res, next) {
    const schema = Joi.object({
      region: {
        name: Joi.string().trim().required(),
        avgAge: Joi.number().required(),
        avgDailyIncomeInUSD: Joi.number().required(),
        avgDailyIncomePopulation: Joi.number().required()
      },
      periodType: Joi.string().required(),
      timeToElapse: Joi.number().required(),
      reportedCases: Joi.number().required(),
      population: Joi.number().required(),
      totalHospitalBeds: Joi.number().required()
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((e) => ({ message: e.message }));
      return res.status(400).send({ errors });
    }
    req.body = { ...value };
    return next();
  }

  static async patientRecordXml(req, res, next) {
    const schema = Joi.object({
      region: {
        name: Joi.string().trim().required(),
        avgAge: Joi.number().required(),
        avgDailyIncomeInUSD: Joi.number().required(),
        avgDailyIncomePopulation: Joi.number().required()
      },
      periodType: Joi.string().required(),
      timeToElapse: Joi.number().required(),
      reportedCases: Joi.number().required(),
      population: Joi.number().required(),
      totalHospitalBeds: Joi.number().required()
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((e) => ({ message: e.message }));
      return res.status(400).send({ errors });
    }
    req.body = { ...value };
    return next();
  }
}

export default PatientRecordValidation;
