import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";

interface Props {
  id: string | undefined;
}

const PatientView = (props: Props) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async () => {
      console.log('id', props.id);
        if(props.id !== undefined){
          const patient = await patientService.getById(props.id);
          setPatient(patient);
          console.log('patient', patient);
        }
      };
    fetchPatient();
  }, [props.id]);

  if(!patient){
    return(
      <div>
        <p>Could not find patient with this id</p>
      </div>
      );
  }
  else {
    return (
      <div>
        <h2>{patient.name}, {patient.gender}</h2>
        <p>
          {patient.dateOfBirth 
            ? <>Date of Birth: {patient.dateOfBirth}</>
            : null
          }
          <br></br>
          {patient.ssn
            ? <>ssn: {patient.ssn}</>
            : null
          }
          <br></br>
          <>occupation: {patient.occupation}</>
          <br></br>
        </p>
        <div>
          <h3>Entries</h3>
          {patient.entries.map(entry => {
            return (
              <div key={entry.id}>
                <div>
                  {entry.date}: 
                </div>
                <div>
                  {entry.description}
                </div>
                <div>
                  Diagnoses:
                  <ul>
                    {entry.diagnosisCodes?.map(code => {
                      return(<li key={code}>{code}</li>);
                    })}
                  </ul>
                </div>          
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default PatientView;