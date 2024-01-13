interface bmiValues {
  height: number;
  weight: number;
}

export const parseBMIArguments = (args: string[]): bmiValues => {
  if (args.length != 4) throw new Error("need exactly two argumets");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error("Provided values are not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ( (height / 100) ** 2);
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
};

try {
  const { height, weight } = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Somethign bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}