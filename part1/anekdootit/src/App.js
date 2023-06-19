import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const getRandomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    console.log(random);
    return random;
  };

  const giveVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    console.log("points", copy);

    let maxVotesIndex = 2;
    let currentMaxVotes = 0;
    for (let index = 0; index < copy.length; index++) {
      const value = copy[index];
      if (value > currentMaxVotes) {
        currentMaxVotes = value;
        maxVotesIndex = index;
      }
    }
    setMaxVotes(maxVotesIndex);

    setPoints(copy);
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.from(Array(anecdotes.length), () => 0)
  );
  const [maxVotes, setMaxVotes] = useState(0);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <div>
        <button onClick={giveVote}>Vote</button>
        <button onClick={() => setSelected(getRandomAnecdote())}>
          Next anecdote
        </button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[maxVotes]}</p>
        <p>has {points[maxVotes]} votes</p>
      </div>
    </div>
  );
};

export default App;
