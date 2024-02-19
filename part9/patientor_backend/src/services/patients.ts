import data from "../../data/patients";
import { Patient, NonSensitivePatientEntry, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';

const patients: Patient[] = data;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const addPatient = (entry: NewPatient): Patient => {
  const id: string = uuid();
  console.log(id);
  console.log(entry);

  const addedPatient: Patient = {
    id: id,
    ...entry
  };

  patients.push(addedPatient);
  return addedPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};