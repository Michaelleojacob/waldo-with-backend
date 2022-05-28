// import db from './firestore.js';
// import {
//   doc,
//   setDoc,
//   addDoc,
//   collection,
//   getDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
// } from 'firebase/firestore';

// const createnote = async (note) => {
//   await setDoc(doc(db, 'messages', note.id), note);
// };

// const createNote = async (note) => {
//   await addDoc(collection(db, 'notes'), note);
// };

// const getNote = async (id) => {
//   const noteSnapshot = await getDoc(doc(db, 'notes', id));
//   if (noteSnapshot.exists()) {
//     return noteSnapshot.data();
//   } else {
//     console.log("Note doesn't exist");
//   }
// };

// const getNotes = async () => {
//   const notesSnapshot = await getDocs(collection(db, 'notes'));
//   const notesList = notesSnapshot.docs.map((doc) => doc.data());
//   return notesList;
// };

// const updateNote = async (note) => {
//   const noteRef = doc(db, 'notes', note.id);
//   await updateDoc(noteRef, {
//     description: 'New description',
//   });
// };

// const deleteNote = async (note) => {
//   const noteRef = doc(db, 'notes', note.id);
//   await deleteDoc(noteRef);
// };

// const store = {
//   createnote,
//   createNote,
//   getNote,
//   getNotes,
//   updateNote,
//   deleteNote,
// };

// export default store;

import { db } from './firebase';

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

export const createTempUser = async () => {
  try {
    const docRef = await addDoc(collection(db, 'tempUsers'), {
      name: 'anon',
      selectedGame: null,
      timestamps: {
        start: null,
        end: null,
      },
      time: 0,
      createdAt: serverTimestamp(),
    });
    console.log(`document written with id: ${docRef.id}`);
    return docRef.id;
  } catch (e) {
    console.error('error adding document', e);
  }
};

export const logGameOne = async () => {
  const querySnapShot = await getDocs(collection(db, 'gameOneChars'));
  querySnapShot.forEach((doc) => {
    console.log(doc.id);
    console.log(doc.data());
  });
};

export const getCharCoords = async (gameNum, charNum) => {
  const selectedGame = gameNum === 1 ? 'gameOneChars' : 'gameTwoChars';
  const docRef = doc(db, selectedGame, charNum);
  const docSnap = await getDoc(docRef);
  const { x, y } = docSnap.data();
  return { x, y };
};

// (above) updated the example to get just a single doc, instead of a collection.
// (below) old attempt with getCharCoords.

// export const getCharCoords = async (gameNum, charNum) => {
//   const coords = {};
//   const selectedGame = gameNum === 1 ? 'gameOneChars' : 'gameTwoChars';
//   const querySnapShot = await getDocs(collection(db, selectedGame));
//   querySnapShot.forEach((item) => {
//     if (item.id === charNum) {
//       coords.x = item.data().x;
//       coords.y = item.data().y;
//     }
//   });
//   return coords;
// };

//===========================================================================

// export const removeOldTempUsers = async () => {
//   const currentTime = Date.now();
//   const getTempUsers = await getDocs(collection(db, 'tempUsers'));
//   const cutoff = currentTime - 2 * 60 * 60 * 1000;
// };

// const getNote = async (id) => {
//   const noteSnapshot = await getDoc(doc(db, 'notes', id));
//   if (noteSnapshot.exists()) {
//     return noteSnapshot.data();
//   } else {
//     console.log("Note doesn't exist");
//   }
// };

export const getTempUser = async (id) => {
  const userSnap = await getDoc(doc(db, 'tempUsers', id));
  if (userSnap.exists()) {
    console.log(userSnap.data());
  }
};

export const updateTempUser = async (id) => {
  const noteRef = doc(db, 'tempUsers', id);
  await updateDoc(noteRef, {
    name: 'lol',
  });
};

// const frankDocRef = doc(db, "users", "frank");
// await setDoc(frankDocRef, {
//     name: "Frank",
//     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
//     age: 12
// });

// // To update age and favorite color:
// await updateDoc(frankDocRef, {
//     "age": 13,
//     "favorites.color": "Red"
// });
