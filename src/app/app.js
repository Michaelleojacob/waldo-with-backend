import { useRef } from 'react';

const App = () => {
  const inputRef = useRef(null);
  const handleSubmit = (e) => e.preventDefault();

  const handleButtonSubmit = (e) => {
    console.log(inputRef.value);
  };

  return (
    <div>
      <div>hi from app</div>
      <div>dude wtf</div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef}></input>
        <button onClick={handleButtonSubmit}>submit</button>
      </form>
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
