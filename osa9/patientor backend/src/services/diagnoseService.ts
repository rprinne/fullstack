import data from "../../data/diagnoses";

import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = data;

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};