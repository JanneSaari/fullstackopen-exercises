interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Exercise {
  target: number,
  hours: number[]
}

const parseExerciseArguments = (args: string[]): Exercise => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map(arg => Number(arg))
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateExercises = (hours: number[], target: number): Result => {
  const dailyAverage = hours.reduce((hours, day) => 
    hours + day
  ) / hours.length
  const rateValue = dailyAverage / target
  let rating
  if(rateValue < 0.5)
    rating = 1 
  else if (rateValue >= 0.5 && rateValue < 1)
    rating = 2
  else 
    rating = 3

  let ratingDescription = ''
  switch (rating) {
    case 1:
    ratingDescription = 'could be much better'
      break
    case 2:
      ratingDescription = 'not too bad but could be better'
      break
    case 3:
      ratingDescription = 'you hit the goal'
      break
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
  }
}

try {
  const {target, hours} = parseExerciseArguments(process.argv)
  console.log(calculateExercises(hours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}