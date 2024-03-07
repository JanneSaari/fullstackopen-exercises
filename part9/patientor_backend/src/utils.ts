import { Entry, Gender, NewPatient, NewEntry, Diagnosis, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number';
};

const isValidEntryType = (entry: unknown): entry is Entry => {
  switch ((entry as Entry).type) {
    case "HealthCheck":
      return true;
    case "Hospital":
      return true;
    case "OccupationalHealthcare":
      return true;
    default:
      throw new Error('Incorrect or missing entry.type');
  }
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if(!isNumber(rating) || !isHealthCheckRating(rating)){
    throw new Error('Incorrect or missing HealthCheckRating: ' + rating);
  }

  return rating;
};

const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing string value');
  }

  return name;
};

const parseEntry = (entry: unknown): Entry => {
  if(!entry || !isValidEntryType(entry)){
    throw new Error('Incorrect or missing entry');
  }

  return entry;
};

const parseEntries = (entries: unknown): Entry[] => {
  if(!entries || !Array.isArray(entries)){
    throw new Error('Incorrect or missing entries');
  }
  
  const parsedEntries: Entry[] = entries.map(entry => {
    return parseEntry(entry);
  });
  return parsedEntries;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
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

export const toNewEntry = (object: unknown): NewEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if('description' in object && 'date' in object && 'specialist' in object &&
   'diagnosisCodes' in object && 'type' in object ){
    const newBaseEntry = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object)
    };
    let newEntry:NewEntry;
    if(object.type === 'HealthCheck' && 'healthCheckRating' in object){
      console.log('healthcheck');
      newEntry = {
        ...newBaseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      console.log('new entry parsed', newEntry);
      return newEntry;
    }
    else if(object.type === 'OccupationalHealthcare' && 'employerName' in object){
      console.log('occupational');
      newEntry = {
        ...newBaseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName)
      };
      if('sickLeave' in object){
        if(typeof object.sickLeave === 'object' && object.sickLeave &&
         'startDate' in object.sickLeave && 'endDate' in object.sickLeave){
          newEntry.sickLeave = {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate)
          };
         }
         else {
          throw new Error('Incorrect data: optional field sickLeave is present, but it has invalid or missing values');
         }
      }
      console.log('new entry parsed', newEntry);
      return newEntry;
    }
    else if(object.type === 'Hospital' && 'discharge' in object)
    {
      if(typeof object.discharge === "object" &&  object.discharge &&
       'date' in object.discharge && 'criteria' in object.discharge){
        console.log(object.discharge);
        console.log('hospital');
        newEntry = {
          ...newBaseEntry,
          type: 'Hospital',
          discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseString(object.discharge.criteria)
          }
        };
        console.log('new entry parsed', newEntry);
        return newEntry;
      }
    }
    else {
      throw new Error('Incorrect data: no fields matching to any entry type');
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};