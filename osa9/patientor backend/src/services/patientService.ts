import { v4 as uuidv4 } from "uuid";
import data from "../../data/patients";

import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry
} from "../types";

const patients: Array<PatientEntry> = data;

const getPatients = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatientEntry> => {
  return patients.map(p => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation
  }));
};

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    };
  }
  return patient;
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newId = uuidv4() as string;
  const newPatient = {
    id: newId,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient
};