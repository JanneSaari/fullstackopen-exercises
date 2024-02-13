import { calculateExercises } from "./modules";

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
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const {target, hours} = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}