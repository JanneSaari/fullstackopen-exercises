import express from 'express';
const app = express();
import { calculateBmi } from './modules';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);
  res.send({
    height: height,
    weight: weight,
    bmi: bmi
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});