import express from 'express';
const app = express();
import { calculateBmi } from './modules';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  try {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    if(isNaN(height) || isNaN(weight)){
      throw new Error('Provided values were not numbers!');
    }
    const bmi = calculateBmi(height, weight);
    res.send({
      height: height,
      weight: weight,
      bmi: bmi
    });
  } catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(400).send({
      error: "malformatted parameters"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});