import { useState, useEffect } from 'react';

const WinScreen = ({ timestamps, resetGame }) => {
  const handleSubmit = (e) => e.preventDefault();

  const [speed, setSpeed] = useState();
  const [name, setName] = useState('');

  const handleChange = (e) => setName(e.target.value);

  useEffect(() => {
    const milliseconds = timestamps.end - timestamps.start;
    const seconds = (milliseconds % 60000) / 1000;
    setSpeed(seconds);
  }, [timestamps]);

  return (
    <div id='winscreen-container'>
      <div id='winscreen-content'>
        <div>congrats you won!</div>
        <div id='speed'>
          <div>final time:</div>
          <div>{speed}</div>
        </div>
        <form id='submit-name' onSubmit={handleSubmit}>
          <div>enter a name:</div>
          <input
            placeholder='anon'
            value={name}
            onChange={handleChange}></input>
        </form>
        <button onClick={resetGame}>play again?</button>
        <div>highscores will go here</div>
      </div>
    </div>
  );
};

export default WinScreen;
