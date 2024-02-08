interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))