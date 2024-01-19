import { Diagnose, Patient } from "../../types";
import EntryListElement from "./EntryListElement";

interface Props {
  patient : Patient;
  diagnoses: Diagnose[];
}

const EntryList = ({ patient, diagnoses } : Props): JSX.Element => {
  return (
    <div>
      <h4>Entries</h4>
        {patient.entries.map( e => 
          <EntryListElement key={e.id} entry={e} diagnoses={diagnoses} />
        )}
    </div>
  );
};

export default EntryList;