import { useEffect, useState } from 'react'
import { Diary } from './types'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState('');
  // const [date, setDate] = useState('');
  // const [weather, setWeather] = useState('');
  // const [visibility, setVisibility] = useState('');
  // const [comment, setComment] = useState('');
  const [date, setDate] = useState('2002-10-10');
  const [weather, setWeather] = useState('sunny');
  const [visibility, setVisibility] = useState('good');
  const [comment, setComment] = useState('good');
  
  useEffect(() => {
    axios.get<Diary[]>(`${baseUrl}/api/diaries`).then(response => {
      setDiaries(response.data)
    })
  }, [])

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
      setDiaries(diaries.concat(response.data));
    })
    .catch(error => {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data;
        console.log(message)
        setError(message)
      }
    })
      // setDate('');
      // setWeather('');
      // setVisibility('');
      // setComment('');
  };

  const errorStyle = {
    color:'red',
  }

  return (
    <div>
      <h2>Flights</h2>
      {error 
        ? <p style={errorStyle}>{error}</p> 
        : null
      }
      <form onSubmit={diaryCreation}>
        <label>Date 
          <input value={date} onChange={(event) => setDate(event.target.value)} />
        </label><br></br>
        <label>Weather
          <input value={weather} onChange={(event) => setWeather(event.target.value)} />
        </label> <br></br>
        <label>Visibility
          <input value={visibility} onChange={(event) => setVisibility(event.target.value)} />
        </label> <br></br>
        <label>Comment
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </label> <br></br>
        <button type='submit'>add</button>
      </form>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>
            <h4>{diary.date}</h4>
            Weather: {diary.weather} <br></br>
            Visibility: {diary.visibility} <br></br>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
