import { useState } from 'react';
import { addPerson, logPublic } from './utils/firebase';

const App = () => {
  const [inputState, setInputState] = useState('');

  const handleSubmit = (e) => e.preventDefault();

  const handleChange = (e) => setInputState(e.target.value);

  const handleAddToDB = () => {
    logPublic();
  };

  const handleAddPerson = () =>
    addPerson({ first: 'lol', last: 'xd', born: 1111 });

  return (
    <div>
      <div>hi from app</div>
      <div>dude wtf</div>
      <form onSubmit={handleSubmit}>
        <input value={inputState} onChange={(e) => handleChange(e)}></input>
      </form>
      <button onClick={handleAddToDB}>log collection</button>
      <button onClick={handleAddPerson}>add person</button>
    </div>
  );
};

export default App;
