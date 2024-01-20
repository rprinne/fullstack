import { useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, Entry, UnionOmit } from "../../types";
import Entries from "./Entries";
import axios from "axios";

import patientService from "../../services/patients";
import { Notification } from "./AddEntryForm/Notification";

interface Props {
  patients : Patient[];
  diagnoses : Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientPage = ({ patients, setPatients, diagnoses } : Props): JSX.Element => {
  const [error, setError] = useState<string>();

  const id = useParams().id;
  const patient = patients.find(p=> p.id === id);

  const submitNewEntry = async (newEntry: UnionOmit<Entry, "id">) => {
    try {
      const id: string = patient.id;
      if (!id){
        throw new Error("Patient not found");
      }
      const addedEntry = await patientService.addEntry(id, newEntry);
      const updatedPatients = patients.map(p => 
        (p.id === id)
        ? {...p, entries: p.entries.concat(addedEntry)}
        : p
      );
      setPatients(updatedPatients);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
      setTimeout(()=> setError(""), 5000);
    }
  };

  if (!patient) return <p>Patient not found</p>;
  return (
    <div>
      <h1>{patient.name}, {patient.gender}</h1>
      <p>born: {patient.dateOfBirth}</p>
      <p>occupation: {patient.occupation}</p>
      <Notification message={error}/>
      <Entries patient={patient} patients={patients} diagnoses={diagnoses} onSubmit={submitNewEntry} />
    </div>
  );
};

export default PatientPage;