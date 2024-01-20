import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  patient
    ? res.send(patient)
    : res.status(404).send({error: "patient not found"});
});

router.get('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  patient
    ? res.send(patient.entries)
    : res.status(404).send({error: "patient not found"});
});

router.post('/', (req, res) => {
  try {
    const newPatient
      = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry
      = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;