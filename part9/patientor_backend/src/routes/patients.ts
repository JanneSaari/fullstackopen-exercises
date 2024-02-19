import express from 'express';
import patients from '../services/patients';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patients.getNonSensitiveEntries();
  res.send(data);
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = toNewPatient(req.body);
    const addedPatient = patients.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;