import { Diagnosis, Patient, Entry, UnionOmit } from "../../types";
import EntryListElement from "./EntryListElement";
import AddEntryForm from "./AddEntryForm/AddEntryForm";
import { Box, List } from "@mui/material";

interface Props {
  patient : Patient;
  patients : Patient[];
  diagnoses: Diagnosis[];
  onSubmit: (values: UnionOmit<Entry, "id">) => void;
}

const Entries = ({ patient, onSubmit, diagnoses } : Props): JSX.Element => {

  return (
    <Box>
      <h4>Entries</h4>
      <AddEntryForm diagnoses={diagnoses} onSubmit={onSubmit} onCancel={()=>{}}/>
      <br />
      <br />
      <br />
      <List>
      {patient.entries.map( e => 
        <EntryListElement key={e.id} entry={e} diagnoses={diagnoses} />
      )}
      </List>
    </Box>
  );
};

export default Entries;