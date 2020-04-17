import express from 'express';
import patientRecordController from '../controllers/infected';
import patientRecordMiddleware from '../middleware/infected';

const router = express.Router();
router.post(
  '/api/v1/on-covid-19',
  patientRecordMiddleware.patientRecord,
  patientRecordController.patientRecord
);
router.post(
  '/api/v1/on-covid-19/logs/:type',
  patientRecordController.patientRecordLogs
);

export default router;
