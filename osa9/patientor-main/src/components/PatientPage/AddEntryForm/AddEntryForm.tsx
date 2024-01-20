import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, MenuItem,
  Select, Grid, Button, SelectChangeEvent, Box,
  ListItemText, Checkbox, OutlinedInput, FormControl } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { UnionOmit, Entry, Diagnosis,
  HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../../types";

interface Props {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (newEntry: UnionOmit<Entry, "id">) => void;
}

const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs>(dayjs('2022-04-17'));
  const [type, setType] = useState<string>("HealthCheck");
  const [specialist, setSpecialist] = useState("");
  const [diagnosesList, setDiagnosesList] = useState<string[]>([]);

  const [healthCheckRating, sethealthCheckRating] = useState(0);

  const [dischargeDate, setDischargeDate] = useState<Dayjs>(dayjs('2022-04-17'));
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<Dayjs>(dayjs('2022-04-17'));
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<Dayjs>(dayjs('2022-04-17'));

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      setType(value);
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "number") {
      const value = event.target.value;
      if ([0,1,2,3].includes(value)){
        sethealthCheckRating(value);
      }
    }
  };

  const onDiagnosesListChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const { target: { value },
    } = event;
    setDiagnosesList(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type){
      case "HealthCheck":
        const newHealthCheckEntry: Omit<HealthCheckEntry, "id"> = {
          type: "HealthCheck",
          date: date.format("YYYY-MM-DD"),
          specialist: specialist,
          diagnosisCodes: diagnosesList,
          description: description,
          healthCheckRating: healthCheckRating
        };
        onSubmit(newHealthCheckEntry);
        break;
      case "Hospital":
        const newHospitalEntry: Omit<HospitalEntry, "id"> = {
          type: "Hospital",
          date: date.format("YYYY-MM-DD"),
          specialist: specialist,
          diagnosisCodes: diagnosesList,
          description: description,
          discharge: {date: dischargeDate.format("YYYY-MM-DD"), criteria: dischargeCriteria}
        };
        onSubmit(newHospitalEntry);
        break;
      case "OccupationalHealthcare":
        const newOccupationalHealthcareEntry: Omit<OccupationalHealthcareEntry, "id"> = {
          type: "OccupationalHealthcare",
          date: date.format("YYYY-MM-DD"),
          specialist: specialist,
          diagnosisCodes: diagnosesList,
          description: description,
          employerName: employerName,
          sickLeave: {startDate: sickLeaveStartDate.format("YYYY-MM-DD"), endDate: sickLeaveEndDate.format("YYY-MM-DD")}
        };
        onSubmit(newOccupationalHealthcareEntry);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
      <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={onTypeChange}
          >
          <MenuItem value={"HealthCheck"}>Regular healthcheck</MenuItem>
          <MenuItem value={"Hospital"}>Hospital visit</MenuItem>
          <MenuItem value={"OccupationalHealthcare"}>Occupational healthcare visit</MenuItem>
        </Select>

        <TextField
          required
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(value) => setDate(value ? value : date)}
          />
        </LocalizationProvider>
        <TextField
          label="Specialist"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl sx={{ m: 0, width: 300 }}>
        <InputLabel>Diagnoses</InputLabel>
        <Select
          label="Diagnoses list"
          multiple
          value={diagnosesList}
          onChange={onDiagnosesListChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {diagnoses.map(d => d.code).map(c => (
            <MenuItem key={c} value={c}>
              <Checkbox checked={diagnosesList.indexOf(c) > -1} />
              <ListItemText primary={c} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>

        { type==="HealthCheck" && 
          <Select
            label="Type"
            fullWidth
            value={String(healthCheckRating)}
            onChange={onHealthCheckRatingChange}
            >
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>Low Risk</MenuItem>
            <MenuItem value={2}>Hight Risk</MenuItem>
            <MenuItem value={3}>Critical Risk</MenuItem>
          </Select>
        }

        { type==="Hospital" && 
          <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Discharge date"
                value={dischargeDate}
                onChange={(value) => setDischargeDate(value ? value : dischargeDate)}
              />
          </LocalizationProvider>
            <TextField
              label="Discharge Criteria"
              fullWidth 
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </Box>
        }

        { type==="OccupationalHealthcare" && 
          <Box>
            <TextField
              label="Employer Name"
              fullWidth 
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="sickLeaveStartDate"
                value={sickLeaveStartDate}
                onChange={(value) => setSickLeaveStartDate(value ? value : sickLeaveStartDate)}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="sickLeaveEndDate"
                value={sickLeaveEndDate}
                onChange={(value) => setSickLeaveEndDate(value ? value : sickLeaveEndDate)}
              />
            </LocalizationProvider>
          </Box>
        }

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={(onCancel)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;