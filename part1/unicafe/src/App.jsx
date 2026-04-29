import { useState } from "react";

const Button = ({ text, onClick }) => (
  <button onClick={onClick}> {text} </button>
);

const Display = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood((prev) => prev + 1)} />
      <Button text="neutral" onClick={() => setNeutral((prev) => prev + 1)} />
      <Button text="bad" onClick={() => setBad((prev) => prev + 1)} />
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
    </>
  );
};

export default App;
