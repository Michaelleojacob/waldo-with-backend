import { useState } from 'react';
import { addPerson, logPublic } from './utils/firebase';

const App = () => {
  const [inputState, setInputState] = useState('');

  const handleSubmit = (e) => e.preventDefault();

  const handleChange = (e) => setInputState(e.target.value);

  const handleAddToDB = () => {
    logPublic();
  };

  const handleAddPerson = () => addPerson();

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

// const addValue = () => {
//   db.collection('values')
//     .doc(value)
//     .set({
//       value: value,
//     })
//     .then(function () {
//       console.log('Value successfully written!');
//     })
//     .catch(function (error) {
//       console.error('Error writing Value: ', error);
//     });
// };
