import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, Slider, SelectChangeEvent, InputLabel, Select, MenuItem, FormGroup, Switch, FormControlLabel } from '@mui/material';

import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const EntryTypes = ["OccupationalHealthcare", "HealthCheck", "Hospital"];

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  //Base entry values
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
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
          <TextField
            label="Sickleave start date"
            fullWidth 
            value={sickLeaveStart}
            disabled={!sickLeave}
            onChange={({ target }) => setSickLeaveStart(target.value)}
            />
          <TextField
            label="Sickleave end date"
            fullWidth 
            value={sickLeaveEnd}
            disabled={!sickLeave}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
        </FormGroup>
      </div>
    );
  };
  const showHospitalFields = () => {
    return (
      <div>
        <TextField
          label="Hospital discharge date"
          fullWidth 
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
          onChange={({ target }) => setDiagnosisCodes(target.value.split(",")) }
        />}
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={entryType}
          onChange={onTypeChange}
        >
        {EntryTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </Select>

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