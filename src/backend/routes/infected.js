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
  patientRecordMiddleware.patientRecordLogs,
  patientRecordController.patientRecordLogs
);

router.get('/api/v1/on-covid-19/logs', patientRecordController.getLogs);

export default router;
