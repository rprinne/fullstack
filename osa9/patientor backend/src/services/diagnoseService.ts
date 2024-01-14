import data from "../../data/diagnoses";

import { DiagnoseEntry } from "../types";

const diagnoses: Array<DiagnoseEntry> = data;

const getDiagnoses = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};