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

import { db } from './firestore';

import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addPerson = async () => {
  console.log('hi');
  try {
    const docRef = await addDoc(collection(db, 'public'), {
      first: 'miggy',
      last: 'j',
      born: 1293,
    });
    console.log(`document written with id: ${docRef.id}`);
  } catch (e) {
    console.error('error adding document', e);
  }
};

export const logPublic = async () => {
  const querySnapShot = await getDocs(collection(db, 'public'));
  querySnapShot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};
