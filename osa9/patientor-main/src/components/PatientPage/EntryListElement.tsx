import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { Box } from "@mui/material";

interface Props {
  entry : Entry;
  diagnoses : Diagnosis[];
}

interface HealthCheckProps extends Props {
  entry : HealthCheckEntry;
}

interface HospitalProps extends Props {
  entry : HospitalEntry;
}

interface OccupationalHealthcareProps extends Props {
  entry : OccupationalHealthcareEntry;
}

const DiagnoseList = ({ entry, diagnoses } : Props): JSX.Element => {
  if (entry.diagnosisCodes) {
    return (
      <ul>
        {entry.diagnosisCodes.map(dc => {
          const diagnose = diagnoses.find(d => d.code === dc);
          return (<li key={dc}>{dc} <em>{diagnose?.name}</em></li>);
        })}
      </ul>
    );
  } else {
    return (<p>Diagnoses not found</p>);
  }
};

const HealthCheck = ({ entry, diagnoses } : HealthCheckProps): JSX.Element => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <p><b>{entry.date} Regular Health Check</b></p>
      <p><em>{entry.description}</em></p>
      <DiagnoseList entry={entry} diagnoses={diagnoses} />
      <p>Diagnosed by {entry.specialist}</p>
    </Box>
  );
};

const Hospital = ({ entry, diagnoses } : HospitalProps): JSX.Element => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <p><b>{entry.date} Hospital visit</b></p>
      <p><em>{entry.description}</em></p>
      <DiagnoseList entry={entry} diagnoses={diagnoses} />
      <p>Discharged {entry.discharge.date}, {entry.discharge.criteria}</p>
      <p>Diagnosed by {entry.specialist}</p>
    </Box>
  );
};

const OccupationalHealthcare = ({ entry, diagnoses } : OccupationalHealthcareProps): JSX.Element => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <p><b>{entry.date} Occupational Healthcare Visit, Employer: {entry.employerName}</b></p>
      <p><em>{entry.description}</em></p>
      <DiagnoseList entry={entry} diagnoses={diagnoses} />
      <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
      <p>Diagnosed by {entry.specialist}</p>
    </Box>
  );
};

const EntryListElement = ({entry, diagnoses } : Props): JSX.Element => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses}/>;
    case "Hospital":
      return <Hospital entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses}/>;
    default:
      return <p>Unknown entry</p>;
  }
};

export default EntryListElement;