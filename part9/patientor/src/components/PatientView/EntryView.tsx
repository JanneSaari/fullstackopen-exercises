import { useEffect, useState } from "react";
import { Diagnosis, Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import diagnosisService from "../../services/diagnoses";
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Box } from "@mui/material";
import { assertNever } from "../../utils";

interface Props {
  entry: Entry;
}

const EntryView = ({entry}: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const HealthCheckEntryView = () => {
    const checkEntry = entry as HealthCheckEntry;
    return (
      <div>Health status: {HealthCheckRating[checkEntry.healthCheckRating]}</div>
    );
  };
  
  const HospitalEntryView = () => {
    const hospitalEntry = entry as HospitalEntry;
    return (
      <div>
        <div>Discharge date: {hospitalEntry.discharge.date}</div>
        <div>Discharge criteria: {hospitalEntry.discharge.criteria}</div>
      </div>
    );
  };
  
  const OccupationalHealthcareEntryView = () => {
    const occupationalEntry = entry as OccupationalHealthcareEntry;
    return (
      <div>
        <div>Employer: {occupationalEntry.employerName}</div>
        {occupationalEntry.sickLeave
        ? <div>Sick leave: {occupationalEntry.sickLeave.startDate} - {occupationalEntry.sickLeave.endDate}</div>
        : null
      }
      </div>
      );
  };

  const renderEntryTypeSpecifics = () => {
    switch (entry.type) {
      case "HealthCheck":
        return HealthCheckEntryView();
      case "Hospital":
        return HospitalEntryView();
      case "OccupationalHealthcare":
        return OccupationalHealthcareEntryView();
      default:
        return assertNever(entry);
    }
  };

  const diagnosisList = () => {
    if(entry.diagnosisCodes === undefined || entry.diagnosisCodes?.length === 0){
      return null;
    }

    return (
      <div>
        Diagnoses:
        <ul>
          {entry.diagnosisCodes?.map(code => {
            const description: string | undefined = diagnoses.find(diagnosis => diagnosis.code === code)?.name;
            return(
              <li key={code}>{code} {description}</li>
              );
            })}
        </ul>
      </div>     
    );
  };

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey', margin: 1 }}>
      <div key={entry.id}>
        <div>{entry.date}: {entry.type}</div>
        <div>{entry.description}</div>
        {renderEntryTypeSpecifics()}
        {diagnosisList()}
        <div>Diagnose by: {entry.specialist}</div>
      </div>
    </Box>
  );
};

export default EntryView;