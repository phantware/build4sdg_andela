// /* eslint-disable newline-per-chained-call */
// import Joi from '@hapi/joi';

// class PatientRecordValidation {
//   static async patientRecord(req, res, next) {
//     const schema = Joi.object({
//       periodType: Joi.string().min(3).max(10).trim().lowercase().required(),
//       timeToElapse: Joi.number().min(1).required(),
//       reportedCases: Joi.number().min(1).required(),
//       population: Joi.number().min(1).required(),
//       totalHospitalBeds: Joi.number().min(1).required()
//     });
//     const { error, value } = schema.validate(req.body, { abortEarly: false });
//     if (error) {
//       const errors = error.details.map((e) => ({ message: e.message }));
//       return res.status(400).send({ errors });
//     }
//     req.body = { ...value };
//     return next();
//   }

//   static async patientRecordJson(req, res, next) {
//     const schema = Joi.object({
//       periodType: Joi.string().min(3).max(10).trim().lowercase().required(),
//       timeToElapse: Joi.number().min(1).required(),
//       reportedCases: Joi.number().min(1).required(),
//       population: Joi.number().min(1).required(),
//       totalHospitalBeds: Joi.number().min(1).required()
//     });
//     const { error, value } = schema.validate(req.body, { abortEarly: false });
//     if (error) {
//       const errors = error.details.map((e) => ({ message: e.message }));
//       return res.status(400).send({ errors });
//     }
//     req.body = { ...value };
//     return next();
//   }

//   static async patientRecordXml(req, res, next) {
//     const schema = Joi.object({
//       periodType: Joi.string().min(3).max(10).trim().lowercase().required(),
//       timeToElapse: Joi.number().min(1).required(),
//       reportedCases: Joi.number().min(1).required(),
//       population: Joi.number().min(1).required(),
//       totalHospitalBeds: Joi.number().min(1).required()
//     });
//     const { error, value } = schema.validate(req.body, { abortEarly: false });
//     if (error) {
//       const errors = error.details.map((e) => ({ message: e.message }));
//       return res.status(400).send({ errors });
//     }
//     req.body = { ...value };
//     return next();
//   }
// }

// export default PatientRecordValidation;
