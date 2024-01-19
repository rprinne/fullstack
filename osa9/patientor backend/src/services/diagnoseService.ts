import data from "../../data/diagnoses";

import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = data;

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};