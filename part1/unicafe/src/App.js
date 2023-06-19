import { useState } from "react";

const Header = ({ header }) => <h1>{header}</h1>;

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <div>
        <Header header="Statistics"></Header>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <Header header="Statistics"></Header>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good}></StatisticLine>
          <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
          <StatisticLine text={"bad"} value={bad}></StatisticLine>
          <StatisticLine text={"all"} value={total}></StatisticLine>

          <StatisticLine
            text={"average"}
            value={(good - bad) / total}
          ></StatisticLine>
          <StatisticLine
            text={"positive"}
            value={(good / total) * 100 + "%"}
          ></StatisticLine>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodValue = (newValue) => setGood(newValue);
  const setNeutralValue = (newValue) => setNeutral(newValue);
  const setBadValue = (newValue) => setBad(newValue);

  return (
    <div>
      <Header header={"Give feedback"}></Header>
      <Button handleClick={() => setGoodValue(good + 1)} text="good"></Button>
      <Button
        handleClick={() => setNeutralValue(neutral + 1)}
        text="neutral"
      ></Button>
      <Button handleClick={() => setBadValue(bad + 1)} text="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
