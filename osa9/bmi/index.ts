import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.static('build'))
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    res.send(calculateBmi(Number(height), Number(weight)));
  } else {
    res.send({error: "malformatted parameters"});
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  // eslint-disable-next-line
  if (daily_exercises.map((h: any) => !isNaN(Number(h))).reduce((a: boolean, b: boolean) => a && b, true)
    && !isNaN(Number(target)))
  {
    const hours = daily_exercises as Array<number>;
    const targetHours = target as number;
    res.send(calculateExercises(hours, targetHours));
  } else {
    res.send({error: "malformatted parameters"});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});