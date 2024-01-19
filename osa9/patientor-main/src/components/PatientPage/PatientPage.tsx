import { useParams } from "react-router-dom";
import { Patient, Diagnose } from "../../types";
import EntryList from "./EntryList";

interface Props {
  patients : Patient[];
  diagnoses : Diagnose[];
}

const PatientPage = ({ patients, diagnoses } : Props): JSX.Element => {
  const id = useParams().id;
  const patient = patients.find(p=> p.id === id);

  if (!patient) return <p>Patient not found</p>;
  return (
    <div>
      <h1>{patient.name}, {patient.gender}</h1>
      <p>born: {patient.dateOfBirth}</p>
      <p>occupation: {patient.occupation}</p>
      <EntryList patient={patient} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientPage;