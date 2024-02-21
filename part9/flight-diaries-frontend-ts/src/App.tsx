import { useEffect, useState } from 'react'
import { Diary } from './types'
import axios from 'axios'
import FlightForm from './components/FlightForm';

const baseUrl = 'http://localhost:3000'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    axios.get<Diary[]>(`${baseUrl}/api/diaries`).then(response => {
      setDiaries(response.data)
    })
  }, [])

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
      <FlightForm diaries={diaries} setError={setError} setDiaries={setDiaries}></FlightForm>
      <ul style={{listStyle: 'none'}}>
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
