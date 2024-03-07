import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, Slider } from '@mui/material';

import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState("HealthCheck");

  const [rating, setRating] = useState(0);
  
  // const [employerName, setEmployerName] = useState("");
  // const [sickLeave, setSickLeave] = useState(false);
  // const [sickLeaveStart, setSickLeaveStart] = useState("");
  // const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  // const [dischargeDate, setDischargeDate] = useState("");
  // const [dischargeCriteria, setDischargeCriteria] = useState("");

  // const onTypeChange = (event: SelectChangeEvent<string>) => {
  //   event.preventDefault();
  //   if ( typeof event.target.value === "string") {
  //     const value = event.target.value;
  //     console.log(value);
  //     // const entryType
  //     // if (entryType) {
  //     //   setType(entryType);
  //     // }
  //   }
  // };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const newBaseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes
    };
    console.log('baseEntry: ', newBaseEntry);
    let newEntry: EntryFormValues;
    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          ...newBaseEntry,
          type: 'HealthCheck',
          healthCheckRating: rating
        };
        onSubmit(newEntry);
        break;
      // case "OccupationalHealthcare":
      //   newEntry = {
      //     ...newBaseEntry,
      //     type: 'OccupationalHealthcare',
      //     employerName
      //   };
      //   if(sickLeave){
      //     newEntry.sickLeave = {
      //       startDate: sickLeaveStart,
      //       endDate: sickLeaveEnd
      //     };
      //   }
      //   onSubmit(newEntry);
      //   break;
      // case "Hospital":
      //   newEntry = {
      //     ...newBaseEntry,
      //     type: 'Hospital',
      //     discharge: {
        //     date: dischargeDate,
        //     criteria: dischargeCriteria
        //   }
        // };
        // onSubmit(newEntry);
        // break;
      default:
        break;
    }

  };

  // const parseDiagnosisCodes = (): string[] | null => {
  //   return null;
  // };

  const showTypeSpecifics = (): JSX.Element | null => {
    switch (entryType) {
      case "HealthCheck":
        return (showHealthCheckFields());
      case "OccupationalHealthcare":
        return showOccupationalFields();
      case "Hospital":
        return showHospitalFields();
      default:
        return null;
    }
  };

  const showHealthCheckFields = () => {
    return (
      <div>
        <Slider
          aria-label="Rating"
          defaultValue={0}
          min={0}
          max={4}
          onChange={(_event, value) => {
            if(typeof value === 'number'){
              setRating(value);
            }
            else if(typeof value[0] === 'number'){
              setRating(value[0]);
            }}}
        />
      </div>
    );
  };
  const showOccupationalFields = () => {
    return (
      <div></div>
    );
  };
  const showHospitalFields = () => {
    return (
      <div></div>
    );
  };


  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {<TextField
          label="Diagnosis Codes"
          fullWidth 
          value={diagnosisCodes}
          onChange={({ target }) => {
            const codes = target.value.split(",");
            console.log("codes", codes);
            setDiagnosisCodes(codes);
            // setDiagnosisCodes(target.value.split(","));
          }}
        />}
        <TextField
          label="Type"
          fullWidth 
          value={entryType}
          onChange={({ target }) => setEntryType(target.value)}
        />


        {/* <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={entryType}
          onChange={onTypeChange}
        >
        {genderOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select> */}

        {showTypeSpecifics()}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;