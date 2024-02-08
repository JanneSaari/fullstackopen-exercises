interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (height: number, weight: number): string => {

  const heightInM = height / 100
  const bmi = weight / (heightInM * heightInM)
  // console.log(height, weight)
  // console.log(bmi)

  if(bmi < 18.5)
    return 'Underweight'
  else if (bmi >= 18.5 && bmi <= 24.9)
    return 'Normal (healthy weight)'
  else if (bmi >= 25 && bmi <= 29.9)
    return 'Overweight'
  else if (bmi >= 30)
    return 'Obese'
}

try {
  const {height, weight} = parseBmiArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}