const calculateBmi = (height: number, weight: number): string => {

  const heightInM = height / 100
  const bmi = weight / (heightInM * heightInM)
  // console.log(height, weight)
  // console.log(bmi)

  if(bmi < 18.5)
    return 'Underweight (unhealthy weight)'
  else if (bmi >= 18.5 && bmi <= 24.9)
    return 'Normal (healthy weight)'
  else if (bmi >= 25 && bmi <= 29.9)
    return 'Overweight (unhealthy weight)'
  else if (bmi >= 30)
    return 'Obese (unhealthy weight)'
}

console.log(calculateBmi(180, 74))