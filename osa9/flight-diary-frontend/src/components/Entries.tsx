import { DiaryEntry } from "../types";

interface EntriesProps {
  entries: Array<DiaryEntry>;
}

export const Entries = (props: EntriesProps): JSX.Element => {
  return (
    <div>
      <h1>Diary entries</h1>
      { props.entries.map(e =>
        <div key={e.id}><h3>{e.date}</h3> <p>visibility: {e.visibility}</p> <p>{e.weather}</p> <p><em>{e.comment}</em></p></div>
      ) }
    </div>
  );
};