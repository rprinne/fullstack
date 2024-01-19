import { Diagnose, Entry } from "../../types";

interface Props {
  key: string;
  entry : Entry;
  diagnoses : Diagnose[];
}

const EntryListElement = ({ entry, diagnoses } : Props): JSX.Element => {
  return (
    <div key={entry.id}>
      <p>{entry.date} <em>{entry.description}</em></p>
      <ul>
        {
          entry.diagnosisCodes &&
          entry.diagnosisCodes.map(dc => {
            const diagnose = diagnoses.find(d => d.code === dc);
            return (<li key={dc}>{dc} <em>{diagnose?.name}</em></li>);
          })
        }
      </ul>
    </div>
  );
};

export default EntryListElement;