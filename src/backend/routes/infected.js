import express from 'express';
import patientRecordController from '../controllers/infected';
import patientRecordMiddleware from '../middleware/infected';

const router = express.Router();
router.post(
  '/api/v1/on-covid-19/',
  patientRecordMiddleware.patientRecord,
  patientRecordController.patientRecord
);
router.post(
  '/api/v1/on-covid-19/json',
  patientRecordMiddleware.patientRecordJson,
  patientRecordController.patientRecordJson
);
router.post(
  '/api/v1/on-covid-19/xml',
  patientRecordMiddleware.patientRecordXml,
  patientRecordController.patientRecordXml
);
router.get('/api/v1/on-covid-19/logs', patientRecordController.getLogs);

export default router;
