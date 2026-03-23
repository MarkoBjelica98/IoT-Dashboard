import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  addSensorData,
  generateSensorData,
  getLatestSensorData,
  getSensorHistory,
  cleanupSensorData,
  deleteAllSensorData,
} from '../controllers/sensorController.js';

const router = express.Router();

router.post('/data', authMiddleware, addSensorData);
router.post('/generate', authMiddleware, generateSensorData);
router.get('/latest', authMiddleware, getLatestSensorData);
router.get('/history', authMiddleware, getSensorHistory);
router.delete('/cleanup', authMiddleware, cleanupSensorData);
router.delete('/all', authMiddleware, deleteAllSensorData);

export default router;
