import data from "../../data/patients";
import { Patient, NonSensitivePatientEntry } from "../types";

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

export default {
  getEntries,
  getNonSensitiveEntries
};