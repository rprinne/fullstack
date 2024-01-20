import { Gender, Entry, NewPatient, Diagnosis,
  HealthCheckRating,
  HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry,
  UnionOmit } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map(v => v.toString()).includes(gender);
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
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
      occupation: parseOccupation(object.occupation)
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


const parseString = (object: unknown): string => {
  if (!isString(object)) {
    throw new Error("Incorrect or missing string");
  }
  return object;
};

const parseHealthCheckEntry = (object: object): Omit<HealthCheckEntry, "id"> => {
  const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
    if (!(Number(object) in [0,1,2,3])){
      throw new Error("Incorrect health check rating");
    }
    return object as HealthCheckRating;
  };

  if ("description" in object && "date" in object
      && "specialist" in object && "healthCheckRating" in object)
  {
    const diagnosisCodes = parseDiagnosisCodes(object);
    const newEntry: Omit<HealthCheckEntry, "id"> = {
      description: parseString(object.description),
      date: parseString(object.date),
      specialist: parseString(object.specialist),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      diagnosisCodes: diagnosisCodes,
      type: "HealthCheck"
    };
    return newEntry;
  }
  throw new Error("Incorrect or missing data in parseHealthCheckEntry");
};

const parseHospitalEntry = (object: object): Omit<HospitalEntry, "id"> => {

  const parseDischarge = (object: unknown): { date: string, criteria: string } => {
    if (!object || typeof object !== "object") {
      throw new Error("Discharge is missing or not object");
    } else if ("date" in object && "criteria" in object) {
      return {date: parseString(object.date), criteria: parseString(object.criteria)};
    }
    throw new Error("Incorrect date or criteria in discharge");
  };

  if ("description" in object && "date" in object
      && "specialist" in object && "discharge" in object)
  {
    const diagnosisCodes = parseDiagnosisCodes(object);
    const newEntry: Omit<HospitalEntry, "id"> = {
      description: parseString(object.description),
      date: parseString(object.date),
      specialist: parseString(object.specialist),
      discharge: parseDischarge(object.discharge),
      diagnosisCodes: diagnosisCodes,
      type: "Hospital"
    };
    return newEntry;
  }
  throw new Error("Incorrect or missing data in parseHospitalEntry");
};

const parseOccupationalHealthcareEntry = (object: object): Omit<OccupationalHealthcareEntry, "id"> => {

  const parseSickLeave = (object: unknown): { startDate: string, endDate: string } => {
    if (!object || typeof object !== "object") {
      throw new Error("Discharge is missing or not object");
    } else if ("startDate" in object && "endDate" in object) {
      return {startDate: parseString(object.startDate), endDate: parseString(object.endDate)};
    }
    throw new Error("Incorrect date or criteria in discharge");
  };

  if ("description" in object && "date" in object
      && "specialist" in object && "employerName" in object && "sickLeave" in object)
  {
    const diagnosisCodes = parseDiagnosisCodes(object);
    const newEntry: Omit<OccupationalHealthcareEntry, "id"> = {
      description: parseString(object.description),
      date: parseString(object.date),
      specialist: parseString(object.specialist),
      employerName: parseString(object.employerName),
      sickLeave: parseSickLeave(object.sickLeave),
      diagnosisCodes: diagnosisCodes,
      type: "OccupationalHealthcare"
    };
    return newEntry;
  }
  throw new Error("Incorrect or missing data in parseOccupationalHealthcareEntry");
};

export const toNewEntry = (object: unknown): UnionOmit<Entry, "id"> => {
  if ( !object || typeof object !== "object" ) {
    throw new Error("Incorrect or missing data");
  }
  if (!("type" in object)){
    throw new Error("Object needs to have type");
  }
  switch (object.type) {
    case "HealthCheck":
      return parseHealthCheckEntry(object);
    case "Hospital":
      return parseHospitalEntry(object);
    case "OccupationalHealthcare":
      return parseOccupationalHealthcareEntry(object);
    default:
      throw new Error("Undetermined type in object: " + object.type);
  }
};