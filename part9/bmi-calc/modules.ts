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
}