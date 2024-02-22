import { Entry, Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isEntry = (param: unknown): param is Entry => {
  console.log(param);
  return true;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing date: ' + gender);
  }
  return gender;
};

const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing string value');
  }

  return name;
};

const parseEntry = (entry: unknown): Entry => {
  if(!entry || !isEntry(entry)){
    throw new Error('Incorrect or missing entry');
  }
  switch (entry.type) {
    case "HealthCheck":
      break;
    case "Hospital":
      break;
    case "OccupationalHealthcare":
      break;
    default:
      throw new Error('Incorrect or missing entry.type');
  }

  return entry;
};

const parseEntries = (entries: unknown): Entry[] => {
  if(!entries || !Array.isArray(entries)){
    throw new Error('Incorrect or missing entries');
  }
  
  entries.map(entry => {
    parseEntry(entry);
  });
  return entries as Entry[];
};

export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  
  if( 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntries(object.entries),
    };
    
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};