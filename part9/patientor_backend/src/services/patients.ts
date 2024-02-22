import data from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';
import { toNewPatient } from "../utils";

const patients: Patient[] = data.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient |undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
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
  getPatientById,
  getNonSensitiveEntries,
  addPatient
};