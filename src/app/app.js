import { useState } from 'react';
import { collection, getFirestore, addDoc } from 'firebase/firestore/lite';

const App = () => {
  const [inputState, setInputState] = useState('');

  const handleSubmit = (e) => e.preventDefault();

  const handleChange = (e) => setInputState(e.target.value);

  const handleAddToDB = async () => {
    try {
      await addDoc(collection(getFirestore(), 'messages'), {
        text: inputState,
      });
    } catch (error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  };

  return (
    <div>
      <div>hi from app</div>
      <div>dude wtf</div>
      <form onSubmit={handleSubmit}>
        <input value={inputState} onChange={(e) => handleChange(e)}></input>
      </form>
      <button onClick={handleAddToDB}>add to db</button>
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
