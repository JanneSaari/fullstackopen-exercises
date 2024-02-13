import express from 'express';
const bmiApp = express();
const exerciseApp = express();
exerciseApp.use(express.json());
import { calculateBmi } from './modules';
import { calculateExercises } from './modules';

bmiApp.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

bmiApp.get('/bmi', (req, res) => {
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

bmiApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


exerciseApp.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const daily_exercises: number[] = req.body.daily_exercises.map((x: number) => {
      const xAsNumber: number = Number(x);
      if(isNaN(xAsNumber)){
        throw new Error('malformatted parameters');
      }
      return xAsNumber;
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target: number = req.body.target as number;
    if(isNaN(target)){
      throw new Error(`malformatted parameters`);
    }
    if(target === null || daily_exercises === null){
      throw new Error('parameters missing!');
    }
    const results = calculateExercises(daily_exercises, target);
    console.log(results);
    res.json(results);
  } catch (error) {
      let errorMessage = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
      res.status(400).send({
        error: errorMessage
      });
    }
});

const exercisePort = 3002;

exerciseApp.listen(exercisePort, () => {
  console.log(`Server running on port ${exercisePort}`);
});