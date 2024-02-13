export const calculateBmi = (height: number, weight: number): string => {

  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);

  if(bmi < 18.5)
    return 'Underweight';
  else if (bmi >= 18.5 && bmi <= 24.9)
    return 'Normal (healthy weight)';
  else if (bmi >= 25 && bmi <= 29.9)
    return 'Overweight';
  // else if (bmi >= 30)

  return 'Obese';
};

export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const dailyAverage = hours.reduce((hours, day) => 
    hours + day
  ) / hours.length;
  const rateValue = dailyAverage / target;
  let rating;
  if(rateValue < 0.5)
    rating = 1; 
  else if (rateValue >= 0.5 && rateValue < 1)
    rating = 2;
  else 
    rating = 3;

  let ratingDescription = '';
  switch (rating) {
    case 1:
    ratingDescription = 'could be much better';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;
    case 3:
      ratingDescription = 'you hit the goal';
      break;
    default:
      break;
  }
  return { 
    periodLength: hours.length,
    trainingDays: hours.reduce((
      trainingDays, currentDay) =>
       currentDay ? trainingDays + 1 : trainingDays 
       , 0),
    success: dailyAverage >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: dailyAverage
  };
};