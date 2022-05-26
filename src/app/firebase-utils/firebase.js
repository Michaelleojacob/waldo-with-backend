import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: 'findus-afb51',
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { auth, db };

// use case example:

// import { useState } from 'react';
// import { addPerson, logPublic } from './utils/firebase';

// const App = () => {
//   const [inputState, setInputState] = useState('');

//   const handleSubmit = (e) => e.preventDefault();

//   const handleChange = (e) => setInputState(e.target.value);

//   const handleAddToDB = () => {
//     logPublic();
//   };

//   const handleAddPerson = () =>
//     addPerson({ first: 'lol', last: 'xd', born: 1111 });

//   return (
//     <div>
//       <div>hi from app</div>
//       <div>dude wtf</div>
//       <form onSubmit={handleSubmit}>
//         <input value={inputState} onChange={(e) => handleChange(e)}></input>
//       </form>
//       <button onClick={handleAddToDB}>log collection</button>
//       <button onClick={handleAddPerson}>add person</button>
//     </div>
//   );
// };

// export default App;
