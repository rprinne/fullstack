import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map(v => v.toString()).includes(gender);
};

const toNewPatientEntry = (object: unknown): NewPatient => {
  const parseName = (name: unknown): string => {
    if (!isString(name)) {
      throw new Error("Incorrect or missing name");
    }
    return name;
  };
  const parseDateOfBirth = (date: unknown): string => {
    if (!isString(date)) {
      throw new Error("Incorrect or missing date");
    }
    return date;
  };
  const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
      throw new Error("Incorrect or missing gender");
    }
    return gender;
  };
  const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
      throw new Error("Incorrect or missing ssn");
    }
    return ssn;
  };
  const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
      throw new Error("Incorrect or missing occupation");
    }
    return occupation;
  };
  
  if ( !object || typeof object !== "object" ) {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in object && "dateOfBirth" in object
    && "gender" in object && "ssn" in object && "occupation" in object)
  {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;