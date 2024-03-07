import { useEffect, useState } from "react";
import { EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";
import EntryView from "./EntryView";
import { Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

interface Props {
  id: string | undefined;
}

const PatientView = (props: Props) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if(props.id && patient){
        console.log('EntryFormValues:', values);
        const entry = await patientService.addEntry(values, props.id);
        const updatedPatient: Patient = {
          ...patient,
          entries: patient?.entries.concat(entry)
        };
        console.log('updatedPatient:', updatedPatient);
        setPatient(updatedPatient);
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


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
              <EntryView key={entry.id} entry={entry}></EntryView>
            );
          })}
        </div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
      />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
      </Button>
      </div>
    );
  }
};

export default PatientView;