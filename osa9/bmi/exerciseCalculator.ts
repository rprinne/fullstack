interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  hours: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("not enough arguments");
  const target = Number(args[2]);
  const hours = args.slice(3).map(h => Number(h));
  if (!isNaN(target) && !hours.map(h => isNaN(h)).reduce((a,b) => a && b, true)) {
    return {
      hours: hours,
      target: target
    };
  } else {
    throw new Error("Provided values are not numbers!");
  }
};

export const calculateExercises = (hours: Array<number>, target: number): Result => {
  const avg = hours.reduce((a,b)=> a+b, 0)/hours.length;
  let rating = -1;
  let desc = "";
  if (avg < 1) {
    rating = 1;
    desc = "not much exercise";
  } else if (avg < 2) {
    rating = 2;
    desc = "quite ok";
  } else if (avg >= 2) {
    rating = 3;
    desc = "very good";
  }
  return {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h > 0).length,
    success: avg >= target,
    rating: rating,
    ratingDescription: desc,
    target: target,
    average: avg,
  };
};

try {
  const { hours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Somethign bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}