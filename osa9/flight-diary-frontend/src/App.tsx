import { useState, useEffect } from "react";
import axios from "axios";
import { DiaryEntry, newDiaryEntry } from "./types";

import { Notification } from "./components/Notification";
import { Entries } from "./components/Entries";
import { AddNewForm } from "./components/AddNewForm";

const App = () => {
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/diaries").then(response => {
      setEntries(response.data as DiaryEntry[]);
    });
  }, []);

  const createNewEntry = async (newEntry: newDiaryEntry) => {
    try {
      const res = await axios.post<DiaryEntry>("http://localhost:3000/api/diaries", newEntry);
        setEntries(entries.concat(res.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response.data);
        setTimeout(()=>setMessage(""), 3000);
      }
    }
  };

  return (
    <div>
      <Notification message={message}/>
      <AddNewForm onSubmit={createNewEntry}/>
      <Entries entries={entries} />
    </div>
  );
};

export default App;
