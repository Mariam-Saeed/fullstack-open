import { useState } from "react";

const Button = ({ text, onClick }) => (
  <button onClick={onClick}> {text} </button>
);

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value || 0}
    {text === "positive" && "%"}
  </p>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) return <p>No feedback given</p>;
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = bad + good + neutral;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood((prev) => prev + 1)} />
      <Button text="neutral" onClick={() => setNeutral((prev) => prev + 1)} />
      <Button text="bad" onClick={() => setBad((prev) => prev + 1)} />
      <h1>statistics</h1>
      <Statistics
        good={good}
        average={average}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
