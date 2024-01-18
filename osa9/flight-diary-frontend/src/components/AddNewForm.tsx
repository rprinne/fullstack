import { useState } from "react";
import { Weather, Visibility, newDiaryEntry } from "../types";

interface Props {
  onSubmit: (newEntry: newDiaryEntry) => void;
}

export const AddNewForm = (props: Props): JSX.Element => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWheater] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");
  
  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: newDiaryEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };
    props.onSubmit(newEntry);
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={addEntry}>
        <fieldset name="date">
          <legend>Date: </legend>
          <input
            type="date"
            min="2000-01-01"
            max="2100-01-01"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </fieldset>
        <fieldset name="weather">
          <legend>Weather: </legend>
          <input
            type="radio"
            name="weather"
            value="sunny"
            id="sunny"
            checked
            onChange={() => setWheater(Weather.Sunny)}
          />
          <label>sunny</label>
          <input
            type="radio"
            name="weather"
            value="cloudy"
            id="cloudy"
            onChange={() => setWheater(Weather.Cloudy)}
          />
          <label>cloudy</label>
          <input
            type="radio"
            name="weather"
            value="stormy"
            id="stormy"
            onChange={() => setWheater(Weather.Stormy)}
          />
          <label>stormy</label>
          <input
            type="radio"
            name="weather"
            value="windy"
            id="windy"
            onChange={() => setWheater(Weather.Windy)}
          />
          <label>windy</label>
        </fieldset>
        <fieldset name="visibility">
          <legend>Visibility: </legend>
          <input
            type="radio"
            name="visibility"
            value="great"
            id="great"
            onChange={() => setVisibility(Visibility.Great)}
          />
          <label>Great</label>
          <input
            type="radio"
            name="visibility"
            value="good"
            id="good"
            checked
            onChange={() => setVisibility(Visibility.Good)}
          />
          <label>Good</label>
          <input
            type="radio"
            name="visibility"
            value="ok"
            id="ok"
            onChange={() => setVisibility(Visibility.Ok)}
          />
          <label>Ok</label>
          <input
            type="radio"
            name="visibility"
            value="poor"
            id="poor"
            onChange={() => setVisibility(Visibility.Poor)}
          />
          <label>Poor</label>
        </fieldset>
        <fieldset>
          <legend>Comment:</legend>
          <input
            value={comment}
            onChange={() => setComment(event.target.value)}
          />
        </fieldset>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};