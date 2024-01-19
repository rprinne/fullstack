import { v4 as uuidv4 } from "uuid";
import data from "../../data/patients";

import {
  Patient,
  NewPatient,
  NonSensitivePatient
} from "../types";

const patients: Array<Patient> = data;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(p => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
    entries: p.entries,
  }));
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries,
    };
  }
  return patient;
};

const addPatient = (entry: NewPatient): NonSensitivePatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newId = uuidv4();
  const newPatient = {
    id: newId,
    ...entry
  };
  patients.push(newPatient);
  return {...newPatient};
};

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient
};