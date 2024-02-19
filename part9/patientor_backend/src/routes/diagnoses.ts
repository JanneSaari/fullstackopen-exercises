import express from 'express';
import diagnoses from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = diagnoses.getEntries();
  res.send(data);
  // res.send('Fetching all diaries!');
});

// router.post('/', (_req, res) => {
//   res.send('Saving a diary!');
// });

export default router;