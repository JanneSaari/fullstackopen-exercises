import { useState } from "react";
import { Weather, Visibility, Diary } from "../types";
import axios from "axios";
import React from "react";

interface FlightFormProps {
  diaries: Diary[];
  setError: React.Dispatch<React.SetStateAction<string>>;
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const FlightForm = (props: FlightFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('sunny');
  const [visibility, setVisibility] = useState('good');
  const [comment, setComment] = useState('good');

  const baseUrl = 'http://localhost:3000'

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }
    axios.post(`${baseUrl}/api/diaries`, diaryToAdd)
    .then(response => {
      console.log(response);
      props.setDiaries(props.diaries.concat(response.data));
      props.setError('')
    })
    .catch(error => {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data;
        console.log(message)
        props.setError(message)
      }
    })
      setDate('');
      setWeather(Object.values(Weather)[0]);
      setVisibility(Object.values(Visibility)[0]);
      setComment('');
  };

  return(
    <form onSubmit={diaryCreation}>
    <label>Date 
      <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
    </label><br></br>
    <label>Weather
    {Object.values(Weather).map(weatherRadio => {
      return (
          <React.Fragment key={weatherRadio}>
            <input id={weatherRadio} type='radio' name="weather" 
              value={weatherRadio} checked={weather === weatherRadio}
              onChange={(event) => setWeather(event.target.value)}
              ></input>
            <label htmlFor={weatherRadio}>{weatherRadio}</label>
          </React.Fragment>
      )
    })}
    </label>
     <br></br>
    <label>Visibility
    {Object.values(Visibility).map(visibilityRadio => {
      return (
        <React.Fragment key={visibilityRadio}>
          <input id={visibilityRadio} type='radio' 
            name="visibility" value={visibilityRadio}
            checked={visibility === visibilityRadio}
            onChange={(event) => setVisibility(event.target.value)}
          ></input>
          <label htmlFor={visibilityRadio}>{visibilityRadio}</label>
        </React.Fragment>
      )
    })}
    </label> <br></br>
    <label>Comment
      <input type='text' value={comment} onChange={(event) => setComment(event.target.value)} />
    </label> <br></br>
    <button type='submit'>add</button>
    </form>
  )
}

export default FlightForm