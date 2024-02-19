import express from 'express';
import patients from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patients.getNonSensitiveEntries();
  res.send(data);
});

export default router;