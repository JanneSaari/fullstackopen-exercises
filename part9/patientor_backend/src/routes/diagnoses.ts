import express from 'express';
import diagnoses from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = diagnoses.getEntries();
  res.send(data);
});

export default router;