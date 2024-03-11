import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, Slider, SelectChangeEvent, InputLabel,
   Select, MenuItem, FormGroup, Switch, FormControlLabel, Input
  } from '@mui/material';

import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const EntryTypes = ["OccupationalHealthcare", "HealthCheck", "Hospital"];

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const todayString: string = new Date().toString();

  //Base entry values
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayString);
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState("HealthCheck");
  //HealthCheck entry
  const [rating, setRating] = useState(0);
  //Occupational entry
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState(false);
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  //Hospital entry
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string" ||
      EntryTypes.includes(event.target.value)) {
      const value = event.target.value;
      console.log(value);
      setEntryType(value);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const newBaseEntry = {
      description,
      date: date.toString(),
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
      case "OccupationalHealthcare":
        newEntry = {
          ...newBaseEntry,
          type: 'OccupationalHealthcare',
          employerName
        };
        if(sickLeave){
          newEntry.sickLeave = {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          };
        }
        onSubmit(newEntry);
        break;
      case "Hospital":
        newEntry = {
          ...newBaseEntry,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        onSubmit(newEntry);
        break;
      default:
        break;
    }

  };

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

  const toggleSickleave = () => {
    console.log("sickleave before toggle:", sickLeave);
    setSickLeave(!sickLeave);
    console.log("sickleave after toggle:", sickLeave);
  };

  const showHealthCheckFields = () => {
    return (
      <div>
        <InputLabel style={{ marginTop: 20 }}>Health Rating</InputLabel>
        <Slider
          aria-label="Rating"
          defaultValue={0}
          min={0}
          max={4}
          marks={true}
          valueLabelDisplay="on"
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
      <div>
        <TextField
          label="Employer"
          fullWidth 
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <FormGroup>
          <FormControlLabel 
            control={<Switch/>}
            label="Sick leave"
            checked={sickLeave}
            onChange={toggleSickleave}
          />
          <InputLabel style={{ marginTop: 20 }}>Sickleave starting date</InputLabel>
          <Input
            type="date"
            value={sickLeaveStart}
            onChange={({ target }) => setSickLeaveStart(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }}>Sickleave ending date</InputLabel>
          <Input
            type="date"
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
          />
        </FormGroup>
      </div>
    );
  };
  const showHospitalFields = () => {
    return (
      <div>
        <InputLabel style={{ marginTop: 20 }}>Hospital discharge date</InputLabel>
        <Input
          type="date"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label="Hospital discharge criteria"
          fullWidth 
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
      </div>
    );
  };


  return (
    <div>
      <Grid
        component={"form"}
        onSubmit={addEntry}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Description"
          fullWidth
          value={description}
          autoFocus={true}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <Input
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <TextField
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {<TextField
          label="Diagnosis Codes"
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(",")) }
        />}
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          value={entryType}
          onChange={onTypeChange}
          style={{marginBottom: 20}}
        >
        {EntryTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </Select>

        {showTypeSpecifics()}

        <Grid
          style={{margin: 20}}
        >
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
      </Grid>
    </div>
  );
};

export default AddEntryForm;