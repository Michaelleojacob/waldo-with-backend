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

import { collection, addDoc, getDocs, query } from 'firebase/firestore';

export const addPerson = async ({ first, last, born }) => {
  try {
    const docRef = await addDoc(collection(db, 'gameOneChars'), {
      first,
      last,
      born,
    });
    console.log(`document written with id: ${docRef.id}`);
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
  const coords = {};
  const selectedGame = gameNum === 1 ? 'gameOneChars' : 'gameTwoChars';
  const querySnapShot = await getDocs(collection(db, selectedGame));
  querySnapShot.forEach((item) => {
    if (item.id === charNum) {
      coords.x = item.data().x;
      coords.y = item.data().y;
    }
  });
  return coords;
};

export const logChar = async (gameNum, charNum) => {
  const selectedGame = gameNum === 1 ? 'gameOneChars' : 'gameTwoChars';
  const querySnapShot = await getDocs(collection(db, selectedGame));
  const checkChar = querySnapShot.filter((item) => item.id === charNum);
  console.log(checkChar.x);
  console.log(checkChar.y);
};
